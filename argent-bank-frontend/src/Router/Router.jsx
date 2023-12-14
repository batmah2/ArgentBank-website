import {Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";
import { useSelector } from "react-redux";

export default function Router() {
    const { isLogged } = useSelector((state) => state.loginReducer);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={isLogged ? <User /> : <Navigate to="/"/>} />
        </Routes>
    )
}