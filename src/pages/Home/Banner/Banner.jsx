import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Styles.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper "
            >
                <SwiperSlide>
                    {/* <img  src="https://i.ibb.co/GHJvG9Z/Ahsan-Manjil.jpg" alt="" />  */}
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/GHJvG9Z/Ahsan-Manjil.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content  mt-28  text-center text-neutral-content">
                            <div className=" max-w-xl md:max-w-2xl lg:max-w-3xl  ">
                                <p className="mb-4 uppercase text-blue-300 ">The Best Travel Agency.</p>
                                <h1 className="mb-5 text-4xl md:text-5xl lg:text-7xl font-bold">Explore Bangladesh With <span className='text-blue-300'>Travel Beat</span></h1>


                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    {/* <img src="https://i.ibb.co/tHVx1rX/iraj-ishtiak-Ct-Nw-NWAp4-BQ-unsplash.jpg" alt="" /> */}
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/tHVx1rX/iraj-ishtiak-Ct-Nw-NWAp4-BQ-unsplash.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content  mt-28  text-center text-neutral-content">
                            <div className=" max-w-xl md:max-w-2xl lg:max-w-3xl  ">
                                <p className="mb-4 uppercase text-blue-300 ">The Best Travel Agency.</p>
                                <h1 className="mb-5 text-4xl md:text-5xl lg:text-7xl font-bold">Explore Bangladesh With <span className='text-blue-300'>Travel Beat</span></h1>


                            </div>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    {/* <img src="https://i.ibb.co/M7LX2jL/iraj-ishtiak-4hx4-Tlg8ii-I-unsplash.jpg" alt="" /> */}
                    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/M7LX2jL/iraj-ishtiak-4hx4-Tlg8ii-I-unsplash.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content  mt-28  text-center text-neutral-content">
                            <div className=" max-w-xl md:max-w-2xl lg:max-w-3xl  ">
                                <p className="mb-4 uppercase text-blue-300 ">The Best Travel Agency.</p>
                                <h1 className="mb-5 text-4xl md:text-5xl lg:text-7xl font-bold">Explore Bangladesh With <span className='text-blue-300'>Travel Beat</span></h1>


                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                <SwiperSlide>
                    {/* <img src="https://i.ibb.co/QdHxjnd/s-m-ibrahim-1-NEJki-TTu-LU-unsplash.jpg" alt="" /> */}
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/QdHxjnd/s-m-ibrahim-1-NEJki-TTu-LU-unsplash.jpg)' }}>
                        <div className="hero-overlay bg-opacity-40"></div>
                        <div className="hero-content  mt-28  text-center text-neutral-content">
                            <div className=" max-w-xl md:max-w-2xl lg:max-w-3xl  ">
                                <p className="mb-4 uppercase text-blue-300 ">The Best Travel Agency.</p>
                                <h1 className="mb-5 text-4xl md:text-5xl lg:text-7xl font-bold">Explore Bangladesh With <span className='text-blue-300'>Travel Beat</span></h1>


                            </div>
                        </div>
                    </div>
                
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Banner;