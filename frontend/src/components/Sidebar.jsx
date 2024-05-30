import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoBook, IoHome, IoLogOut, IoAdd, IoMail } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && user.role !== "admin" && window.location.pathname === "/users") {
            navigate("/dashboard"); // Redirect to dashboard
        }
    }, [user, navigate]);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    return (
        <div>
            <aside className="menu has-shadow m-5">
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li><NavLink to="/dashboard"><IoHome className="pl-2 pr-2 is-size-4" />Dashboard</NavLink></li>
                    <li><NavLink to="/appointments"><IoBook className="pl-2 pr-2 is-size-4" />Appointments</NavLink></li>
                    {user && user.role === "admin" && <li><NavLink to="/meetings"><IoAdd className="pl-2 pr-2 is-size-4" />Send Meeting</NavLink></li>}
                    {user && user.role !== "admin" && <li><NavLink to="/your_meetings"><IoMail className="pl-2 pr-2 is-size-4" />Meetings</NavLink></li>}
                </ul>
                {user && user.role === "admin" && (
                    <div>
                        <p className="menu-label">Admin</p>
                        <ul className="menu-list">
                            <li>
                                <NavLink to={"/users"}>
                                    <IoPerson /> Users
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
                    <div>
                        <p className="menu-label">Profile</p>
                        <ul className="menu-list">
                            <li>
                                <NavLink to={"/users/current"}>
                                    <IoPerson /> Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                <p className="menu-label">Settings</p>
                <ul className="menu-list">
                    <li>
                        <button onClick={logout} className="button is-white">
                            <IoLogOut /> Logout
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;
