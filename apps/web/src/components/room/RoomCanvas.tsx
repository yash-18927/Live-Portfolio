import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useRoomStore } from '../../store/useRoomStore';
import { ResponsiveCamera } from './ResponsiveCamera';
import { RoomEnvironment } from './RoomEnvironment';
import { HandCursor } from './HandCursor';
import { VendingMachine } from './VendingMachine';
import { FaxMachine } from './FaxMachine';
import { Plant } from './Plant';
import { GuestbookWall } from './GuestbookWall';
import { SkillsBoard } from './SkillsBoard';
import { ResumeClipboard } from './ResumeClipboard';
import { MovableItem } from './MovableItem';

export function RoomCanvas() {
  const { dpr, setDpr, setQualityTier, setIsPinching } = useRoomStore();

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        position: 'relative',
        touchAction: 'none',
        overflow: 'hidden',
      }}
      onPointerDown={() => setIsPinching(true)}
      onPointerUp={() => setIsPinching(false)}
    >
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [0, 2.2, 4.8], fov: 48, near: 0.1, far: 30 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
      >
        <PerformanceMonitor
          onIncline={() => {
            setDpr(Math.min(dpr + 0.25, 2));
            setQualityTier('high');
          }}
          onDecline={() => {
            setDpr(Math.max(dpr - 0.25, 1));
            setQualityTier('low');
          }}
        />

        <ResponsiveCamera />

        <Suspense fallback={null}>
          <RoomEnvironment />

          {/* Interactive room objects */}
          <VendingMachine />
          <FaxMachine />
          <Plant />
          <GuestbookWall />
          <SkillsBoard />
          <ResumeClipboard />

          {/* Movable props */}
          <MovableItem id="coffee-cup" name="Coffee Cup" color="#ffffff" shape="cup" />
          <MovableItem id="rubiks-cube" name="Rubik's Cube" color="#f43f5e" shape="cube" />

          {/* 3D Hand Cursor */}
          <HandCursor />
        </Suspense>
      </Canvas>
    </div>
  );
}
