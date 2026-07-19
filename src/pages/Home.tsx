import Header from "../components/Header"
import Sidebar from "../components/sidebar"

export default function Home() {
  return (
    <>
      <div className="h-screen flex  items-center">
        <div className="h-4/5 w-4/5 bg-[#313338] text-white flex flex-col mx-auto rounded-xl overflow-hidden">
          <Header />
          <div className="flex flex-1">
            <Sidebar />

            <main className="flex-1 p-6 flex flex-col space-y-6">
              <section className="rounded-lg basis-1/5 px-6 py-4 bg-[#2b2d31]">
                <h2 className="text-xl font-bold">プレーヤー情報</h2>
              </section>
              <section className="rounded-lg flex-1 px-6 py-4 bg-[#2b2d31]">
                <h2 className="text-xl font-bold">お気に入りカード</h2>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}