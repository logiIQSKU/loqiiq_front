import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import profileImage from "../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";

function MyPage() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const urlName = urlParams.get("name");

  // 상태 초기화
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState(profileImage);
  const [tempProfileImg, setTempProfileImg] = useState(profileImage);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      const token = user.accessToken || localStorage.getItem("accessToken");

      // accessToken이 없으면 로그인 페이지로 이동
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // API 응답에서 사용자 정보 가져오기
        const userData = response.data;

        // UserContext 업데이트
        setUser({
          ...user,
          email: userData.email || user.email,
          nickname: userData.nickname || user.nickname,
          profileImg: userData.profileImg || user.profileImg,
          accessToken: token
        });

        // 로컬 상태 업데이트 - URL 파라미터보다 API 정보를 우선시함
        setNickname(userData.nickname || urlName || "");
        setProfileImg(userData.profileImg || profileImage);
        setTempProfileImg(userData.profileImg || profileImage);

      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error);

        // 401 오류면 로그인 페이지로 이동
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else {
          // API 호출은 실패했지만 URL에 name이 있으면 사용
          if (urlName) {
            setNickname(urlName);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
    if (nickname.trim()) {
      try {
        const token = user.accessToken || localStorage.getItem("accessToken");

        // 사용자 정보 업데이트 API 요청
        await axios.put("/api/user/update", {
          nickname: nickname,
          profileImg: tempProfileImg !== profileImage ? tempProfileImg : null,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // 수정 완료 후 실제 값 업데이트
        setProfileImg(tempProfileImg);
        setUser({
          ...user,
          nickname: nickname,
          profileImg: tempProfileImg,
        });

        alert("수정되었습니다.");
      } catch (error) {
        console.error("사용자 정보 업데이트 실패:", error);
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 실제 적용하지 않고 임시 이미지만 변경
        setTempProfileImg(reader.result);
        setShowDropdown(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectPhoto = () => {
    fileInput.current.click();
  };

  const handleDeletePhoto = () => {
    // 실제 적용하지 않고 임시 이미지만 변경
    setTempProfileImg(profileImage);
    setShowDropdown(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">사용자 정보 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center mb-10">
          {/* 프로필 이미지 - 임시 이미지 표시 */}
          <div className="w-28 h-28 relative mb-2">
            <img
              src={tempProfileImg}
              alt="프로필 이미지"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          {/* 수정 버튼과 드롭다운 */}
          <div className="relative">
            <div
              className="text-lg mb-6 cursor-pointer"
              onClick={handleEditClick}
            >
              수정
            </div>

            {showDropdown && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleSelectPhoto}
                >
                  사진 선택하기
                </div>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={handleDeletePhoto}
                >
                  프로필 삭제하기
                </div>
              </div>
            )}
          </div>

          {/* 이미지 변경을 위한 input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            ref={fileInput}
          />
        </div>

        {/* 구분선 */}
        <hr className="border-t border-gray-200 mb-8" />

        {/* 닉네임 입력 */}
        <div className="mb-8">
          <div className="flex mb-4">
            <label
              htmlFor="nickname"
              className="block text-gray-700 font-medium"
            >
              닉네임 재설정<span className="text-blue-500">*</span>
            </label>
          </div>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </div>

        {/* 수정 완료 버튼 */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleSubmit}
            className="w-32 bg-[#00BC70] text-white py-2 px-4 rounded hover:bg-[#00A060] transition duration-200 text-center"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;