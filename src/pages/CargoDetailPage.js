// pages/CargoDetailPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CargoDetailPage = () => {
    const navigate = useNavigate();

    const cargoData = {
        operationId: 'OP-LD-250308-0001',
        cargoId: 'CG-BOX-2503-00002',
        sourceLocation: 'E-3 구역',
        destinationLocation: 'D-1 구역',
        distance: '10M'
    };

    const handleNicknameChange = () => {
        // 닉네임 변경 로직
        navigate('/dashboard');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">지게차 적재/하역</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">화물 ID</p>
                        <p className="text-lg font-medium text-gray-800">{cargoData.cargoId}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">작업 ID</p>
                        <p className="text-lg font-medium text-gray-800">{cargoData.operationId}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">적재 위치</p>
                        <p className="text-lg font-medium text-gray-800">{cargoData.sourceLocation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">하역 위치</p>
                        <p className="text-lg font-medium text-gray-800">{cargoData.destinationLocation}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">이동한 거리</h2>
                <p className="text-3xl font-bold text-center text-blue-600">{cargoData.distance}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">주의사항</h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li><span className="font-medium">적재 중 시야 확보</span> - 적재물이 운전자의 시야를 가리지 않도록 조정하세요.</li>
                    <li><span className="font-medium">급제동 및 급회전 금지</span> - 무거운 화물을 들고 급제동하거나 급회전하면 지게차가 전복될 위험이 있습니다.</li>
                </ol>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">닉네임 재설정</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
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
    );
};

export default CargoDetailPage;
