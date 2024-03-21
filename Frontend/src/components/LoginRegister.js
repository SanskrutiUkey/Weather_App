import React, { useState } from 'react';
import '../styles/authUserStyle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { useAuth } from '../context/auth.js';

const AuthUser = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [isSignUpMode2, setIsSignUpMode2] = useState(false);
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()
    const location = useLocation()

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
        setIsSignUpMode2(false);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleSignUpClick2 = () => {
        setIsSignUpMode2(true);
    };

    const handleSignInClick2 = () => {
        setIsSignUpMode2(false);
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
                userName, email, password
            });
            // console.log(res.data.message);
            if (res && res.data.success) {
                toast.success(res && res.data.message, { duration: 5000 });
                console.log("done");
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (er) {
            console.log(er);
            toast.error("Something went wrong")
        }
    }

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
                email, password
            });

            if (res && res.data.success) {
                toast.success(res && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                // console.log("res.data.user ", res.data.user);
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate("/home")
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (er) {
            console.log(er);
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <h3 className='text-5xl font-semibold pt-10 text-blue-950'>Weather App</h3>
            </div>
            <div className='main-user'>

                <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''} ${isSignUpMode2 ? 'sign-up-mode2' : ''}`}>
                    <div className="signin-signup">
                        <form className="sign-in-form" onSubmit={handleSubmitSignIn}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} required />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={password}
                                    onChange={(e) => { setPassword(e.target.value) }} required />
                            </div>
                            <button type="submit" className="btn"> Sign In </button>

                            <p className="account-text">Don't have an account? <a href="#" onClick={handleSignUpClick2} id="sign-up-btn2">Sign up</a></p>
                        </form>
                        <form className="sign-up-form" onSubmit={handleSubmitSignUp}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" value={userName}
                                    onChange={(e) => { setuserName(e.target.value) }} required />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="text" placeholder="Email" value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} required />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" value={password}
                                    onChange={(e) => { setPassword(e.target.value) }} required />
                            </div>

                            <button type="submit" className="btn"> Sign up </button>
                            {/* <p className="social-text">Or Sign in with social platform</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="" className="social-icon">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div> */}
                            <p className="account-text">Already have an account? <a href="#" onClick={handleSignInClick2} id="sign-in-btn2">Sign in</a></p>
                        </form>
                    </div>
                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>LOGIN</h3>
                                <button className="btn" onClick={handleSignInClick} id="sign-in-btn">Sign in</button>
                            </div>
                            <img src="signin.svg" alt="" className="image" />
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>REGISTER</h3>
                                <button className="btn" onClick={handleSignUpClick} id="sign-up-btn">Sign up</button>
                            </div>
                            <img src="signup.svg" alt="" className="image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthUser;
