'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import Splash from '../common/Splash';
import Image from 'next/image';

const OnboardingPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('hasVisited', 'true');
      }, 1000);
    } else {
      setTimeout(() => {
        // 다음 방문부터는 로그인 페이지로 이동하도록 설정
        router.push('/login');
      }, 1000);
    }
  }, []);
  const skipButton = () => {
    router.push('/register');
  };
  if (showSplash) {
    return <Splash />;
  }
  const slidesData = [
    {
      image: '/onboarding1.svg',
      text: '책 한권을 완벽하게 읽는 방법',
      buttonLabel: '건너뛰기'
    },
    {
      image: '/onboarding2.svg',
      text: '약속한 날짜와 시간에 모여 함께 책을 읽어요',
      buttonLabel: '건너뛰기'
    },
    {
      image: '/onboarding3.svg',
      text: '책을 읽고 퀴즈를 내거나 맞춰요',
      buttonLabel: '건너뛰기'
    },
    {
      image: '/onboarding4.svg',
      text: '취향에 맞는 책을 찾고 북클럽에 가입해보세요'
    }
  ];
  var settings = {
    dots: true,
    dotsClass: 'custom-dots',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false
  };

  return (
    <Slider
      className='custom-slider max-w-[375px] mx-auto h-full'
      {...settings}>
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className='text-center relative md:max-w-[375px]  px-4'>
          {slide.buttonLabel && (
            <button
              onClick={skipButton}
              className='absolute top-4 right-4 text-[#939393]'
              type='button'>
              {slide.buttonLabel}
            </button>
          )}
          <Image
            className='mt-[88px] mx-auto'
            src={slide.image}
            width={375}
            height={378}
            alt={`온보딩${index + 1}`}
          />
          <span className='block mt-36'>{slide.text}</span>
          {index === slidesData.length - 1 && (
            <button
              onClick={skipButton}
              className='w-full h-14 rounded-xl mt-8 text-[#E9FF8F] font-bold bg-mainblue'
              type='button'>
              회원가입하러 가기
            </button>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default OnboardingPage;
