import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";


export default function Loading() {
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
        DreamStar
      </motion.h1>
    </div>
  )
}