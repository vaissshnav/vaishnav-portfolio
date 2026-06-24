import { useEffect, useRef } from "react";

/**
 * Particles live in DOCUMENT coordinates (absolute page position).
 * The fixed canvas renders only the visible slice each frame by
 * subtracting the current scroll offset, so particles scroll with
 * the page content rather than staying frozen in the viewport.
 *
 * Particles are completely static by default. Only pointer
 * interaction causes movement — forming clusters and connection
 * networks. When the pointer leaves, they smoothly return to
 * their original positions.
 */

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface AvoidanceBox {
  docLeft: number;
  docTop: number;
  docRight: number;
  docBottom: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cachedAvoidanceBoxes = useRef<AvoidanceBox[]>([]);
  const docHeightRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const colorsRef = useRef<{ accent: string }>({
    accent: "#cc5433",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getDocHeight = () =>
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent").trim() || "#cc5433";
      colorsRef.current = { accent };
    };
    updateColors();

    // ── track document height ───────────────────────────────────

    const updateCaches = () => {
      docHeightRef.current = getDocHeight();
    };

    const initialCacheTimeout = setTimeout(updateCaches, 300);

    const observer = new MutationObserver(updateCaches);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // ── canvas sizing ───────────────────────────────────────────

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      updateCaches();
      updateColors();

      if (particlesRef.current.length === 0) {
        initParticles();
      }
    };

    // ── spawn particles across the entire page ──────────────────

    const initParticles = () => {
      const w = window.innerWidth;
      const docH = getDocHeight();
      const vpH = window.innerHeight;

      // ~8 per viewport, min 30 — very sparse, minimal performance impact
      const viewports = docH / vpH;
      const count = Math.max(30, Math.round(viewports * 8));

      const newParticles: Particle[] = [];

      // Distribute evenly using a grid-stride pattern
      const cols = Math.ceil(Math.sqrt(count * (w / docH)));
      const rows = Math.ceil(count / cols);
      const cellW = w / cols;
      const cellH = docH / rows;

      for (let r = 0; r < rows && newParticles.length < count; r++) {
        for (let c = 0; c < cols && newParticles.length < count; c++) {
          const spawnX = cellW * c + Math.random() * cellW;
          const spawnY = cellH * r + Math.random() * cellH;

          newParticles.push({
            x: spawnX,
            y: spawnY,
            originX: spawnX,
            originY: spawnY,
            vx: 0,
            vy: 0,
            radius: 1.0 + Math.random() * 0.4,
            alpha: 0.15 + Math.random() * 0.1,
          });
        }
      }

      particlesRef.current = newParticles;
    };

    // ── initial setup ───────────────────────────────────────────

    handleResize();
    initParticles();

    // ── mouse tracking ──────────────────────────────────────────

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // ── animation loop ──────────────────────────────────────────

    let animationFrameId: number;

    const tick = () => {
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const docH = docHeightRef.current || getDocHeight();

      ctx.clearRect(0, 0, vpW, vpH);

      const visBand = 120;
      const visTop = scrollY - visBand;
      const visBot = scrollY + vpH + visBand;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const colors = colorsRef.current;

      const mouseDocX = mouse.x + scrollX;
      const mouseDocY = mouse.y + scrollY;

      const visible: Particle[] = [];
      for (const p of particles) {
        if (p.y >= visTop && p.y <= visBot) {
          visible.push(p);
        }
      }

      // ── Persistent idle connection lines (visible always) ──
      // Draw a sparse web of faint links using a selection of nearby pairs
      ctx.lineWidth = 0.2;
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const p1 = visible[i];
          const p2 = visible[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 50) {
            const t = dist / 50;
            // Very subtle idle alpha
            const alpha = (1 - t) * 0.012;

            // Boost near mouse
            let mouseBoost = 1;
            if (mouse.active) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const mDist = Math.hypot(midX - mouseDocX, midY - mouseDocY);
              if (mDist < 150) {
                mouseBoost = 1 + (1 - mDist / 150) * 3;
              }
            }

            const vx1 = p1.x - scrollX;
            const vy1 = p1.y - scrollY;
            const vx2 = p2.x - scrollX;
            const vy2 = p2.y - scrollY;
            ctx.beginPath();
            ctx.moveTo(vx1, vy1);
            ctx.lineTo(vx2, vy2);
            ctx.globalAlpha = alpha * mouseBoost;
            ctx.strokeStyle = colors.accent;
            ctx.stroke();
          }
        }
      }

      // ── Physics + render ──
      for (const p of particles) {
        if (mouse.active) {
          const dx = mouseDocX - p.x;
          const dy = mouseDocY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const t = dist / 160;
            const factor = 1 - t * t;
            const strength = factor * 0.04;
            p.vx += (dx / dist) * strength;
            p.vy += (dy / dist) * strength;
          }

          for (const other of visible) {
            if (other === p) continue;
            const dx2 = other.x - p.x;
            const dy2 = other.y - p.y;
            const dist2 = Math.hypot(dx2, dy2);
            if (dist2 > 0 && dist2 < 60) {
              const equilibrium = 30;
              const displacement = dist2 - equilibrium;
              const stiffness = 0.002;
              const force = displacement * stiffness;
              p.vx += (dx2 / dist2) * force;
              p.vy += (dy2 / dist2) * force;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          p.vx *= 0.95;
          p.vy *= 0.95;

          const speed = Math.hypot(p.vx, p.vy);
          const maxSpeed = 0.5;
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }
        } else {
          if (p.x !== p.originX || p.y !== p.originY) {
            const dx = p.originX - p.x;
            const dy = p.originY - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0.5) {
              const springStrength = 0.01;
              const dampFactor = 0.85;
              p.vx += dx * springStrength;
              p.vy += dy * springStrength;
              p.vx *= dampFactor;
              p.vy *= dampFactor;
              p.x += p.vx;
              p.y += p.vy;
            } else {
              p.x = p.originX;
              p.y = p.originY;
              p.vx = 0;
              p.vy = 0;
            }
          }
        }

        const screenX = p.x - scrollX;
        const screenY = p.y - scrollY;

        if (screenX < -20 || screenX > vpW + 20 || screenY < -20 || screenY > vpH + 20) continue;

        // Core dot
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initialCacheTimeout);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}