// pages/ForkliftDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ForkliftDetailPage = () => {
    const { testId } = useParams();

    // 테스트 데이터 (실제로는 API에서 가져올 것)
    const testData = {
        id: testId,
        startTime: '2025/03/03-13:11:11',
        endTime: '2025/03/03-14:11:11',
        score: 87,
        status: '통과',
        accuracyScore: 26,
        efficiencyScore: 30,
        safetyScore: 31,
        feedback: '화물 적재는 훌륭했지만, 선반 충돌을 줄이려면 속도를 조절해야 합니다.'
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">테스트 정보</h2>
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 pr-4 font-medium text-gray-700">No</td>
                            <td className="py-2 text-gray-900">{testData.id}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 pr-4 font-medium text-gray-700">테스트 시작</td>
                            <td className="py-2 text-gray-900">{testData.startTime}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 pr-4 font-medium text-gray-700">테스트 종료</td>
                            <td className="py-2 text-gray-900">{testData.endTime}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="py-2 pr-4 font-medium text-gray-700">점수</td>
                            <td className="py-2 text-gray-900">{testData.score}</td>
                        </tr>
                        <tr>
                            <td className="py-2 pr-4 font-medium text-gray-700">상태</td>
                            <td className="py-2 text-gray-900">{testData.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">평가기준</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">정확도(30)</h3>
                    <ul className="space-y-1 pl-5 list-disc text-gray-700">
                        <li>화물을 지정된 위치에 정확히 배치했는가?</li>
                        <li>적재 시 화물의 균형을 잘 유지했는가?</li>
                        <li>작업 영역에 대한 경계를 명확히 지켰는가?</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">효율성(30)</h3>
                    <ul className="space-y-1 pl-5 list-disc text-gray-700">
                        <li>불필요한 조작이 없었는가?</li>
                        <li>불필요한 경로 변경 없이 최적의 경로로 작업했는가?</li>
                        <li>최대한 많은 작업을 수행했는가?</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">안전성(40)</h3>
                    <ul className="space-y-1 pl-5 list-disc text-gray-700">
                        <li>주행 중 장애물과 충돌하지 않았는가?</li>
                        <li>지정된 최대 속도를 초과하지 않고 운행했는가?</li>
                        <li>작업 완료 후 화물이 안전하게 고정되었는가?</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">총점</h2>
                <p className="text-gray-800">정확도 {testData.accuracyScore} + 효율성 {testData.efficiencyScore} + 안전성 {testData.safetyScore} = {testData.score}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">한줄 피드백</h2>
                <p className="text-gray-800">{testData.feedback}</p>
            </div>
        </div>
    );
};

export default ForkliftDetailPage;
