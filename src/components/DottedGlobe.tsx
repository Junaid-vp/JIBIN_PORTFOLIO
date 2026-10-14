"use client";

import { useEffect, useRef } from "react";

export function DottedGlobe({ 
  className = "",
  size = 180 
}: { 
  className?: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    const tilt = 0.28;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = size;
    const height = size;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const points: Array<{ x: number; y: number; z: number; isMajor?: boolean }> = [];
    const numPoints = 500;
    const radius = size * 0.42;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      });
    }

    // Add structured latitude and longitude grid dots
    const numLat = 7;
    const numLng = 16;
    for (let l = 1; l < numLat; l++) {
      const latAngle = (l / numLat - 0.5) * Math.PI;
      const rLat = radius * Math.cos(latAngle);
      const yLat = radius * Math.sin(latAngle);
      const dotsInRing = Math.floor(numLng * Math.cos(latAngle) * 2.2);

      for (let d = 0; d < dotsInRing; d++) {
        const theta = (d / dotsInRing) * Math.PI * 2;
        points.push({
          x: rLat * Math.cos(theta),
          y: yLat,
          z: rLat * Math.sin(theta),
          isMajor: true,
        });
      }
    }

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Soft back glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius * 1.25);
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.16)");
      glowGrad.addColorStop(0.5, "rgba(37, 99, 235, 0.08)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric outer rim
      ctx.strokeStyle = "rgba(56, 189, 248, 0.20)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      rotation += 0.0035;

      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      // Project and sort points
      const projectedPoints: Array<{
        px: number;
        py: number;
        pz: number;
        isMajor?: boolean;
      }> = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Rotate around Y-axis
        const x1 = pt.x * cosRot - pt.z * sinRot;
        const z1 = pt.x * sinRot + pt.z * cosRot;

        // Tilt around X-axis
        const y2 = pt.y * cosTilt - z1 * sinTilt;
        const z2 = pt.y * sinTilt + z1 * cosTilt;

        // Orthographic/weak perspective projection
        const scale = 280 / (280 + z2 * 0.4);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        projectedPoints.push({
          px,
          py,
          pz: z2,
          isMajor: pt.isMajor,
        });
      }

      // Sort by depth (back to front)
      projectedPoints.sort((a, b) => a.pz - b.pz);

      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const isFront = p.pz > -15;
        const depthRatio = (p.pz + radius) / (radius * 2); // 0 (back) to 1 (front)

        if (isFront) {
          const alpha = 0.2 + depthRatio * 0.75;
          const dotSize = p.isMajor ? 1.4 : 1.1;

          ctx.fillStyle = p.pz > 40
            ? `rgba(224, 242, 254, ${alpha})`
            : `rgba(56, 189, 248, ${alpha * 0.8})`;

          ctx.beginPath();
          ctx.arc(p.px, p.py, dotSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Fainter back points
          const alpha = 0.06 + depthRatio * 0.12;
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="block"
      />
    </div>
  );
}
