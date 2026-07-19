type MenuCardProps = {
  icon: string;
  title: string;
  bgImage: string;
};

function MenuCard({ icon, title, bgImage }: MenuCardProps) {
  return (
    <div className="menu-card group">
      <div className="menu-background" style={{backgroundImage: `url(${bgImage})`}}></div>
      <div className="menu-icon">{icon}</div>
      <span className="menu-title">{title}</span>
      <div className="menu-triangle" />
    </div>
  )
}

export default function Sidebar() {

  const menues: MenuCardProps[] = [
    {
      icon: "📦",
      title: "インベントリ",
      bgImage: "/public/menuCardImages/inventory.jpg"
    },
    {
      icon: "✨",
      title: "ガチャ",
      bgImage: "/public/menuCardImages/20260719090013.png"
    },
    {
      icon: "🗡️",
      title: "CPU対戦",
      bgImage: "/public/menuCardImages/cpu.png"
    },
    {
      icon: "🌐",
      title: "ネット対戦",
      bgImage: "/public/menuCardImages/vs.png"
    }
  ]


  return (
    <aside className="w-1/3 bg-[#2b2d31] p-6 flex flex-col gap-4">
      {menues.map((menu) => (
        <MenuCard key={menu.title} icon={menu.icon} title={menu.title} bgImage={menu.bgImage}/>
      ))}
    </aside>
  )
}