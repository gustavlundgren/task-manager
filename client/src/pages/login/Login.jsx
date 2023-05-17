import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken, addUser } from "../../redux/features/authSlice";
import axios from "../../api/index";

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", { email, password });

      dispatch(addToken(response.data?.token));
      dispatch(addUser(response.data?.user));

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='w-screen h-screen grid place-items-center'>
      <form
        action='submit'
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col items-center bg-[#F3F3F3] rounded-lg w-2/3 p-6 gap-4 shadow-xl'
      >
        <h3 className='font-bold text-3xl w-full items-start text-[#292D32]'>
          Logga In
        </h3>

        <input
          className='bg-[#E3E3E3] rounded-full p-3 w-full'
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          className='bg-[#E3E3E3] rounded-full p-3 w-full'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className='bg-[#498AD4] rounded-full p-2 w-1/2 font-bold font-quicksand text-xl text-[#FAFAFA] hover:scale-[1.01]'>
          Logga In
        </button>

        <div className='flex flex-col items-center'>
          <p>or</p>
          <a className='text-blue' href='/register'>
            register
          </a>
        </div>
      </form>
    </main>
  );
};

export default Login;
