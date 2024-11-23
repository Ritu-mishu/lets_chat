const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

console.log("process.env.REACT_APP_CLOUDINARY_CLOUD_NAME",process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)

//const url = 'https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload'

const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file', file)
    formData.append("upload_preset","chatapp-file")

    const res = await fetch(url,{
        method: 'post',
        body:formData
    })
    const responseData = await res.json()

    return responseData
}

export default uploadFile