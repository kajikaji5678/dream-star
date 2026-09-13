import { useEffect, useRef } from "react";
import { PurpleSmoke } from "../effects/TestSmoke";

export function TestSmokeCanvasRight() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const smoke =
      new PurpleSmoke(canvas, "SP");

    smoke.start();

    return () => {
      smoke.stop();
    };
  }, []);

  return (
    <div className="smoke-canvas-right">
      <canvas
        ref={canvasRef}
      />
    </div>
  );
}

// export function TestSmokeCanvasLeft() {
//   const canvasRef =
//     useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas =
//       canvasRef.current;

//     if (!canvas) {
//       return;
//     }

//     const smoke =
//       new PurpleSmoke(canvas, "SP");

//     smoke.start();

//     return () => {
//       smoke.stop();
//     };
//   }, []);

//   return (
//     <div className="smoke-canvas-left">
//       <canvas
//         ref={canvasRef}
//       />
//     </div>
//   );
// }