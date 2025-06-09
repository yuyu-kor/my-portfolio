import Head from "next/head";

export default function SeoHead({
  title = "이유진 | 마케터 & 프론트엔드 개발자",
  description = "GA4, Firebase, Next.js 기반 프로젝트를 담은 마케터 이유진의 포트폴리오입니다.",
  image = "/og-image.png",
  url = "https://my-portfolio-lovat-nine-85.vercel.app/",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="신입 마케터, 프론트엔드, 포트폴리오, 이유진, yuyu, GA4, Firebase, React, Next.js, 프로젝트"
      />
      <meta name="author" content="이유진" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://my-portfolio-lovat-nine-85.vercel.app/og-image.png"
      />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://my-portfolio-lovat-nine-85.vercel.app/og-image.png"
      />

      <link rel="icon" type="image/svg+xml" href="/favicon_yu.svg" />

      <meta
        name="google-site-verification"
        content="iwJHCq7sS9E01uwXToy1GlCHGFQ4jsqTHWhSsfxwdLI"
      />
    </Head>
  );
}
