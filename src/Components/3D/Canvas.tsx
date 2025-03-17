"use client";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Perf } from "r3f-perf";
import { useData } from "../../Context/ContextProvider";

export default function MyCanvas() {
  const { perf } = useData();

  return (
    <div className='w-screen h-screen fixed'>
      <Canvas>
        {perf && <Perf position='top-left' minimal={true} />}
        {/* Your 3D Model */}
        <Scene />
      </Canvas>
    </div>
  );
}
