import {useEffect, useState} from "react";
import Layout from "../layouts/Layout";

export default function GachaOpening() {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosing(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [])
  return (
    <div className={`h-screen transition-transform duration-700 ease-in-out ${closing ? "translate-y-full" : "translate-y-0"}`}>
      <Layout>
        <div className="flex h-full items-center justify-center text-4xl font-bold">
          Opening.......
        </div>
      </Layout>
    </div>
  )
}