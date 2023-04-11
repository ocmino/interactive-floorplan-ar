import { Canvas } from "@react-three/fiber";
import { Rosalia } from "../Rosalia";
import { Environment, Loader, OrbitControls } from "@react-three/drei";

const wrapperDiv = {
  width: "100vw",
  height: "100vh",
};

const Building = () => {
  return (
    <><div style={wrapperDiv}>
          <Canvas camera={{ position: [0, 50, 50] }} shadowMap>
              <OrbitControls
                  minDistance={50}
                  maxDistance={1000}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2.2} />
              <Environment preset="sunset" background={true} blur={1} />
              <Rosalia />
          </Canvas>
      </div><Loader /></>
  );
};

export default Building;
