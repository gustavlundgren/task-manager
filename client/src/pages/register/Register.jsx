import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/index";

const Register = () => {
  const [file, setFile] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picturePath", file.name);
    formData.append("file", file);

    try {
      const response = await axios.post("/auth/register", formData);

      console.log(response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <main className='w-screen h-screen grid place-items-center'>
      <form
        action='submit'
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col items-center bg-[#F3F3F3] rounded-lg w-2/3 p-6 gap-4 shadow-xl'
      >
        <h3 className='font-bold text-3xl w-full items-start text-[#292D32]'>
          Registrera dig
        </h3>
        <div className='flex flex-row w-full justify-between items-center gap-2'>
          <input
            className='bg-[#E3E3E3] rounded-full p-3 w-1/2'
            type='text'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            className='bg-[#E3E3E3] rounded-full p-3 w-1/2'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <input
          className='bg-[#E3E3E3] rounded-full p-3 w-full'
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input type='file' className='w-full' onChange={handleFileChange} />
        <button className='bg-[#498AD4] rounded-full p-2 w-1/2 font-bold font-quicksand text-xl text-[#FAFAFA] hover:scale-[1.01]'>
          Registrera
        </button>
        <div className='flex flex-col items-center'>
          <p>or</p>
          <a className='text-blue' href='/login'>
            login
          </a>
        </div>
      </form>
    </main>
  );
};

export default Register;
