import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLogged, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredentials = {
            email,
            password
        };
        dispatch(loginUser(userCredentials));
    };

    useEffect(() => {
        if (isLogged) {
            navigate('/user');
        }
    }, [isLogged, navigate]);

    return (
        <form onSubmit={handleLoginEvent}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
            {(error&&(
                <div role="alert">{error}</div>
            ))}
        </form> 
    )
}