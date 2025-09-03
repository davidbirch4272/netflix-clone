// functions/index.js

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const Stripe = require("stripe");
const logger = require("firebase-functions/logger");

// Initialize Firebase Admin
admin.initializeApp();

// Secret Manager client
const secretClient = new SecretManagerServiceClient();

// Helper to get Stripe key from secrets
async function getStripeKey() {
  const mode = process.env.STRIPE_MODE === "live" ? "STRIPE_LIVE_SECRET" : "STRIPE_TEST_SECRET";
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT}/secrets/${mode}/versions/latest`,
  });
  return version.payload.data.toString();
}

// Main webhook function
exports.stripeWebhook = onRequest(async (req, res) => {
    console.log("Received event:", req.body); // <— add this
  try {
    const stripeKey = await getStripeKey();
    const stripe = new Stripe(stripeKey);
    const event = req.body;
    const mode = event.livemode ? "live" : "test";

    // Handle product creation / update
    if (event.type === "product.created" || event.type === "product.updated") {
      const product = event.data.object;
      await admin.firestore()
        .collection("plans")
        .doc(`${product.id}_${mode}`)
        .set({
          productId: product.id,
          name: product.name,
          description: product.description || "",
          mode,
        }, { merge: true });
    }

    // Handle price creation / update
    if (event.type === "price.created" || event.type === "price.updated") {
      const price = event.data.object;
      await admin.firestore()
        .collection("plans")
        .doc(`${price.id}_${mode}`)
        .set({
          priceId: price.id,
          productId: price.product,
          unit_amount: price.unit_amount,
          currency: price.currency,
          interval: price.recurring?.interval || null,
          mode,
        }, { merge: true });
    }

    // Always respond to Stripe
    res.status(200).send("ok");
  } catch (err) {
    logger.error("Stripe webhook error:", err);
    res.status(500).send("error");
  }
});
