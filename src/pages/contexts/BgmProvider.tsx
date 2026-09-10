import React, { useEffect, useRef, useState } from "react";
import { BgmContext } from "./BgmContext";



const MAX = 0.25;
const DEFAULT = 25;

export function BgmProvider({ children }: { children: React.ReactNode }) {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [volumeState, setVolumeState] = useState(25);

  //* BGM作成
  useEffect(() => {
    // 開始時
    const bgm = new Audio("/audio/21-theme-pop.mp3");
    bgm.loop = true;
    bgm.volume = (DEFAULT / 100) * MAX;
    bgmRef.current = bgm;
    bgm.play().catch((e) => {
      console.error(e);
    });

    // 終了時
    return () => {
      bgm.pause();
      bgm.currentTime = 0;
      bgmRef.current = null;
    };
  }, []);

  //* 音量が変わるとAudioに反映させる
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
