import Head from "next/head";

export default function SeoHead({
  title = "yuyu | 취미로 개발하는 마케터",
  description = "개발이 가능한 마케터 이유진(yuyu)의 마케터 포트폴리오 페이지입니다.",
  image = "/og-image.png",
  url = "https://my-portfolio-lovat-nine-85.vercel.app/",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="마케터, 프론트엔드, 포트폴리오, 이유진, yuyu, GA4, Firebase, Next.js"
      />
      <meta name="author" content="이유진" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={
          image.startsWith("http")
            ? image
            : `https://my-portfolio-lovat-nine-85.vercel.app${image}`
        }
      />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={
          image.startsWith("http")
            ? image
            : `https://my-portfolio-lovat-nine-85.vercel.app${image}`
        }
      />

      <link rel="icon" type="image/svg+xml" href="/favicon_yu.svg" />

      <meta
        name="google-site-verification"
        content="iwJHCq7sS9E01uwXToy1GlCHGFQ4jsqTHWhSsfxwdLI"
      />
    </Head>
  );
}
