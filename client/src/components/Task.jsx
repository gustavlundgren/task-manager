import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "../api/index";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/features/taskSlice";

const Task = ({ id, title, date, prio }) => {
  let color = "";
  let prio_msg = "error";

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  switch (prio) {
    case "3":
      color = "red";
      prio_msg = "Hög Prioritet";

      break;
    case "2":
      color = "orange";
      prio_msg = "Medel Prioritet";

      break;
    case "1":
      color = "green";
      prio_msg = "Låg Prioritet";

      break;

    default:
      break;
  }

  const deleteTask = async () => {
    try {
      const response = await axios.delete(`/tasks/delete/${id}/${user.id}`);

      dispatch(addTask(response.data.sort((a, b) => b.prio - a.prio)));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex flex-col items-center bg-[#F3F3F3] rounded-lg w-full p-4 mt-3 gap-4 shadow-xl'>
      <div className='flex flex-row w-full justify-between'>
        <h3 className='font-bold text-2xl w-full items-start text-[#292D32]'>
          {title}
        </h3>
        <BsFillTrashFill onClick={() => deleteTask()} />
      </div>

      <div className='flex flex-col w-full'>
        <h4 className='text-[#656565] text-lg font-quicksand'>{`${date.slice(
          0,
          4
        )}-${date.slice(4, 6)}-${date.slice(6, 8)}`}</h4>
        <div className='flex flex-row gap-2 items-center'>
          <svg height='10' width='10'>
            <circle cx='5' cy='5' r='5' fill={color} />
          </svg>
          <h4 className='text-[#656565]'>{prio_msg}</h4>
        </div>
      </div>
    </div>
  );
};

export default Task;
