import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useGuideList from "../../../Hooks/useGuideList";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BookingForm = ({ price,trip_title }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [guideList] = useGuideList();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {

        if (user) {
            console.log(data);
            const imageFile = { image: data.image[0] };
            //img upload to imgbb and get an url
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });

            console.log(res.data);
            if (res.data.success) {
                const bookingDetails = {
                    name: data.name,
                    email: data.email,
                    guide: data.guide,
                    date: startDate,
                    image: res.data.data.display_url,
                    price: price,
                    packageName : trip_title,
                    status:'In Review'

                }

                const bookingRes = await axiosSecure.post('/bookings', bookingDetails);
                console.log(bookingRes.data);
                if (bookingRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        title: "Your booking is Confirm .",
                        html: `See <a href="/dashboard/my-bookings">My Bookings</a>`,
                        icon: "success",
                     
                    });
                }
            }
        } else {
            navigate('/login',{state: location.pathname});
        }

    }
    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded-lg bg-blue-100">

                {/* Name */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Your Name</span>

                    </label>
                    <input type="text" defaultValue={user?.displayName} placeholder="enter your name"
                        {...register('name', { required: true })}
                        className="input input-bordered w-full " />

                </div>
                {/* Email */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Your Email</span>

                    </label>
                    <input type="email" defaultValue={user?.email} placeholder="enter your email"
                        {...register('email', { required: true })}
                        className="input input-bordered w-full " />

                </div>
                <div className="flex items-center justify-evenly">
                    {/* Image */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-lg">Your image</span>

                        </label>

                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />


                    </div>
                    {/* Date */}
                    <div>
                        <label className="label">
                            <span className="label-text">Tour date</span>

                        </label>
                        <div>
                            <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} />
                        </div>
                    </div>

                </div>


                <div className="flex gap-6">
                    {/* Price */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price</span>

                        </label>
                        <input type="number" readOnly defaultValue={price}
                            // {...register('price', { required: true })}
                            className="input input-bordered w-full " />

                    </div>
                    {/* Tour Guide */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Tour Guide</span>

                        </label>
                        <select defaultValue="default" {...register("guide", { required: true })} className="select select-bordered w-full ">
                            <option disabled value="default">Select a guide</option>
                            {
                                guideList?.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                            }

                        </select>

                    </div>

                </div>
                <div className="flex items-center justify-center">
                    <button className="btn btn-outline w-full text-lg ">
                        Book Now
                    </button>
                </div>

            </form>
        </div>
    );
};

export default BookingForm;