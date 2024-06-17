import React from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAuthToken } from "../scripts/google-login";
import { firebaseConfig } from "../constants/credentials";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

function SignIn() {

  const signIn = async ()=>{
    signInWithCredential(auth, GoogleAuthProvider.credential(null , await getAuthToken()));
  }
  return <button onClick={signIn}>sign in</button>;
}

export default SignIn;
