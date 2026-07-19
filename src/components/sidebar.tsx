type MenuCardProps = {
  icon: string;
  title: string;
};

function MenuCard({ icon, title }: MenuCardProps) {
  return (
    <div className="group flex-1 bg-[#404249] rounded-xl flex flex-col items-center justify-center hover:bg-[#5865f2] cursor-pointer">
      <div className="text-4xl transition-transform duration-300 group-hover:scale-125">{icon}</div>
      <span className="mt-2 font-bold group-hover:scale-125 transition-transform duration-300">{title}</span>
    </div>
  )
}

export default function Sidebar() {

  const menues: MenuCardProps[] = [
    {
      icon: "📦",
      title: "インベントリ"
    },
    {
      icon: "✨",
      title: "ガチャ"
    },
    {
      icon: "🗡️",
      title: "CPU対戦"
    },
    {
      icon: "🌐",
      title: "ネット対戦"
    }
  ]


  return (
    <aside className="w-1/3 bg-[#2b2d31] p-6 flex flex-col gap-4">
      {menues.map((menu) => (
        <MenuCard key={menu.title} icon={menu.icon} title={menu.title}/>
      ))}
    </aside>
  )
}