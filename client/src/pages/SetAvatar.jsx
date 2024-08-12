import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { setAvatarRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import styled from 'styled-components'
import axios from 'axios'
import { Buffer } from 'buffer'
import loader from "../assets/loader.gif"
import profile1 from "../assets/profile1.jpeg"
import profile2 from "../assets/profile2.png"
import profile3 from "../assets/profile3.jpeg"
import profile4 from "../assets/profile4.jpeg"


const SetAvatar = () => {
    const api="https://api.multiavatar.com/456784"
    const navigate=useNavigate()
    const [avatars,setAvatars]=useState([profile1,profile2,profile3,profile4])
    const [isLoading,setIsLoading]=useState(true)
    const [selectedAvatar,setSelectedAvatar]=useState(undefined)
    const toastOptions={
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
        position:"bottom-right"
    }
  
useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
        navigate("/login")
    }
},[])

const setProfilePicture=async ()=>{
    if(selectedAvatar===undefined){
        toast.error("please selected an avatar",toastOptions)
    }
    else{
        const user=await JSON.parse(localStorage.getItem("chat-app-user"))
        // console.log(user)
        const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatars[selectedAvatar],
        })
        // console.log(data)
        if(data.image){
            
            user.inAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user))
            navigate("/")
        }
        else{
            toast.error("Error setting avatar,please try again",toastOptions)
        }
    }
}
   

  return (
    <>
    
            <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avators">
                {avatars.map((avatar, index) => (
                    <div
                        key={index}
                        className={`avatar ${selectedAvatar===index?"selected":""}`}
                        
                    >
                        <img src={avatar} alt="avatar" onClick={() => {setSelectedAvatar(index)
                           }
                        }/>
                    </div>
                ))}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        <ToastContainer/>
    </>
  )
}
const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#131324;
    height:100vh;
    width:100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color:white;
        }
    }
    .avators{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem;
                width:6rem; 
                border-radius:5rem;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 0.4rem;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        text-transform: uppercase;

        &:hover {
            background-color: #3b0bb7;
        }
    }    
`
export default SetAvatar










