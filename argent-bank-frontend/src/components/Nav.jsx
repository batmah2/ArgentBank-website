import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/loginSlice"

export default function Nav() {
  const dispatch = useDispatch();
    const { isLogged } = useSelector((state) => state.loginReducer);

    return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./">
        <img
          className="main-nav-logo-image"
          src="\img\argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <Link className="main-nav-item" to="./login" onClick={() => dispatch(logout())}>
        { 
          isLogged 
          ? (<><i className="fa fa-sign-out"></i>Sign Out</>) 
          : (<><i className="fa fa-user-circle"></i>Sign In</>) 
        }
        </Link>
      </div>
    </nav>
    )
}