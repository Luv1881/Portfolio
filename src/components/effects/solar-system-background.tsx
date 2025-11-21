"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SolarSystemBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    // Solar System Group
    const solarSystem = new THREE.Group();
    scene.add(solarSystem);

    // Enhanced Sun with multiple layers
    const sunGeometry = new THREE.SphereGeometry(3, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 1,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Sun Core (Ultra bright)
    const sunCoreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const sunCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const sunCore = new THREE.Mesh(sunCoreGeo, sunCoreMat);
    sun.add(sunCore);

    // Multiple sun glow layers for depth
    const createSunGlow = (radius: number, opacity: number, color: number) => {
      const glowGeo = new THREE.SphereGeometry(radius, 64, 64);
      const glowMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Mesh(glowGeo, glowMat);
    };

    const sunGlow1 = createSunGlow(4.5, 0.3, 0xffaa00);
    const sunGlow2 = createSunGlow(6, 0.15, 0xff8800);
    const sunGlow3 = createSunGlow(8, 0.08, 0xff6600);
    sun.add(sunGlow1);
    sun.add(sunGlow2);
    sun.add(sunGlow3);

    solarSystem.add(sun);

    // Enhanced planet data with moons
    type PlanetData = {
      size: number;
      color: number;
      distance: number;
      speed: number;
      name: string;
      hasRing: boolean;
      hasMoon?: boolean;
      inclination: number;
    };
    const planets: Array<{
      mesh: THREE.Mesh;
      data: PlanetData;
      angle: number;
      moons?: THREE.Mesh[];
    }> = [];
    const orbits: THREE.Line[] = [];

    const planetData = [
      {
        size: 0.4,
        color: 0x8c7853,
        distance: 12,
        speed: 0.047,
        name: "Mercury",
        hasRing: false,
        inclination: 0.12, // Orbital inclination in radians
      },
      {
        size: 0.9,
        color: 0xffc649,
        distance: 18,
        speed: 0.035,
        name: "Venus",
        hasRing: false,
        inclination: 0.06,
      },
      {
        size: 1.0,
        color: 0x4a90e2,
        distance: 25,
        speed: 0.029,
        name: "Earth",
        hasRing: false,
        hasMoon: true,
        inclination: 0.0,
      },
      {
        size: 0.6,
        color: 0xe27b58,
        distance: 32,
        speed: 0.024,
        name: "Mars",
        hasRing: false,
        inclination: 0.03,
      },
      {
        size: 2.2,
        color: 0xc88b3a,
        distance: 48,
        speed: 0.013,
        name: "Jupiter",
        hasRing: false,
        inclination: 0.02,
      },
      {
        size: 1.9,
        color: 0xfad5a5,
        distance: 65,
        speed: 0.009,
        name: "Saturn",
        hasRing: true,
        inclination: 0.04,
      },
      {
        size: 1.3,
        color: 0x4fd0e7,
        distance: 80,
        speed: 0.006,
        name: "Uranus",
        hasRing: true,
        inclination: 0.01,
      },
      {
        size: 1.2,
        color: 0x4166f5,
        distance: 95,
        speed: 0.005,
        name: "Neptune",
        hasRing: false,
        inclination: 0.03,
      },
    ];

    planetData.forEach((data, idx) => {
      // Planet
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.7,
        metalness: 0.3,
        emissive: data.color,
        emissiveIntensity: 0.1,
      });
      const planet = new THREE.Mesh(geometry, material);

      // Add atmosphere glow for gas giants
      if (data.size > 1.5) {
        const atmGeo = new THREE.SphereGeometry(data.size * 1.15, 32, 32);
        const atmMat = new THREE.MeshBasicMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.1,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
        });
        const atmosphere = new THREE.Mesh(atmGeo, atmMat);
        planet.add(atmosphere);
      }

      // Add rings if specified
      if (data.hasRing) {
        const ringGeo = new THREE.RingGeometry(data.size * 1.5, data.size * 2.3, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: data.name === "Saturn" ? 0xc9b58a : 0x88b8d8,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        planet.add(ring);
      }

      // Orbit Path with inclination
      const orbitCurve = new THREE.EllipseCurve(
        0,
        0,
        data.distance,
        data.distance,
        0,
        2 * Math.PI,
        false,
        0,
      );

      const points = orbitCurve.getPoints(200);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
      });

      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      // Apply orbital inclination
      orbit.rotation.z = data.inclination;

      solarSystem.add(orbit);
      orbits.push(orbit);

      // Initial Position with inclination
      const initialAngle = (idx / planetData.length) * Math.PI * 2;
      planet.position.x = Math.cos(initialAngle) * data.distance;
      planet.position.y =
        Math.sin(initialAngle) * data.distance * Math.sin(data.inclination);
      planet.position.z =
        Math.sin(initialAngle) * data.distance * Math.cos(data.inclination);

      solarSystem.add(planet);

      // Add moon for Earth
      const moons: THREE.Mesh[] = [];
      if (data.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(0.27, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({
          color: 0xaaaaaa,
          roughness: 0.9,
        });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        planet.add(moon);
        moons.push(moon);
      }

      planets.push({ mesh: planet, data, angle: initialAngle, moons });
    });

    // Asteroid Belt between Mars and Jupiter
    const asteroidBelt: THREE.Mesh[] = [];
    const asteroidCount = 800;
    const asteroidBeltInner = 38;
    const asteroidBeltOuter = 44;

    for (let i = 0; i < asteroidCount; i++) {
      const size = Math.random() * 0.1 + 0.05;
      const geo = new THREE.TetrahedronGeometry(size);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x8b7355,
        roughness: 0.9,
      });
      const asteroid = new THREE.Mesh(geo, mat);

      const angle = Math.random() * Math.PI * 2;
      const distance =
        asteroidBeltInner + Math.random() * (asteroidBeltOuter - asteroidBeltInner);
      const verticalOffset = (Math.random() - 0.5) * 2;

      asteroid.position.x = Math.cos(angle) * distance;
      asteroid.position.z = Math.sin(angle) * distance;
      asteroid.position.y = verticalOffset;

      asteroid.rotation.x = Math.random() * Math.PI;
      asteroid.rotation.y = Math.random() * Math.PI;
      asteroid.rotation.z = Math.random() * Math.PI;

      solarSystem.add(asteroid);
      asteroidBelt.push(asteroid);
    }

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0x222222, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 3, 200);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Add subtle directional light for depth
    const dirLight = new THREE.DirectionalLight(0x8888ff, 0.2);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    // Multi-layered star field with twinkling effect
    const createStarField = (
      count: number,
      size: number,
      spread: number,
      opacity: number,
    ) => {
      const starsGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      const colorArray = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * spread;
        posArray[i + 1] = (Math.random() - 0.5) * spread;
        posArray[i + 2] = (Math.random() - 0.5) * spread;

        // Slight color variation (white to blue-white)
        const colorVariation = 0.8 + Math.random() * 0.2;
        colorArray[i] = colorVariation;
        colorArray[i + 1] = colorVariation;
        colorArray[i + 2] = 1;
      }

      starsGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      starsGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

      const starsMaterial = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Points(starsGeometry, starsMaterial);
    };

    const stars1 = createStarField(3000, 0.3, 500, 0.9);
    const stars2 = createStarField(5000, 0.15, 800, 0.6);
    const stars3 = createStarField(8000, 0.08, 1200, 0.3);
    scene.add(stars1);
    scene.add(stars2);
    scene.add(stars3);

    // Dynamic Comet System
    const comets: Array<{
      mesh: THREE.Mesh;
      trail: THREE.Line;
      angle: number;
      speed: number;
      distance: number;
      phase: number;
    }> = [];

    const createComet = () => {
      // Comet head
      const cometGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const cometMat = new THREE.MeshBasicMaterial({
        color: 0xaaddff,
        transparent: true,
        opacity: 0.9,
      });
      const comet = new THREE.Mesh(cometGeo, cometMat);

      // Comet glow
      const glowGeo = new THREE.SphereGeometry(0.6, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x6699ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      comet.add(glow);

      // Comet trail
      const trailPoints: THREE.Vector3[] = [];
      for (let i = 0; i < 30; i++) {
        trailPoints.push(new THREE.Vector3(0, 0, 0));
      }
      const trailGeometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const trail = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(trail);

      const distance = 60 + Math.random() * 50;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.02 + Math.random() * 0.03;
      const phase = Math.random() * Math.PI * 2;

      scene.add(comet);
      comets.push({ mesh: comet, trail, angle, speed, distance, phase });
    };

    // Create 3-5 comets
    for (let i = 0; i < 3; i++) {
      createComet();
    }

    // Camera Initial Position - dynamic starting position
    camera.position.set(0, 50, 80);
    camera.lookAt(0, 0, 0);

    // Animation Loop
    let animationFrameId: number;
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Subtle solar system rotation
      solarSystem.rotation.y += 0.0002;

      // Rotate and orbit planets with inclination
      planets.forEach((planetObj) => {
        const { mesh, data, moons } = planetObj;

        // Update planet angle
        planetObj.angle += data.speed * 0.01;

        // Calculate position with orbital inclination
        mesh.position.x = Math.cos(planetObj.angle) * data.distance;
        mesh.position.y =
          Math.sin(planetObj.angle) * data.distance * Math.sin(data.inclination);
        mesh.position.z =
          Math.sin(planetObj.angle) * data.distance * Math.cos(data.inclination);

        // Rotate planet on axis
        mesh.rotation.y += 0.01;

        // Rotate moons if they exist
        if (moons && moons.length > 0) {
          moons.forEach((moon, moonIdx) => {
            const moonAngle = time * 0.5 + moonIdx * Math.PI;
            const moonDistance = data.size * 2.5;
            moon.position.x = Math.cos(moonAngle) * moonDistance;
            moon.position.z = Math.sin(moonAngle) * moonDistance;
          });
        }
      });

      // Animate asteroids
      asteroidBelt.forEach((asteroid, i) => {
        asteroid.rotation.x += 0.001 * (1 + (i % 3));
        asteroid.rotation.y += 0.002 * (1 + (i % 5));
      });

      // Animate comets with trails
      comets.forEach((cometData) => {
        const { mesh, trail, speed, distance, phase } = cometData;
        cometData.angle += speed * 0.01;

        // Elliptical orbit for comets
        const x = Math.cos(cometData.angle + phase) * distance;
        const y = Math.sin(cometData.angle * 2 + phase) * 15;
        const z = Math.sin(cometData.angle + phase) * distance * 0.8;

        mesh.position.set(x, y, z);

        // Update trail
        const positions = trail.geometry.attributes.position.array as Float32Array;
        for (let i = positions.length - 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3];
          positions[i + 1] = positions[i - 2];
          positions[i + 2] = positions[i - 1];
        }
        positions[0] = x;
        positions[1] = y;
        positions[2] = z;
        trail.geometry.attributes.position.needsUpdate = true;
      });

      // Pulsing sun effect
      const sunPulse = 1 + Math.sin(time * 0.5) * 0.05;
      sun.scale.set(sunPulse, sunPulse, sunPulse);

      // Scroll interaction - more dramatic camera movement
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollFraction = Math.min(scrollY / maxScroll, 1);

      // Cinematic camera trajectory with easing
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedScroll = easeInOutCubic(scrollFraction);

      const targetY = 50 - easedScroll * 45; // 50 -> 5
      const targetZ = 80 - easedScroll * 65; // 80 -> 15
      const targetX = easedScroll * 20; // 0 -> 20 (side angle)

      // Mouse parallax effect
      const parallaxX = (mouseX / window.innerWidth - 0.5) * 15;
      const parallaxY = (mouseY / window.innerHeight - 0.5) * 15;

      // Smooth camera interpolation with better damping
      camera.position.y += (targetY + parallaxY - camera.position.y) * 0.08;
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.x += (targetX + parallaxX - camera.position.x) * 0.08;

      camera.lookAt(0, 0, 0);

      // Rotate star layers at different speeds for parallax depth
      stars1.rotation.y += 0.0001;
      stars2.rotation.y += 0.00005;
      stars3.rotation.y -= 0.00003;

      // Subtle star field breathing effect
      stars1.material.opacity = 0.9 + Math.sin(time * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Event Handlers
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();

      // Cleanup geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
