import React from 'react';
import { FaClipboardCheck, FaBoxOpen, FaMapMarkerAlt, FaMapSigns } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { BsStopwatch } from 'react-icons/bs';
import { PiRuler } from 'react-icons/pi';
import { AiOutlineWarning } from 'react-icons/ai';

const LogisticsDashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-start py-10 px-4">
            {/* 헤더 - 박스 바깥으로 이동 */}
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl font-bold mb-4">지게차 적재/하역</h2>

                <div className="bg-gray-200 w-full rounded-lg shadow-lg py-6 px-12">
                    {/* 첫 번째 줄 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-2 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <FaClipboardCheck className="text-2xl text-gray-600 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">작업 ID</p>
                                    <p className="font-semibold">OP-LD-250308-0001</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <FaBoxOpen className="text-2xl text-gray-600 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">화물 ID</p>
                                    <p className="font-semibold">CG-BOX-2503-00002</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <AiOutlineLoading3Quarters className="text-2xl text-green-500 mr-4 animate-spin" />
                                <div>
                                    <p className="text-sm text-gray-500">현재 작업 상태</p>
                                    <p className="font-semibold text-green-600">진행 중</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 두 번째 줄 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-2 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <MdLocationOn className="text-2xl text-gray-600 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">현재 위치</p>
                                    <p className="font-semibold">E-3 구역</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center justify-start">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-2xl text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">적재 위치</p>
                                        <p className="font-semibold">D-1 구역</p>
                                    </div>
                                </div>
                                <div className="mx-1 text-gray-400 text-xl px-8">---&gt;</div>
                                <div className="flex items-center">
                                    <FaMapSigns className="text-2xl text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">하역 위치</p>
                                        <p className="font-semibold">H-5 구역</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 세 번째 줄 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-2 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <BsStopwatch className="text-2xl text-gray-600 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">현재 경과 시간</p>
                                    <p className="font-semibold">1분 24초</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center">
                                <PiRuler className="text-2xl text-gray-600 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">이동한 거리</p>
                                    <p className="font-semibold">10M</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 도넛 차트 + 주의사항 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-2">
                        {/* 레버 사용량 차트 */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-2">레버 사용량</p>
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <circle
                                            className="text-green-500"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="14"
                                            cx="18"
                                            cy="18"
                                            strokeDasharray="63, 25"
                                        />
                                        <circle
                                            className="text-blue-400"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="14"
                                            cx="18"
                                            cy="18"
                                            strokeDasharray="47, 41"
                                            strokeDashoffset="-63"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex justify-center items-center text-sm">
                                        20 / 15
                                    </div>
                                </div>
                                <div className="flex mt-4 justify-center text-xs space-x-4">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 bg-green-500 inline-block rounded-full mr-1"></span>
                                        <span>틸트 레버</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 bg-blue-400 inline-block rounded-full mr-1"></span>
                                        <span>리프트 레버</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 상태 알림 차트 */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-2">상태 알림</p>
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <circle
                                            className="text-red-400"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="14"
                                            cx="18"
                                            cy="18"
                                            strokeDasharray="15, 73"
                                        />
                                        <circle
                                            className="text-yellow-400"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="14"
                                            cx="18"
                                            cy="18"
                                            strokeDasharray="28, 60"
                                            strokeDashoffset="-15"
                                        />
                                        <circle
                                            className="text-teal-300"
                                            strokeWidth="6"
                                            stroke="currentColor"
                                            fill="transparent"
                                            r="14"
                                            cx="18"
                                            cy="18"
                                            strokeDasharray="45, 43"
                                            strokeDashoffset="-43"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex justify-center items-center text-sm">
                                        1 / 2 / 3
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-4 justify-center text-xs gap-2">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 bg-red-400 inline-block rounded-full mr-1"></span>
                                        <span>충돌</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 bg-yellow-400 inline-block rounded-full mr-1"></span>
                                        <span>급제동 & 급회전</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 bg-teal-300 inline-block rounded-full mr-1"></span>
                                        <span>경로 이탈</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주의사항 */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center mb-2">
                                <AiOutlineWarning className="text-yellow-500 mr-2 text-xl" />
                                <p className="font-semibold">주의사항</p>
                            </div>
                            <div className="text-sm mt-4 mx-2">
                                <div className="mb-[20px]">
                                    <p className="font-medium">1. 적재 중 시야 확보</p>
                                    <p className="text-xs text-gray-500">
                                        적재물이 운전자의 시야를 가리지 않도록 조정하세요.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium">2. 급제동 및 급회전 금지</p>
                                    <p className="text-xs text-gray-500">
                                        무거운 화물을 들고 급제동하거나 급회전하면 지게차가 전복될 위험이 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogisticsDashboard;