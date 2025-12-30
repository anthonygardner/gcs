import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { IMUData } from './types';

interface Props {
    data: IMUData | null;
}

export function IMUViewer({ data }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cubeRef = useRef<THREE.Mesh | null>(null);

    // Set up scene
    useEffect(() => {
        if (!containerRef.current) return;
        if (containerRef.current.querySelector('canvas')) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);

        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 0.5, 1);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        cubeRef.current = cube;

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            containerRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    // Update orientation when data changes
    useEffect(() => {
        if (!data || !cubeRef.current) return;

        const pitch = Math.atan2(
            data.ax,
            Math.sqrt(data.ay * data.ay + data.az * data.az)
        );
        const roll = Math.atan2(data.ay, data.az);

        cubeRef.current.rotation.x += (pitch - cubeRef.current.rotation.x) * 0.2;
        cubeRef.current.rotation.z += (-roll - cubeRef.current.rotation.z) * 0.2;
    }, [data]);

    return <div ref={containerRef} />;
}