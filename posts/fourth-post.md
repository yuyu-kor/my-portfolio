---
title: "컴포넌트 재사용성을 고려한 UI 설계 전략"
date: "2025-06-08"
category: "Experience"
thumbnail: "/posts-thumbnail/3d-discount.png"
---

프론트엔드 개발에서 가장 중요한 원칙 중 하나는 **컴포넌트의 재사용성과 일관성**입니다.  
이번 프로젝트에서는 Zustand와 Tailwind CSS를 기반으로 **카드형 UI를 공통 컴포넌트화**하여 사용성과 유지보수성을 모두 확보했습니다.

## 🎯 문제 정의

- 중복된 레이아웃/스타일로 구성된 UI가 여러 곳에 흩어져 있었음
- 기능 추가 시 모든 컴포넌트를 각각 수정해야 하는 비효율 발생
- 디자인 일관성이 유지되지 않아 사용자 경험이 흔들림

## 💡 해결 전략

### ✅ 공통 컴포넌트화

- `/components/common/RecipeCard.jsx` 경로에 **공용 카드 UI 컴포넌트** 작성
- Props로 title, image, description, tag 등을 주입받아 유연하게 사용

```jsx
export default function RecipeCard({ title, image, description, tag }) {
  return (
    <div className="rounded-xl shadow p-4 bg-white hover:bg-gray-50 transition">
      <img
        src={image}
        alt={title}
        className="rounded-md mb-2 w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <span className="text-xs text-gray-500 italic">{tag}</span>
    </div>
  );
}
```
