"use client";

import { useEffect, useRef } from "react";
import { Sedgwick_Ave_Display } from "next/font/google";

const sedgwick = Sedgwick_Ave_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sedgwick",
});

const LoaderComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle system
    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number;
      color: string;
      type: "ember" | "star";
    };

    const particles: Particle[] = [];
    const starColors = ["#ffd060", "#ffe090", "#fff4c0", "#ffb030", "#ffffff"];
    const emberColors = ["#ff2200", "#ff5500", "#ff8800", "#ffaa00"];

    // Pre-seed static stars
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0, vy: 0,
        life: Math.random() * 300,
        maxLife: 200 + Math.random() * 400,
        size: 1 + Math.random() * 2.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        type: "star",
      });
    }

    let frameCount = 0;

    const spawnEmber = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      particles.push({
        x: cx + (Math.random() - 0.5) * 180,
        y: cy + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(0.6 + Math.random() * 1.8),
        life: 0,
        maxLife: 80 + Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
        type: "ember",
      });
    };

    const draw = () => {
      frameCount++;
      const W = canvas.width;
      const H = canvas.height;

      // Clear with dark fade
      ctx.fillStyle = "rgba(6, 0, 0, 0.18)";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // ── Background deep radial glow ──────────────────────────────
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6);
      bg.addColorStop(0, "rgba(60, 5, 0, 0.55)");
      bg.addColorStop(0.4, "rgba(20, 2, 0, 0.3)");
      bg.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Crack SVG lines (drawn on canvas) ──────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(200, 30, 0, 0.18)";
      ctx.lineWidth = 1;
      const lines = [
        [[cx, cy], [cx - 155, cy - 72], [cx - 265, cy - 205]],
        [[cx, cy], [cx + 150, cy - 85], [cx + 285, cy - 225]],
        [[cx, cy], [cx + 42, cy + 72], [cx + 125, cy + 185], [cx + 200, cy + 255]],
        [[cx, cy], [cx - 125, cy + 92], [cx - 190, cy + 215]],
        [[cx, cy], [cx - 82, cy + 15], [cx - 195, cy + 45], [cx - 320, cy + 60]],
        [[cx, cy], [cx + 92, cy + 10], [cx + 258, cy + 30], [cx + 420, cy + 20]],
      ];
      lines.forEach((pts) => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
        ctx.stroke();
      });
      ctx.restore();

      // ── Concentric elliptic rings — REMOVED ──────────────────────

      // ── Particles (stars + embers) ──────────────────────────────
      if (frameCount % 2 === 0) spawnEmber();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.type === "star") {
          const pulse = 0.3 + 0.7 * Math.abs(Math.sin((p.life * 0.015) + i));
          ctx.save();
          ctx.globalAlpha = pulse * 0.9;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // ember
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.012; // slight upward acceleration
          p.vx *= 0.98;
          const prog = p.life / p.maxLife;
          const alpha = prog < 0.3 ? prog / 0.3 : (1 - prog);
          ctx.save();
          ctx.globalAlpha = alpha * 0.85;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - prog * 0.6), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#060000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* Canvas for particles, rings, cracks */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Main text content */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          userSelect: "none",
        }}
      >
        {/* ESPERANZA heading */}
        <h1
          className={sedgwick.className}
          style={{
            fontSize: "clamp(52px, 9vw, 96px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#ff3300",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "0.06em",
            textShadow: `
              0 0 4px  #fff4e0,
              0 0 12px #ff9900,
              0 0 28px #ff4400,
              0 0 56px #cc1100,
              0 0 90px #880000
            `,
            animation: "esp-flicker 3.2s ease-in-out infinite",
          }}
        >
          ESPERANZA
        </h1>

        {/* Subtitle */}
        <p
          className={sedgwick.className}
          style={{
            fontSize: "clamp(11px, 1.5vw, 15px)",
            letterSpacing: "0.35em",
            color: "rgba(255, 120, 60, 0.75)",
            margin: 0,
            textTransform: "uppercase",
            textShadow: "0 0 10px rgba(255, 80, 0, 0.4)",
            animation: "esp-fade-in 1.6s ease-out forwards",
          }}
        >
          Tech &nbsp;&bull;&nbsp; Culture &nbsp;&bull;&nbsp; Innovation
        </p>

        {/* Elegant thin progress line */}
        <div
          style={{
            width: "clamp(120px, 20vw, 220px)",
            height: "1px",
            background: "rgba(255,50,0,0.15)",
            borderRadius: "9999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, #ff4400, #ff9900, #ff4400, transparent)",
              animation: "esp-sweep 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes esp-flicker {
          0%, 100% {
            text-shadow:
              0 0 4px  #fff4e0,
              0 0 12px #ff9900,
              0 0 28px #ff4400,
              0 0 56px #cc1100,
              0 0 90px #880000;
          }
          20% {
            text-shadow:
              0 0 2px  #ffe8c0,
              0 0 10px #ff8800,
              0 0 22px #ff3300,
              0 0 48px #aa0000,
              0 0 72px #660000;
          }
          40% {
            text-shadow:
              0 0 6px  #ffffff,
              0 0 16px #ffaa00,
              0 0 36px #ff5500,
              0 0 70px #dd1100,
              0 0 100px #990000;
          }
          70% {
            text-shadow:
              0 0 3px  #fff0d0,
              0 0 10px #ff9000,
              0 0 25px #ff3800,
              0 0 52px #bb0800,
              0 0 80px #770000;
          }
        }

        @keyframes esp-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes esp-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoaderComponent;
