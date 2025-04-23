import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {


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
            const postStory = {
                userName: user?.displayName,
                userEmail: user.email,
                userImage: user?.photoURL,
                spotPicture: res.data.data.display_url,
                reviewDescription: data.review

            }
            console.log(postStory);

            const postRes = await axiosSecure.post('/stories', postStory);
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                reset();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom",
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
                    title: "Story Posted successfully"
                });
            }
        }


    }
    return (
        <div className="px-10">

            <div className="flex items-center">

                <div className="avatar online flex-shrink-0">
                    <div className="w-20 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                </div>

                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        {user?.displayName}
                    </p>
                    <p className="text-lg text-gray-500 truncate dark:text-gray-400">
                        {user?.email}
                    </p>
                </div>
            </div>

            <h1 className=" text-xl mt-10">Add Story</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-4  mt-5 rounded-lg dark:bg-gray-700 dark:border-gray-600">

                <div className="px-4 py-2 bg-white  dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows="4"  {...register('review', { required: true })} className="w-full  px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..."></textarea>
                </div>

                <div className=" flex flex-col lg:flex-row  items-center gap-2 justify-between">
                    {/* Image */}
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text text-sm">Upload picture</span>

                        </label>

                        <input {...register('image', { required: true })} type="file" className="file-input max-w-sm  " />


                    </div>


                    <button type="submit" className="btn px-3 py-2 btn-outline">
                        Post Story
                    </button>



                </div>


            </form>
            <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <Link className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</Link>.</p>

        </div>
    );
};

export default MyProfile;