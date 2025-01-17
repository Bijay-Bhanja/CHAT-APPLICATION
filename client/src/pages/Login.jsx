
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from "../assets/logo.svg"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

const Login = () => {
    const navigate=useNavigate()
    let [values,setValues]=useState({
        username:"",
        
        password:""
        
    })

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/")
        }
    },[])
    const handleSubmit =async (event) => {
        event.preventDefault()
        if(handleValidation()){
        const {password,username}=values
            const data=await axios.post(loginRoute,{
                username,password       
            })
            console.log(data)
            if(data.data.status===false){
                toast.error(data.data.msg,toastOptions)
                
            }
            if(data.data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.data.user))
                navigate("/")
            }
        }
        
    }
    const toastOptions={
        position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
    }
    const handleValidation=()=>{
        const {password,username}=values
        if(password===""){
            toast.error("Email and Password is required",toastOptions);
            return false;

        }
        else if(username.length===""){
            toast.error("Email and Password is required",toastOptions)
            return false
        }
        // else if(email===""){
        //     toast.error("email is required",toastOptions)
        //     return false
        // }
        return true
    }
    const handleChange = (event) => {
        event.preventDefault()
        setValues({...values,[event.target.name]:event.target.value})
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className='brand'>
                        <img src={logo} alt="logo" />
                        <h1>snappy</h1>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={handleChange} min="3"/>
                    
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} />
                    
                    <button type='submit'>Login In</button>
                    <span>Don't have an account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }

        button {
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

        span {
            color: white;

            a {
                color: #4e0eff;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default Login

