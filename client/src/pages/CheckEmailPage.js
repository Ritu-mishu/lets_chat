import React, {useState} from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast';


const CheckEmailPage = () => {
    const [data,setData] = useState({
        email: ""
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

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

        try{
            const res = await axios.post(URL, data)
            

            toast.success(res.data.message)

            if(res.data.success){
                setData({
                    email: ""
                })

                navigate('/password',{
                  state: res?.data?.data
                })
            }
            
        } catch(error){
            toast.error(error?.res?.data?.message)
        }

    }

  return (
    <div>
      <div className='mt-5'>
        <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-6'>
            <FaRegUserCircle
              size={80}
            />
        </div>
            <h3> Welcome to Chat App!</h3>

            <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

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

                <button
                  className='bg-secondary text-lg px-4 py-1 hover:bg-primary rounded mt-3 font-bold text-white'
                >
                    Let's Go!
                </button>

            </form>
            <p className='my-3 text-center'>New User? <Link to={"/register"} className='font-semibold hover:text-primary hover:underline'>Register</Link></p>
        </div>
    </div>
    </div>
  )
}

export default CheckEmailPage