import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/loginSlice"

export default function Nav() {
  const dispatch = useDispatch();
    const { isLogged } = useSelector((state) => state.loginReducer);
    const user = useSelector((state) => state.userReducer.user);
    const userName = user ? user.userName : '';

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
         {isLogged && (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user"></i> {userName}
            </Link>
            <Link className="main-nav-item" to="./login" onClick={() => dispatch(logout())}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        )}
        {!isLogged && (
          <Link className="main-nav-item" to="./login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
    )
}