import React, {useState} from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [data,setData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
    })
    const [uploadPhoto, setUploadPhoto] = useState("")
    const navigate = useNavigate()

    const handleOnChange = (e)=>{
        const {name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }

    const handleUploadPhoto = async(e)=>{
        const file =e.target.files[0]

        const uploadPhoto = await uploadFile(file)
        
        setUploadPhoto(file)

        setData((preve)=>{
            return{
                ...preve,
                profile_pic: uploadPhoto?.url
            }
        })
    }
    const handleClearUploadPhoto = (e)=>{
        e.stopPropagation()
        e.preventDefault()
        setUploadPhoto(null)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

        try{
            const res = await axios.post(URL, data)
            console.log("res", res)
            toast.success(res.data.message)

            if(res.data.success){
                setData({
                    name: "",
                    email: "",
                    password: "",
                    profile_pic: ""
                })

                navigate('/email')
            }
        } catch(error){
            toast.error(error?.res?.data?.message)
        }

        console.log('data',data)
    }

    
  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
            <h3> Welcome to Chat App!</h3>

            <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 mt-5'>
                    <label htmlFor='name'>Name :</label>
                    <input
                      type= 'text'
                      id='name'
                      name='name'
                      placeholder='Enter your name'
                      className='bg-slate-100 px-2 py-1 focus:outline-primary'
                      value={data.name}
                      onChange = {handleOnChange}
                      required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email :</label>
                    <input
                      type= 'email'
                      id='email'
                      name='email'
                      placeholder='Enter your email'
                      className='bg-slate-100 px-2 py-1 focus:outline-primary'
                      value={data.email}
                      onChange = {handleOnChange}
                      required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>Password :</label>
                    <input
                      type= 'password'
                      id='password'
                      name='password'
                      placeholder='Enter your password'
                      className='bg-slate-100 px-2 py-1 focus:outline-primary'
                      value={data.password}
                      onChange = {handleOnChange}
                      required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='profile_pic'>Photo :
                    
                        <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                            <p className='textSize-sm max-w-[300px] text-ellipsis line-clamp-1'>
                            {
                                uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                            }
                            
                            </p>
                            {
                                uploadPhoto?.name && (
                                    <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                                        <IoClose/>
                                    </button>
                                )
                            }
                            
                        </div>

                    </label>
                    <input
                      type= 'file'
                      id='profile_pic'
                      name='profile_pic'
                      className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                      onChange = {handleUploadPhoto}
                      
                    />
                </div>

                <button
                  className='bg-secondary text-lg px-4 py-1 hover:bg-primary rounded mt-3 font-bold text-white'
                >
                    Register
                </button>

            </form>
            <p className='my-3 text-center'>Already have account? <Link to={"/email"} className='font-semibold hover:text-primary hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage