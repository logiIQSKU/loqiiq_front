import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { UserContext } from "../components/UserContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

// 모듈 별 FlowChart 구성
const FlowChart = ({ steps, label }) => (
  <div className="flex flex-col sm:flex-row items-center w-full mb-4">
    <div className="px-4 py-2 bg-gray-300 rounded shadow text-base font-semibold mb-2 sm:mb-0 sm:mr-4 min-w-[80px] text-center">
      {label}
    </div>

    {/* 플로우 라인 */}
    <div className="flex flex-wrap items-center flex-1 gap-2 sm:gap-x-4 justify-center sm:justify-start">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="grow px-4 py-2 bg-gray-100 rounded shadow text-sm sm:text-base font-medium text-center">
            {step}
          </div>
          {idx < steps.length - 1 && (
            <span className="text-lg sm:text-xl text-gray-400">→</span> // ✅ 모바일에도 화살표 표시
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const processFlows = [
  { type: "지게차", steps: ["출발 준비", "주행 시작", "화물 적재 및 하역", "주차", "작업 완료"] },
  { type: "Sorter", steps: ["화물 정보 인식", "분류 작업 수행", "작업 완료"] },
  { type: "AGV", steps: ["화물 위치 확인", "최적화 경로 설정 및 주행", "장애물 감지 및 회피", "작업 완료"] },
];

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [experienceRows, setExperienceRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    try {
      if (typeof dateString === 'string' && dateString.includes(' - ')) {
        const parsed = dayjs(dateString.replace(' - ', ' '), 'YYYY/MM/DD HH:mm:ss');
        if (parsed.isValid()) {
          return parsed.format("YYYY.MM.DD HH:mm");
        }
      }

      const date = dayjs(dateString);
      if (date.isValid()) {
        return date.format("YYYY.MM.DD HH:mm");
      }

      console.warn("날짜 파싱 실패:", dateString);
      return "날짜 오류";
    } catch (err) {
      console.error("날짜 포맷팅 오류:", err, dateString);
      return "날짜 오류";
    }
  };

  const fetchExperienceData = async (pageNumber = 0) => {
    if (!user.accessToken) {
      console.warn("🚫 accessToken이 없어서 체험 데이터를 불러오지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/experience/my`, {
        params: { page: pageNumber },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let data = response.data;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      const rawData = data?.content || [];
      setCurrentPage(pageNumber);
      setTotalPages(data?.totalPages || 1);
      setTotalElements(data?.totalElements || 0);

      if (!rawData || rawData.length === 0) {
        setExperienceRows([]);
        return;
      }

      const formatted = rawData.map((item, idx) => ({
        id: data.totalElements - (data.pageable?.pageNumber || 0) * (data.pageable?.pageSize || 10) - idx,
        startTime: formatDate(item.startTime),
        endTime: formatDate(item.endTime),
        type: item.moduleType,
        detail: item.moduleDetail,
      }));

      setExperienceRows(formatted);
    } catch (err) {
      console.error("❌ 체험 데이터 불러오기 실패:", err);
      setError("데이터를 불러오는 중 문제가 발생했습니다.");

      if (err.isAuthError || (err.response && err.response.status === 401)) {
        localStorage.removeItem("accessToken");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }

      setExperienceRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceData();
  }, [user.accessToken]);

  const handlePageChange = (page) => {
    fetchExperienceData(page);
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const maxButtons = 5;
    const startPage = Math.max(0, Math.min(currentPage - Math.floor(maxButtons / 2), totalPages - maxButtons));
    const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        <button onClick={() => handlePageChange(0)} disabled={currentPage === 0} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
          &lt;&lt;
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
          &lt;
        </button>
        {pageButtons}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
          &gt;
        </button>
        <button onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
          &gt;&gt;
        </button>
      </div>
    );
  };

  const tableRowHeight = 42;
  const minRows = 3;
  const tableHeight = Math.max(minRows, experienceRows.length) * tableRowHeight + 50;

  return (
    <div className="p-4 sm:p-8 min-h-screen flex flex-col gap-8 mx-2 sm:mx-12">
      <section className="mb-8">
        <h2 className="mb-4 sm:mb-8 text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">체험 이력</h2>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div style={{ minHeight: `${tableHeight}px` }} className="relative overflow-x-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                <div className="text-center py-4">데이터를 불러오는 중...</div>
              </div>
            )}

            {error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              <table className="min-w-full text-center text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 sm:py-3">No</th>
                    <th className="py-2 sm:py-3">체험 시작</th>
                    <th className="py-2 sm:py-3">체험 종료</th>
                    <th className="py-2 sm:py-3">진행사항</th>
                    <th className="py-2 sm:py-3">상세정보</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.length > 0 ? (
                    <>
                      {experienceRows.map((row) => (
                        <tr key={row.id} className="border-b">
                          <td className="py-2">{row.id}</td>
                          <td className="py-2">{row.startTime}</td>
                          <td className="py-2">{row.endTime}</td>
                          <td className="py-2">{row.type}</td>
                          <td className="py-2">{row.detail}</td>
                        </tr>
                      ))}
                      {Array.from({ length: Math.max(0, minRows - experienceRows.length) }).map((_, idx) => (
                        <tr key={`empty-${idx}`} className="border-b">
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colSpan="5" className="py-4 text-gray-500">
                          체험 데이터가 없습니다.
                        </td>
                      </tr>
                      {Array.from({ length: minRows - 1 }).map((_, idx) => (
                        <tr key={`empty-${idx}`} className="border-b">
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                          <td className="py-2">&nbsp;</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <Pagination />
          {totalElements > 0 && (
            <div className="text-right mt-4 text-sm text-gray-500">총 {totalElements}개의 데이터</div>
          )}
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          {processFlows.map((flow) => (
            <FlowChart key={flow.type} label={flow.type} steps={flow.steps} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
