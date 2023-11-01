import React from "react";

const About = () => {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate->800'>About</h1>
      <p className='mb-4 text-slate-700'>
        This is a full stack application that allows users to sign up, sign in,
        and sign out. It was bulit using the MERN stack (MongoDB, Express,
        React, and Node.js). It also uses Redux for state management and
        Tailwind CSS for styling.
      </p>
      <p className='mb-4 text-slate-700'>
        The application ensures secure user authentication using JSON Web Tokens
        (JWT). It also provides a seamless user experience with responsive
        design, making it accessible on various devices. The backend is robust,
        capable of handling multiple requests simultaneously, and the frontend
        is designed to be intuitive and user-friendly.
      </p>
    </div>
  );
};

export default About;
