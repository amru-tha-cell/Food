import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'

const LoginPopup = ({showLogin, setShowLogin }) => {
    const [curState, setCurState] = useState("Log In")
    const { url, token, setToken } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (curState === "Log In") {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }

        try {
            const response = await axios.post(newUrl, data)
            if (curState === "Sign Up") {
                toast.success("Account created successfully! Please Log In")
                setCurState("Log In")
            } else {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowLogin(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred")
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onSubmitHandler} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {curState !== "Log In" && (
                        <input
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder='Your Name'
                            required
                        />
                    )}
                    <input
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder='Your Email'
                        required
                    />
                    <input
                        name="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <button className='btn'>{curState}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to terms and policy</p>
                </div>
                {
                    curState === "Log In" ? (
                        <p>Create a new account? <span onClick={() => setCurState("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurState("Log In")}>Log In here</span></p>
                    )
                }
            </form>
        </div>
    )
}

export default LoginPopup
