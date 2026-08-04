import Layout from "../layouts/Layout";
import CardList from "../components/CardList";

export default function UserCardList() {
  return (
    <Layout>
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
        <div className="self-start px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
          <h1 className="font-bold">カード一覧</h1>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto rounded">
          <CardList />
        </div>
      </section>

    </Layout>
  )
}