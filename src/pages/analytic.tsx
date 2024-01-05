import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import Table from './table';
import Datepicker from "react-tailwindcss-datepicker";

function Analytic() {
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    setTimeout(() => {
      setView(true);
    }, 1000);
  }, []);
  useEffect(() => {
    axios.get("https://recruitment-test.gltkdev.com/user/me", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((response) => {
        
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (!localStorage.getItem('jwt')) {
      push('/');
      return;
    }
  }, []);
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue: any) => {

    setValue(newValue);
  }
  const [load, setLoad] = React.useState(false);
  const [view, setView] = React.useState(false);
  const { push } = useRouter()
  const [current, setCurrent] = React.useState([]);
  const [allData, setAllData] = React.useState({})
  function handleGenerate(date1: any, date2: any) {
    const dateArray = [];
    let currentDate = new Date(date1);
    setLoad(false)
    setAllData({})
    while (currentDate <= new Date(date2)) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }


    dateArray.map((date) => {
      axios.get("https://recruitment-test.gltkdev.com/analytic/click", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        params: {
          listing_date: date
        }
      })
        .then((response) => {
          setCurrent(response.data)
          setAllData((prev) => ({
            ...prev,
            [date]: response.data
          }));
          setLoad(true)
        })
        .catch((error) => {
          setAllData((prev) => ({
            ...prev,
            [date]: [
              { scope: 'a', count: 0 },
              { scope: 'b', count: 0 },
              { scope: 'c', count: 0 },
              { scope: 'd', count: 0 },
              { scope: 'e', count: 0 },
              { scope: 'f', count: 0 },
              { scope: 'g', count: 0 },
              { scope: 'h', count: 0 },
              { scope: 'i', count: 0 },
              { scope: 'j', count: 0 },

            ]
          }));
          alert(error.response.data.detail.code);
        });
    })
  }
  function handleLogout() {

    axios
      .post("https://recruitment-test.gltkdev.com/user/logout/all", null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then((response) => {
     
        localStorage.removeItem('jwt');
        setView(false);
        push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className='bg-green-200'>
      {view &&
        <div className='flex flex-col gap-4 px-6 sm:px-12 py-12 bg-green-200 '>
          <div className='flex flex-row justify-between items-center mb-12'>

            <img className='w-[130px] sm:w-[150px]' src="/golektruk.svg" alt="" />
            <div className='flex flex-row gap-3 items-center '>
              <h1 className=''>{userData && userData?.name}</h1>
              <button onClick={handleLogout} className='rounded-2xl p-2 px-3 border-2 border-black'>Sign Out</button>
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-3 w-full sm:w-fit'>
            <Datepicker

              primaryColor={"green"}
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
              separator='to'
              placeholder='Select Date Range'
              inputClassName={"rounded-xl p-2 border-2 border-black sm:w-[300px] focus:outline-green-500 bg-transparent text-black w-full h-fit placeholder:text-black"}
            
              toggleClassName="absolute  rounded-r-lg text-black right-0 h-full px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed" 
            
            ></Datepicker>
            <button className='rounded-xl p-2 px-3 hover:bg-green-600   bg-green-500 text-white' onClick={() => handleGenerate(value.startDate, value.endDate)}>Get</button>
            </div>
           
          </div>
        </div>
        
      }
       <div className='flex flex-col gap-4 px-6 sm:px-12 py-12 bg-white rounded-t-3xl'>
       {Object.keys(allData).length > 0 && load && current.length != 0 && <Table  data={allData} />}
       
       </div>
    </div>
  )
}

export default Analytic