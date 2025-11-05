// components/FloatingKrathong.js
import Image from 'next/image';

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
      title={`${name} อธิษฐานว่า: ${wish}`} // แสดงคำอธิษฐานเมื่อ hover
    >
        <Image
          src={imageUrl}
          alt="Krathong"
          width={100}
          height={100}
          className="transition-opacity duration-300 hover:opacity-100"
        />
      <p className="text-white text-xs text-center truncate">{name}</p>
    </div>
  );
}