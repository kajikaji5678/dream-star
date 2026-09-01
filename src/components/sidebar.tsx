import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarVariants, cardVariants } from "./animation/animation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCardFilter } from "@/context/useCardfilter";

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


  const { sort, setSort, rarity, setRarity } = useCardFilter();

  const location = useLocation();
  const isCardList = location.pathname === "/cardlist";

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
    (isCardList ? (
      <motion.aside
        className="w-1/4 bg-[#2b2d31] p-4 flex flex-col gap-4 overflow-y-auto"
        variants={sidebarVariants}
        initial={animate ? "hidden" : false}
        animate={animate ? "visible" : false}
      >
        <section>
          <h2 className="mb-2 text-lg font-bold">
            ソート
          </h2>
          <div className="flex flex-col gap-3">
            <Select value={rarity} onValueChange={(value) => { if (value !== null) setRarity(value) }}>
              <SelectTrigger>
                <SelectValue placeholder="レア度"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rarity-desc">
                  レア度: 高い順
                </SelectItem>
                <SelectItem value="rarity-asc">
                  レア度: 低い順
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(value) => { if (value !== null) setSort(value) }}>
              <SelectTrigger>
                <SelectValue placeholder="所持枚数"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owned-desc">
                  所持枚数: 多い順
                </SelectItem>
                <SelectItem value="owned-asc">
                  所持枚数: 少ない順
                </SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="攻撃力(準備中)"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attack-desc">
                  攻撃力: 高い順
                </SelectItem>
                <SelectItem value="attack-asc">
                  攻撃力: 低い順
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <section>
            <h2 className="mt-4 mb-2 text-lg font-bold">
              絞り込み
            </h2>
            <div className="flex flex-col gap-3">
              <Input placeholder="カード名で検索" />
              {/* <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="type-all" />
                  <label htmlFor="type-all">すべて</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="type-all" />
                  <label htmlFor="type-all"></label>
                </div>
              </RadioGroup> */}
            </div>
          </section>
        </section>
      </motion.aside>
    )
      : (
        <motion.aside
          className="w-[25%] h-full bg-[#2b2d31] p-6 flex flex-col gap-4 overflow-y-auto"
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
    )
  )
}