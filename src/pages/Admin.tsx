import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import CardList from "../components/CardList";

const Admin_id = [
  "1450733147867185215",
  "687875015227605016",
  "884440765332328468"
]

type Props = {
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
};


export default function Admin({ user }: Props) {
  const navigate = useNavigate();
  const isAdmin = user && Admin_id.includes(user.id);
  return (
    <Layout>
      {isAdmin ? (
        <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">
          <div className="self-start px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
            <h1 className="font-bold">カード一覧</h1>
          </div>
          <div className="mt-4 flex-1 overflow-y-auto rounded">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 first:mt-0">
              {/* コンポーネントに改良、trueを持たせる */}
              <CardList editable={true}></CardList>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => { navigate(`/admin/cards/add`) }}
            >
              追加する
            </button>
          </div>
        </section>
      ) : (
        <section className="p-4 flex h-full items-center justify-center rounded-lg bg-[#313338] text-white">
          <h1 className="text-xl font-bold">管理者限定</h1>
        </section>
      )}
    </Layout>
  )
}