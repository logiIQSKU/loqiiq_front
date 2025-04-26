import axios from "axios";

const instance = axios.create({
    baseURL: "http://43.200.56.181:8080",
    // 리다이렉션 처리
    maxRedirects: 0, // 리다이렉션을 따라가지 않음
    validateStatus: function (status) {
        return status >= 200 && status < 300 || status === 302; // 302 상태를 성공으로 간주
    }
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log("📦 인터셉터에서 토큰 확인:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // Content-Type 명시적 설정
        config.headers["Content-Type"] = "application/json";
        // Accept 헤더 추가
        config.headers.Accept = "application/json";
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
        // HTML 응답 감지
        const isHtmlResponse = typeof response.data === 'string' &&
            response.data.trim().startsWith('<!DOCTYPE html>');

        if (isHtmlResponse) {
            console.log("🔍 HTML 응답 감지됨 - 인증 실패로 간주");
            localStorage.removeItem("accessToken");
            // 로그인 페이지로 리다이렉션하기 전에 오류 발생
            return Promise.reject({
                isAuthError: true,
                message: "인증이 필요합니다. 로그인 페이지로 이동합니다."
            });
        }

        // JSON 응답인 경우 파싱 시도
        if (typeof response.data === 'string' && response.data.trim()) {
            try {
                response.data = JSON.parse(response.data);
            } catch (e) {
                console.warn("응답을 JSON으로 파싱할 수 없음:", e);
            }
        }

        return response;
    },
    (error) => {
        // 401 오류 발생 시
        if (error.response && error.response.status === 401) {
            console.log("🔐 401 인증 오류:", error);
            localStorage.removeItem("accessToken");
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // 네트워크 오류 처리
        if (error.code === "ERR_NETWORK") {
            console.error("🌐 네트워크 오류:", error);
        }

        // 인증 관련 오류인 경우 (HTML 응답으로 감지된 경우)
        if (error.isAuthError) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default instance;