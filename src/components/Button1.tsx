import { useNavigate } from "react-router-dom"

type Button1Props = {
  to: string;
  children: React.ReactNode;
}

export default function Button1({to, children}: Button1Props) {

  const navigate = useNavigate();

  return (
    <button
      className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  )
}