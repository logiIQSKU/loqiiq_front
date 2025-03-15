import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    // 로그인 페이지일 경우 헤더 숨기기
    const hideHeader = location.pathname === '/';

    return (
        <div className="layout">
            {!hideHeader && <Header />}
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
