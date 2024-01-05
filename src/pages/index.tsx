import { Inter } from 'next/font/google';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BiLogoLinkedin, BiLogoInstagramAlt, BiLogoGithub } from 'react-icons/bi';
import Link from 'next/link';

const fontInter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [usn, setUsn] = useState("");
  const [pass, setPass] = useState("");
  const { push } = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', usn);
    formData.append('password', pass);

    axios.post('https://recruitment-test.gltkdev.com/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        localStorage.setItem('jwt', response.data.access_token);
        push('/analytic');
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed. Check your credentials.");
      });
  }

  return (
    <main
      className={`flex min-h-screen flex-row bg-gradient-to-b from-green-200 to-green-200`}
    >
      <div className='w-full sm:w-1/2 min-h-screen flex items-center sm:items-start justify-around flex-col gap-10 px-4 py-10 sm:py-0 sm:px-32'>
        <img className='w-[200px]' src="/golektruk.svg" alt="" />
        <div className='sm:hidden rounded-3xl p-10 flex flex-col items-center justify-center w-full gap-2 border-[1px] bg-white'>
          <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="usn">Email</label>
            <input
              type="text"
              name="usn"
              id="usn1"
              placeholder='ex: example@example.com'
              value={usn}
              onChange={(e: any) => setUsn(e.target.value)}
              className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password1"
              placeholder='Password'
              value={pass}
              onChange={(e: any) => setPass(e.target.value)}
              className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
            />
          </div>

          <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white border-[1px] rounded-xl px-2 py-1 focus:outline-none w-full mt-2'>Sign In</button>

          <div className='flex flex-row gap-2 w-full items-center justify-center'>
            <h1>Belum punya akun? </h1>
            <Link className='text-green-600' href="/register">Sign Up</Link>
          </div>
        </div>
        <div className='flex flex-col gap-4 mb-24 sm:mb-0'>
          <h1 className='text-4xl text-center sm:text-left'>Tumbuh dan bertahan bersama GolekTruk</h1>
          <p className='text-lg text-black font-light sm:text-left text-center'>Masuk dan jelajahi semua fitur kami</p>
        </div>

        <div className='flex flex-col-reverse sm:flex-row w-full p-4 sm:p-0 justify-between gap-6 items-center text-gray-500 bg-white sm:bg-transparent absolute bottom-0 right-0 sm:relative'>
          <h1 className='sm:text-sm'>© 2024 dzulfikarubaid. All rights reserved.</h1>
          <div className='flex flex-row gap-2'>
            <Link target='_blank' href="https://id.linkedin.com/in/ahmad-dzulfikar-ubaidillah-1b7b59215" className='text-xl'><BiLogoLinkedin></BiLogoLinkedin></Link>
            <Link target='_blank' href="https://www.instagram.com/dzulfikarubaid/" className='text-xl'><BiLogoInstagramAlt></BiLogoInstagramAlt></Link>
            <Link target='_blank' href="https://github.com/dzulfikarubaid" className='text-xl'><BiLogoGithub></BiLogoGithub></Link>
          </div>
        </div>
      </div>

      <div className='w-1/2 bg-white rounded-l-3xl p-12 justify-center items-center sm:flex hidden'>
        <div className='rounded-3xl p-10 flex flex-col items-center justify-center w-3/4 gap-2 border-[1px] bg-gradient-to-br from-green-200/20 to-transparent'>
          <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="usn">Email</label>
            <input
              type="text"
              name="usn"
              id="usn"
              placeholder='ex: example@example.com'
              value={usn}
              onChange={(e: any) => setUsn(e.target.value)}
              className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              value={pass}
              onChange={(e: any) => setPass(e.target.value)}
              className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
            />
          </div>

          <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white border-[1px] rounded-xl px-2 py-1 focus:outline-none w-full mt-2'>Sign In</button>

          <div className='flex flex-row gap-2 w-full items-center justify-center'>
            <h1>Belum punya akun? </h1>
            <Link className='text-green-600' href="/register">Sign Up</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
