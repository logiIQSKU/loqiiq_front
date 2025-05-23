import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logiiq-logo.png';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('jwtToken', token);
            navigate('/welcome');
        }
    }, [navigate]);

    const handleLogin = (provider) => {
        const backendBaseUrl = 'http://43.200.56.181:8080';
        window.location.href = `${backendBaseUrl}/oauth2/authorization/${provider}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="mb-16">
                <div className="flex flex-col items-center">
                    <div className="relative w-48">
                        <img src={logo} alt="LOGIIQ Logo" className="logo" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">LOGIIQ</h1>
                </div>
            </div>

            <div className="w-full max-w-md px-4">
                {/* Google */}
                <button
                    onClick={() => handleLogin('google')}
                    className="flex items-center justify-center w-full p-3 mb-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                            </svg>
                        </div>
                        <span className="text-base font-medium text-gray-700">구글로 시작하기</span>
                    </div>
                </button>

                {/* Naver */}
                <button
                    onClick={() => handleLogin('naver')}
                    className="flex items-center justify-center w-full p-3 mb-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 mr-4 bg-green-500 flex justify-center items-center text-white font-bold text-xl rounded-full">
                            <span className="text-white font-bold">N</span>
                        </div>
                        <span className="text-base font-medium text-gray-700">네이버로 시작하기</span>
                    </div>
                </button>

                {/* Kakao */}
                <button
                    onClick={() => handleLogin('kakao')}
                    className="flex items-center justify-center w-full p-3 mb-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 mr-4 bg-yellow-400 flex justify-center items-center rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M12 3C6.5 3 2 6.2 2 10.2c0 2.4 1.6 4.5 4 5.8l-1 3.6c-.1.4.3.7.6.5l4.1-2.7h2.2c5.5 0 10-3.2 10-7.2 0-4-4.5-7.2-10-7.2z" fill="#371D1E" />
                            </svg>
                        </div>
                        <span className="text-base font-medium text-gray-700">카카오로 시작하기</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
