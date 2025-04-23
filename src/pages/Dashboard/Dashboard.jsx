import { FaUser, FaUsers } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiFileList3Fill } from "react-icons/ri";
import useAdmin from "../../Hooks/useAdmin";
import useTourGuide from "../../Hooks/useTourGuide";
const Dashboard = () => {
    const isAdmin = useAdmin();
    console.log(isAdmin);
    const  isGuide = useTourGuide();
    console.log(isGuide);
    return (
        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-2 md:px-5">
            <div className=" grid grid-cols-1 md:grid-cols-12 gap-2">
                {/* dashboard side bar */}
                <div className="w-full md:col-span-4 lg:col-span-2 h-fit md:min-h-fit bg-blue-400">
                    <div className="menu p-1 md:p-4 ">
                        {
                            // isAdmin ?
                            //     <ul className="flex md:flex-col">
                            //         <li>
                            //             <NavLink to="/dashboard/my-profile" className={`p-2 rounded-sm`}>
                            //                 <FaUser />
                            //                 My profile</NavLink>
                            //         </li>
                            //         <li>
                            //             <NavLink to="/dashboard/my-bookings" className={`p-2 rounded-sm`}>
                            //                 <FaUsers />
                            //                 Add Package</NavLink>
                            //         </li>
                            //         <li>
                            //             <NavLink to="/dashboard/my-wishlist" className={`p-2 rounded-sm`}>
                            //                 <RiFileList3Fill />
                            //                 Manage Users
                            //             </NavLink>
                            //         </li>

                            //     </ul>: 
                            <ul className="flex md:flex-col">
                                <li>
                                    <NavLink to="/dashboard/my-profile" className={`p-2 rounded-sm`}>
                                        <FaUser />
                                        My profile</NavLink>
                                </li>
                                {
                                    isAdmin ? <>
                                        <li>
                                            <NavLink to="/dashboard/add-package" className={`p-2 rounded-sm`}>
                                            <RiFileList3Fill />
                                                
                                                Add Package</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manage-users" className={`p-2 rounded-sm`}>
                                            <FaUsers />
                                                Manage Users
                                            </NavLink>
                                        </li>

                                    </> : <>
                                        {
                                            isGuide ? <>
                                                <li>
                                                    <NavLink to="/dashboard/my-assigned-tour" className={`p-2 rounded-sm`}>
                                                        <BsBookmarkCheckFill />
                                                        My Assigned Tour</NavLink>
                                                </li>

                                            </> : <>
                                                <li>
                                                    <NavLink to="/dashboard/my-bookings" className={`p-2 rounded-sm`}>
                                                        <BsBookmarkCheckFill />
                                                        My Bookings</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/dashboard/my-wishlist" className={`p-2 rounded-sm`}>
                                                        <RiFileList3Fill />
                                                        My Wishlist
                                                    </NavLink>
                                                </li>

                                            </>
                                        }
                                    </>
                                }


                            </ul>
                        }

                    </div>
                </div>
                {/* dashboard content */}
                <div className="w-full md:col-span-8 lg:col-span-10 ">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;