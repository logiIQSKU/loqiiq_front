// pages/SorterDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const SorterDetailPage = () => {
    const { testId } = useParams();

    // 테스트 데이터 (실제로는 API에서 가져올 것)
    const testData = {
        id: testId,
        startTime: '2025/03/03-13:11:11',
        endTime: '2025/03/03-14:11:11',
        score: 87,
        status: '통과',
        accuracyScore: 37,
        efficiencyScore: 40,
        feedback: '평균 속도가 빠르지만 오분류율이 높습니다.'
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
                    <h3 className="text-lg font-medium text-gray-800 mb-2">정확도(50)</h3>
                    <ul className="space-y-1 pl-5 list-disc text-gray-700">
                        <li>비전 검사 후 올바른 카테고리로 분류했는가?</li>
                        <li>평균 분류 속도가 빠른가?</li>
                        <li>취급주의 상자와 일반 상자를 혼동하지 않았는가?</li>
                        <li>잘못 분류된 비율이 낮은가?</li>
                        <li>제한 시간 내 최대한 많은 상자를 분류했는가?</li>
                        <li>빠르게 하면서도 정확도를 유지했는가?</li>
                    </ul>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">총점</h2>
                <p className="text-gray-800">정확도 {testData.accuracyScore} + 속도/효율성 {testData.efficiencyScore} = {testData.score}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">한줄 피드백</h2>
                <p className="text-gray-800">{testData.feedback}</p>
            </div>
        </div>
    );
};

export default SorterDetailPage;
