import Layout from "../layouts/Layout";
import CardList from "../components/CardList";

type Props = {
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
};

export default function UserCardList({user}: Props) {

  const endpoint = import.meta.env.DEV ? `/api/cards/user/1450733147867185215` : `/api/cards/user/${user?.id}`

  return (
    <Layout>
      <section className="flex p-2 h-full flex-col rounded-lg bg-[#313338]">
        <div className="self-start px-4 py-2 bg-gradient-to-r from-sky-900 to-sky-500 w-full rounded">
          <h1 className="font-bold">カード一覧</h1>
        </div>

        <div className={`mt-4 flex-1 overflow-y-auto rounded`}>
          <CardList endpoint={endpoint} />
        </div>
      </section>

    </Layout>
  )
}