import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logiiq-logo.png";
import profileImage from "../assets/profile.png";
import { UserContext } from "../components/UserContext";

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(UserContext);

  const isActive = (path) => location.pathname.startsWith(path);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center relative">
      {/* 왼쪽: 로고 */}
      <div className="flex items-center">
        <Link to="/home">
          <img src={logo} alt="LOGIIQ Logo" className="w-16" />
        </Link>

        <div className="hidden md:block h-8 w-px bg-gray-300 mx-4"></div>

        {/* PC Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <div className="text-gray-800 font-black">LOGIIQ</div>

          <Link to="/home">
            <div className={`${isActive("/home") ? "text-green-500 font-bold" : "text-gray-800 font-medium"} cursor-pointer`}>
              HOME
            </div>
          </Link>

          <Link to="/dashboard">
            <div className={`${isActive("/dashboard") ? "text-green-500 font-bold" : "text-gray-800 font-medium"} cursor-pointer`}>
              체험모드
            </div>
          </Link>

          {/* 테스트모드 드롭다운 */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className={`${isActive("/forklift") || isActive("/sorter") || isActive("/agv") ? "text-green-500 font-bold" : "text-gray-800 font-medium"} flex items-center cursor-pointer`}
            >
              테스트모드
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border rounded shadow-md min-w-[120px] z-20">
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
            <div className={`${isActive("/loading") ? "text-green-500 font-bold" : "text-gray-800 font-medium"} cursor-pointer`}>
              적재/하역
            </div>
          </Link>
        </nav>
      </div>

      {/* 오른쪽: 프로필 */}
      <div className="flex items-center">
        <Link to="/mypage" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img src={user.profileImg || profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:flex items-center text-gray-800 font-medium">
            {user.nickname || "리쿠"}님
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </Link>

        {/* Mobile Menu Button (햄버거) */}
        <button
          className="md:hidden ml-4 flex items-center"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation 메뉴 */}
      <div className={`absolute top-16 left-0 w-full bg-white border-t border-gray-200 z-30 flex flex-col items-start p-4 space-y-4 md:hidden
        transition-all duration-300 ease-in-out transform origin-top
        ${isMobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
        <Link to="/home" onClick={closeMobileMenu}>
          <div className="text-gray-800">HOME</div>
        </Link>
        <Link to="/dashboard" onClick={closeMobileMenu}>
          <div className="text-gray-800">체험모드</div>
        </Link>
        <Link to="/agv" onClick={closeMobileMenu}>
          <div className="text-gray-800">AGV</div>
        </Link>
        <Link to="/sorter" onClick={closeMobileMenu}>
          <div className="text-gray-800">Sorter</div>
        </Link>
        <Link to="/forklift" onClick={closeMobileMenu}>
          <div className="text-gray-800">지게차</div>
        </Link>
        <Link to="/loading" onClick={closeMobileMenu}>
          <div className="text-gray-800">적재/하역</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
