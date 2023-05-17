import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetFilters } from "../redux/features/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const [low, setLow] = useState(false);
  const [mid, setMid] = useState(false);
  const [high, setHigh] = useState(false);
  const [thisMonth, setThisMonth] = useState(false);
  const [sort, setSort] = useState("lowP");

  const applyFilterAndSort = () => {
    dispatch(resetFilters());
    dispatch(addFilter(sort));

    if (low) {
      dispatch(addFilter("1"));
    }

    if (mid) {
      dispatch(addFilter("2"));
    }

    if (high) {
      dispatch(addFilter("3"));
    }

    if (thisMonth) {
      dispatch(addFilter("month"));
    }

    if ((!low && !mid && !high) || (low && mid && high)) {
      dispatch(resetFilters());
      dispatch(addFilter(sort));
    }
  };

  return (
    <div className='flex flex-col items-start justify-center bg-[#F3F3F3] rounded-lg p-4 mt-3 gap-4 shadow-xl w-2/3'>
      <h3 className='font-bold text-2xl w-full items-start text-[#292D32]'>
        Filter
      </h3>

      <div className='flex flex-col gap-3 w-full text-[#292D32]s'>
        <div
          className='flex felx-row gap-2 items-center justify-start'
          onClick={() => {
            setThisMonth(!thisMonth);
          }}
        >
          <input type='radio' value='month' name='month' checked={thisMonth} />
          <label htmlFor='month'>Denna Månad</label>
        </div>

        <div
          className='flex felx-row gap-2 items-center justify-start'
          onClick={() => {
            setHigh(!high);
          }}
        >
          <input type='radio' value='high' name='high' checked={high} />
          <label htmlFor='high'>Hög prioritet</label>
        </div>

        <div
          className='flex felx-row gap-2 items-center justify-start'
          onClick={() => {
            setMid(!mid);
          }}
        >
          <input type='radio' value='medium' name='medium' checked={mid} />
          <label htmlFor='medium'>Medel prioritet</label>
        </div>

        <div
          className='flex felx-row gap-2 items-center justify-start'
          onClick={() => {
            setLow(!low);
          }}
        >
          <input type='radio' value='low' name='low' checked={low} />
          <label htmlFor='low'>Låg prioritet</label>
        </div>
      </div>

      <h3 className='font-bold text-2xl w-full items-start text-[#292D32]'>
        Sortera
      </h3>

      <select
        name='sorting'
        className='w-min-1/2 bg-[#E3E3E3] px-3 py-2 rounded-lg outline-none'
        onChange={(e) => setSort(e.target.value)}
      >
        <option value='lowP'>Sjunkande Prio</option>
        <option value='highP'>Stigande Prio</option>

        <option value='lowD'>Sjunkande Datum</option>
        <option value='highD'>Stigande Datum</option>
      </select>

      <button
        className='bg-[#498AD4] rounded-xl p-2 w-3/4 font-bold font-quicksand text-xl text-[#FAFAFA] hover:scale-[1.01]'
        onClick={() => applyFilterAndSort()}
      >
        Sök
      </button>
    </div>
  );
};

export default Filter;
