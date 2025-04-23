import { useForm } from "react-hook-form";
import { useContext, useState } from "react";


import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

import useAxiosSecure from '../../Hooks/useAxiosSecure'

const AddPackage = () => {

    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();


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
            if (res.data?.success) {
                
                const newPackage = {
                    tour_type:data.tourType,
                    images:[res.data.data.display_url],
                    trip_title:data.tripeTitle,
                    price:data.price,
                    tour_description:data.description,
                    tour_plan:data.plan

                }

                const addRes = await axiosSecure.post('/packages', newPackage);
                console.log( addRes.data);
                if ( addRes.data?.insertedId) {
                    reset();
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
                        title: "Package Added successfully"
                      });
                }
            }
        } else {
            navigate('/login', { state: location.pathname });
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded-lg bg-blue-100">

                {/* Name */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Tripe Tile</span>

                    </label>
                    <input type="text"  placeholder="Enter Tripe Tile"
                        {...register('tripeTitle', { required: true })}
                        className="input input-bordered w-full " />

                </div>
                {/* Type */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Your Tour Type</span>

                    </label>
                    <input type="text"  placeholder="enter tour type"
                        {...register('tourType', { required: true })}
                        className="input input-bordered w-full " />

                </div>
                <div className="flex items-center gap-2 justify-evenly">
                    {/* Image */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-lg">upload image</span>

                        </label>

                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />


                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Tour Description</span>

                        </label>
                        <input type="text"  placeholder="Enter Tour Description"
                            {...register('description', { required: true })}
                            className="input input-bordered w-full " />

                    </div>


                </div>
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Tour Plan</span>

                    </label>
                    <textarea {...register('plan', { required: true })} className="textarea textarea-bordered" placeholder="Write your tour plan"></textarea>
                </div>



                <div className="flex gap-6">
                    {/* Price */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Price</span>

                        </label>
                        <input type="number" 
                            {...register('price', { required: true })}
                            className="input input-bordered w-full " />

                    </div>


                </div>
                <div className="flex items-center justify-center">
                    <button className="btn btn-outline w-full text-lg ">
                        Add Package
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPackage;