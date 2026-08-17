import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

type LoadingProps = {
  progress: number;
  msg: string;
}

const randomLoadingTips = [
  "DREAMキャラは倒すと2ポイント！",
  "「前衛」に移動できるキャラでアタッカーを守ろう",
  "「消費ポイント」は計画的に",
  "時には「逃げる」にリソースを割り振ろう",
  "一発逆転！DREAMキャラ！",
  "フロントエンドの技術持ってる人、開発手伝って欲しいな(´・ω・)",
  "「貫通ダメージ」は鉄壁シールドの超過防護やダメージ減少バフを無視する",
  "相手の弱点を突くと＋2ダメージ！",
  "「貫通ダメージ」は鉄壁シールドの超過防護やダメージ減少バフを無視する",
  "「追撃」や「SKILL」によるダメージにダメージ増加バフは乗らない"
]


const randomIndex = Math.floor(Math.random() * randomLoadingTips.length);

export default function Loading({ progress, msg }: LoadingProps) {

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-950 text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}>
        <LoaderCircle size={48}></LoaderCircle>
      </motion.div>
      <motion.h1
        className="mt-6 text-5xl font-bold tracking-[0.1em]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        DreamStarLight
      </motion.h1>
      <p className="mt-4 text-center text-gray-300">
        {progress}%
      </p>
      <div className="h-3 w-80 overflow-hidden rounded-full bg-neutral-800">
        <motion.div className="h-full rounded-full bg-gradient-to-r 
        from-cyan-400 via-blue-500 to-violet-500 transition-all duration-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}>

        </motion.div>
      </div>
      <p className="mt-2 text-center text-gray-300">
        {msg}
      </p>
      <p className="mt-2 text-center text-gray-300">
        {randomLoadingTips[randomIndex]}
      </p>
      <img
        src="/menuCardImages/hitomaz.gif"
        className="fixed bottom-6 right-6 h-20 w-20 object-cover">

      </img>
    </div>
  )
}