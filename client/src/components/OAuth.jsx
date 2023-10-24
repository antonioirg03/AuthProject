import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const response = await signInWithPopup(auth, provider);
      console.log(response);
      const newUser = {
        username: response.user.displayName,
        email: response.user.email,
        profilePic: response.user.photoURL,
      };
      console.log(newUser);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleSignIn}
      className='bg-red-700 text-white rounded-lg
     p-3 uppercase hover:opacity-80'
    >
      Continue with google
    </button>
  );
};

export default OAuth;
