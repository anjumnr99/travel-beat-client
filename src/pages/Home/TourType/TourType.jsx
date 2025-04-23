import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import cityScape from '../../../assets/cityscape.mp4';
import adventure from '../../../assets/Advanture.mp4';
import wildlife from '../../../assets/wildlife.mp4';
import sailing from '../../../assets/sailing.mp4';
import historical from '../../../assets/Historical-Cruises.mp4';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './tourType.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import usePackages from '../../../Hooks/usePackages';
import Slide from './Slide';

const TourType = () => {
    const [packages] = usePackages();
    console.log(packages);
    const tourType = [
        {
            type : 'Cityscape',
            video : cityScape
        },
        {
            type : 'Adventure',
            video : adventure
        },
        {
            type : 'Wildlife',
            video : wildlife
        },
        {
            type : 'Sailing',
            video : sailing
        },
        {
            type : 'Historical Cruises',
            video : historical
        }
    ]
    return (
        <>
            <h1 className='text-3xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>All the types of tour we offer</h1>

            <Swiper
                effect={'coverflow'}

                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className=" swiper-container-1 "
            >
                {
                    tourType?.map((item, index) => <SwiperSlide key={index}><Slide item={item} ></Slide></SwiperSlide>)
                }

                {/* <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                </SwiperSlide> */}
            </Swiper>
        </>
    );
};

export default TourType;