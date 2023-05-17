import { useState } from "react";
import axios from "../api/index";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/features/taskSlice";

const AddTask = () => {
  const [makeHigh, setMakeHigh] = useState(false);
  const [makeMid, setMakeMid] = useState(false);
  const [makeLow, setMakeLow] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [prio, setPrio] = useState("1");

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.value);
  const user = useSelector((state) => state.auth.user);

  const makeTask = async () => {
    let dateRegEx = /^\d{4}-\d{2}-\d{2}$/;

    if (!title || !date || !prio || !date.match(dateRegEx)) {
      return alert("Ogiltig data");
    }

    try {
      const response = await axios.post("/tasks/create", {
        title,
        date: date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10),
        prio,
        userId: user.id,
      });

      if (filters.includes(prio) || !filters.includes("1", "2", "3")) {
        dispatch(addTask(response.data.sort((a, b) => b.prio - a.prio)));
      }

      setTitle("");
      setDate("");
      setPrio("1");
      setMakeHigh(false);
      setMakeMid(false);
      setMakeLow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col items-center bg-[#F3F3F3] rounded-lg w-full p-4 gap-4 shadow-xl'>
      <h3 className='font-bold text-2xl w-full items-start text-[#292D32]'>
        Skapa Ny
      </h3>

      <div className='flex flex-row gap-2 h-fit w-full font-bold text-[#6E6E6E] text-lg'>
        <input
          className='bg-[#E3E3E3] rounded-full p-3 w-1/2'
          type='text'
          placeholder='Titel'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className='bg-[#E3E3E3] rounded-full p-3 w-1/2'
          type='text'
          placeholder='Datum (yyyy-mm-dd)'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className='flex flex-row gap-3 w-full text-[#292D32]s'>
        <div
          className='flex felx-row gap-2 items-center justify-center w-1/3'
          onClick={() => {
            setMakeLow(false);
            setMakeMid(false);
            setMakeHigh(true);
            setPrio("3");
          }}
        >
          <input
            type='radio'
            value='makeHigh'
            name='makeHigh'
            checked={makeHigh}
          />
          <label htmlFor='makeHigh'>Hög prioritet</label>
        </div>

        <div
          className='flex felx-row gap-2 items-center justify-center w-1/3'
          onClick={() => {
            setMakeLow(false);
            setMakeMid(true);
            setMakeHigh(false);
            setPrio("2");
          }}
        >
          <input
            type='radio'
            value='makeMedium'
            name='makeMedium'
            checked={makeMid}
          />
          <label htmlFor='makeMedium'>Medel prioritet</label>
        </div>

        <div
          className='flex felx-row gap-2 items-center justify-center w-1/3'
          onClick={() => {
            setMakeLow(true);
            setMakeMid(false);
            setMakeHigh(false);
            setPrio("1");
          }}
        >
          <input
            type='radio'
            value='makeLow'
            name='makeLow'
            checked={makeLow}
          />
          <label htmlFor='makeLow'>Låg prioritet</label>
        </div>
      </div>
      <button
        className='bg-[#498AD4] rounded-full p-2 w-1/2 font-bold font-quicksand text-xl text-[#FAFAFA] hover:scale-[1.01]'
        onClick={() => makeTask()}
      >
        Skapa
      </button>
    </div>
  );
};

export default AddTask;
