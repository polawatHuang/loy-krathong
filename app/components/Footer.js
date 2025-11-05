// components/Footer.js
'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-blue-900/90 to-blue-800/80 backdrop-blur-sm text-white py-8 px-4 relative z-10 w-full min-w-full">
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">🏮 ลอยกระทงออนไลน์</h3>
            <p className="text-sm leading-relaxed opacity-90">
              มาร่วมกันลอยกระทงออนไลน์ ร่วมกันลดขยะ รักษาสิ่งแวดล้อมให้อยู่กับเราตลอดไป
              เทศกาลลอยกระทงแห่งความหวังและความปรารถนาดี
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">ผู้จัดทำเว็บไซต์</h3>
            <div className="text-sm space-y-2 opacity-90">
              <p>📱 โทร: <a href="tel:095-724-9324" className="hover:text-yellow-300 transition-colors">095-724-9324 (คุณโจ้)</a></p>
              <p>✉️ อีเมล: <a href="mailto:polawathuang@gmail.com" className="hover:text-yellow-300 transition-colors">polawathuang@gmail.com</a></p>
              <p>🌐 เว็บไซต์: <a href="https://polawathuang.vercel.app" className="hover:text-yellow-300 transition-colors">คลิกดูผลงานการทำเว็บไซต์อื่นๆ ได้ที่นี่</a></p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} ลอยกระทงออนไลน์. สงวนลิขสิทธิ์ทุกการใช้งาน</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs">Made with 💖 for the environment</span>
            <div className="flex space-x-2">
              <span className="text-lg">🌍</span>
              <span className="text-lg">♻️</span>
              <span className="text-lg">🌿</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="absolute bottom-4 right-8 opacity-30">
          <div className="text-6xl">🏮</div>
        </div>
        
        <div className="absolute bottom-4 left-8 opacity-20">
          <div className="text-4xl">🌸</div>
        </div>
      </div>
    </footer>
  );
}