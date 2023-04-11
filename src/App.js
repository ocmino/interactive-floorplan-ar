/* import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  FlyControls,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import { Suspense, useState, useMemo } from "react";
import { useSpring, a } from "@react-spring/three";
import { Vector3 } from "three";
import "./App.css";
import Apartment from "./Apartment";
import { easeCubicInOut } from "d3-ease";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  TbBath,
  TbBrandCouchdb,
  TbView360,
  TbToolsKitchen2,
  TbSun,
  TbWalk,
} from "react-icons/tb";
import React from "react";
import WalkApp from "./Components/WalkApp";
import { OneRoomApartment } from "./OneRoomApartment";

const t = new Vector3();

const defaultPosition = {
  position: [80, 400, 0],
  target: [0, 50, 0],
};

const kitchen = {
  position: [2, 50, 2],
  target: [0, 50, -2],
};

const livingRoom = {
  position: [2, 50, -52],
  target: [0, 50, 0],
};

const bathRoom = {
  position: [-4, 210, -200],
  target: [-25, 50, -200],
};

const balcony = {
  position: [0, 50, 210],
  target: [0, 50, 250],
};

const CameraWrapper = ({ cameraPosition, target }) => {
  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(t.set(...target));
  return null;
};

const ControlsWrapper = ({ target }) => {
  const { controls } = useThree();
  if (controls) {
    controls.target.set(...target);
  }
  return null;
};

function AnimateEyeToTarget({ position, target }) {
  const { camera, controls } = useThree();

  const s = useSpring({
    from: defaultPosition,
    // slow animation with easeCubicInOut
    config: { duration: 4000, easing: easeCubicInOut },
    onStart: () => {
      if (!controls) return;
      controls.enabled = false;
    },
    onRest: () => {
      if (!controls) return;
      controls.enabled = true;
    },
  });

  s.position.start({ from: camera.position.toArray(), to: position });
  s.target.start({
    from: controls ? controls.target.toArray() : [0, 0, 0],
    to: target,
  });

  const AnimateControls = useMemo(() => a(ControlsWrapper), []);
  const AnimatedNavigation = useMemo(() => a(CameraWrapper), []);

  return (
    <>
      <AnimatedNavigation cameraPosition={s.position} target={s.target} />
      <AnimateControls target={s.target} />
    </>
  );
}

function EyeAnimation({ cameraSettings }) {
  return (
    <>
      <AnimateEyeToTarget
        position={cameraSettings.position}
        target={cameraSettings.target}
      />
    </>
  );
}

function Thing() {
  return (
    <>
     <OneRoomApartment />
      <ContactShadows
        position={[0, -1.5, 0]}
        scale={10}
        blur={3}
        opacity={0.25}
        far={10}
      />
    </>
  );
}

export default function App() {
  const [cameraSettings, setCameraSettings] = useState(defaultPosition);
  const [opened, { open, close }] = useDisclosure(false);
  const [showSky, setShowSky] = useState(true);
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [showSecondOrbitControls, setShowSecondOrbitControls] = useState(true);

  const handleButtonClick = (position, buttonType) => {
    setCameraSettings(position);
    if (buttonType === "Balcony") {
      setShowSky(false);
      setShowEnvironment(true);
    } else {
      setShowSky(true);
      setShowEnvironment(false);
    }
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  const buttonStyle = {
    // desktop button style
    background: "rgba(255,255,255,0.5)",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    position: "absolute",
    bottom: "2%",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const buttonStyleMobile = {
    // mobile button style
    background: "rgba(255,255,255,0.5)",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    position: "absolute",
    bottom: "2%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%", // make the button width 90% of the screen width
    maxWidth: "300px",
  };

  const currentButtonStyle = isMobile ? buttonStyleMobile : buttonStyle;


  return (
    <div className="App">
      <Canvas gl={{ depth: { precision: 16 } }}>


        <Suspense fallback={null}>
          {showSky && <Sky />}
          {showEnvironment && (
            <Environment
              files="./HDR/urban_courtyard_02_2k.hdr"
              background={true}
            />
          )}
        </Suspense>
        <Thing />
        {showSecondOrbitControls && (
          <OrbitControls
            makeDefault
            enablePan={false}
            maxDistance={500}
            maxPolarAngle={Math.PI / 2}
          />
        )}
        {!showSecondOrbitControls && (
          <FlyControls
            movementSpeed={75}
            rollSpeed={1.5}
            dragToLook={true}
            enablePan={false}
          />
        )}

        <EyeAnimation cameraSettings={cameraSettings} />
      </Canvas>
      <div style={currentButtonStyle}>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(defaultPosition, "Default");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbView360 />
          &nbsp;Default
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(kitchen, "Kitchen");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbToolsKitchen2 />
          &nbsp;Kitchen
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(livingRoom, "Living Room");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbBrandCouchdb />
          &nbsp;Living Room
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(bathRoom, "Bathroom");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbBath />
          &nbsp;Bathroom
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(balcony, "Balcony");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbSun />
          &nbsp;Balcony
        </Button>
        <WalkingMode />
      </div>
      <Modal opened={opened} onClose={close} fullScreen>
        <model-viewer
          style={{ width: "100vw", height: "80vh" }}
          src="./Models/Apartment.glb"
          alt="A 3D model of an apartment"
          auto-rotate
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          exposure="0.5"
          shadow-intensity="1"
          shadow-softness="0.5"
          ios-src="./Models/Apartment.usdz"
        ></model-viewer>
      </Modal>
      <Button
        onClick={open}
        style={{
          position: "absolute",
          left: "10%",
          top: "10%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
        }}
      >
        AR
      </Button>
    </div>
  );
}

function WalkingMode() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button color={"gray"} compact onClick={open}>
        <TbWalk />
        &nbsp;Walk
      </Button>
      <Modal opened={opened} onClose={close} fullScreen centered height="100vh">
        <div style={{ height: "93vh" }}>
          <WalkApp />
        </div>
      </Modal>
    </>
  );
}
 */


import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  FlyControls,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useState, useMemo } from "react";
import { useSpring, a } from "@react-spring/three";
import { Vector3 } from "three";
import "./App.css";
import { easeCubicInOut } from "d3-ease";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import {
  TbBath,
  TbBrandCouchdb,
  TbView360,
  TbToolsKitchen2,
} from "react-icons/tb";
import React from "react";
import { OneRoomApartment } from "./OneRoomApartment";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const t = new Vector3();

const defaultPosition = {
  position: [80, 400, 0],
  target: [0, 50, 0],
};

const kitchen = {
  position: [-100, 75, 0],
  target: [0, 50, -150],
};

const livingRoom = {
  position: [-50, 50, 0],
  target: [-50, 50, 50],
};

const bathRoom = {
  position: [100, 200, -90],
  target: [90, 50, -90],
};

const bedRoom = {
  position: [100, 200, 50],
  target: [80, 50, 50],
};

const CameraWrapper = ({ cameraPosition, target }) => {
  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(t.set(...target));
  return null;
};

const ControlsWrapper = ({ target }) => {
  const { controls } = useThree();
  if (controls) {
    controls.target.set(...target);
  }
  return null;
};

function AnimateEyeToTarget({ position, target }) {
  const { camera, controls } = useThree();

  const s = useSpring({
    from: defaultPosition,
    // slow animation with easeCubicInOut
    config: { duration: 3000, easing: easeCubicInOut },
    onStart: () => {
      if (!controls) return;
      controls.enabled = false;
    },
    onRest: () => {
      if (!controls) return;
      controls.enabled = true;
    },
  });

  s.position.start({ from: camera.position.toArray(), to: position });
  s.target.start({
    from: controls ? controls.target.toArray() : [0, 0, 0],
    to: target,
  });

  const AnimateControls = useMemo(() => a(ControlsWrapper), []);
  const AnimatedNavigation = useMemo(() => a(CameraWrapper), []);

  return (
    <>
      <AnimatedNavigation cameraPosition={s.position} target={s.target} />
      <AnimateControls target={s.target} />
    </>
  );
}

function EyeAnimation({ cameraSettings }) {
  return (
    <>
      <AnimateEyeToTarget
        position={cameraSettings.position}
        target={cameraSettings.target}
      />
    </>
  );
}

function Thing() {
  return (
    <>
     <OneRoomApartment />
      <ContactShadows
        position={[0, -1.5, 0]}
        scale={10}
        blur={3}
        opacity={0.25}
        far={10}
      />
    </>
  );
}

function Experience() {
  const [cameraSettings, setCameraSettings] = useState(defaultPosition);
  const [opened, { open, close }] = useDisclosure(false);

  const [showSecondOrbitControls, setShowSecondOrbitControls] = useState(true);

  const handleButtonClick = (position) => {
    setCameraSettings(position);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  const buttonStyle = {
    // desktop button style
    background: "rgba(255,255,255,0.5)",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    position: "absolute",
    bottom: "2%",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const buttonStyleMobile = {
    // mobile button style
    background: "rgba(255,255,255,0.5)",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    position: "absolute",
    bottom: "2%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%", // make the button width 90% of the screen width
    maxWidth: "300px",
  };

  const currentButtonStyle = isMobile ? buttonStyleMobile : buttonStyle;


  return (
    <div className="App">
      <Canvas camera={{near: 10, far: 1000, fov: 75}}>

        <Suspense fallback={null}>
         <Environment preset="park" />
        </Suspense>
        <Thing />
        {showSecondOrbitControls && (
          <OrbitControls
            makeDefault
            enablePan={false}
            maxDistance={375}
            maxPolarAngle={Math.PI / 2}
          />
        )}
        {!showSecondOrbitControls && (
          <FlyControls
            movementSpeed={75}
            rollSpeed={1.5}
            dragToLook={true}
            enablePan={false}
          />
        )}

        <EyeAnimation cameraSettings={cameraSettings} />
      </Canvas>
      <div style={currentButtonStyle}>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(defaultPosition, "Default");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbView360 />
          &nbsp;Default
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(kitchen, "Kitchen");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbToolsKitchen2 />
          &nbsp;Kitchen
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(livingRoom, "Living Room");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbBrandCouchdb />
          &nbsp;Living Room
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(bathRoom, "Bathroom");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbBath />
          &nbsp;Bathroom
        </Button>
        <Button
          color="gray"
          compact
          onClick={() => {
            handleButtonClick(bedRoom, "Bedroom");
            setShowSecondOrbitControls(true);
          }}
        >
          <TbBath />
          &nbsp;Bedroom
        </Button>
       
      </div>
      <Modal opened={opened} onClose={close} fullScreen>
        <model-viewer
          style={{ width: "100vw", height: "80vh" }}
          src="./Models/OneRoomApartment2.glb"
          alt="A 3D model of an apartment"
          auto-rotate
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          exposure="0.5"
          shadow-intensity="1"
          shadow-softness="0.5"
          //ios-src="./Models/Apartment.usdz"
        ></model-viewer>
      </Modal>
      <Button
        onClick={open}
        style={{
          position: "absolute",
          left: "10%",
          top: "10%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
        }}
      >
        AR
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Experience />} />
      </Routes>
    </Router>
  )
}
