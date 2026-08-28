import React, { useState } from 'react';
import { Envelope, Lock, User, SteeringWheel, Eye, EyeSlash, ArrowRight } from '@phosphor-icons/react';

interface AuthProps {
  onLoginSuccess: (username: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập Email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải từ 6 ký tự';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Vui lòng nhập Họ & Tên';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate success
      const displayName = isLogin ? (formData.email.split('@')[0]) : formData.name;
      onLoginSuccess(displayName);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative px-4 overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Auth Card */}
      <div className="w-full max-w-md glass-panel-gold rounded-2xl p-8 relative z-10 transition-all duration-500 ease-out transform hover:scale-[1.01]">
        
        {/* Logo/Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-3 bg-luxury-bg shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <SteeringWheel size={32} weight="thin" className="text-gold animate-spin-slow" />
          </div>
          <h1 className="font-serif text-3xl tracking-widest text-gold font-medium mb-1">PROCAR</h1>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase font-sans">Trải Nghiệm Xe Sang Đẳng Cấp</p>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl text-center mb-6 text-white tracking-wide">
          {isLogin ? 'Đăng Nhập Thành Viên' : 'Đăng Ký Tài Khoản'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Họ & Tên</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-11 pr-4 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div className="relative">
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Email</label>
            <div className="relative">
              <Envelope size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@procar.vn"
                className="w-full pl-11 pr-4 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Mật khẩu</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className="relative">
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <a href="#forgot" className="text-xs text-gold/80 hover:text-gold hover:underline transition-all">Quên mật khẩu?</a>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-gold via-[#e6c15c] to-gold text-black font-semibold rounded-lg shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.5)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{isLogin ? 'Đăng Nhập' : 'Đăng Ký Ngay'}</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Switch State */}
        <div className="mt-8 text-center text-sm text-gray-400">
          {isLogin ? (
            <>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => { setIsLogin(false); setErrors({}); }}
                className="text-gold font-medium hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => { setIsLogin(true); setErrors({}); }}
                className="text-gold font-medium hover:underline cursor-pointer"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
