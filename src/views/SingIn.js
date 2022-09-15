import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/loader";
import { Constants } from "../flux";
import { saveInLocalStorage } from "../lib/helper";
import "../styling/styles/newsignin.css";

const SignIn = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loader, setLoader] = React.useState(0);

    const Login = (event) => {
        event.preventDefault()
        if (!username || !password) {
            toast.warn('username and password is required!');
            return;
        } else if (username && password) {
            setLoader(1)
            if (username === "admin" && password === "pronewsadmin@1212") {
                saveInLocalStorage("role", "Admin");
                saveInLocalStorage(Constants.IS_AUTHENTICATED, 'true');
                window.location.reload()
                setLoader(0)
            } else {
                toast.error("Username and password is incorrect");
                setLoader(0);
            }
        } else {
            toast.error("Username and password is incorrect");
            setLoader(0);
            console.log('username and password is incorrect')
        }
    }

    return (
        <div className="body">
            <div>
                <div className="background">
                    <div className="shape" />
                    <div className="shape" />
                </div>
                <form className="loginForm">
                    <h3>Login Here</h3>
                    <label htmlFor="username" >Username</label>
                    <input className="loginInput" type="text" onChange={(e) => setUsername(e.target.value)} required placeholder="Username" id="username" />
                    <label htmlFor="password">Password</label>
                    <input className="loginInput" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" required />
                    <button className="loginButton" onClick={(e) => Login(e)}>Log In</button>
                </form>
            </div>
            <Loader start={loader} />
            <ToastContainer newestOnTop={true} autoClose={1000} />
        </div>

    )
};

export default SignIn;
        // <div className="center">
        //     <h1>Login</h1>
        //     <form method="post">
        //         <div className="txt_field">
        //             <input type="text" onChange={(e) => setUsername(e.target.value)} required />
        //             <span />
        //             <label>Username</label>
        //         </div>
        //         <div className="txt_field">
        //             <input type="password" onChange={(e) => setPassword(e.target.value)} required />
        //             <span />
        //             <label>Password</label>
        //         </div>
        //         <div className="pass">Forgot Password?</div>
        //         <input type="button" onClick={() => Login()} defaultValue="Login" />
        //         <div className="signup_link">
        //             Not a member? <Button onClick={() => Login()}>Signup</Button>
        //         </div>
        //     </form>
        // </div>