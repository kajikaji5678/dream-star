import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

type MenuCardProps = {
  icon: string;
  title: string;
  bgImage: string;
  path: string;
};

const sidebarVariants: Variants = {
  hidden: {
    x: "-100%",
  },

  visible: {
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",

      // asideが完全に入ってから子要素開始
      when: "beforeChildren",

      // 最初のカードまで少し待つ
      delayChildren: 0.1,
      // カードを順番に出す
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    rotate: 45
  },

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
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

export default function Sidebar() {

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
      className="w-1/3 h-full bg-[#2b2d31] p-6 flex flex-col gap-4 overflow-y-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
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