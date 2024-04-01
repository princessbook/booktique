"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
const Profile = () => {
    const [displayName, setDisplayName]=useState("");
    const [photoUrl,setPhotoUrl]=useState("");
    //profile테이블 받아오기
    // useEffect(() => {
    //     // Supabase에서 사용자 정보 가져오기
    //     const fetchProfile = async () => {
    //         const {
    //             data: { user },
    //           } = await supabase.auth.getUser();
    //       if (user) {
    //         const { data, error } = await supabase.from('profiles').select('displayName, photoUrl').eq('user_id', user.id).single();
    //         if (error) {
    //           console.error('Error fetching profile:', error.message);
    //           return;
    //         }
    //         if (data) {
    //           setDisplayName(data.display_name || "");
    //           setPhotoUrl(data.photo_URL || "");
    //         }
    //       }
    //     };
    
    //     fetchProfile();
    //   }, []);
  return (
    <div className='p-4 bg-bookwhite w-[350px] h-24'>
        <div className='flex items-center'>
            <div className="w-12 h-12 bg-gray-300 rounded-full">
                <Image src={photoUrl || "/default_img.png"} alt="프로필이미지" width={64} height={64} className="rounded-full" priority/>
            </div>
                <p className="text-lg font-semibold">{displayName}</p> 
        </div>

    </div>
  )
}

export default Profile