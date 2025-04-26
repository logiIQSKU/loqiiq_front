// tokenUtils.js
/**
 * JWT 토큰을 디코딩하는 함수
 * @param {string} token - JWT 토큰
 * @returns {object|null} 디코딩된 토큰 또는 실패 시 null
 */
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("토큰 파싱 실패:", e);
    return null;
  }
};

/**
 * 토큰의 만료 여부를 확인하는 함수
 * @param {string} token - JWT 토큰
 * @param {number} bufferTime - 만료 전 버퍼 시간(초)
 * @returns {boolean} 토큰 만료 여부
 */
export const isTokenExpired = (token, bufferTime = 60) => {
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < (currentTime + bufferTime);
};

/**
 * 토큰의 만료 시간을 가져오는 함수
 * @param {string} token - JWT 토큰
 * @returns {Date|null} 만료 시간 또는 실패 시 null
 */
export const getTokenExpiration = (token) => {
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) return null;

  return new Date(decodedToken.exp * 1000);
};

/**
 * 로컬 스토리지에서 토큰을 안전하게 가져오는 함수
 * @returns {string|null} 저장된 토큰 또는 없을 경우 null
 */
export const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (e) {
    console.error("로컬 스토리지 접근 오류:", e);
    return null;
  }
};

/**
 * 로그아웃 처리 함수
 * @param {string} redirectUrl - 리다이렉션할 URL
 */
export const handleLogout = (redirectUrl = '/login') => {
  localStorage.removeItem("accessToken");
  // 필요한 경우 다른 스토리지 항목도 제거

  // 리다이렉션
  window.location.href = redirectUrl;
};
