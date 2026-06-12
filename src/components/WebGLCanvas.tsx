"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WebGLCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.012);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 40);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);

    // --- Plexus Core Data & Config ---
    const particleCount = 130;
    const connectionDistanceThreshold = 14;
    const maxConnections = 450; // Performance safety cap

    const goldColor = new THREE.Color("#d4a017");

    // Track mouse coordinates
    const mouseNDC = new THREE.Vector2(0, 0);
    const targetMouseNDC = new THREE.Vector2(0, 0);

    // Set particle initial random position and velocity
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    // Bound limits in 3D space
    const bounds = {
      x: 35,
      y: 25,
      z: 20,
    };

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Random coordinates inside the bounding box
      positions[idx] = (Math.random() - 0.5) * bounds.x * 2;
      positions[idx + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[idx + 2] = (Math.random() - 0.5) * bounds.z * 2;

      // Soft velocity
      velocities[idx] = (Math.random() - 0.5) * 0.04;
      velocities[idx + 1] = (Math.random() - 0.5) * 0.04;
      velocities[idx + 2] = (Math.random() - 0.5) * 0.04;

      // Base color: Warm gold
      particleColors[idx] = goldColor.r;
      particleColors[idx + 1] = goldColor.g;
      particleColors[idx + 2] = goldColor.b;
    }

    // --- Particles (Points) Representation ---
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Circle sprite texture for clean circular points
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(212, 160, 23, 0.8)");
      grad.addColorStop(1, "rgba(212, 160, 23, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.9,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    
    // Group to contain everything and perform unified scroll rotations
    const plexusGroup = new THREE.Group();
    plexusGroup.add(particleSystem);
    scene.add(plexusGroup);

    // --- Lines Representation ---
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    plexusGroup.add(lineSystem);

    // --- Mouse Move Handler ---
    const handleMouseMove = (e: MouseEvent) => {
      // Convert to NDC (-1 to 1)
      targetMouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation & Physics Loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Damp mouse coordinates for smooth lag-follow effect
      mouseNDC.lerp(targetMouseNDC, 0.08);

      // Map mouse coordinates to 3D coords at Z=0
      const vFOV = (camera.fov * Math.PI) / 180;
      const viewHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;
      const mouse3D = new THREE.Vector3(
        mouseNDC.x * (viewWidth / 2),
        mouseNDC.y * (viewHeight / 2),
        0
      );

      // Update particle positions
      const posArr = particleGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Add velocity
        posArr[idx] += velocities[idx];
        posArr[idx + 1] += velocities[idx + 1];
        posArr[idx + 2] += velocities[idx + 2];

        // Boundary checks (elastic bounce with sign flip)
        const pad = 3;
        const currentBoundX = bounds.x + (camera.aspect > 1 ? camera.aspect * 3 : 0);
        if (Math.abs(posArr[idx]) > currentBoundX) {
          posArr[idx] = Math.sign(posArr[idx]) * currentBoundX;
          velocities[idx] *= -1;
        }
        if (Math.abs(posArr[idx + 1]) > bounds.y) {
          posArr[idx + 1] = Math.sign(posArr[idx + 1]) * bounds.y;
          velocities[idx + 1] *= -1;
        }
        if (Math.abs(posArr[idx + 2]) > bounds.z) {
          posArr[idx + 2] = Math.sign(posArr[idx + 2]) * bounds.z;
          velocities[idx + 2] *= -1;
        }

        // Mouse interaction: push-back physics
        // Transform mouse point by inverse plexus group matrix to get local space comparison
        const particleLocalPos = new THREE.Vector3(posArr[idx], posArr[idx + 1], posArr[idx + 2]);
        const particleWorldPos = particleLocalPos.clone().applyMatrix4(plexusGroup.matrixWorld);

        const distToMouse = particleWorldPos.distanceTo(mouse3D);
        const repelRadius = 13;
        if (distToMouse < repelRadius) {
          const forceDirection = new THREE.Vector3().subVectors(particleWorldPos, mouse3D);
          forceDirection.z = 0; // Keep push horizontal/vertical
          forceDirection.normalize();
          
          const forceFactor = (1 - distToMouse / repelRadius) * 0.28;
          // Apply force locally by inverting plexus group rotation
          const forceLocal = forceDirection.applyEuler(new THREE.Euler(
            -plexusGroup.rotation.x,
            -plexusGroup.rotation.y,
            -plexusGroup.rotation.z
          )).multiplyScalar(forceFactor);

          posArr[idx] += forceLocal.x;
          posArr[idx + 1] += forceLocal.y;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      // Calculate connections and build line geometry
      const linePosArr = lineGeometry.attributes.position.array as Float32Array;
      const lineColArr = lineGeometry.attributes.color.array as Float32Array;
      let connectionCount = 0;

      for (let i = 0; i < particleCount; i++) {
        const idxA = i * 3;
        const pA = new THREE.Vector3(posArr[idxA], posArr[idxA + 1], posArr[idxA + 2]);

        for (let j = i + 1; j < particleCount; j++) {
          if (connectionCount >= maxConnections) break;

          const idxB = j * 3;
          const pB = new THREE.Vector3(posArr[idxB], posArr[idxB + 1], posArr[idxB + 2]);

          const dist = pA.distanceTo(pB);

          if (dist < connectionDistanceThreshold) {
            const lineIdx = connectionCount * 6;
            
            // Vertices
            linePosArr[lineIdx] = pA.x;
            linePosArr[lineIdx + 1] = pA.y;
            linePosArr[lineIdx + 2] = pA.z;
            linePosArr[lineIdx + 3] = pB.x;
            linePosArr[lineIdx + 4] = pB.y;
            linePosArr[lineIdx + 5] = pB.z;

            // Fade intensity of connection line with distance
            const alpha = 1.0 - dist / connectionDistanceThreshold;
            const intensity = alpha * 0.45; // Subtle glows

            // Colors for both endpoints
            lineColArr[lineIdx] = goldColor.r * intensity;
            lineColArr[lineIdx + 1] = goldColor.g * intensity;
            lineColArr[lineIdx + 2] = goldColor.b * intensity;
            
            lineColArr[lineIdx + 3] = goldColor.r * intensity;
            lineColArr[lineIdx + 4] = goldColor.g * intensity;
            lineColArr[lineIdx + 5] = goldColor.b * intensity;

            connectionCount++;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, connectionCount * 2);

      // Slow constant auto-rotation
      const time = clock.getElapsedTime();
      plexusGroup.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // --- GSAP Scroll-linked Parallax Timeline ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Animate camera and rotate plexus group on scroll to create structural depth
    scrollTl
      .to(camera.position, {
        z: 32, // Move in
        ease: "sine.inOut",
      })
      .to(plexusGroup.rotation, {
        x: Math.PI * 0.7,
        y: Math.PI * 0.9,
        ease: "power1.inOut",
      }, 0);

    // --- Clean up ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === "body") t.kill();
      });
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-webgl-canvas
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
