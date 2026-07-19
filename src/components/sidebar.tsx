import { useNavigate } from "react-router-dom";

type MenuCardProps = {
  icon: string;
  title: string;
  bgImage: string;
  path: string;
};

function MenuCard({ icon, title, bgImage, path }: MenuCardProps) {
  const navigate = useNavigate();

  return (
    <div className="menu-card rounded-xl
    relative flex flex-col bg-[#53565e] items-center justify-center" 
    onClick={() => navigate(path)}>
      <div className="menu-background" style={{backgroundImage: `url(${bgImage})`}}></div>
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
      bgImage: "/menuCardImages/inventory.jpg",
      path: "#"
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
    <aside className="w-1/3 bg-[#2b2d31] p-6 flex flex-col gap-4">
      {menues.map((menu) => (
        <MenuCard key={menu.title} icon={menu.icon} title={menu.title} bgImage={menu.bgImage} path={menu.path}/>
      ))}
    </aside>
  )
}