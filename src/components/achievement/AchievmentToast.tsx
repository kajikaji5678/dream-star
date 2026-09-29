import { motion } from "framer-motion";

export default function AchievmentToast() {
  const data = {
    name: "実績ネーム",
    description: "実績の詳細のテキストです",
  };

  return (
    <>
      <motion.div className="fixed right-6 bottom-6 z-50 w-[360px] border bg-zinc-800backdrop-blur-md">
        <div className="h-1 bg-purple-500" />
        <div className="flex items-center gap-4 p-4">
          <div className="flex h-20 w-20 shrink-0 items-center">
            <img
              src="/public/menuCardImages/Dr.srone.png"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-bold tracking-[0.15em] text-purple-400">
              Achievement Unlocked!
            </p>
            <h3 className="mb-2 truncate text-lg font-bold text-black">
              {data.name}
            </h3>
            <p className="truncate text-xs text-zinc-400">{data.description}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
