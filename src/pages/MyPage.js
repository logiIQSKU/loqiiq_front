import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../components/UserContext";
import profileImage from "../assets/profile.png";

function MyPage() {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState(user.nickname || "");
  const [profileImg, setProfileImg] = useState(user.profileImg || profileImage);
  const [tempProfileImg, setTempProfileImg] = useState(
    user.profileImg || profileImage
  ); // 임시 이미지 상태
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInput = useRef(null);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = () => {
    if (nickname.trim()) {
      // 수정 완료 버튼 클릭 시에만 실제 값 업데이트
      setProfileImg(tempProfileImg);
      setUser({
        ...user,
        nickname: nickname,
        profileImg: tempProfileImg,
      });
      alert("수정되었습니다.");
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
