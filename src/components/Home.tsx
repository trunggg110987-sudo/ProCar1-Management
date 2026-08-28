import React, { useState, useEffect } from 'react';
import { 
  SteeringWheel, Sparkle, ShieldCheck, Trophy, 
  MapPin, Calendar, Clock, Phone, User, 
  ArrowRight, SignOut, CaretLeft, CaretRight 
} from '@phosphor-icons/react';
import heroCar from '../assets/hero_car.jpg';

interface HomeProps {
  username: string;
  onLogout: () => void;
}

const FLEET = [
  {
    id: 1,
    name: 'Rolls-Royce Phantom VIII',
    type: 'VIP Class / Ultra Luxury',
    specs: { engine: 'V12 6.75L Twin-Turbo', acceleration: '5.3s (0-100)', power: '563 HP' },
    price: '95,000,000đ / ngày',
    image: 'https://images.unsplash.com/photo-1632245889027-e406faaa19cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Lamborghini Aventador S',
    type: 'Sport Class / Hypercar',
    specs: { engine: 'V12 6.5L N/A', acceleration: '2.9s (0-100)', power: '740 HP' },
    price: '120,000,000đ / ngày',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Mercedes-Maybach S680',
    type: 'Presidential Class / Luxury Sedan',
    specs: { engine: 'V12 6.0L Biturbo', acceleration: '4.5s (0-100)', power: '621 HP' },
    price: '45,000,000đ / ngày',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
  }
];

export const Home: React.FC<HomeProps> = ({ username, onLogout }) => {
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [bookingCar, setBookingCar] = useState(FLEET[0].name);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // IntersectionObserver for scroll animations fallback
  useEffect(() => {
    const reveals = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
    }, 5000);
  };

  const nextCar = () => {
    setActiveCarIndex((prev) => (prev + 1) % FLEET.length);
  };

  const prevCar = () => {
    setActiveCarIndex((prev) => (prev - 1 + FLEET.length) % FLEET.length);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8FAFC]">
      
      {/* 1. Header/Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-black">
            <SteeringWheel size={20} className="text-gold" />
          </div>
          <span className="font-serif text-xl tracking-[0.2em] text-gold font-bold">PROCAR</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-gray-300">
          <a href="#hero" className="hover:text-gold transition-colors">Trang chủ</a>
          <a href="#showcase" className="hover:text-gold transition-colors">Bộ Sưu Tập</a>
          <a href="#services" className="hover:text-gold transition-colors">Dịch Vụ</a>
          <a href="#booking" className="hover:text-gold transition-colors">Đặt Lịch</a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:inline">Chào, <strong className="text-gold">{username}</strong></span>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-gold/50 rounded-lg text-xs uppercase tracking-wider text-gray-400 hover:text-gold transition-all duration-300 cursor-pointer"
          >
            <SignOut size={14} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section (Hero-Centric) */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Full Image Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroCar} 
            alt="Luxury Hero Car" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-[pulse_6s_infinite] transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl text-center px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-6 animate-[bounce_3s_infinite]">
            <Sparkle size={16} className="text-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Đẳng Cấp Thượng Lưu</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wide text-white leading-tight mb-6">
            Kiến Tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F6E0A4] to-gold">Trải Nghiệm</span> Hành Trình Độc Bản
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl font-sans tracking-wide leading-relaxed mb-10">
            Hành trình tuyệt mỹ cùng đội ngũ chuyên gia tận tâm. ProCar cung cấp các dòng siêu xe đẳng cấp thế giới, đảm bảo sự sang trọng, riêng tư và hoàn mỹ trên mọi cung đường.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-8 sm:px-0">
            <a 
              href="#booking" 
              className="px-8 py-4 bg-gradient-to-r from-gold via-[#e6c15c] to-gold text-black font-semibold uppercase tracking-wider rounded-lg shadow-[0_4px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.45)] hover:scale-[1.03] transition-all duration-300 text-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Đăng Ký Trải Nghiệm</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#showcase" 
              className="px-8 py-4 border border-white/10 hover:border-gold/40 bg-white/5 backdrop-blur-md text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all duration-300 text-sm flex items-center justify-center cursor-pointer"
            >
              Xem Bộ Sưu Tập
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Cuộn xuống</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold to-transparent animate-[pulse_2s_infinite]" />
        </div>
      </section>

      {/* 3. Vehicle Showcase (Interactive Carousel) */}
      <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto relative scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
            ĐỘI XE SIÊU SANG
          </h2>
          <div className="w-20 h-[1px] bg-gold mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-sm uppercase tracking-widest">
            Những tuyệt phẩm thiết kế cơ khí hiện đại sẵn sàng phục vụ quý khách.
          </p>
        </div>

        <div className="relative glass-panel-gold rounded-3xl overflow-hidden p-6 md:p-12 flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Left Arrow */}
          <button 
            onClick={prevCar} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-gold/50 text-white hover:text-gold flex items-center justify-center transition-all cursor-pointer"
          >
            <CaretLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={nextCar} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-gold/50 text-white hover:text-gold flex items-center justify-center transition-all cursor-pointer"
          >
            <CaretRight size={24} />
          </button>

          {/* Car Image (Animated) */}
          <div className="w-full lg:w-3/5 h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative group">
            <img 
              src={FLEET[activeCarIndex].image} 
              alt={FLEET[activeCarIndex].name}
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="px-3 py-1 bg-gold text-black font-semibold text-xs rounded uppercase tracking-wider">
                {FLEET[activeCarIndex].type}
              </span>
            </div>
          </div>

          {/* Car Specs & Price */}
          <div className="w-full lg:w-2/5 space-y-6 lg:pl-6 text-left">
            <h3 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-wide">
              {FLEET[activeCarIndex].name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-white/10 py-6">
              <div>
                <span className="block text-[10px] uppercase text-gray-500 tracking-widest mb-1">Động cơ</span>
                <span className="text-sm font-semibold text-white">{FLEET[activeCarIndex].specs.engine}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 tracking-widest mb-1">Tăng tốc</span>
                <span className="text-sm font-semibold text-white">{FLEET[activeCarIndex].specs.acceleration}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-gray-500 tracking-widest mb-1">Công suất</span>
                <span className="text-sm font-semibold text-white">{FLEET[activeCarIndex].specs.power}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Chi phí trải nghiệm</span>
                <span className="text-2xl font-bold text-gold font-serif">{FLEET[activeCarIndex].price}</span>
              </div>
              <a 
                href="#booking"
                onClick={() => setBookingCar(FLEET[activeCarIndex].name)}
                className="px-6 py-3 bg-white/5 border border-white/10 hover:border-gold rounded-lg text-xs uppercase tracking-wider text-white hover:text-gold transition-all duration-300 font-semibold cursor-pointer"
              >
                Đặt Ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Luxury Services */}
      <section id="services" className="py-24 bg-[#0A0A0C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
              DỊCH VỤ THƯỢNG LƯU
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto mb-4" />
            <p className="text-gray-400 max-w-xl mx-auto text-sm uppercase tracking-widest">
              Nâng tầm hành trình của quý khách bằng những đặc quyền đẳng cấp nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="glass-panel rounded-2xl p-8 text-left hover:border-gold/30 hover:translate-y-[-5px] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={26} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-3">VIP Chauffeur</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Đội ngũ tài xế chuyên nghiệp được đào tạo bài bản theo chuẩn ngoại giao, đảm bảo sự an toàn, bảo mật tuyệt đối và đúng giờ trên từng cung đường.
                </p>
              </div>
              <span className="text-xs uppercase tracking-widest text-gold font-medium group-hover:underline">Đọc chi tiết →</span>
            </div>

            {/* Service 2 */}
            <div className="glass-panel rounded-2xl p-8 text-left hover:border-gold/30 hover:translate-y-[-5px] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trophy size={26} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-3">Sự Kiện & Lễ Cưới</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Cung cấp các siêu phẩm xe hoa và xe đón đoàn khách VIP giúp nâng cao vị thế và làm nên khoảnh khắc đắt giá cho ngày trọng đại của quý khách.
                </p>
              </div>
              <span className="text-xs uppercase tracking-widest text-gold font-medium group-hover:underline">Đọc chi tiết →</span>
            </div>

            {/* Service 3 */}
            <div className="glass-panel rounded-2xl p-8 text-left hover:border-gold/30 hover:translate-y-[-5px] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkle size={26} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-white font-medium mb-3">Chăm Sóc Siêu Xe</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Dịch vụ Detailing và phục hồi sơn xe chuyên nghiệp sử dụng hóa chất cao cấp từ Thụy Sĩ giúp siêu xe của quý khách luôn duy trì vẻ đẹp tinh khôi như mới.
                </p>
              </div>
              <span className="text-xs uppercase tracking-widest text-gold font-medium group-hover:underline">Đọc chi tiết →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Booking Form */}
      <section id="booking" className="py-24 px-6 max-w-4xl mx-auto scroll-reveal">
        <div className="glass-panel-gold rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-white mb-2">
              ĐĂNG KÝ TRẢI NGHIỆM VIP
            </h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-sans">
              Điền thông tin và chuyên viên của ProCar sẽ liên hệ lại với quý khách trong vòng 15 phút.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold mx-auto flex items-center justify-center text-gold">
                <ShieldCheck size={36} />
              </div>
              <h3 className="font-serif text-2xl text-white font-semibold">Đăng Ký Thành Công!</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Cảm ơn quý khách đã gửi thông tin. Chuyên viên chăm sóc khách hàng VIP sẽ liên hệ lại với quý khách ngay lập tức để xác nhận hành trình.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Họ & Tên Quý Khách</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Số Điện Thoại</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Dòng Xe Quan Tâm</label>
                  <div className="relative">
                    <SteeringWheel size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <select
                      value={bookingCar}
                      onChange={(e) => setBookingCar(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm appearance-none"
                    >
                      {FLEET.map(car => (
                        <option key={car.id} value={car.name} className="bg-black">{car.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Địa Điểm Đón</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input
                      type="text"
                      required
                      placeholder="Quận 1, TP. Hồ Chí Minh"
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Ngày Bắt Đầu</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input
                      type="date"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Giờ Đón</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                    <input
                      type="time"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-[#050507] border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold via-[#e6c15c] to-gold text-black font-bold uppercase tracking-wider rounded-lg shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.45)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Yêu Cầu Liên Hệ Tư Vấn</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-black py-12 border-t border-white/5 text-center text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-[0.25em] text-gold font-bold">PROCAR</span>
          </div>
          <p>© 2026 PROCAR Luxury Car Service. Đã đăng ký bản quyền.</p>
          <div className="flex gap-6 text-gray-400">
            <a href="#hero" className="hover:text-gold transition-colors">Bảo Mật</a>
            <a href="#hero" className="hover:text-gold transition-colors">Điều Khoản</a>
            <a href="#hero" className="hover:text-gold transition-colors">Liên Hệ</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
