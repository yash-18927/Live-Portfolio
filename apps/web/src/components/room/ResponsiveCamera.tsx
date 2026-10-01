import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);

    if (camera instanceof THREE.PerspectiveCamera) {
      if (aspect < 1.0) {
        // Mobile / Portrait view: pull back camera dynamically so full room remains in frame
        const targetZ = THREE.MathUtils.clamp(4.8 + (1.0 - aspect) * 3.8, 5.0, 7.8);
        const targetY = THREE.MathUtils.clamp(2.4 + (1.0 - aspect) * 0.8, 2.4, 3.4);
        camera.position.set(0, targetY, targetZ);
        camera.fov = THREE.MathUtils.clamp(52 + (1.0 - aspect) * 12, 52, 65);
      } else if (aspect > 2.2) {
        // Ultra-wide (3440x1440, etc.): keep comfortable focal depth
        camera.position.set(0, 2.1, 4.6);
        camera.fov = 44;
      } else {
        // Standard Desktop / Laptop / Tablet
        camera.position.set(0, 2.2, 4.8);
        camera.fov = 48;
      }

      camera.lookAt(0, 1.6, -1.5);
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  return null;
}
