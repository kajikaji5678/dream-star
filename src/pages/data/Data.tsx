import Layout from "@/layouts/Layout";
import type { User } from "@/types/ user";

export default function Data({ user }: User) {
  return (
    <Layout>
      <section className="rounded-lg h-full px-6 py-4 bg-[#2b2d31]">
        <div className="self-start px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
          <h1 className="font-bold">ユーザーデータ</h1>
        </div>
        <div className="flex">
          <div className="mt-4 font-bold">ユーザーネーム: {user?.username ?? "未ログイン"}</div>
          <div className="ml-4 py-4 px-8 font-bold">DP: </div>
        </div>
      </section>
    </Layout>
  )
}