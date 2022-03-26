import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQaN8E5IG1zKq70IGL-v6a6-Ih-uOb3Ws",
  authDomain: "crwn-clothing-project-b8cc5.firebaseapp.com",
  projectId: "crwn-clothing-project-b8cc5",
  storageBucket: "crwn-clothing-project-b8cc5.appspot.com",
  messagingSenderId: "969655807390",
  appId: "1:969655807390:web:506b0ddb7593807827fa8f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date();
      try{
          await setDoc(userDocRef, {
              displayName, 
              email,
              createAt
          })

      }catch(error){
        console.log("error creating the user", error.message)
      }
  }

  return userDocRef;
};
