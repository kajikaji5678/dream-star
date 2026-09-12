type Rarity = "SP" | "R" | "DREAM" | "DR" | "DXR";

const Colors: Record<Rarity, [number, number, number]> = {
  SP: [50, 150, 255],
  R: [180, 80, 255],
  DREAM: [255, 220, 50],
  DR: [255, 80, 150],
  DXR: [255, 255, 255]
}

export class PurpleSmokeParticle {
  private canvas: HTMLCanvasElement

  x: number;
  y: number;
  size: number;

  vx: number;
  vy: number;

  life: number;
  maxLife: number;

  alpha: number;

  rotation: number;
  rotationSpeed: number;

  private rarity: Rarity;

  constructor(canvas: HTMLCanvasElement, rarity: Rarity) {
    this.canvas = canvas;

    this.x = 0;
    this.y = 0;
    this.size = 0;

    this.vx = 0;
    this.vy = 0;

    this.life = 0;
    this.maxLife = 0;

    this.alpha = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;

    this.rarity = rarity

    this.reset()
  }

  //* 初期状態
  reset(): void {

    //* 座標
    /// x座標はとりあえずまんなか付近から
    this.x =
      this.canvas.width / 2 + (Math.random() - 0.5) * 80;

    /// y座標はしたから25%の場所
    this.y =
      this.canvas.height * 0.75;

    this.size =
      20 + Math.random() * 35;

    //* 加速度
    /// -0.4 ~ 0.4
    this.vx =
      (Math.random() - 0.5) * 0.8;

    /// -0.5 ~ 1.7
    this.vy =
      -0.5 - Math.random() * 1.2;

    //* 生存時間
    this.life = 0;
    this.maxLife = 100 + Math.random() * 100;

    //* 物体の回転
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  //* 1フレーム更新
  update(): boolean {
    this.life++;

    this.x += this.vx;
    this.y += this.vy;

    /// 横方向ランダム
    this.vx += (Math.random() - 0.5) * 0.03;
    /// 空気抵抗
    this.vx *= 0.99
    /// 煙を少し大きくする
    this.size += 0.15;

    return this.life < this.maxLife;
  }

  //* 実際に描画する処理
  draw(ctx: CanvasRenderingContext2D): void {
    const progress = this.life / this.maxLife;
    let alpha = this.alpha;

    // 0 ~ 20%の区間にて透明度を0 ~ 100にしている
    if (progress < 0.2) alpha *= progress / 0.2;
    if (progress > 0.7) alpha *= 1 - (progress - 0.7) / 0.3;

    ctx.save();
    ctx.translate(this.x, this.y);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);

    const [r, g, b] = Colors[this.rarity];

    if (this.rarity === "DXR") {
      // DXRだけカラフルな煙
      gradient.addColorStop(
        0,
        `rgba(255, 80, 80, ${alpha})`
      );

      gradient.addColorStop(
        0.25,
        `rgba(255, 220, 80, ${alpha * 0.8})`
      );

      gradient.addColorStop(
        0.5,
        `rgba(80, 255, 180, ${alpha * 0.6})`
      );

      gradient.addColorStop(
        0.75,
        `rgba(100, 160, 255, ${alpha * 0.35})`
      );

      gradient.addColorStop(
        1,
        `rgba(220, 100, 255, 0)`
      );
    } else {
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`)
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    }

    // 実際に色塗り
    ctx.fillStyle = gradient;
    // 作成開始
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class PurpleSmoke {
  private canvas: HTMLCanvasElement;
  private rarity: Rarity;
  private particles: PurpleSmokeParticle[] = [];
  private animationId: number | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    rarity: Rarity,
  ) {
    this.canvas = canvas;
    this.rarity = rarity;
  }

  //* Canvasを実際の表示サイズに合わせる関数
  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  //* 新しい煙を生み出す関数
  spawn() {
    for (let i = 0; i < 3; i++) {
      this.particles.push(
        new PurpleSmokeParticle(
          this.canvas,
          this.rarity
        )
      );
    }
  }

  //~ 毎フレーム行う処理を全部まとめたもの
  animate = () => {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    /// 前のフレームを透明にする
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    /// 新しい煙を作る
    this.spawn();
    /// 既存の煙をupdateもしくはdrawする(動かす)
    this.particles = this.particles.filter((particle) => {
      const alive = particle.update();
      if (alive) particle.draw(ctx);
      return alive
    });
    // 延々と繰り返す
    this.animationId = requestAnimationFrame(this.animate);
  }

  start() {
    this.resize();
    this.animate();
  }
  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null
    }
  }
}