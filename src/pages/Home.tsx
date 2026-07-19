import Layout from "../layouts/Layout"

export default function Home() {
  return (
    <Layout>
      <section className="rounded-lg basis-1/5 px-6 py-4 bg-[#2b2d31]">
        <h2 className="text-xl font-bold">プレーヤー情報</h2>
        <div className="flex">
          <div className="mt-4 font-bold">ユーザーネーム: kaji</div>
          <div className="ml-4 py-4 px-8 font-bold">DP: 100</div>
        </div>
      </section>

      <section className="rounded-lg flex-1 px-6 py-4 bg-[#2b2d31]">
        <h2 className="text-xl font-bold">お気に入りカード</h2>
      </section>
    </Layout>
  )
}