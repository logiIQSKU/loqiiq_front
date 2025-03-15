import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logiiq-logo.png';
import profileImage from '../assets/profile.png';

const Header = () => {
    const location = useLocation();

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const isActive = (path) => location.pathname.startsWith(path);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <header className="flex items-center justify-between w-full px-4 py-2 bg-white border-b border-gray-200 relative">
            {/* Left Section: Logo and Navigation */}
            <div className="flex items-center">
                {/* Logo */}
                <div className="my-1 ml-2 mr-2">
                    <Link to="/home">
                        <div className="relative w-16 cursor-pointer">
                            <img src={logo} alt="LOGIIQ Logo" className="logo" />
                        </div>
                    </Link>
                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-300 mx-4"></div>

                {/* Navigation */}
                <nav className="flex items-center space-x-6">
                    <div className="text-gray-800 font-black">
                        LOGIIQ
                    </div>

                    <Link to="/home">
                        <div className={`${isActive('/home') ? 'text-green-500 font-bold' : 'text-gray-800 font-medium'} cursor-pointer`}>
                            HOME
                        </div>
                    </Link>

                    <Link to="/dashboard">
                        <div className={`${isActive('/dashboard') ? 'text-green-500 font-bold' : 'text-gray-800 font-medium'} cursor-pointer`}>
                            체험모드
                        </div>
                    </Link>

                    {/* 테스트모드 (클릭 드롭다운) */}
                    <div className="relative">
                        <div
                            onClick={toggleDropdown}
                            className={`${(isActive('/forklift') || isActive('/sorter') || isActive('/agv')) ? 'text-green-500 font-bold' : 'text-gray-800 font-medium'} flex items-center cursor-pointer`}
                        >
                            테스트모드
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 bg-white border rounded shadow-md min-w-[80px] z-10">
                                <Link to="/agv" onClick={closeDropdown}>
                                    <div className="px-4 py-2 text-gray-800 hover:bg-green-100">AGV</div>
                                </Link>
                                <Link to="/sorter" onClick={closeDropdown}>
                                    <div className="px-4 py-2 text-gray-800 hover:bg-green-100">Sorter</div>
                                </Link>
                                <Link to="/forklift" onClick={closeDropdown}>
                                    <div className="px-4 py-2 text-gray-800 hover:bg-green-100">지게차</div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/loading">
                        <div className={`${isActive('/loading') ? 'text-green-500 font-bold' : 'text-gray-800 font-medium'} cursor-pointer`}>
                            적재/하역
                        </div>
                    </Link>
                </nav>
            </div>

            {/* Right Section: User Profile */}
            <div className="flex items-center">
                <div className="flex items-center cursor-pointer">
                    <div className="w-8 h-8 mr-2 overflow-hidden rounded-full bg-gray-300">
                        <img src={profileImage} alt="Profile" className="profileImage" />
                    </div>
                    <div className="flex items-center font-medium text-gray-800">
                        리쿠님
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 외부 클릭 감지용 배경 */}
            {isDropdownOpen && (
                <div
                    onClick={closeDropdown}
                    className="fixed inset-0 z-0"
                ></div>
            )}
        </header>
    );
};

export default Header;
