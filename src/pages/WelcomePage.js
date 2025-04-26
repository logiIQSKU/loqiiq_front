import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logiiq-logo.png';
import { UserContext } from '../components/UserContext';
import axios from '../api/axiosInstance';

const WelcomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState("*****");
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const name = params.get('name');

        if (token) {
            localStorage.setItem("accessToken", token);
            setUser(prev => ({
                ...prev,
                accessToken: token
            }));
        }

        if (name) {
            setUserName(decodeURIComponent(name));
        }

        const fetchUserData = async () => {
            const currentToken = token || user.accessToken || localStorage.getItem("accessToken");

            if (!currentToken) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get("/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${currentToken}`
                    }
                });

                const userData = response.data;

                setUser({
                    ...user,
                    email: userData.email || user.email,
                    nickname: userData.nickname || user.nickname,
                    profileImg: userData.profileImg || user.profileImg,
                    accessToken: currentToken
                });

                setUserName(userData.nickname || name || "*****");
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                if (name) {
                    setUserName(decodeURIComponent(name));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [location.search]);

    const handleLoginClick = () => {
        navigate('/home');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-lg text-gray-700">로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md sm:max-w-lg">
                {/* 로고 */}
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="LOGIIQ Logo" className="w-20 sm:w-24 h-auto mb-3" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">LOGIIQ</h1>
                </div>

                {/* 환영 메시지 */}
                <div className="flex flex-col items-center text-center mb-10">
                    <p className="text-xl sm:text-2xl font-bold mb-2">{userName} 님,</p>
                    <p className="text-lg sm:text-xl text-gray-700">로그인이 완료되었습니다.</p>
                </div>

                {/* 버튼 */}
                <button
                    onClick={handleLoginClick}
                    className="w-full py-3 sm:py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all text-base sm:text-lg font-semibold text-gray-700"
                >
                    지금 서비스 이용하기
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
