import React from "react";

const experienceRows = [
  {
    id: 9,
    startTime: "2025/03/03 - 13:11:11",
    endTime: "2025/03/03 - 14:11:11",
    type: "AGV",
    detail: "최적화 경로 설정 및 주행",
  },
  {
    id: 8,
    startTime: "2025/03/03 - 13:11:11",
    endTime: "2025/03/03 - 14:11:11",
    type: "지게차",
    detail: "주차",
  },
  {
    id: 7,
    startTime: "2025/03/03 - 13:11:11",
    endTime: "2025/03/03 - 14:11:11",
    type: "Sorter",
    detail: "화물 정보 인식",
  },
];

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

const FlowChart = ({ steps, label }) => (
  <div className="flex items-center w-full mb-4">
    {/* 라벨 */}
    <div className="px-4 py-2 bg-gray-300 rounded shadow text-base font-semibold mr-4 min-w-[80px] text-center">
      {label}
    </div>
    {/* 단계 플로우 */}
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

const DashboardPage = () => (
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
        {/* 페이지네이션 예시 */}
        <div className="flex justify-center items-center mt-2">
          <span className="text-gray-500">&lt;</span>
          <span className="mx-2 text-gray-700">1</span>
          <span className="text-gray-400">&gt;</span>
        </div>
      </div>
    </section>

    {/* 플로우 차트 */}
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow p-6">
        <FlowChart
          label="지게차"
          steps={[
            "출발 준비",
            "주행 시작",
            "화물 적재 및 하역",
            "주차",
            "작업 완료",
          ]}
        />
        <FlowChart
          label="Sorter"
          steps={["화물 정보 인식", "분류 작업 수행", "작업 완료"]}
        />
        <FlowChart
          label="AGV"
          steps={[
            "화물 위치 확인",
            "최적화 경로 설정 및 주행",
            "장애물 감지 및 회피",
            "작업 완료",
          ]}
        />
      </div>
    </section>
  </div>
);

export default DashboardPage;
