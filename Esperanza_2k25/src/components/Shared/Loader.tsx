"use client";

import { useEffect, useRef, useState } from "react";

const LoaderComponent = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const dripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const word = "ESPERANZA";

    // Letters
    const lettersEl = lettersRef.current;
    if (lettersEl) {
      lettersEl.innerHTML = "";
      word.split("").forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "fire-letter";
        span.textContent = ch;
        span.style.setProperty("--dur", 2.6 + Math.random() * 1.4 + "s");
        span.style.setProperty("--delay", i * 0.22 + "s");
        lettersEl.appendChild(span);
      });
    }

    // Drips
    const dripEl = dripRef.current;
    if (dripEl) {
      dripEl.innerHTML = "";
      const heights = [10, 14, 20, 28, 38, 48, 38, 28, 20, 14, 10, 8, 6];
      heights.forEach((h, i) => {
        const d = document.createElement("div");
        d.className = "drip-seg";
        d.style.setProperty("--bh", h + "px");
        d.style.setProperty("--dd", 1.6 + Math.random() * 1.2 + "s");
        d.style.setProperty("--dl", i * 0.13 + "s");
        dripEl.appendChild(d);
      });
    }

    // Stars
    const starsEl = starsRef.current;
    if (starsEl) {
      starsEl.innerHTML = "";
      const starCols = ["#ffd060", "#ffe090", "#fff4c0", "#ffb030", "#ffffff"];
      for (let i = 0; i < 60; i++) {
        const sz = 3 + Math.random() * 7;
        const col = starCols[Math.floor(Math.random() * starCols.length)];
        const clipPath =
          Math.random() > 0.5
            ? "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"
            : "polygon(50% 0%,54% 46%,100% 50%,54% 54%,50% 100%,46% 54%,0% 50%,46% 46%)";

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
          position:absolute;
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;
          animation: starTwinkle ${2 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 6}s;
          --lo:${0.25 + Math.random() * 0.45};
        `;

        const inner = document.createElement("div");
        inner.style.cssText = `
          width:${sz}px;
          height:${sz}px;
          background:${col};
          clip-path:${clipPath};
        `;

        wrapper.appendChild(inner);
        starsEl.appendChild(wrapper);
      }
    }

    // Embers
    const embersEl = embersRef.current;
    if (embersEl) {
      embersEl.innerHTML = "";
      const emberCols = ["#ff2200", "#ff5500", "#ff8800", "#ffaa00", "#dd1100"];
      for (let i = 0; i < 25; i++) {
        const e = document.createElement("div");
        const sz = 2 + Math.random() * 5;
        const col = emberCols[Math.floor(Math.random() * emberCols.length)];
        e.style.cssText = `
          position:absolute;
          border-radius:50%;
          left:${20 + Math.random() * 60}%;
          bottom:${10 + Math.random() * 40}%;
          width:${sz}px;
          height:${sz}px;
          background:${col};
          box-shadow:0 0 ${sz + 3}px ${col};
          animation: emberUp ${3 + Math.random() * 5}s ease-out infinite ${Math.random() * 6}s;
          opacity:0;
          --ex:${(Math.random() - 0.5) * 90}px;
        `;
        embersEl.appendChild(e);
      }
    }

    // Rings
    const ringsEl = ringsRef.current;
    if (ringsEl) {
      ringsEl.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const r = document.createElement("div");
        const sz = 100 + i * 55;
        r.style.cssText = `
          position:absolute;
          border-radius:50%;
          border:1px solid rgba(200,30,0,0.25);
          width:${sz}px;
          height:${sz * 0.5}px;
          left:50%;
          top:58%;
          margin-left:${-sz / 2}px;
          margin-top:${-(sz * 0.5) / 2}px;
          animation: ringOut ${5 + i * 1.5}s ease-out infinite ${i * 1.3}s;
          pointer-events:none;
          z-index:1;
        `;
        ringsEl.appendChild(r);
      }
    }

    return () => {};
  }, []);

  return (
    <>
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: var(--lo, 0.3); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes letterHeat {
          0%, 100% {
            color: #ff3300;
            text-shadow:
              0 0 3px #ffcc88,
              0 0 10px #ff8800,
              0 0 24px #ff4400,
              0 0 48px #cc1100,
              0 0 70px #880000;
            transform: translateY(0) scale(1);
          }
          25% {
            color: #ff6600;
            text-shadow:
              0 0 5px #ffffff,
              0 0 14px #ffaa00,
              0 0 32px #ff6600,
              0 0 60px #dd2200,
              0 0 90px #aa0000;
            transform: translateY(-3px) scale(1.02);
          }
          50% {
            color: #ff4400;
            text-shadow:
              0 0 4px #ffddaa,
              0 0 12px #ff8800,
              0 0 28px #ff4400,
              0 0 55px #cc1100,
              0 0 85px #880000;
            transform: translateY(2px) scale(1.01);
          }
          75% {
            color: #ee2200;
            text-shadow:
              0 0 6px #ffffff,
              0 0 16px #ff9900,
              0 0 36px #ff5500,
              0 0 65px #bb1100,
              0 0 95px #770000;
            transform: translateY(-1px) scale(1.015);
          }
        }

        @keyframes dripPulse {
          0%, 100% { height: var(--bh, 16px); opacity: 0.75; }
          50% { height: calc(var(--bh, 16px) * 1.7); opacity: 1; }
        }

        @keyframes emberUp {
          0% { transform: translate(0, 0); opacity: 1; }
          80% { opacity: 0.6; }
          100% { transform: translate(var(--ex, 20px), -180px); opacity: 0; }
        }

        @keyframes ringOut {
          0% { transform: scale(0.1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }

        .fire-letter {
          font-family: 'Arial Black', 'Impact', sans-serif;
          font-size: clamp(48px, 8vw, 80px);
          font-weight: 900;
          font-style: italic;
          color: #ff2200;
          display: inline-block;
          animation: letterHeat var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
          text-shadow:
            0 0 4px #ffffff,
            0 0 12px #ff8800,
            0 0 28px #ff4400,
            0 0 55px #cc1100,
            0 0 80px #880000;
          position: relative;
          line-height: 1;
          padding: 0 2px;
        }

        .drip-seg {
          width: 7px;
          border-radius: 4px 4px 50% 50%;
          background: linear-gradient(to bottom, #ff5500, #dd2200, #990000);
          box-shadow: 0 0 8px #ff3300;
          animation: dripPulse var(--dd, 2s) ease-in-out infinite var(--dl, 0s);
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#080000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 55% at 50% 58%, #4a0800 0%, #1e0100 45%, #080000 100%)",
          }}
        />

        {/* Crack SVG */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3,
          }}
          viewBox="0 0 900 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#cc2200" strokeWidth="1.2" fill="none">
            <path d="M450 250 L300 180 L190 50" />
            <path d="M450 250 L600 165 L730 30" />
            <path d="M450 250 L490 320 L570 430 L640 500" />
            <path d="M450 250 L330 340 L260 460" />
            <path d="M450 250 L370 265 L260 295 L140 310" />
            <path d="M450 250 L540 260 L700 280 L860 270" />
            <path d="M300 180 L260 215 L185 195" />
            <path d="M600 165 L640 205 L700 195" />
          </g>
          <g stroke="#880000" strokeWidth="0.6" fill="none" opacity="0.7">
            <path d="M450 250 L435 130 L405 60" />
            <path d="M450 250 L560 295 L595 370 L555 460" />
            <path d="M300 180 L275 130" />
            <path d="M600 165 L645 115" />
          </g>
        </svg>

        {/* Stars */}
        <div
          ref={starsRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* Embers */}
        <div
          ref={embersRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* Heat rings */}
        <div
          ref={ringsRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "40px 20px",
          }}
        >
          {/* ESPERANZA letters */}
          <div
            ref={lettersRef}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          />

          {/* Drip bar */}
          <div
            ref={dripRef}
            style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
          />
        </div>
      </div>
    </>
  );
};

export default LoaderComponent;
