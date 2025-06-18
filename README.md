# 🧑‍💻 yuyu's Portfolio

프론트엔드 공부를 하며 만든 **개인 포트폴리오 웹사이트**입니다.  
개발과 마케팅을 함께 녹여낸 사이트로,  
**Next.js 기반 블로그**, **애니메이션 효과**, **익명 방명록 기능** 등을 구현했습니다.

👉 **[배포된 사이트 바로가기](https://my-portfolio-lovat-nine-85.vercel.app/)**

---

## 💡 주요 기능

- 📄 **Notion API 기반 블로그**: Notion에 작성한 글을 실시간으로 불러와 표시
- 🔍 카테고리 필터링, 키워드 실시간 검색, 무한스크롤, toast 알림림 지원
- 🗨️ Firebase 연동 익명 방명록: 비밀번호 기반 삭제 기능 포함
- ✨ 사용자 경험 중심 인터랙션: fade-in 애니메이션, 타이핑 효과, Swiper Carousel
- 📊 GA4 연동으로 데이터 기반 마케팅 가능성 고려
- ⚙️ Next.js 기반 `getStaticProps` 정적 생성 및 페이지 라우팅 구현

---

## 🛠️ 사용 기술 스택

| 분야        | 스택                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| Framework   | Next.js (Pages Router)                                                    |
| Styling     | Tailwind CSS, GmarketSans Custom Font                                     |
| 데이터 관리 | **Notion API**, Firebase Firestore                                        |
| 인터랙션    | Intersection Observer, Custom Hook (`useScrollFadeIn`, `useTypingEffect`) |
| 배포        | Vercel                                                                    |

---

## 🗂️ 주요 페이지 구성

### 🏠 Home

- 타이핑 애니메이션을 활용한 자기소개
- 최신 글, 마케팅 글, 경험 글을 카테고리별로 구분
- Notion API로 연결된 데이터 기반 콘텐츠 렌더링
- 썸네일 / 날짜 / 카테고리 표시

### 📖 About

- 타이핑 애니메이션을 활용한 자기소개
- 경험 타임라인, 자격증 카드 UI
- fade-in 애니메이션으로 사용자의 몰입감 향상

### 📄 Posts

- **Notion으로 작성한 글을 렌더링**
- 카테고리 필터 / 키워드 실시간 검색 / 무한 스크롤
- `IntersectionObserver`로 자연스러운 Lazy Load 처리

### 💬 Guestbook

- Firebase Firestore에 저장되는 **익명 방명록**
- 닉네임, 메시지, 비밀번호 입력 → 서버 타임스탬프 저장
- **비밀번호 검증 후 삭제 가능**
- Swiper 기반 캐러셀로 메시지 슬라이드
- 사용자 경험 중심의 toast 피드백 제공

---

## 📁 프로젝트 구조

```bash

├── components/             # 공통 UI 컴포넌트 (Header, Footer, Banner 등)
├── hooks/
│   └── animation/TypingText.js
├── lib/
│   ├── firebase.js         # Firebase 초기화 및 Firestore export
│   ├── notion.js           # Notion API 연동 로직
│   └── date.js             # 날짜 포맷 함수
├── pages/
│   ├── index.js            # Home
│   ├── about.js
│   ├── posts/
│   │   └── [slug].js       # Notion 블로그 상세 페이지
│   └── guestbook.js
├── public/
│   └── fonts/              # GmarketSans 폰트
└── styles/
    └── globals.css         # Tailwind 및 커스텀 스타일

```

---

🔮 향후 업데이트 예정

- 블로그 댓글 기능 추가 (Firebase + Form validation)
- 테마 토글 기능 (다크모드 / 라이트모드)
- 모바일 반응형 개선
- GA4 분석 연동 고도화
- UX 개선 실험
- 클린 코드
- SEO 최적화 계획

👩‍💻 만든 사람
이유진 (@yuyu-kor)
피드백과 응원은 언제든 환영합니다!🌱

```

```
