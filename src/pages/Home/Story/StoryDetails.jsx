import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FacebookIcon, FacebookShareButton, FacebookShareCount } from "react-share";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";


const StoryDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    // const shareUrl = "https://www.facebook.com";
    // console.log(id);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const { data: storyDetail } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/stories/${id}`);
            // console.log('res data:',res.data);
            return res.data;
        }
    });

    const handleShare = () => {
        if (!user) {
            navigate('/login', { state: location.pathname })
        }
    }


    const { _id, userName, userEmail, userImage, spotPicture, reviewDescription } = storyDetail || {};
    return (
        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-5">
            <div className="flex flex-col max-w-2xl mx-auto p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-900 text-gray-100">
                <div className="flex space-x-4">
                    <img alt="" src={userImage} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                    <div className="flex flex-col space-y-1">
                        <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{userName}</a>
                        <span className="text-xs text-gray-400">{userEmail}</span>
                    </div>
                </div>
                <div>
                    <img src={spotPicture} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500" />

                    <p className="text-lg text-gray-400">{reviewDescription}</p>
                </div>
                {
                    user ? <div className="flex gap-2 flex-wrap items-center justify-start ">

                        <div className="Demo__some-network">
                            <FacebookShareButton
                                url={`https://travel-tour-auth.web.app/all-stories/${_id}`}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={50} round />
                            </FacebookShareButton>

                            <div>
                                <FacebookShareCount
                                    url={`https://travel-tour-auth.web.app/all-stories/${_id}`}
                                    className="Demo__some-network__share-count"
                                >
                                    {(count) => count}
                                </FacebookShareCount>
                            </div>

                        </div>
                        <h1 className="text-xl">Share to your facebook</h1>
                    </div> : <div className="flex gap-2 flex-wrap items-center justify-start ">

                        <div onClick={handleShare} className="Demo__some-network">
                            <FacebookIcon size={50} round />
                            {/* <FacebookShareButton
                              
                                url={shareUrl}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={50} round />
                            </FacebookShareButton> */}

                            <div>
                                <FacebookShareCount
                                    url={shareUrl}
                                    className="Demo__some-network__share-count"
                                >
                                    {(count) => count}
                                </FacebookShareCount>
                            </div>

                        </div>
                        <h1 className="text-xl">Share to your facebook</h1>
                    </div>
                }

            </div>
        </div>
    );
};

export default StoryDetails;