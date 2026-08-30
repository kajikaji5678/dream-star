import type { Variants } from "framer-motion";

export const sidebarVariants: Variants = {
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

export const cardVariants: Variants = {
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