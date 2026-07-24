import Layout from "../layouts/Layout";

type Props = {
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
};

export default function CardEdit({ user }: Props) {
  return (
    <>
      <Layout />
      <section className="p-4 flex h-full flex-col rounded-lg bg-[#313338]">

      </section>
    </>
  )
}