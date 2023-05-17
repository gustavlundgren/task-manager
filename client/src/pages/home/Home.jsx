import React, { useEffect, useState } from "react";
import AddTask from "../../components/AddTask";
import Task from "../../components/Task";
import Filter from "../../components/Filter";
import axios from "../../api/index";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../redux/features/taskSlice";
import Profile from "../../components/Profile";

const Home = () => {
  const tasks = useSelector((state) => state.tasks.value);
  const filters = useSelector((state) => state.filters.value);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/tasks/get-all/${user.id}`);

      const date = new Date();
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth().toString();
      let temporaryTasks = [];
      let finalTasks = [];

      if (filters.includes("lowP") || filters.length === 0) {
        temporaryTasks = response.data.sort((a, b) => b.prio - a.prio);
      }

      if (filters.includes("highP")) {
        temporaryTasks = response.data.sort((a, b) => a.prio - b.prio);
      }

      if (filters.includes("lowD") || filters.length === 0) {
        temporaryTasks = response.data.sort((a, b) => b.date - a.date);
      }

      if (filters.includes("highD")) {
        temporaryTasks = response.data.sort((a, b) => a.date - b.date);
      }

      if (filters.includes("3")) {
        finalTasks = finalTasks.concat(
          temporaryTasks.filter((t) => t.prio === "3")
        );
      }
      if (filters.includes("2")) {
        finalTasks = finalTasks.concat(
          temporaryTasks.filter((t) => t.prio === "2")
        );
      }
      if (filters.includes("1")) {
        finalTasks = finalTasks.concat(
          temporaryTasks.filter((t) => t.prio === "1")
        );
      }
      if (filters.includes("month")) {
        finalTasks = finalTasks.filter((t) => t.date.slice(4, 6) === month);
      }

      if (
        finalTasks.length === 0 &&
        !filters.includes("1", "2", "3", "month")
      ) {
        finalTasks = temporaryTasks;
      }
      dispatch(addTask(finalTasks));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <main className='flex flex-col h-screen font-quicksand'>
      <section className='flex items-center justify-center m-4'>
        <h1 className='font-bold text-5xl w-fit'>Task Manager</h1>
      </section>
      <div className='flex flex-row h-screen font-quicksand'>
        <section className='w-1/3 pl-5'>
          <Filter />
        </section>

        <section className='flex flex-col gap-6 items-center w-1/3'>
          <AddTask />
          <div className='flex flex-col w-4/5 gap-5'>
            {tasks &&
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.date}
                    prio={task.prio}
                  />
                );
              })}
          </div>
        </section>

        <section className='flex justify-end w-1/3 mr-5'>
          <Profile />
        </section>
      </div>
    </main>
  );
};

export default Home;
