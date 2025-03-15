import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const experienceData = [
    {
        no: 9,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        progress: '100%',
        status: '체험완료',
        statusColor: 'green',
        type: 'AGV',
    },
    {
        no: 8,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        progress: '78%',
        status: '체험중',
        statusColor: 'red',
        type: '지게차',
    },
    {
        no: 7,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        progress: '44%',
        status: '체험중',
        statusColor: 'red',
        type: 'Sorter',
    },
];

const ExperienceTable = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col gap-6">
            {/* 체험 이력 테이블 */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">체험 이력</h2>
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th>No</th>
                            <th>체험 시작</th>
                            <th>체험 종료</th>
                            <th>체험 진행도</th>
                            <th>상태</th>
                            <th>진행사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experienceData.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3">{item.no}</td>
                                <td>{item.start}</td>
                                <td>{item.end}</td>
                                <td>{item.progress}</td>
                                <td className="flex items-center justify-center gap-2 py-3">
                                    <FaCircle
                                        className={`text-${item.statusColor}-500`}
                                        size={10}
                                    />
                                    {item.status}
                                </td>
                                <td>{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-4 items-center gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                        <MdKeyboardArrowLeft size={24} />
                    </button>
                    <span className="text-gray-700">1</span>
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                        <MdKeyboardArrowRight size={24} />
                    </button>
                </div>
            </div>

            {/* 평균 진행률 & 총 체험 시간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mb-4">평균 진행률</h2>
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full">
                            <circle
                                className="text-gray-300"
                                strokeWidth="10"
                                stroke="currentColor"
                                fill="transparent"
                                r="50"
                                cx="64"
                                cy="64"
                            />
                            <circle
                                className="text-green-500"
                                strokeWidth="10"
                                strokeDasharray="314"
                                strokeDashoffset={314 - (314 * 81) / 100}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="50"
                                cx="64"
                                cy="64"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                            81%
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mb-4">총 체험 시간</h2>
                    <p className="text-5xl font-bold text-gray-700">23분</p>
                </div>
            </div>
        </div>
    );
};

export default ExperienceTable;