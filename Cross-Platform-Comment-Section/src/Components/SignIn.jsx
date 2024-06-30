import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth/web-extension";
import { getAuthToken } from "../scripts/google-login";
import { firebaseConfig } from "../constants/credentials";
import Register from "./Register";
import Login from "./Login";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

function SignIn() {
  const googleSignIn = async (e) => {
    e.preventDefault()
    signInWithCredential(
      auth,
      GoogleAuthProvider.credential(null, await getAuthToken())
    );
  };

  const signUpToFalse = () => {
    setSignUp(false);
  };
  const signUpToTrue = () => {
    setSignUp(true);
  };

  const [signUp, setSignUp] = useState(true);

  return <>{signUp ? <Login googleSignIn={googleSignIn} signUpToFalse={signUpToFalse} /> : <Register googleSignIn={googleSignIn} signUpToTrue={signUpToTrue} />}</>;
}

export default SignIn;
