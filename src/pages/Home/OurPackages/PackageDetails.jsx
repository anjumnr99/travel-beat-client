
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Gallary from "./Gallary";
import TourGuideList from "./TourGuideList";
import BookingForm from "./BookingForm";



const PackageDetails = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    // console.log(id);

    const { data: packageDetail } = useQuery({
        queryKey: ['package'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/packages/${id}`);
            // console.log('res data:',res.data);
            return res.data;
        }
    });

    console.log(packageDetail);

    const { images, trip_title, price, tour_description, tour_plan } = packageDetail || {};
   

    const tYpeOf = typeof (tour_plan);
    console.log(tYpeOf === 'object');

    return (
        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-0 md:px-5">
            <div className="mb-10">
                {
                    images?.length > 1 ? <Gallary images={images}></Gallary> : <div className="w-[80%] mx-auto " >
                        <img className=" w-full h-full " src={images} />
                    </div>
                }
            </div>
            <div className="text-2xl px-5">
                {tour_description}
            </div>
            <div className="my-10 px-5">
                <h1 className="text-2xl mb-5 text-blue-500 font-bold">Tour Plan:</h1>
                <div>
                    {
                        tYpeOf === 'object' ? <>
                            {
                                tour_plan?.map((tour, index) => <div key={index}>
                                    <h2>
                                        <button type="button" className="flex items-center justify-between w-full p-5  rtl:text-right text-xl font-semibold text-gray-900 bg-blue-100 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-800 gap-3" >
                                            Day : {tour?.day}
                                        </button>
                                    </h2>
                                    <div  >
                                        <div className="p-5 border mb-3 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                            <p className="mb-2 text-lg text-gray-700 dark:text-gray-400">{tour?.place_description}</p>

                                        </div>
                                    </div>
                                </div>)
                            }
                        </> : <>
                            <div >
                                <div className="p-5 border mb-3 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                    <p className="mb-2 text-lg text-gray-700 dark:text-gray-400">{tour_plan}</p>

                                </div>
                            </div>
                        </>




                    }
                </div>


            </div>

            <div className="bg-blue-100 py-4">
                <h1 className='text-3xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>Our Tour Guides </h1>
                <TourGuideList></TourGuideList>
            </div>

            <div className="my-10">
                <h1 className='text-2xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>For Booking Fill-up the below Form </h1>

                <BookingForm price={price} trip_title={trip_title}></BookingForm>
            </div>



        </div>
    );
};

export default PackageDetails;