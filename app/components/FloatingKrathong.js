// components/FloatingKrathong.js
import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

const KRATHONG_IMAGES = {
  banana: '/images/krathong-bananas.png',
  lotus: '/images/krathong-lotuses.png',
  candle: '/images/krathong-candles.png',
};

export default function FloatingKrathong({ type, name, wish, style }) {
  const imageUrl = KRATHONG_IMAGES[type] || KRATHONG_IMAGES.banana;

  return (
    <div
      className="absolute w-16 h-16 md:w-24 md:h-24 float-on-river z-10" // ใช้ custom CSS animation
      style={style} // รับสไตล์ (ตำแหน่ง, ความเร็ว) มาจาก props
    >
      <Popover className="relative">
        <PopoverButton className="w-full h-full focus:outline-none">
          <Image
            src={imageUrl}
            alt="Krathong"
            width={100}
            height={100}
            className="transition-opacity duration-300 hover:opacity-100 cursor-pointer"
          />
        </PopoverButton>
        
        <PopoverPanel className="absolute mt-2 transform top-[-50%] left-[-50%]">
          <div className="bg-linear-to-r bg-gray-800 text-white p-2 rounded-lg shadow-lg max-w-xs">
            <div className="text-sm font-extralight min-w-[200px] text-center">
              {`${name} อธิษฐานว่า: ${wish}`}
            </div>
            {/* Arrow pointing down */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
      
      <p className="text-white text-xs text-center truncate mt-1">{name}</p>
    </div>
  );
}