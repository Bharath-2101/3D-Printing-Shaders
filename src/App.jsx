import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./components/Model";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const App = () => {
  const { Background, Speed } = useControls({
    Background: {
      value: "#ffffff", // default color
    },
    Speed: {
      value: 0.3,
      min: 0.1,
      max: 1,
      step: 0.1,
    },
  });
  return (
    <div id="CanvasContainer">
      <Canvas style={{ backgroundColor: Background }}>
        <Model Speed={Speed} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
