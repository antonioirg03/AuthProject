import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <img
          src={currentUser.profilePic}
          alt='Profile'
          className='h-24 w-24 rounded-full self-center cursor-pointer mt-2'
        />
        <input
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          defaultValue={currentUser.username}
        />
        <input
          defaultValue={currentUser.email}
          type='text'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
        />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase
         hover:opacity-80 disabled:60'
        >
          Update
        </button>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
