import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logiiq-logo.png';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/welcome');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* Logo */}
            <div className="mb-16">
                <div className="flex flex-col items-center">
                    <div className="relative w-48">
                        <img src={logo} alt="LOGIIQ Logo" className="logo" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">LOGIIQ</h1>
                </div>
            </div>

            {/* Description */}
            <div className="w-full max-w-3xl px-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    실전 같은 훈련, 완벽한 준비!
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    LogiIQ는 물류 산업의 실무를 효과적으로 익힐 수 있도록 설계된 AI 기반 교육 플랫폼입니다. <br />
                    체험 모드를 통해 나의 학습 이력을 확인하고, 테스트 모드를 통해 목표를 향해 한 걸음 더 나아가세요!
                </p>

                {/* 필요하다면 로그인으로 넘어가는 버튼 추가 */}
                {/* <button
                    onClick={handleLoginClick}
                    className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
                >
                    시작하기
                </button> */}
            </div>
        </div>
    );
};

export default Home;
