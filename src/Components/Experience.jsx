import { Html, OrbitControls } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Apartment from "../Apartment";

const Experience = () => {
  const orbitControlsRef = useRef(null);

  //create an array of targets for orbit controls
  const targets = [
    [40, 50, 0],
    [10, 50, 0],
    [40, 50, 30],
    [0, 50, 50],
  ];

  //button function to set target from targets array
  const setTarget1 = (index) => {
    orbitControlsRef.current.target.set(...targets[index]);
  };
  

  return (
    <>
    <Html style={{ position: "relative", top: 0, left: 0, zIndex: 1 }}>
      <button onClick={() => setTarget1(0)}>Target 1</button>
      <button onClick={() => setTarget1(1)}>Target 2</button>
      <button onClick={() => setTarget1(2)}>Target 3</button>
      <button onClick={() => setTarget1(3)}>Target 4</button>
    </Html>
      <PerspectiveCamera makeDefault position={[1, 0, 0]} />
      <OrbitControls
        ref={orbitControlsRef}
        maxDistance={1}
        minDistance={1}
        target={targets[2]}
      />

      <Apartment /> 
    </>
  );
};

export default Experience;
