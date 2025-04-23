import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const PackageCard = ({ item }) => {
    const [isClick, setIsClick] = useState(true);
    const { user } = useContext(AuthContext)
     const navigate = useNavigate();
     const location = useLocation();
    // console.log(Object.keys(item));
    const { _id, images, tour_type, trip_title, price, tour_description, tour_plan, tour_guides } = item || {};

    console.log(images[0].length);
    
    const axiosPublic = useAxiosPublic()
    
    const handleCLick = () => {
        
        if (user ) {
            if(isClick){
                console.log(isClick);
                const wishDetails = {
                    userEmail: user?.email,
                    packageName : trip_title,
                    packagePrice:price,
                    packageId : _id
                }
                console.log(wishDetails);
    
                axiosPublic.post('/wishLists',wishDetails)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.insertedId){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Added to My Wishlist"
                          });
                    }
                })

            }


        }else{
            navigate('/login', {state : location.pathname})
        } 

    }
    return (
        
        <Link to={`/package-details/${_id}`} className="max-w-sm  relative bg-white border h-96 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 " 
        style={{ backgroundImage: `url(${images[0] ?images[0]:images})`}}>

            {/* <img className="rounded-t-lg block h-full " src="https://i.ibb.co/TPyP91k/Inani-Beach.jpg" /> */}
            <button onClick={() => handleCLick(setIsClick(!isClick))} className="absolute top-4 right-4">
                <GoHeartFill className={`text-4xl ${isClick ? 'text-white' : 'text-red-600'} `} />
            </button>
            <div className="p-2 bg-black bg-opacity-50 w-full rounded-b-lg absolute bottom-0 ">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-200 dark:text-white">{trip_title}</h5>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="mb-1 font-semibold text-slate-100 dark:text-gray-400">{tour_type}</p>
                        <p className="mb-3  font-semibold text-xl text-gray-100 dark:text-gray-400">$ {price}</p>
                    </div>
                    <Link to={`/package-details/${_id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                        View Package
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>

            </div>


        </Link>

    );
};

export default PackageCard;