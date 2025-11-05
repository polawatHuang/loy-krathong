// components/LoyKrathongHeadlessModal.js
'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // 👈 Import สิ่งนี้
import Image from 'next/image';

const KRATHONG_TYPES = [
  { id: 'banana', src: '/images/krathong-bananas.png', name: 'กระทงใบตอง' },
  { id: 'lotus', src: '/images/krathong-lotuses.png', name: 'กระทงดอกบัว' },
  { id: 'candle', src: '/images/krathong-candles.png', name: 'กระทงเทียน' },
];

export default function LoyKrathongHeadlessModal({ isOpen, onClose, onLaunch }) {
  const [step, setStep] = useState(1);
  const [selectedKrathong, setSelectedKrathong] = useState(KRATHONG_TYPES[0].id);
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ฟังก์ชันที่ Headless UI จะเรียกเมื่อ user กด 'Esc' หรือคลิก backdrop
  const handleClose = () => {
    setStep(1); // รีเซ็ตกลับไป step 1
    onClose();  // เรียกฟังก์ชันปิดจาก page.js
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !wish) return alert('กรุณากรอกข้อมูลให้ครบ');
    
    setIsSubmitting(true);
    
    try {
      console.log('Sending data to API:', {
        type: selectedKrathong,
        name,
        wish,
      });

      // Call the local API
      const response = await fetch('/api/loykrathong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedKrathong,
          name,
          wish,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.success) {
        // Create krathong object with style for local display
        const newKrathong = {
          id: result.data?.id || Date.now(),
          type: selectedKrathong,
          name,
          wish,
          style: {
            left: `${Math.random() * 90}%`,
            top: `${60 + Math.random() * 30}%`,
            animationDuration: `${10 + Math.random() * 5}s`,
          },
        };
        
        // Update local state through parent component
        onLaunch(newKrathong);
        
        // Reset form and close modal
        setName('');
        setWish('');
        handleClose();
      } else {
        alert('เกิดข้อผิดพลาด: ' + (result.error || 'ไม่สามารถลอยกระทงได้'));
      }
    } catch (error) {
      console.error('API Error:', error);
      alert(`เกิดข้อผิดพลาด: ${error.message}\nกรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- UI ของ Step 1 และ Step 2 (เหมือนเดิมทุกประการ) ---
  
  const renderStep1 = () => (
    <div>
      <h3 className="text-xl font-bold text-center mb-4">1. เลือกกระทง</h3>
      {/* ... (โค้ดเลือกกระทงเหมือนเดิม) ... */}
       <div className="flex justify-center gap-4">
        {KRATHONG_TYPES.map((k) => (
          <div
            key={k.id}
            className={`p-2 border-2 rounded-lg cursor-pointer ${
              selectedKrathong === k.id ? 'border-pink-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedKrathong(k.id)}
          >
            <Image src={k.src} alt={k.name} width={100} height={100} />
            <p className="text-center text-sm">{k.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setStep(2)}
        className="w-full bg-pink-600 text-white p-2 rounded-lg mt-6"
      >
        ขั้นตอนต่อไป
      </button>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit}>
       <h3 className="text-xl font-bold text-center mb-4">2. ใส่ชื่อและคำอธิษฐาน</h3>
      {/* ... (โค้ดฟอร์มเหมือนเดิม) ... */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm mb-1">ชื่อของคุณ</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full bg-white p-2 rounded-lg text-black" placeholder="กรอกชื่อของคุณ" />
      </div>
      <div className="mb-6">
        <label htmlFor="wish" className="block text-sm mb-1">คำอธิษฐาน</label>
        <textarea id="wish" value={wish} onChange={(e) => setWish(e.target.value)}
          className="w-full bg-white p-2 rounded-lg text-black" rows={3} placeholder="ขอให้..." />
      </div>
      <div className="flex gap-2">
         <button type="button" onClick={() => setStep(1)}
          className="flex-1 bg-gray-500 text-white p-2 rounded-lg">
          กลับไป
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white p-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
              กำลังลอยกระทง...
            </div>
          ) : (
            'ลอยกระทงกันเลย'
          )}
        </button>
      </div>
    </form>
  );
  // --- จบส่วน UI ---


  return (
    // 1. Transition จัดการเรื่อง Animation (Fade in/out, Scale)
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* 2. Backdrop (พื้นหลังมืดๆ) */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        {/* 3. ตัว Modal Content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* 4. Dialog.Panel คือกรอบ Modal ที่เราใส่สไตล์ Tailwind */}
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-900/80 backdrop-blur-sm p-6 text-left align-middle shadow-xl transition-all text-white">
                
                {/* ปุ่มปิด (X) */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-2xl opacity-70 hover:opacity-100 z-10"
                >
                  &times;
                </button>

                {/* เนื้อหาที่เปลี่ยนตาม Step */}
                {step === 1 ? renderStep1() : renderStep2()}
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}