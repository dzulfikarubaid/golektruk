import axios from 'axios';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import {BiLogoGithub, BiLogoInstagram, BiLogoInstagramAlt, BiLogoLinkedin} from 'react-icons/bi'
function Register() {
    const [usn, setUsn] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [photos, setPhotos] = useState("");
    const { push } = useRouter()
    function handleSubmit(e: any) {
        e.preventDefault();
        if (pass !== cpass) {
            alert("Password does not match");
            return;
        }
        axios.post('https://recruitment-test.gltkdev.com/user',
            {
                name: usn,
                password: pass,
                email: email,
                age: age,
                phone: phone,
                photos: [photos]
            }
        ).then(
            (response) => {
                
                push('/')
            }
        ).catch((error) => {
            error.response.data.detail[0] ? alert(error.response.data.detail[0].msg)
                :
                error.response.data.detail[1] ? alert(error.response.data.detail[1].msg)
                    :
                    alert(error.response.data.detail.code);
            console.log(error);
        })
    }
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUpload = (e: any) => {
        e.preventDefault();
        const fileInput: any = document.getElementById('file');
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            setFile(selectedFile);

            const formData = new FormData();
            formData.append('file', selectedFile);

            const reader: any = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(selectedFile);

            axios.post("https://recruitment-test.gltkdev.com/user/photo/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
                .then((response) => {
                   
                    setPhotos(response.data)
                })
                .catch((error) => {
                    console.log(error);
               
                });
        }
    };
    return (
        <main
            className={`flex min-h-screen flex-row bg-gradient-to-b from-green-200 to-green-200 relative`}
        >
        <div className='w-full sm:w-1/2 min-h-screen flex items-center sm:items-start justify-around flex-col gap-10 px-4 py-10 sm:py-0 sm:px-32'>
        <img className='w-[200px]' src="/golektruk.svg" alt="" />
         <div className='sm:hidden rounded-3xl p-10 flex flex-col items-center justify-center w-full gap-2 border-[1px] bg-white'>
        <h1 className='text-2xl font-semibold mb-4'>Sign Up</h1>
            <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="shrink-0">
                    {preview ? (
                        <img id='preview_img1' className="h-16 w-16 object-cover rounded-full" src={preview} alt="Preview" />
                    ) : (
                        <img id='preview_img1' className="h-16 w-16 object-cover rounded-full" src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg" alt="Current profile photo" />
                    )}
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input accept='image/*' type="file" name="file" id="file" onChange={handleUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200" />
                </label>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Name</label>
                <input
                    type="text"
                    name="usn"
                    id="usn1"
                    placeholder='ex: John Doe'
                    value={usn}
                    onChange={(e: any) => setUsn(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Age</label>
                <input
                    type="text"
                    name="age"
                    id="age1"
                    placeholder='ex: 19'
                    value={age}
                    onChange={(e: any) => setAge(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone1"
                    placeholder='628xxxxxxxx'
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder='ex: example@example.com'
                    id="email1"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password1"
                    value={pass}
                    placeholder='Password'
                    onChange={(e: any) => setPass(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                    type="password"
                    name="cpassword"
                    id="cpassword1"
                    placeholder='Confirm Password'
                    value={cpass}
                    onChange={(e: any) => setCpass(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white border-[1px] rounded-xl px-2 py-1 focus:outline-none w-full mt-2'>Sign Up</button>
             <div className='flex flex-row gap-2 w-full items-center  justify-center'>
                <h1>Sudah punya akun? </h1>
                <Link className='text-green-600' href="/">Sign In</Link></div>
        </div>
        <div className='flex flex-col gap-4 mb-24 sm:mb-0'>
        <h1 className='text-4xl text-center sm:text-left'>Tumbuh dan bertahan bersama GolekTruk</h1>
        <p className='text-lg text-black font-light sm:text-left text-center'>Jadilah bagian dari kami</p>
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
       
        <div className='w-1/2 bg-white rounded-l-3xl p-12 justify-center items-center hidden sm:flex'>
        <div className='rounded-3xl p-10 flex flex-col  items-center justify-center w-3/4 gap-2 border-[1px] bg-gradient-to-br from-green-200/20 to-transparent'>
        <h1 className='text-2xl font-semibold mb-4'>Sign Up</h1>
            <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="shrink-0">
                    {preview ? (
                        <img id='preview_img' className="h-16 w-16 object-cover rounded-full" src={preview} alt="Preview" />
                    ) : (
                        <img id='preview_img' className="h-16 w-16 object-cover rounded-full" src="https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg" alt="Current profile photo" />
                    )}
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input accept='image/*' type="file" name="file" id="file" onChange={handleUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200" />
                </label>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Name</label>
                <input
                    type="text"
                    name="usn"
                    id="usn"
                    placeholder='ex: John Doe'
                    value={usn}
                    onChange={(e: any) => setUsn(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Age</label>
                <input
                    type="text"
                    name="age"
                    id="age"
                    placeholder='ex: 19'
                    value={age}
                    onChange={(e: any) => setAge(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="usn">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder='628xxxxxxxx'
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder='ex: example@example.com'
                    id="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={pass}
                    placeholder='Password'
                    onChange={(e: any) => setPass(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder='Confirm Password'
                    value={cpass}
                    onChange={(e: any) => setCpass(e.target.value)}
                    className='border-slate-300 border-[1px] rounded-xl px-2 py-1 focus:outline-none'
                />
            </div>
            <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white border-[1px] rounded-xl px-2 py-1 focus:outline-none w-full mt-2'>Sign Up</button>
             <div className='flex flex-row gap-2 w-full items-center justify-center'>
                <h1>Sudah punya akun? </h1>
                <Link className='text-green-600' href="/">Sign In</Link></div>
        </div>
        
        </div>
            
           


        </main>
    );
}

export default Register