import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type AchievementToastProps = {
  achievementKey: string;
  name: string;
  description: string;
};

export default function AchievmentToast({
  name,
  description,
  achievementKey,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const achievementImages: Record<string, string> = {
    gacha_count_100: "/scripts/achievement-image/output/hikakin_pink.png",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed right-6 bottom-6 z-50 w-[360px] rounded-sm border bg-zinc-800 backdrop-blur-md shadow-lg"
            initial={{ x: "100%", scale: 0.95, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            exit={{ x: "100%", scale: 1, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="h-1 bg-purple-500" />
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-20 w-20 shrink-0 items-center">
                <img
                  src={achievementImages[achievementKey]}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-bold tracking-[0.15em] text-purple-400">
                  Achievement Unlocked!
                </p>
                <h3 className="mb-2 truncate text-lg font-bold text-black">
                  {name}
                </h3>
                <p className="truncate text-xs text-zinc-400">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
