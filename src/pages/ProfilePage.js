// pages/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('리쿠');
    const [newNickname, setNewNickname] = useState('');

    const userData = {
        totalExperienceTime: '23분',
        totalTests: 9,
        passedTests: 3,
        averageScore: 84
    };

    const handleNicknameChange = () => {
        if (newNickname.trim()) {
            setNickname(newNickname);
            setNewNickname('');
        }
    };

    const handleLogout = () => {
        // 로그아웃 로직
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Header username={nickname} />

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                        {nickname.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{nickname} 님</h1>
                        <p className="text-gray-600">가입일: 2025/03/03</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">닉네임 변경</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={newNickname}
                            onChange={(e) => setNewNickname(e.target.value)}
                            placeholder="새 닉네임 입력"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleNicknameChange}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            수정 완료
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">체험 통계</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">총 체험 시간</p>
                        <p className="text-xl font-bold text-blue-600">{userData.totalExperienceTime}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">총 테스트 수</p>
                        <p className="text-xl font-bold text-blue-600">{userData.totalTests}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">통과한 테스트</p>
                        <p className="text-xl font-bold text-blue-600">{userData.passedTests}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500 mb-1">평균 점수</p>
                        <p className="text-xl font-bold text-blue-600">{userData.averageScore}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">계정 설정</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">알림 설정</p>
                            <p className="text-sm text-gray-600">테스트 결과 및 새로운 체험 알림</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">데이터 동기화</p>
                            <p className="text-sm text-gray-600">체험 데이터 자동 동기화</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
