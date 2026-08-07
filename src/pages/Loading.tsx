import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

type LoadingProps = {
  progress: number;
  msg: string;
}

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
        DreamStar
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
      <img
        src="/menuCardImages/hitomaz.gif"
        className="fixed bottom-6 right-6 h-20 w-20 object-cover">

      </img>
    </div>
  )
}