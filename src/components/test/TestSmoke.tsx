import { useEffect, useRef } from "react";
// import { PurpleSmoke } from "../effects/TestSmoke";

export function TestSmokeCanvas() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    // const smoke =
    //   new PurpleSmoke(canvas);

    // smoke.start();

    // return () => {
    //   smoke.stop();
    // };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
    />
  );
}