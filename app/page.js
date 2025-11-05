// app/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoyKrathongHeadlessModal from './components/LoyKrathongHeadlessModal';
import FloatingKrathong from './components/FloatingKrathong';
import bgImage from '../public/images/bg-loy-krathongs.webp';

export default function Home() {
  // 2. 👈 เปลี่ยนชื่อ State เป็น isOpen เพื่อความชัดเจน (Headless UI นิยมใช้ชื่อนี้)
  const [isOpen, setIsOpen] = useState(false); 
  const [floatingKrathongs, setFloatingKrathongs] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  // โหลดกระทงจาก localStorage และเปิด modal หลัง hydration
  useEffect(() => {
    const savedKrathongs = JSON.parse(localStorage.getItem('krathongs') || '[]');
    setFloatingKrathongs(savedKrathongs);
    setIsMounted(true);
    setIsOpen(true); // เปิด modal หลังจาก component mount แล้ว

    // สร้าง audio element และตั้งค่า
    const audio = new Audio('/sounds/loy-krathong-song.mp3');
    audio.loop = true;
    audio.volume = 0.3; // ปรับเสียงให้เบาลง
    audio.preload = 'auto';
    setAudioElement(audio);

    // ฟังก์ชันเล่นเสียงเมื่อผู้ใช้มีการโต้ตอบ
    const handleUserInteraction = async () => {
      try {
        if (audio.paused) {
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('ไม่สามารถเล่นเสียงได้:', error);
      }
    };

    // เพิ่ม event listeners สำหรับการโต้ตอบของผู้ใช้
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // พยายามเล่นเสียงอัตโนมัติ
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay ถูกบล็อก - เสียงจะเล่นเมื่อผู้ใช้คลิก');
        setIsPlaying(false);
      }
    };

    // ลองเล่นหลังจาก delay สั้นๆ
    const timeoutId = setTimeout(tryAutoplay, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // ฟังก์ชันสำหรับ toggle เพลง
  const toggleMusic = () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('ไม่สามารถเล่นเสียงได้:', error);
      });
    }
  };

  // ฟังก์ชันลอยกระทง (เหมือนเดิม)
  const handleLaunchKrathong = (krathongData) => {
    if (!isMounted) return; // ป้องกันการทำงานก่อน hydration
    
    const newKrathong = {
      id: Date.now(),
      ...krathongData,
      style: {
        left: `${Math.random() * 90}%`,
        top: `${60 + Math.random() * 30}%`,
        animationDuration: `${10 + Math.random() * 5}s`,
      },
    };

    const updatedKrathongs = [...floatingKrathongs, newKrathong];
    setFloatingKrathongs(updatedKrathongs);
    localStorage.setItem('krathongs', JSON.stringify(updatedKrathongs));
    
    // (เราไม่ต้องสั่งปิด Modal ที่นี่แล้ว เพราะ Modal จะจัดการตัวเอง)
  };

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <h1 className="text-4xl lg:text-6xl text-[#fff000] text-center mt-12 lg:mt-32">ลอยกระทงออนไลน์</h1>
      <p className="text-center font text-[#fff000] mt-4 text-2xl lg:w-[35%] mx-auto">ประจำปี {new Date().getFullYear()}</p>
      <p className="text-center font-extralight text-white mt-4 text-2xl lg:w-[35%] mx-auto">มาร่วมกันลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป</p>
      {/* Background (เหมือนเดิม) */}
      <Image
        src={bgImage}
        alt="Loi Krathong Background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
      />

      {/* กระทงที่ลอยอยู่ (เหมือนเดิม) */}
      {floatingKrathongs.map((krathong) => (
        <FloatingKrathong key={krathong.id} {...krathong} />
      ))}

      {/* 3. 👈 เรียกใช้ Modal ตัวใหม่ และส่ง props ที่ถูกต้อง */}
      {isMounted && (
        <LoyKrathongHeadlessModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} // ส่งฟังก์ชันสำหรับปิด
          onLaunch={handleLaunchKrathong}    // ส่งฟังก์ชันสำหรับลอย
        />
      )}

      {/* ปุ่มควบคุมเพลง */}
      {isMounted && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 left-4 bg-blue-800/80 backdrop-blur-sm text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700/90 transition-all duration-300"
          title={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      )}

      {/* (เราสามารถเพิ่มปุ่ม "ลอยกระทงเพิ่ม" เพื่อ set isOpen(true) อีกครั้งได้) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-pink-600 text-white px-5 py-3 rounded-full shadow-lg z-40"
        >
          ลอยกระทงอีกครั้ง
        </button>
      )}
    </main>
  );
}