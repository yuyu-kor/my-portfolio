# 🧑‍💻 yuyu's Portfolio

프론트엔드 공부하면서 만든 포트폴리오 사이트입니다.

> ✅ 본 사이트는 **Next.js (pages router)** 기반으로 구축되었으며, **GA4**, **Firebase**, **Tailwind CSS**, **Markdown**, **Swiper Carousel** 등을 활용하였습니다.

---

## 🔧 사용 기술 스택

- **Framework**: Next.js (Pages Router)
- **Styling**: Tailwind CSS, 커스텀 폰트 (`GmarketSans`)
- **Database**: Firebase Firestore
- **Markdown**: gray-matter, remark-html
- **Carousel**: Swiper.js
- **Animation**: Intersection Observer + Custom Hook (`useScrollFadeIn`)
- **Deployment**: Vercel

---

## 🗂️ 주요 기능

### 🏠 Home

- `getStaticProps`를 활용하여 최근 글, 마케팅 글, 경험 글을 각각 카테고리로 구분해 표시합니다.
- 포스트 데이터는 Markdown 파일에서 자동으로 로딩되며, 커스텀 썸네일, 날짜, 카테고리를 표시합니다.

### 📄 Posts

- 카테고리 필터링 및 키워드 검색 기능 탑재
- 검색어 하이라이팅 기능 적용 (`<mark>` 또는 `<span>` bold 처리)
- 무한 스크롤 방식으로 게시물 점진적 로딩 (`IntersectionObserver`)
- `markdown`으로 작성된 글 본문을 HTML로 렌더링 (`remark`, `gray-matter` 사용)

### 📖 About

- 타이핑 효과로 자기소개 (`useTypingEffect` 커스텀 훅 사용)
- 경험 정보는 타임라인 형태로 렌더링
- 자격증 정보는 카드 UI로 구성
- 각 섹션은 Intersection Observer 기반 fade-in 애니메이션 적용

### 💬 Guestbook

- Firebase Firestore에 저장되는 **익명 방명록**
- 닉네임, 메시지, 비밀번호 입력 → 서버 타임스탬프 저장
- **비밀번호 검증 후 삭제 가능**
- Swiper 기반 캐러셀로 방명록 메시지를 페이징하여 보여줌
- 사용자에게 **toast** 알림으로 피드백 제공

---

## 📁 프로젝트 구조

```bash
.
├── components/             # 공통 UI 컴포넌트 (Header, Footer, Banner 등)
├── hooks/
│   ├── animation/TypingText.js
│   └── useScrollFadeIn.js
├── lib/
│   ├── firebase.js         # Firebase 초기화 및 Firestore export
│   ├── posts.js            # Markdown 파싱 및 정렬 유틸
│   └── date.js             # 날짜 포맷 함수
├── pages/
│   ├── index.js            # Home
│   ├── about.js
│   ├── posts/
│   │   └── [slug].js       # Markdown 상세 페이지
│   └── guestbook.js
├── posts/                  # markdown 파일 저장 경로
├── public/
│   └── fonts/              # GmarketSans 커스텀 폰트
└── styles/
    └── globals.css         # Tailwind, 스크롤바 스타일 포함

---

📌 마케팅 시선으로 만든 기능들
GA4와 SQL 학습 기록을 기반으로, 데이터 기반 마케팅 프로젝트 진행 가능성 어필

성과 기록 및 경력 요소를 카드형 인터페이스와 타임라인으로 시각화

사용자 경험 개선을 위한 애니메이션, 트렌디한 인터랙션, 라이트 디자인 적용

🔗 배포 주소
👉 https://my-portfolio-lovat-nine-85.vercel.app/


감사합니다!
더 많은 콘텐츠와 성장을 위해 꾸준히 업데이트할 예정입니다.
```
