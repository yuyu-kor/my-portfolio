import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";
import { getDatabase } from "@/lib/notion";

export async function getStaticProps() {
  const notionPosts = await getDatabase();

  // Notion에서 가져온 데이터 정리
  const allPosts = notionPosts.map((post) => {
    return {
      id: post.id,
      title: post.properties?.Title?.title?.[0]?.plain_text || "제목 없음",
      slug: post.properties?.Slug?.rich_text?.[0]?.plain_text || post.id,
      date: post.properties?.Date?.date?.start || "",
      thumbnail: post.properties?.Thumbnail?.files?.[0]?.file?.url || "",
      category: post.properties?.Category?.select?.name || "Uncategorized",
    };
  });

  const recentPosts = allPosts.slice(0, 3);

  const marketingPosts = allPosts
    .filter((post) => post.category === "Marketing")
    .slice(0, 3);

  const experiencePosts = allPosts
    .filter((post) => post.category === "Experience")
    .slice(0, 3);

  return {
    props: {
      recentPosts,
      marketingPosts,
      experiencePosts,
    },
    revalidate: 60,
  };
}

export default function Home({
  recentPosts = [],
  marketingPosts = [],
  experiencePosts = [],
}) {
  const PostItem = ({ post }) => (
    <Link href={`/posts/${post.slug}`}>
      <div className="mt-2 text-lg flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
        <Image
          src={post.thumbnail || "/3d-box.png"}
          alt="썸네일"
          width={48}
          height={48}
          className="w-10 h-10 md:w-13 md:h-13 rounded-full object-contain bg-gray-100 p-1"
        />

        <p className="m-0 text-gray-800 md:text-[18px] text-sm">{post.title}</p>
        <p className="md:text-sm text-[10px] shrink-0 text-gray-400 font-light m-0">
          {post.date}
        </p>
      </div>
    </Link>
  );

  return (
    <>
      <SeoHead
        title="yuyu's portfolio"
        description="개발이 가능한 마케터 이유진(yuyu)의 이력과 학습 여정을 소개합니다."
      />
      <Banner />
      <div>
        {/* Recent Posts */}
        <div className="mb-4 p-2 md:text-xl text-sm w-fit border !border-gray-900 text-gray-700">
          Recent Posts
        </div>
        {recentPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}

        {/* Marketing */}
        <div className="mb-4 p-2 md:text-xl text-sm w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          Marketing
        </div>
        {marketingPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}

        {/* LIFE */}
        <div className="mb-4 p-2 md:text-xl text-sm w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          LIFE
        </div>
        {experiencePosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
