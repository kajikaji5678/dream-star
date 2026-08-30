import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarVariants, cardVariants } from "./animation/animation";

type MenuCardProps = {
  icon: string;
  title: string;
  bgImage: string;
  path: string;
};

function MenuCard({ icon, title, bgImage, path }: MenuCardProps) {
  const navigate = useNavigate();

  return (
    <div className="menu-card shrink-0 rounded-xl
    relative flex flex-col bg-[#53565e] items-center justify-center"
      onClick={() => navigate(path)}>
      <div className="menu-background" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="menu-icon text-5xl pt-4">{icon}</div>
      <span className="menu-title mt-2 font-bold text-lg">{title}</span>
      <div className="menu-triangle" />
    </div>
  )
}

type Props = {
  animate?: boolean;
}

export default function Sidebar({ animate = false }: Props) {

  const menues: MenuCardProps[] = [
    {
      icon: "📦",
      title: "インベントリ",
      bgImage: "/menuCardImages/inventory2.png",
      path: "/cardlist"
    },
    {
      icon: "✨",
      title: "ガチャ",
      bgImage: "/menuCardImages/20260719090013.png",
      path: "/gacha"
    },
    {
      icon: "🗡️",
      title: "CPU対戦",
      bgImage: "/menuCardImages/cpu.png",
      path: "#"
    },
    {
      icon: "🌐",
      title: "ネット対戦",
      bgImage: "/menuCardImages/vs.png",
      path: "#"
    }
  ]


  return (
    <motion.aside
      className="w-[30%] md:w-1/3 h-full bg-[#2b2d31] p-6 flex flex-col gap-4 overflow-y-auto"
      variants={sidebarVariants}
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
    >
      {menues.map((menu, index) => (
        <motion.div
          key={menu.title}
          variants={cardVariants}
          style={{
            "--card-index": index,
          } as React.CSSProperties}
        >
          <div>
            <MenuCard
              icon={menu.icon}
              title={menu.title}
              bgImage={menu.bgImage}
              path={menu.path}
            />
          </div>
        </motion.div>
      ))}
    </motion.aside>
  )
}