// components/TestTable.js
import React from 'react';

const TestTable = ({ data, onViewDetail }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">테스트 시작</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">테스트 종료</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">점수</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">상태</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.startTime}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.endTime}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.score}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                <button
                                    onClick={() => onViewDetail(item.id)}
                                    className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    자세히 보기
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestTable;