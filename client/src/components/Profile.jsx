import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/authSlice";
import { resetFilters } from "../redux/features/filterSlice";
import { resetTasks } from "../redux/features/taskSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(resetFilters());
    dispatch(resetTasks());
    navigate("/login");
  };

  return (
    <main className='flex flex-col items-start justify-center bg-[#F3F3F3] rounded-lg p-4 mt-3 gap-4 shadow-xl w-2/3 h-fit'>
      <h3 className='font-bold text-2xl w-full items-start text-[#292D32]'>
        Profil
      </h3>
      <div className='flex flex-row gap-4 items-center'>
        <img
          src={`http://localhost:3000/assets/${user.picturePath}`}
          alt='profile'
          className='w-16 h-16 rounded-full'
        />
        <h3 className='font-bold'>{user.userName}</h3>
      </div>
      <button
        className='bg-[#498AD4] rounded-xl p-2 w-min-1/4 font-bold font-quicksand text-md text-[#FAFAFA] hover:scale-[1.01]'
        onClick={() => handleLogOut()}
      >
        Logga Ut
      </button>
    </main>
  );
};

export default Profile;
