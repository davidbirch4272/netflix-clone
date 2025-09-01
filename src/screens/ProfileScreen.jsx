import React from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { getAuth, signOut } from "firebase/auth";

//Time Stamp:  2:44:02 is where you stopped...

function ProfileScreen() {
  const user = useSelector(selectUser)
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.log("Error signing out:", error);
    });
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <button onClick={handleSignOut}
              className="profileScreen__signOut">SignOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
