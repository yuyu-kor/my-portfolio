"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function GuestbookForm() {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "guestbook"), {
      nickname: nickname || "익명",
      message,
      password,
      createdAt: serverTimestamp(),
    });

    setNickname("");
    setMessage("");
    setPassword("");
  };

  return (
    <div className="w-full py-1 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-neutral-200 rounded-lg shadow-sm p-3 space-y-2"
      >
        {/* 닉네임 + 비밀번호 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임(선택)"
            className="font-light bg-neutral-100 px-3 py-1.5 rounded text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="flex-1 w-[90px] bg-neutral-100 px-3 py-1.5 rounded text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 font-light"
            required
          />
        </div>

        {/* 메시지 입력 */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="font-light w-full bg-neutral-100 px-3 py-2 rounded text-xs placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300"
          rows={3}
          required
        />

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800 transition"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
