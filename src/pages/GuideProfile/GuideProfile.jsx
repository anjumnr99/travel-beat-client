import {  useLocation, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import PrivateRouter from "../../Routers/PrivateRouter";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
// import Swal from "sweetalert2";
import MakeReview from "./Review/MakeReview";


const GuideProfile = () => {
    // const { user } = useContext(AuthContext);
    const { id } = useParams();
    // const [show, setShow] = useState(true);
    // const [rating, setRating] = useState(0);
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    console.log(location);
    // const navigate = useNavigate();

    const { data: guideDetail } = useQuery({
        queryKey: ['guide'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/guides/${id}`);
            // console.log('res data:',res.data);
            return res.data;
        }
    });

    const { _id, name, profilePicture, email } = guideDetail || {};
    // const { _id, name, profilePicture, contactDetails, education, skills, workExperience } = guideDetail || {};

    console.log(guideDetail);
   

    // const handleRatingChange = (event) => {
    //   setRating(Number(event.target.value));
    // };

    // const handleMakeReview = () => {
    //     if (user?.email) {
    //         // 
    //     } else {
    //         // location.state = location.pathname;
    //         //  <Navigate state={location.pathname}></Navigate>
    //         navigate('/login', { state: location.pathname })

    //     }
    // }
    return (
        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-5">

            <div className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-[50%] md:rounded-none md:rounded-s-lg" src={profilePicture} alt="" />
                <div className="flex flex-col justify-between  p-4 leading-normal h-96 md:h-full md:w-[50%] ">
                    <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">
                    I was a student of Chittagong University. I was from the department of Geography and Cultural Studies.My graduation year 2018</p>
                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">Work Experience: 2 years</p>
                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">Skills: Cultural Heritage,Outdoor Adventure</p>

                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">Address: Chittagong, Bangladesh</p>
                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">Email: {email}</p>
                    <p className=" font-normal lg:text-xl lg:mb-3  text-gray-700 dark:text-gray-400">Contact number: 01723456321</p>
                </div>
            </div>
            <h1 className='text-3xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>Write Something about your experience</h1>

            {/* <div className="flex flex-col">
                <div className="rating rating-lg">
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        value="1"
                        onChange={handleRatingChange}
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        value="2"
                        onChange={handleRatingChange}
                        checked
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        value="3"
                        onChange={handleRatingChange}
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        value="4"
                        onChange={handleRatingChange}
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        value="5"
                        onChange={handleRatingChange}
                    />

                    <p>Selected Rating: {rating}</p>
                </div>
                <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
            </div> */}
            <MakeReview></MakeReview>

            {/* <button onClick={handleMakeReview} className="btn btn-outline mt-5">Make a Review</button> */}


        </div>
    );
};

export default GuideProfile;