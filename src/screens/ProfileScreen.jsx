import React from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { getAuth, signOut } from "firebase/auth";
import PlansScreen from "./PlansScreen";

//Timestamp:  3:21:14 to 3:30:02 is a really big mess.  
//Timestamp:  3:38:52 once you get done with the above timestamp mess...
//Timestamp:  just before 4:03:26 is something that you should check out once you get things going. 
//Timestamp:  04:05:32 is something else you are going to have to do as well. 
//Timestamp:  04:20:06 npm build and then firebase deploy click app 
//TimeStamp:  You stopped at the end of the video.   

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
              <PlansScreen />              
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
