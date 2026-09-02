import LiquidGraph from "@/components/animation/LiquidGraph";
import Layout from "@/layouts/Layout";
import type { User } from "@/types/ user";

export default function Data({ user }: User) {
  return (
    <Layout>
      <section className="rounded-lg h-full flex flex-col px-6 py-4 bg-[#2b2d31]">
        <div className="self-start px-4 py-2 mb-4 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
          <h1 className="font-bold">ユーザーデータ</h1>
        </div>
        <div className="flex flex-1 gap-4">
          <div className="h-full w-1/3 rounded bg-[#313338]">
            <div className="h-1/2">
              <LiquidGraph value={80}/>
            </div>
          </div>
          <div className="h-full w-2/3 rounded bg-[#313338]">

          </div>
        </div>
      </section>
    </Layout>
  )
}