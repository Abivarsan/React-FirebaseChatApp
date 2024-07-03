import React from "react";
import GoogleSignin from "../img/btn_google_signin.svg";

const GoogleButton = ({ onClick }) => {
  return (
    <button className="gsi-material-button sign-in" onClick={onClick}>
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
          <img
                src={GoogleSignin}
                alt="sign in with google"
                type="button"
              />
          </div>
          <span className="gsi-material-button-contents">Continue with Google</span>
          <span style={{display: "none"}}>Continue with Google</span>
        </div>
      </button>
  );
};

export default GoogleButton;