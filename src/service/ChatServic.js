import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const googleSignIn = async () => {
    try{
      const provider = new GoogleAuthProvider();
      //login user with gmail
      const res=await signInWithPopup(auth, provider);
      const user = res.user;
      //check user is exist in users colloction with firebase
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      //if user not exist in users collection add user to users colloction in firebase
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          avatar: user.photoURL
        });
      }
    //   const querySnapshot = await getDocs(collection(db, "users"));
    //     const usersList = querySnapshot.docs.map(doc => doc.data());
    //     console.log({usersList});
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  };

   