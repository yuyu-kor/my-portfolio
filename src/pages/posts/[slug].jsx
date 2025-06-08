import { getPostData, getSortedPostsData } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import { formatDate } from "@/lib/date";
import Image from "next/image";

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug);
  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        ...post,
        contentHtml,
      },
    },
  };
}

export default function PostDetail({ post }) {
  return (
    <div className="max-w-3xl mx-auto py-14">
      {/* 썸네일 */}
      {post.thumbnail && (
        <div className="mb-8 w-16 h-16 relative">
          <Image
            src={post.thumbnail}
            alt="썸네일"
            width={70}
            height={70}
            className="rounded-xl object-cover"
          />
        </div>
      )}

      {/* 카테고리 */}
      {post.category && (
        <div className="text-sm text-gray-400 mb-2">{post.category}</div>
      )}

      {/* 제목 */}
      <h3 className="text-gray-900 mb-2 leading-snug">{post.title}</h3>

      {/* 날짜 */}
      <p className="text-sm font-light text-gray-500 mb-8 text-right">
        {formatDate(post.date)}
      </p>

      {/* 본문 */}
      <hr className="!mb-15 !border-gray-400" />
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  );
}
