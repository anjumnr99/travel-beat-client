import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";



const MainLayout = () => {
    return (
        <div className="max-w-[1440px] mx-auto bg-blue-100 ">
            <Navbar></Navbar>
            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

            <Toaster />
        </div>
    );
};

export default MainLayout;