export class PurpleSmokeParticle {
  private canvas: HTMLCanvasElement;

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

  constructor(canvas: HTMLCanvasElement) {
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

    this.reset();
  }

  reset(): void {
    this.x =
      this.canvas.width / 2 +
      (Math.random() - 0.5) * 80;

    this.y =
      this.canvas.height * 0.75;

    this.size =
      20 + Math.random() * 35;

    this.vx =
      (Math.random() - 0.5) * 0.8;

    this.vy =
      -0.5 - Math.random() * 1.2;

    this.life = 0;

    this.maxLife =
      100 + Math.random() * 100;

    this.alpha =
      0.15 + Math.random() * 0.2;

    this.rotation =
      Math.random() * Math.PI * 2;

    this.rotationSpeed =
      (Math.random() - 0.5) * 0.02;
  }

  update(): boolean {
    this.life++;

    this.x += this.vx;
    this.y += this.vy;

    this.vx +=
      (Math.random() - 0.5) * 0.03;

    this.vx *= 0.99;

    this.size += 0.15;

    this.rotation +=
      this.rotationSpeed;

    return this.life < this.maxLife;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const progress =
      this.life / this.maxLife;

    let alpha = this.alpha;

    if (progress < 0.2) {
      alpha *= progress / 0.2;
    }

    if (progress > 0.7) {
      alpha *=
        1 - (progress - 0.7) / 0.3;
    }

    ctx.save();

    ctx.translate(
      this.x,
      this.y
    );

    ctx.rotate(
      this.rotation
    );

    const gradient =
      ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        this.size
      );

    gradient.addColorStop(
      0,
      `rgba(180, 80, 255, ${alpha})`
    );

    gradient.addColorStop(
      0.5,
      `rgba(120, 40, 200, ${alpha * 0.6})`
    );

    gradient.addColorStop(
      1,
      `rgba(70, 0, 120, 0)`
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
      0,
      0,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
  }
}


export class PurpleSmoke {
  private canvas: HTMLCanvasElement;
  private particles: PurpleSmokeParticle[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  resize(): void {
    this.canvas.width =
      this.canvas.clientWidth;

    this.canvas.height =
      this.canvas.clientHeight;
  }

  spawn(): void {
    for (let i = 0; i < 3; i++) {
      this.particles.push(
        new PurpleSmokeParticle(
          this.canvas
        )
      );
    }
  }

  animate(): void {
    const ctx =
      this.canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.spawn();

    for (
      let i = this.particles.length - 1;
      i >= 0;
      i--
    ) {
      const particle =
        this.particles[i];

      const alive =
        particle.update();

      if (!alive) {
        this.particles.splice(i, 1);
        continue;
      }

      particle.draw(ctx);
    }

    this.animationId =
      requestAnimationFrame(
        () => this.animate()
      );
  }

  start(): void {
    this.resize();
    this.animate();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(
        this.animationId
      );

      this.animationId = null;
    }
  }
}