import { getDatabase } from "@/lib/notion";
import Link from "next/link";

export async function getStaticProps() {
  const posts = await getDatabase();

  const filteredPosts = posts.filter(
    (post) => post.properties?.Slug?.rich_text?.[0]?.plain_text
  );

  return { props: { posts: filteredPosts }, revalidate: 60 };
}

export default function PostsPage({ posts }) {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">블로그 목록</h1>
      <ul className="space-y-4">
        {posts.map((post) => {
          const slug = post.properties?.Slug?.rich_text?.[0]?.plain_text;
          const title =
            post.properties?.Title?.title?.[0]?.plain_text || "제목 없음";
          const date = post.properties?.Date?.date?.start || "";

          return (
            <li key={post.id}>
              <Link href={`/posts/${slug}`} className="text-xl hover:underline">
                {title}
              </Link>
              <p className="text-sm text-gray-500">{date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
