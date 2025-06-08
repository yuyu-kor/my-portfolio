import { getPostData, getSortedPostsData } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import { formatDate } from "@/lib/date";

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
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        className="prose"
      />
    </div>
  );
}
