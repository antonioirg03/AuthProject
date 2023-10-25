import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleUpload = async (image) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImgPercent(Math.round(progress));
      },
      (error) => {
        setImgError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePic: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleUpload(image);
    }
  }, [image]);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePic || currentUser.profilePic}
          alt='Profile'
          className='h-24 w-24 rounded-full self-center cursor-pointer mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm text-center'>
          {imgError ? (
            <span className='text-red-700'>
              Error uploading (file size must be less than 2MB)
            </span>
          ) : imgPercent > 0 && imgPercent < 100 ? (
            <span>{"Uploading..." + imgPercent.toString()}</span>
          ) : imgPercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
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
