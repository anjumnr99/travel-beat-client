import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const MakeReview = () => {
    const [rating,setRating] = useState(0);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const handleRatingChange = (event) => {
        setRating(Number(event.target.value));
        
      };

    const handleSubmit =(e)=>{
        e.preventDefault();
        if (user?.email) {
            const rating = e.target.rating.value;
            const text = e.target.reviewText.value;
            const userName = user.displayName;
            const userEmail = user.email;
            const userImage = user.photoURL;

            const review = {
                rating,
                text,
                userName,
                userEmail,
                userImage
            }

            console.log(review);

            axiosSecure.post('/reviews',review)
            .then(res=>{
                setRating(0)
                console.log(res.data);
                if(res.data.insertedId){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
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
                        title: "Your Review Submitted Successfully!"
                      });
                }
            })
          
        } else {
            navigate('/login', { state: location.pathname })

        }

        e.target.reset();
               
    }


    return (
        <form onSubmit={handleSubmit} className=" space-y-3 mt-10 max-w-3xl mx-auto">
            <div className="rating rating-lg form-control flex flex-row items-center justify-start">
                <input type="radio" onChange={handleRatingChange} name="rating" value='1' className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" onChange={handleRatingChange} value='2' className="mask mask-star-2 bg-orange-400" defaultChecked />
                <input type="radio" name="rating" onChange={handleRatingChange} value='3' className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" onChange={handleRatingChange} value='4' className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating" onChange={handleRatingChange} value='5' className="mask mask-star-2 bg-orange-400"/>
                <p className="text-3xl font-semibold ml-4 ">5/<span className="text-blue-800">{rating}</span></p>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Write your review</span>

                </label>
                <textarea name="reviewText" className="textarea textarea-bordered h-24" placeholder="Write here"></textarea>

            </div>

            <button className="btn btn-outline mt-5 w-full">
                Submit
            </button>
        </form>
    );
};

export default MakeReview;