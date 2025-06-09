import Banner from "@/components/Banner";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

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
  };
}

export default function Home({
  recentPosts = [],
  marketingPosts = [],
  experiencePosts = [],
}) {
  const PostItem = ({ post }) => (
    <Link href={`/posts/${post.slug}`} className="block">
      <div className="mt-2 text-lg flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
        <Image
          src={post.thumbnail || "/3d-box.png"}
          alt="썸네일"
          width={48}
          height={48}
          className="w-15 h-15 rounded-full object-contain bg-gray-100 p-2"
        />
        <p className="m-0">{post.title}</p>
        <p className="text-sm text-gray-500 font-light m-0">{post.date}</p>
      </div>
    </Link>
  );

  return (
    <>
      <SeoHead
        title="About | yuyu 포트폴리오"
        description="마케터이자 프론트엔드 개발자인 이유진(yuyu)의 이력과 학습 여정을 소개합니다."
      />
      <Banner />
      <div>
        {/* Recent Posts */}
        <div className="mb-4 p-2 text-xl w-fit border !border-gray-900 text-gray-700">
          Recent Posts
        </div>
        {recentPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}

        {/* Case Study */}
        <div className="mb-4 p-2 text-xl w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          Case Study
        </div>
        {marketingPosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}

        {/* LIFE */}
        <div className="mb-4 p-2 text-xl w-fit border !border-zinc-700 text-white bg-zinc-700 mt-5">
          LIFE
        </div>
        {experiencePosts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
