import { motion } from "framer-motion"

export default function UpdateTicker() {
  return (
    <div className="w-full border-b border-neutral-700 bg-neutral-900 py-2">
      <motion.div
        className="whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity
        }}>
          v1.0.2 インベントリ画面にてレアリティの色分けおよびNew表示を行いました
      </motion.div>
    </div>
  )
}