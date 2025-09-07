import { Canvas } from "@react-three/fiber";
import Model from "./components/Model";
import { useControls } from "leva";

const App = () => {
  const { Background, Speed } = useControls({
    Background: {
      value: "#ffffff",
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
      </Canvas>
    </div>
  );
};

export default App;
