import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { DoubleSide, TextureLoader } from "three";
import { Fragment } from "../shaders/Fragment";
import { Vertex } from "../shaders/Vertex";
import { useAspect } from "@react-three/drei";

const Model = ({ Speed }) => {
  const mesh = useRef();
  const [isDeskTop, setIsDesktop] = useState(window.innerWidth > 900);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const texture = useLoader(TextureLoader, "/PrintingImage.png");
  const scale = useAspect(
    texture.image.width,
    texture.image.height,
    isDeskTop ? 0.35 : 0.7
  );
  const uniforms = useRef({
    u_texture: { value: texture },
    progress: { value: 0.5 },
    u_time: { value: 0 },
    u_speed: { value: 0 },
  });

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_speed.value = Speed;
  });

  return (
    <group>
      <mesh ref={mesh} scale={scale}>
        <planeGeometry />
        <shaderMaterial
          vertexShader={Vertex}
          fragmentShader={Fragment}
          uniforms={uniforms.current}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default Model;
