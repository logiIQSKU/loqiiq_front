import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logiiq-logo.png';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        // 서비스 이용 페이지로 이동
        navigate('/home');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="LOGIIQ Logo" className="w-24 h-auto mb-2" />
                    <h1 className="text-2xl font-bold text-gray-900">LOGIIQ</h1>
                </div>

                {/* Welcome Message */}
                <div className="flex flex-col items-center mb-12">
                    <p className="text-xl font-bold mb-2">***** 님,</p>
                    <p className="text-lg">회원가입이 완료되었습니다.</p>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLoginClick}
                    className="w-full py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <span className="text-base font-medium text-gray-700">지금 LOGIN 후 서비스 이용하기</span>
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;