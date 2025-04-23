import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer'
const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex min-h-screen justify-center bg-neutral items-center'>


                <div className="hero-content text-center ">
                    <div className="max-w-md space-y-4">
                        <h1 className="  text-2xl text-rose-500 lg:text-7xl font-bold">404 </h1>
                        <h1 className="  text-2xl text-base-200 lg:text-5xl font-bold">Page Not Found</h1>
                        <p className="text-xl text-rose-400">The page you are looking for does not exists</p>
                        <p className="text-base-200" >The requested page could not be found. Please check the URL or go to the home page click the button.</p>
                        <button>
                            <Link className=" btn border-none font-semibold text-white hover:bg-orange-700 bg-orange-500" to='/'>home page</Link>
                        </button>


                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;