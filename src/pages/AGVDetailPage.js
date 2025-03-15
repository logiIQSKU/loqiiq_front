// pages/AGVDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const AGVDetailPage = () => {
    const { testId } = useParams();

    // 테스트 데이터 (실제로는 API에서 가져올 것)
    const testData = {
        id: testId,
        startTime: '2025/03/03-13:11:11',
        endTime: '2025/03/03-14:11:11',
        score: 87,
        status: '통과',
        feedback: 'A* 알고리즘 관련 문제를 많이 틀리셨습니다.'
    };

    const wrongQuestions = [
        {
            id: 3,
            question: 'AGV에서 최적의 경로로 이동하기 위한 이것은 무엇인가요?',
            options: [
                'A* 알고리즘',
                'B 알고리즘',
                'B* 알고리즘',
                'A\' 알고리즘',
                'C 알고리즘'
            ],
            correctAnswer: 0,
            userAnswer: 3
        }
    ];

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
                <h2 className="text-xl font-bold text-gray-800 mb-4">한줄 피드백</h2>
                <p className="text-gray-800">{testData.feedback}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">틀린 문제</h2>
                {wrongQuestions.map(q => (
                    <div key={q.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                        <ul className="space-y-1 mb-3">
                            {q.options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`py-1 px-2 rounded ${index === q.correctAnswer
                                        ? 'bg-green-100 text-green-800'
                                        : index === q.userAnswer
                                            ? 'bg-red-100 text-red-800'
                                            : ''
                                        }`}
                                >
                                    ({index + 1}) {option}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-600">정답: {q.correctAnswer + 1}번 / 고른 답: {q.userAnswer + 1}번</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AGVDetailPage;
