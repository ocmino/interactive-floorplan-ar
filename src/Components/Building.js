import { Canvas } from "@react-three/fiber";
import { Rosalia } from "../Rosalia";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const wrapperDiv = {
  width: "100vw",
  height: "100vh",
};

const Building = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
      <Modal opened={opened} onClose={close} fullScreen>
        <model-viewer
          style={{ width: "100vw", height: "80vh" }}
          src="./Models/Rosalia.glb"
          alt="A 3D model of an apartment"
          auto-rotate
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          exposure="0.5"
          shadow-intensity="1"
          shadow-softness="0.5"
          ios-src="./Models/Rosalia.usdz"
        ></model-viewer>
      </Modal>
      <Button
          onClick={open}
          style={{
            position: "absolute",
            left: "90%",
            top: "10%",
            zIndex: 1,
            transform: "translate(-50%, -50%)",
          }}
        >
          AR
        </Button>
        <Link to="/">
          <Button
            style={{
              position: "absolute",
              left: "10%",
              top: "10%",
              zIndex: 1,
              transform: "translate(-50%, -50%)",
            }}
          >
            Back
          </Button>
        </Link>
    </div><Loader /></>
  );
};

export default Building;
