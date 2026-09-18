import { CardFilterProvider } from "@/context/CardFilterProvider";
import Header from "../components/Header"
import Sidebar from "../components/sidebar"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  ticket?: React.ReactNode;
  animateSidebar?: boolean;
}

export default function Layout({ children, ticket, animateSidebar }: Props) {

  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate(`/cards/${id}/details`);
    }, 500);
  }
  return (
    <>
      <CardFilterProvider>
        <div className="h-screen flex items-center">
          <div className="h-[90%] w-[90%] bg-[#313338] text-white flex flex-col mx-auto rounded-xl overflow-hidden">
            <Header />
            {ticket}
            <div className="flex flex-1 min-h-0">
              <Sidebar animate={animateSidebar} />
              <main className="flex-1 min-h-0 p-3">
                {children}
              </main>
            </div>
          </div>
        </div>
      </CardFilterProvider>
    </>
  )
}