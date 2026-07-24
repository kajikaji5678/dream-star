import Layout from "../layouts/Layout";

const Admin_id = [
  "1450733147867185215"
]

type Props = {
  user?: {
    id: string;
    username: string;
    avatar: string | null;
  };
};

export default function Admin({user}: Props) {
  const isAdmin = user && Admin_id.includes(user.id);
  return (
    <>
      <Layout>
        {isAdmin ? (
          <h1>管理画面</h1>
        ) : (
          <h1>表示できません</h1>
        )}
      </Layout>
    </>
  )
}