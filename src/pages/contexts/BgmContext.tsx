import React, { createContext, useEffect, useRef, useState } from "react";

type BgmContextType = {
  volume: number;
  setVolume: (value: number) => void;
}

const BgmContext = createContext<BgmContextType | undefined>(undefined);

const MAX = 0.25;
const DEFAULT = 25;

export function BgmProvider({ children }: { children: React.ReactNode }) {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [volumeState, setVolumeState] = useState(25);

  useEffect(() => {
    const bgm = new Audio("/audio/21-theme-pop.mp3");
    bgm.loop = true;
    bgm.volume = (DEFAULT / 100) * MAX;
    bgmRef.current = bgm;
    bgm.play().catch((e) => {
      console.error(e);
    });

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
      bgmRef.current = null;
    };
  },[]);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = (volumeState / 100) * MAX;
    }
  }, [volumeState])

  const setVolume = (value: number) => {
    setVolumeState(value);
  };

  return (
    <BgmContext.Provider
      value={{ volume: volumeState, setVolume }}
    >
      {children}
    </BgmContext.Provider>
  )
}
