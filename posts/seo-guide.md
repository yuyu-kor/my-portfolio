---
title: "Next.js 포트폴리오 사이트 SEO 최적화 완벽 가이드"
date: "2025-06-09"
category: "Dev"
thumbnail: "/images/seo-guide-thumbnail.png"
description: "PageSpeed Insights, Search Console, OG 설정, sitemap, robots.txt까지 한 번에 끝내는 SEO 최적화 실전 가이드"
---

# ✅ Next.js 포트폴리오 사이트 SEO 최적화 완벽 가이드

이 문서는 내가 만든 Next.js 기반 포트폴리오 사이트를 어떻게 SEO에 맞춰 최적화했는지를 **모든 단계**에서 상세히 정리한 실전 가이드입니다.

---

## 1. ✅ 기본 메타태그 및 OG(Open Graph) 설정

### 📁 `/components/SeoHead.js`

```jsx
import Head from "next/head";

export default function SeoHead({
  title = "...",
  description = "...",
  image = "...",
  url = "...",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="신입 마케터, 프론트엔드, 이유진, GA4, Firebase..."
      />
      <meta name="author" content="이유진" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" type="image/svg+xml" href="/favicon_yu.svg" />
      <meta name="google-site-verification" content="...복붙한 코드..." />
    </Head>
  );
}
```

---

## 2. 🖼 OG 썸네일 제작

- `/public/og-image.png`로 저장
- 흰 배경 + 블랙 텍스트로 "yuyu | 마케터 & 프론트엔드 포트폴리오" 디자인
- `<SeoHead>`에 절대경로로 삽입:

```html
<meta
  property="og:image"
  content="https://my-portfolio-lovat-nine-85.vercel.app/og-image.png"
/>
```

---

## 3. 🛠 Google Search Console 연결

- `URL 접두어` 방식으로 등록: `https://my-portfolio-lovat-nine-85.vercel.app`
- 소유권 인증: `<meta name="google-site-verification" ...>` 태그 삽입 → 배포 후 등록
- `sitemap.xml` 제출
- `robots.txt` 자동 생성 확인

---

## 4. 🗺 Sitemap + Robots.txt 설정

### `next-sitemap.config.js`

```js
module.exports = {
  siteUrl: "https://my-portfolio-lovat-nine-85.vercel.app",
  generateRobotsTxt: true,
};
```

### `package.json`

```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

> 이후 `npm run build` → `public/sitemap.xml`, `public/robots.txt` 자동 생성

---

## 5. ⚙️ SEO 측정 도구 정리

| 도구                  | 목적                                  | 필수 여부           |
| --------------------- | ------------------------------------- | ------------------- |
| Google Search Console | 검색 노출 상태 확인, sitemap 제출     | ✅ 필수             |
| PageSpeed Insights    | 속도, Core Web Vitals, SEO 점수 측정  | ✅ 필수             |
| Lighthouse            | 브라우저 내 UX/접근성 점검            | ⭕ 권장             |
| Ubersuggest           | 키워드, 콘텐츠 전략, 블로그 아이디어  | ⭕ 활용 가능        |
| SEMrush               | 경쟁사 분석, 백링크, 유료 키워드 분석 | ❌ 필요 없음 (유료) |
| Screaming Frog        | 전체 사이트 SEO 크롤링 점검           | ⭕ 원하면 체험 추천 |

---

## 6. 🎯 PageSpeed Insights 점수 확인

- 실제 측정 결과:
  - 성능: 100
  - 접근성: 100
  - 권장사항: 100
  - 검색엔진 최적화: 100

```plaintext
최적화가 매우 잘 되어 있어 구글에 노출되기 위한 기술적 문제는 없음.
```

---

## 7. ❗ 자주 묻는 질문 (FAQ)

### Q. PageSpeed Insights랑 Lighthouse 중에 하나만 써도 돼?

→ ✅ 네. PageSpeed Insights는 Lighthouse 기반이라 하나만 써도 충분해요.

### Q. Search Console 등록 후에 또 속성 추가해야 돼?

→ ❌ 아니요. `URL 접두어` 방식으로 등록했다면 sitemap 제출만 하면 됩니다.

### Q. og:image 미리보기 확인은 어디서?

→ [Facebook Debugger](https://developers.facebook.com/tools/debug/) 또는 [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Q. 사이트 전체를 한 번에 검사할 수 있어?

→ ❌ PageSpeed Insights는 페이지 단위. 전체 검사엔 Screaming Frog 사용 가능.

---

## ✅ 마무리 요약

- `SeoHead`로 메타태그 구성
- OG 이미지, 사이트 인증 완료
- sitemap + robots.txt 자동화
- PageSpeed 100점 달성
- 검색 노출을 위한 준비 끝!

---

📌 이 글은 이유진(yuyu)의 포트폴리오 SEO 최적화 과정을 기록한 내용입니다.
