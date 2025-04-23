import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useContext, useState } from "react";
// import { IoIosPerson } from 'react-icons/io';
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import logo from '../assets/logo.png';
import { Dropdown } from 'flowbite';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isShow, setIsShow] = useState(true);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result);
                toast.success('Logout Successfully!')

                navigate('/login')
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err)
            })
    };


    const handleDropDownMenu = () => {
        // set the dropdown menu element
        const targetElement = document.getElementById("dropdownAvatar");

        // set the element that trigger the dropdown menu on click
        const triggerElement = document.getElementById("dropdownUserAvatarButton");
        const dropdown = new Dropdown(targetElement, triggerElement);

        if (isShow) {
            // show the dropdown menu
            dropdown.show();
            console.log(isShow);
        } else {
            // hide the dropdown menu
            dropdown.hide();
            console.log(isShow);
        }


    }

    return (
        
            <div className="navbar bg-slate-100 bg-opacity-60   fixed z-10 px-6 py-3 ">
                <div className="navbar-start">

                    <button className=" w-56">
                        <img src={logo} className="h-fit w-full" />
                    </button>


                </div>



                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal text-center px-1">
                        <li className="text-md lg:text-xl font-semibold text-gray-800">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : " "
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="text-md lg:text-xl  font-semibold text-gray-800">
                            <NavLink
                                to="/community"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " text-blue-600 font-bold" : ""
                                }
                            >
                                Community
                            </NavLink>
                        </li>
                        <li className="text-md lg:text-xl  font-semibold text-gray-800">
                            <NavLink
                                to="/blogs"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                }
                            >
                                Blogs
                            </NavLink>
                        </li>
                        <li className="text-md lg:text-xl  font-semibold text-gray-800">
                            <NavLink
                                to="/about-us"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                }
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li className="text-md lg:text-xl  font-semibold text-gray-800">
                            <NavLink
                                to="/contact-us"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                }
                            >
                                Contact Us
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="navbar-end flex  ">

                    <div className="dropdown dropdown-bottom dropdown-end mr-4 ">
                        <label tabIndex={0} className=" lg:hidden m-1 text-4xl md:text-5xl ">
                            <GiHamburgerMenu></GiHamburgerMenu>

                        </label>
                        <ul tabIndex={0} className="menu dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-fit md:w-52">
                            <li className="text-lg border-none font-semibold text-gray-800">
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? " text-blue-600 font-bold" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="text-lg  font-semibold text-gray-800">
                                <NavLink
                                    to="/community"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                    }
                                >
                                    Community
                                </NavLink>
                            </li>
                            <li className="text-lg  font-semibold text-gray-800">
                                <NavLink
                                    to="/blogs"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                    }
                                >
                                    Blogs
                                </NavLink>
                            </li>
                            <li className="text-lg  font-semibold text-gray-800">
                                <NavLink
                                    to="/about-us"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li className="text-lg  font-semibold text-gray-800">
                                <NavLink
                                    to="/contact-us"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "   text-blue-600 font-bold" : ""
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>



                    {
                        user?.email ? <div>

                            <button onClick={() => handleDropDownMenu(setIsShow(!isShow))} id="dropdownUserAvatarButton" className="flex text-sm bg-gray-600 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                                <span className="sr-only">Open user menu</span>
                                <img className=" w-12 h-12 md:w-16 md:h-16 rounded-full" src={user?.photoURL} alt="user photo" />
                            </button>

                            {/* <!-- Dropdown menu --> */}
                            <div id="dropdownAvatar" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-600 dark:divide-gray-600">
                                <div className="px-2 py-3 text-md text-gray-900 dark:text-white">
                                    <div>{user?.displayName}</div>
                                    <div className=" font-medium truncate">{user?.email}</div>
                                </div>
                                <ul className="py-2 text-md text-gray-600 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                    <li>
                                        <Link to='/dashboard/my-profile' className="block text-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link className="block text-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Offer Announcements</Link>
                                    </li>

                                </ul>

                                <div className="">
                                    <button onClick={handleLogOut} className="block w-full px-4 py-2 text-md font-semibold text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Logout
                                    </button>
                                </div>
                            </div>

                        </div> :
                            <div className="flex justify-center items-center gap-3">


                                <button className="text-2xl  font-semibold text-blue-500">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "  text-blue-600 font-bold" : ""
                                        }
                                    >
                                        Login
                                    </NavLink>

                                </button>
                            </div>
                    }

                </div>
            </div>
        
    );
};

export default Navbar;