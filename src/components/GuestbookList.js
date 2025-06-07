"use client";

import { useEffect, useState } from "react";
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

export default function GuestbookList({ setMessageCount }) {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState("");

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

  return (
    <div className="w-full px-4 mt-12 space-y-3 max-w-sm mx-auto relative">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-md font-medium text-neutral-800">
              {msg.nickname || "익명"}
            </span>
            <button
              onClick={() => handleDelete(msg.id)}
              className="!text-sm text-red-400 hover:text-red-600 transition"
            >
              삭제
            </button>
          </div>

          <p className="mt-3 text-xs text-neutral-700 whitespace-pre-wrap">
            {msg.message}
          </p>

          <div className="text-[11px] text-neutral-400 font-light mt-2">
            {msg.createdAt?.toDate
              ? (() => {
                  const date = msg.createdAt.toDate();
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, "0");
                  const dd = String(date.getDate()).padStart(2, "0");
                  const hh = String(date.getHours()).padStart(2, "0");
                  const min = String(date.getMinutes()).padStart(2, "0");
                  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
                })()
              : "작성 중..."}
          </div>
        </div>
      ))}

      {/* ✅ 토스트 알림 (상단 표시) */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-300 text-white px-4 py-2 rounded-full shadow-lg text-sm z-50 transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}
