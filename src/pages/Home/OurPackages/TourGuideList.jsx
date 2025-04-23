
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import useGuideList from '../../../Hooks/useGuideList';
import { Link } from 'react-router-dom';


const TourGuideList = () => {

    const [guideList] = useGuideList();

    console.log(guideList);


    return (
        <>
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
                className="mySwiper "
            >
                {
                    guideList?.map((item, index) => <SwiperSlide key={index}><Link to={`/guide-profile/${item._id}`} className='p-3 flex flex-col bg-blue-100 items-center'>
                        <div className="avatar">
                            <div className="w-56 rounded-full ring ring-base-500 ring-offset-base-300 ring-offset-4">
                                <img src={item.profilePicture} />
                            </div>

                        </div>
                        <div className='text-left my-5'>
                            <p className='text-2xl text-base-600 font-semibold'>{item.name}</p>
                            <p className=' text-slate-600 font-bold'>{item?.contactDetails?.address}</p>
                            <p className=' text-slate-400 '>Experience : {parseInt(Math.random()*10)}</p>
                        </div>
                    </Link></SwiperSlide>)
                }
               
            </Swiper>
        </>

    );
};

export default TourGuideList;