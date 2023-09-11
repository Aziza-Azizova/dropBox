import React from "react";
import { useSelector ,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {userSignOut} from "../../../redux/createActions/createActions"

const NavbarDashboard = () => {
    const {isAuthenticated, user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm" style={{backgroundColor: "#cec2fd"}}>
                <Link className="navbar-brand mb-0 h1 ms-5" to="/">Drop Box</Link>
                <ul className="navbar-nav ms-auto me-5">
                    {
                        isAuthenticated ? (
                            <>
                                <li className="nav-item mx-2">
                                    <Link className="btn btn-outline-dark fw-bold" to="/" onClick={() => dispatch(userSignOut())}>Logout</Link>
                                </li>
                            </>
                        )
                        :
                        ( <></>)
                    }
                </ul>
            </nav>
        </div>
    )
}

export default NavbarDashboard