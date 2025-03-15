import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';

const forkliftData = [
    {
        no: 9,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        score: 87,
        status: '통과',
        statusColor: 'green',
    },
    {
        no: 8,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        score: 78,
        status: '실패',
        statusColor: 'red',
    },
    {
        no: 7,
        start: '2025/03/03 - 13:11:11',
        end: '2025/03/03 - 14:11:11',
        score: 0,
        status: '오류',
        statusColor: 'black',
    },
];

const donutChartData = [
    { name: '합격률', value: 81 },
    { name: '남은 비율', value: 19 },
];

const scoreDistribution = [
    { name: '20점 이하', value: 5 },
    { name: '40점 이하', value: 10 },
    { name: '60점 이하', value: 15 },
    { name: '80점 이하', value: 25 },
    { name: '100점 이하', value: 35 },
];

const statusColorMap = {
    green: 'text-green-500',
    red: 'text-red-500',
    black: 'text-black',
};

const COLORS = ['#4CAF50', '#E0E0E0'];

const SorterTable = () => {
    return (
        <div className="p-8 min-h-screen flex flex-col gap-8 mx-12">
            {/* Sorter 타이틀 */}
            <h2 className="text-2xl font-bold">Sorter</h2>

            {/* 테이블 */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th>No</th>
                            <th>테스트 시작</th>
                            <th>테스트 종료</th>
                            <th>점수</th>
                            <th>상태</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {forkliftData.map((item, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="py-3">{item.no}</td>
                                <td>{item.start}</td>
                                <td>{item.end}</td>
                                <td>{item.score}</td>
                                <td className="flex items-center justify-center gap-2 py-3">
                                    <FaCircle
                                        className={statusColorMap[item.statusColor]}
                                        size={10}
                                    />
                                    {item.status}
                                </td>
                                <td>
                                    <Link to={`/sorter/${item.no}`}>
                                        <button className="border border-gray-400 rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">
                                            자세히 보기
                                        </button>
                                    </Link>
                                </td>

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

            {/* 차트와 평균 시간 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 평균 합격률 */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative">
                    <h3 className="text-lg font-semibold mb-4">평균 합격률</h3>

                    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={donutChartData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {donutChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute text-2xl font-bold">81%</div>
                    </div>
                </div>


                {/* 점수 분포 그래프 */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">점수 분포</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={scoreDistribution}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Line type="monotone" dataKey="value" stroke="#4FC3F7" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 평균 작업 시간 */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-4">평균 분류 개수</h3>
                    <p className="text-5xl font-bold text-gray-700">19개</p>
                </div>
            </div>
        </div>
    );
};

export default SorterTable;
