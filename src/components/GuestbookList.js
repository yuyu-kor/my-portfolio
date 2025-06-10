"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function GuestbookList({ setMessageCount }) {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
      setMessageCount(data.length);
    });
    return () => unsubscribe();
  }, [setMessageCount]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDelete = async (id) => {
    const inputPw = prompt("비밀번호를 입력해주세요");
    if (!inputPw) return;

    const targetRef = doc(db, "guestbook", id);
    const targetSnap = await getDoc(targetRef);
    const savedPw = targetSnap.data().password;

    if (inputPw === savedPw) {
      await deleteDoc(targetRef);
      setToast("✅ 삭제되었습니다!");
    } else {
      setToast("❌ 비밀번호가 틀렸습니다!");
    }
  };

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const totalSlides = Math.ceil(messages.length / 2);

  return (
    <div className="w-full px-4 mt-12 max-w-screen-sm mx-auto relative">
      {/* 🔄 Navigation 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <button
          ref={prevRef}
          disabled={activeIndex === 0}
          className={`text-xl px-2 transition ${
            activeIndex === 0
              ? "text-gray-300 cursor-not-allowed opacity-50"
              : "text-gray-500 hover:text-black"
          }`}
        >
          ←
        </button>
        <button
          ref={nextRef}
          disabled={activeIndex === totalSlides - 1}
          className={`text-xl px-2 transition ${
            activeIndex === totalSlides - 1
              ? "text-gray-300 cursor-not-allowed opacity-50"
              : "text-gray-500 hover:text-black"
          }`}
        >
          →
        </button>
      </div>

      {/* 🌀 Swiper 캐러셀 */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {chunkArray(messages, 2).map((chunk, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex gap-4">
              {chunk.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm basis-0 flex-1 min-w-0"
                >
                  <div className="flex items-center justify-between mb-1 flex-nowrap overflow-hidden">
                    <span
                      className="text-md font-medium text-neutral-800 truncate max-w-[70%]"
                      title={msg.nickname}
                    >
                      {msg.nickname || "익명"}
                    </span>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="!text-sm text-red-400 hover:text-red-600 transition whitespace-nowrap ml-2 shrink-0"
                    >
                      삭제
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-neutral-700 whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>

                  <div className="text-[11px] text-neutral-400 font-light mt-4">
                    {msg.createdAt?.toDate
                      ? (() => {
                          const date = msg.createdAt.toDate();
                          const yyyy = date.getFullYear();
                          const mm = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const dd = String(date.getDate()).padStart(2, "0");
                          const hh = String(date.getHours()).padStart(2, "0");
                          const min = String(date.getMinutes()).padStart(
                            2,
                            "0"
                          );
                          return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
                        })()
                      : "작성 중..."}
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ⚪ 하단 점(dot) 표시 */}
      <div className="custom-pagination mt-4 flex justify-center space-x-2"></div>

      {/* ✅ 토스트 알림 */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-300 text-white px-4 py-2 rounded-full shadow-lg text-sm z-50 transition-all duration-300">
          {toast}
        </div>
      )}

      {/* 🎨 Swiper 점 색상 커스터마이징 */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background-color: #d1d5db;
          opacity: 1;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
}
