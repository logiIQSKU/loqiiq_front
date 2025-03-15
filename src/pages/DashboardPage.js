// pages/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExperienceTable from '../components/ExperienceTable';
import TestTable from '../components/TestTable';

const DashboardPage = () => {
    const navigate = useNavigate();

    const experienceData = [
        { id: 9, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', progress: 100, status: '체험완료', type: 'AGV' },
        { id: 8, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', progress: 78, status: '체험중', type: '지게차' },
        { id: 7, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', progress: 44, status: '체험중', type: 'Sorter' },
    ];

    const forkliftData = [
        { id: 9, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 87, status: '통과' },
        { id: 8, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 78, status: '실패' },
        { id: 7, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 0, status: '오류' },
    ];

    const sorterData = [
        { id: 9, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 87, status: '통과' },
        { id: 8, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 78, status: '실패' },
        { id: 7, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 0, status: '오류' },
    ];

    const agvData = [
        { id: 9, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 87, status: '통과' },
        { id: 8, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 78, status: '실패' },
        { id: 7, startTime: '2025/03/03-13:11:11', endTime: '2025/03/03-14:11:11', score: 0, status: '오류' },
    ];

    const handleViewDetail = (type, id) => {
        switch (type) {
            case '지게차':
                navigate(`/forklift/${id}`);
                break;
            case 'Sorter':
                navigate(`/sorter/${id}`);
                break;
            case 'AGV':
                navigate(`/agv/${id}`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <section className="mb-4">
                <h2 className="mb-4 text-xl font-bold text-gray-800">체험 이력</h2>
                <ExperienceTable data={experienceData} />
            </section>

            {/* <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-gray-800">지게차</h2>
                <TestTable
                    data={forkliftData}
                    onViewDetail={(id) => handleViewDetail('지게차', id)}
                />
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Sorter</h2>
                <TestTable
                    data={sorterData}
                    onViewDetail={(id) => handleViewDetail('Sorter', id)}
                />
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-gray-800">AGV</h2>
                <TestTable
                    data={agvData}
                    onViewDetail={(id) => handleViewDetail('AGV', id)}
                />
            </section> */}
        </div>
    );
};

export default DashboardPage;
