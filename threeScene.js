// Three.js 3D Interactive Graphics Engine
(function() {
  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.error("Three.js not loaded yet");
    return;
  }

  // --- 1. HERO BACKGROUND 3D CANVAS ---
  const bgCanvas = document.getElementById('hero-3d-canvas');
  if (bgCanvas) {
    initHeroBackground(bgCanvas);
  }

  const heroOrbitCanvas = document.getElementById('hero-orbit-canvas');
  if (heroOrbitCanvas) {
    initHeroOrbit(heroOrbitCanvas);
  }

  function initHeroBackground(canvas) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080b, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x0a2016, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff88, 3, 200);
    pointLight.position.set(20, 20, 40);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2, 200);
    cyanLight.position.set(-30, -20, 30);
    scene.add(cyanLight);

    // Particle Storm
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const primaryColor = new THREE.Color(0x00ff88);
    const secondaryColor = new THREE.Color(0x00e5ff);
    const accentColor = new THREE.Color(0x38ef7d);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;

      const mixed = Math.random() > 0.4 ? primaryColor : (Math.random() > 0.5 ? secondaryColor : accentColor);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,255,136,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Orbiting Floating Hologram Rings (Inspired by reference visual)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(22, 5, 0); // Positioned around portrait area
    scene.add(ringGroup);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const ringGeom1 = new THREE.TorusGeometry(32, 0.4, 16, 100);
    const ring1 = new THREE.Mesh(ringGeom1, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(26, 0.3, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    ringGroup.add(ring2);

    // Floating Glass Prisms / Shards (matching the reference image's floating floating shards)
    const shards = [];
    const shardGeom = new THREE.OctahedronGeometry(1.5, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.75,
      wireframe: false
    });

    for (let i = 0; i < 12; i++) {
      const shard = new THREE.Mesh(shardGeom, shardMat.clone());
      const angle = (i / 12) * Math.PI * 2;
      const radius = 28 + (Math.random() - 0.5) * 10;
      shard.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.7,
        (Math.random() - 0.5) * 25
      );
      shard.scale.setScalar(Math.random() * 0.8 + 0.4);
      shard.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
        orbitSpeed: 0.003 + Math.random() * 0.004,
        angle: angle,
        radius: radius
      };
      ringGroup.add(shard);
      shards.push(shard);
    }

    // Interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      particles.rotation.y += 0.0008;
      particles.rotation.x = targetY * 0.1;
      particles.rotation.z = targetX * 0.08;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;
      ring2.rotation.y += 0.002;

      shards.forEach((shard) => {
        shard.rotation.x += shard.userData.rotSpeedX;
        shard.rotation.y += shard.userData.rotSpeedY;
        shard.userData.angle += shard.userData.orbitSpeed;
        shard.position.x = Math.cos(shard.userData.angle) * shard.userData.radius;
        shard.position.y = Math.sin(shard.userData.angle) * (shard.userData.radius * 0.7);
      });

      // Camera parallax
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 8;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  function initHeroOrbit(canvas) {
    const host = canvas.parentElement;
    if (!host) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
    } catch (error) {
      console.warn('The hero 3D artwork could not initialize in this browser.', error);
      canvas.hidden = true;
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xc8ffe8, 1.35));

    const emeraldLight = new THREE.PointLight(0x48d6a0, 4, 24);
    emeraldLight.position.set(4, 4, 5);
    scene.add(emeraldLight);

    const coolLight = new THREE.PointLight(0x8bd8cf, 2, 20);
    coolLight.position.set(-4, -3, 2);
    scene.add(coolLight);

    const orbit = new THREE.Group();
    scene.add(orbit);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x65e3b0,
      wireframe: true,
      transparent: true,
      opacity: 0.72
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.55, 0.018, 8, 180),
      ringMaterial
    );
    ring.rotation.set(0.9, 0.3, -0.25);
    orbit.add(ring);

    const secondRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.15, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({
        color: 0x95d9cf,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    );
    secondRing.rotation.set(-0.55, 0.85, 0.25);
    orbit.add(secondRing);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.22, 2),
      new THREE.MeshStandardMaterial({
        color: 0x143d30,
        emissive: 0x1e936b,
        emissiveIntensity: 0.8,
        metalness: 0.78,
        roughness: 0.24,
        wireframe: true,
        transparent: true,
        opacity: 0.76
      })
    );
    orbit.add(core);

    const coreLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.74, 32, 24),
      new THREE.MeshBasicMaterial({
        color: 0x5ee2ad,
        transparent: true,
        opacity: 0.1
      })
    );
    orbit.add(coreLight);

    const satelliteGeometry = new THREE.IcosahedronGeometry(0.1, 1);
    const satelliteMaterial = new THREE.MeshBasicMaterial({
      color: 0xb9ffdf,
      wireframe: true
    });
    const satellites = [];
    for (let index = 0; index < 5; index += 1) {
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      satellite.userData = {
        angle: (index / 5) * Math.PI * 2,
        radius: 2.45 + (index % 2) * 0.65,
        speed: 0.12 + index * 0.018
      };
      orbit.add(satellite);
      satellites.push(satellite);
    }

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = window.innerWidth < 700 ? 90 : 180;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 12;
      dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[index * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0x9ceac7,
        size: 0.025,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      })
    );
    scene.add(dust);

    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 700 ? 11.5 : 10;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.32;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.24;
    };

    const animate = (time) => {
      frameId = window.requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = time * 0.00018;
      orbit.rotation.y += ((pointerX + elapsed * 0.18) - orbit.rotation.y) * 0.025;
      orbit.rotation.x += ((pointerY + Math.sin(elapsed) * 0.05) - orbit.rotation.x) * 0.025;
      core.rotation.x += 0.0012;
      core.rotation.y -= 0.0018;
      ring.rotation.z += 0.0008;
      secondRing.rotation.y -= 0.0006;
      satellites.forEach((satellite) => {
        const { angle, radius, speed } = satellite.userData;
        const currentAngle = angle + elapsed * speed * 8;
        satellite.position.set(
          Math.cos(currentAngle) * radius,
          Math.sin(currentAngle) * radius * 0.55,
          Math.sin(currentAngle * 1.6) * 0.55
        );
      });
      dust.rotation.y -= 0.00012;
      renderer.render(scene, camera);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener('resize', resize);
    if (!reducedMotion) {
      host.addEventListener('pointermove', handlePointerMove, { passive: true });
      frameId = window.requestAnimationFrame(animate);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!document.hidden && !reducedMotion && !frameId) {
        frameId = window.requestAnimationFrame(animate);
      }
    });
  }

  // --- 2. INTERACTIVE 3D ARSENAL INSPECTOR ---
  const inspectorCanvas = document.getElementById('arsenal-3d-canvas');
  if (inspectorCanvas) {
    initArsenalInspector(inspectorCanvas);
  }

  function initArsenalInspector(canvas) {
    const container = canvas.parentElement;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);

    const mainLight = new THREE.PointLight(0x00ff88, 4, 50);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0x00e5ff, 3, 50);
    backLight.position.set(-10, -10, -10);
    scene.add(backLight);

    // Root model holder
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    let currentModel = null;
    let currentColor = 0x00ff88;
    let isWireframe = false;
    let autoRotate = true;
    let rotationSpeed = 0.01;

    // Helper to clear and build models
    function createModel(type) {
      while (modelRoot.children.length > 0) {
        modelRoot.remove(modelRoot.children[0]);
      }

      const matSolid = new THREE.MeshStandardMaterial({
        color: currentColor,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: isWireframe,
        transparent: true,
        opacity: 0.95
      });

      const matGlow = new THREE.MeshBasicMaterial({
        color: currentColor,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });

      if (type === 'core') {
        // 1. Team Unique Core (Geodesic Core + Orbit Rings + Particles)
        const coreGeom = new THREE.IcosahedronGeometry(4.2, 1);
        const coreMesh = new THREE.Mesh(coreGeom, matSolid);
        modelRoot.add(coreMesh);

        const outerGeom = new THREE.IcosahedronGeometry(5.2, 2);
        const outerMesh = new THREE.Mesh(outerGeom, matGlow);
        modelRoot.add(outerMesh);

        // Orbit ring
        const ringG = new THREE.TorusGeometry(6.6, 0.12, 16, 80);
        const ringM = new THREE.MeshBasicMaterial({ color: currentColor, wireframe: true });
        const ringMesh = new THREE.Mesh(ringG, ringM);
        ringMesh.rotation.x = Math.PI / 2.5;
        modelRoot.add(ringMesh);

        // Core satellite nodes
        for (let i = 0; i < 6; i++) {
          const nodeG = new THREE.OctahedronGeometry(0.5, 0);
          const nodeM = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const node = new THREE.Mesh(nodeG, nodeM);
          const a = (i / 6) * Math.PI * 2;
          node.position.set(Math.cos(a) * 6.6, 0, Math.sin(a) * 6.6);
          ringMesh.add(node);
        }

      } else if (type === 'shield') {
        // 2. Cyber Aegis Shield (Hexagonal defense shield)
        const shieldGroup = new THREE.Group();
        const hexShape = new THREE.Shape();
        const r = 4.5;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) hexShape.moveTo(x, y);
          else hexShape.lineTo(x, y);
        }
        hexShape.closePath();

        const extrudeSettings = { depth: 0.6, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.2, bevelThickness: 0.2 };
        const geom = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
        geom.center();
        const shieldMesh = new THREE.Mesh(geom, matSolid);
        shieldGroup.add(shieldMesh);

        const wireGeom = new THREE.EdgesGeometry(geom);
        const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        const wire = new THREE.LineSegments(wireGeom, wireMat);
        shieldGroup.add(wire);

        // Inner glowing crest
        const innerGeom = new THREE.RingGeometry(1.8, 2.2, 6);
        const innerMesh = new THREE.Mesh(innerGeom, matGlow);
        innerMesh.position.z = 0.45;
        shieldGroup.add(innerMesh);

        modelRoot.add(shieldGroup);

      } else if (type === 'relic') {
        // 3. Quantum Torus Knot
        const geom = new THREE.TorusKnotGeometry(3.6, 0.9, 100, 16, 2, 3);
        const mesh = new THREE.Mesh(geom, matSolid);
        modelRoot.add(mesh);

        const outerG = new THREE.TorusKnotGeometry(3.7, 1.0, 60, 10, 2, 3);
        const outerM = new THREE.MeshBasicMaterial({ color: currentColor, wireframe: true, opacity: 0.3, transparent: true });
        const outer = new THREE.Mesh(outerG, outerM);
        modelRoot.add(outer);

      } else if (type === 'drone') {
        // 4. Tactical Cyber Drone
        const droneGroup = new THREE.Group();
        const bodyGeom = new THREE.CylinderGeometry(1.6, 2.2, 1.2, 8);
        const body = new THREE.Mesh(bodyGeom, matSolid);
        droneGroup.add(body);

        // 4 Drone Arms & Rotors
        for (let i = 0; i < 4; i++) {
          const armAngle = (i / 4) * Math.PI * 2;
          const armGeom = new THREE.BoxGeometry(4.5, 0.25, 0.4);
          const arm = new THREE.Mesh(armGeom, matSolid);
          arm.position.set(Math.cos(armAngle) * 2.6, 0.2, Math.sin(armAngle) * 2.6);
          arm.rotation.y = -armAngle;
          droneGroup.add(arm);

          // Rotor ring
          const rotorGeom = new THREE.TorusGeometry(1.4, 0.08, 8, 24);
          const rotor = new THREE.Mesh(rotorGeom, matGlow);
          rotor.position.set(Math.cos(armAngle) * 4.8, 0.5, Math.sin(armAngle) * 4.8);
          rotor.rotation.x = Math.PI / 2;
          droneGroup.add(rotor);
        }

        modelRoot.add(droneGroup);
      }
    }

    createModel('core');

    // Drag-to-rotate interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      if (window.cyberAudio) window.cyberAudio.playHover();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      modelRoot.rotation.y += deltaX * 0.01;
      modelRoot.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch support for mobile
    let prevTouchX = 0;
    let prevTouchY = 0;
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      const deltaY = e.touches[0].clientY - prevTouchY;

      modelRoot.rotation.y += deltaX * 0.015;
      modelRoot.rotation.x += deltaY * 0.015;

      prevTouchX = e.touches[0].clientX;
      prevTouchY = e.touches[0].clientY;
    }, { passive: true });

    // Wheel Zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(8, Math.min(28, camera.position.z));
    }, { passive: false });

    // Window resize
    window.addEventListener('resize', () => {
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Animation Loop
    function animateInspector() {
      requestAnimationFrame(animateInspector);
      if (autoRotate && !isDragging) {
        modelRoot.rotation.y += rotationSpeed;
        modelRoot.rotation.x += rotationSpeed * 0.35;
      }
      renderer.render(scene, camera);
    }
    animateInspector();

    // UI Controls hookup
    window.setArsenalModel = function(type) {
      createModel(type);
      if (window.cyberAudio) window.cyberAudio.playClick();
    };

    window.setArsenalTheme = function(colorHex, name) {
      currentColor = colorHex;
      mainLight.color.setHex(colorHex);
      createModel(document.querySelector('.model-btn.active')?.dataset.model || 'core');
      if (window.cyberAudio) window.cyberAudio.playClick();
    };

    window.toggleArsenalWireframe = function() {
      isWireframe = !isWireframe;
      createModel(document.querySelector('.model-btn.active')?.dataset.model || 'core');
      if (window.cyberAudio) window.cyberAudio.playClick();
      return isWireframe;
    };

    window.toggleArsenalRotate = function() {
      autoRotate = !autoRotate;
      if (window.cyberAudio) window.cyberAudio.playClick();
      return autoRotate;
    };
  }
})();
