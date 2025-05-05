'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { motion } from 'framer-motion';

const slideData = [
  {
    id: 1,
    text: '111',
  },
  {
    id: 2,
    text: '222',
  },
  {
    id: 3,
    text: '222',
  },
  {
    id: 4,
    text: '222',
  },
  {
    id: 5,
    text: '222',
  },

  {
    id: 6,
    text: '222',
  },
];

const MainBannerSlider = () => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <div className="swiper-container relative">
      <button className="custom-next absolute top-1/2 left-[200px] transform -translate-y-1/2 z-10">
        <Image src={'/images/banner-left-btn.svg'} width={60} height={60} alt="left-btn" />
      </button>

      <button className="custom-next absolute top-1/2 right-[200px] transform -translate-y-1/2 z-10">
        <Image src={'/images/banner-right-btn.svg'} width={60} height={60} alt="right-btn" />
      </button>

      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={24} // 슬라이스 사이 간격
        slidesPerView={3} // 보여질 슬라이스 수
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          980: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
        style={{ overflow: 'visible' }}
      >
        {slideData.map(slide => (
          <SwiperSlide key={slide.id}>
            <motion.div
              className="w-[486px] h-[342px] relative rounded-[20px] overflow-hidden"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image src="/images/book-cover-1.png" fill alt="book-cover" />
              <div className="absolute left-[24px] bottom-[24px]">
                <p className="text-[#fff] font-spoqa text-[16px] font-[700]">판타지/SF</p>
                <p className="text-[#fff] font-spoqa text-[24px] font-[700]">승리호</p>
              </div>
              <p className="absolute right-[24px] bottom-[24px] text-[#fff] font-spoqa text-[18px] font-[700]">
                용진726 외4명
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 버튼 스타일 덮어쓰기
      <style jsx global>{`
        .swiper-button-prev {
          left: 200px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        .swiper-button-next {
          right: 200px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
      `}</style> */}
    </div>
  );
};

export default MainBannerSlider;
