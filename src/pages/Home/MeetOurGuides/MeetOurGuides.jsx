
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '.././OurPackages/styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import useGuideList from '../../../Hooks/useGuideList';
import { Link } from 'react-router-dom';


const MeetOurGuides = () => {

    const [guideList] = useGuideList();

    console.log(guideList);


    return (
        <div className=' pt-10  '>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="tour-guide-style"
            >
                {
                    guideList?.map((item, index) => <SwiperSlide key={index}><Link className='p-3 flex flex-col mt-5 bg-blue-100 items-center'>
                        <div className="avatar">
                            <div className="w-56 ring ring-base-500 ring-offset-base-300 ring-offset-4">
                                <img src={item.profilePicture} />
                            </div>

                        </div>
                        <div className='text-left my-5'>
                            <p className='text-lg text-base-600 font-semibold'>{item.name}</p>
                            <p className=' text-base text-slate-600 font-bold'>Address: Chittagong, Bangladesh</p>
                            <p className=' text-slate-400 '>Work Experience: 2 years</p>
                        </div>
                        <Link to={`/guide-profile/${item._id}`} className='w-full'>
                            <button className=' border bg-slate-500 w-full uppercase btn'>details</button></Link>
                    </Link></SwiperSlide>)
                }

            </Swiper>
        </div>

    );
};

export default MeetOurGuides;