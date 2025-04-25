import React, { useEffect, useState } from "react";
import axios from "axios";

const FlowChart = ({ steps, label }) => (
  <div className="flex items-center w-full mb-4">
    <div className="px-4 py-2 bg-gray-300 rounded shadow text-base font-semibold mr-4 min-w-[80px] text-center">
      {label}
    </div>
    <div className="flex items-center flex-1 gap-x-4">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="grow px-4 py-2 bg-gray-100 rounded shadow text-base font-medium text-center">
            {step}
          </div>
          {idx < steps.length - 1 && (
            <span className="text-xl text-gray-400">{"→"}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const processFlows = [
  {
    type: "지게차",
    steps: ["출발 준비", "주행 시작", "화물 적재 및 하역", "주차", "작업 완료"],
  },
  {
    type: "Sorter",
    steps: ["화물 정보 인식", "분류 작업 수행", "작업 완료"],
  },
  {
    type: "AGV",
    steps: [
      "화물 위치 확인",
      "최적화 경로 설정 및 주행",
      "장애물 감지 및 회피",
      "작업 완료",
    ],
  },
];

const DashboardPage = () => {
  const [experienceRows, setExperienceRows] = useState([]);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await axios.get("/api/experience/user/1");
        const rawData = response.data.content;

        const formatted = rawData.map((item, idx) => ({
          id: rawData.length - idx,
          startTime: new Date(item.startTime).toLocaleString(),
          endTime: new Date(item.endTime).toLocaleString(),
          type: item.moduleType,
          detail: item.moduleDetail,
        }));

        setExperienceRows(formatted);
      } catch (err) {
        console.error("❌ 체험 데이터 불러오기 실패:", err);
      }
    };

    fetchExperienceData();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-col gap-8 mx-12">
      {/* 체험 이력 */}
      <section className="mb-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">체험 이력</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <table className="min-w-full text-center">
            <thead>
              <tr className="border-b">
                <th className="py-3">No</th>
                <th className="py-3">체험 시작</th>
                <th className="py-3">체험 종료</th>
                <th className="py-3">진행사항</th>
                <th className="py-3">상세정보</th>
              </tr>
            </thead>
            <tbody>
              {experienceRows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="py-2">{row.id}</td>
                  <td className="py-2">{row.startTime}</td>
                  <td className="py-2">{row.endTime}</td>
                  <td className="py-2">{row.type}</td>
                  <td className="py-2">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 플로우 차트 */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          {processFlows.map((flow) => (
            <FlowChart key={flow.type} label={flow.type} steps={flow.steps} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
