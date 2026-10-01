import { create } from 'zustand';

export type InspectedObject =
  'projects' | 'contact' | 'about' | 'guestbook' | 'skills' | 'resume' | null;

export type QualityTier = 'high' | 'medium' | 'low';

export interface RoomState {
  // Quality and performance
  qualityTier: QualityTier;
  dpr: number;
  setQualityTier: (tier: QualityTier) => void;
  setDpr: (dpr: number) => void;

  // Interaction & inspection modal
  inspectedObject: InspectedObject;
  setInspectedObject: (obj: InspectedObject) => void;

  // Hand state (mouse/touch)
  handPosition: [number, number, number];
  isPinching: boolean;
  setHandPosition: (position: [number, number, number]) => void;
  setIsPinching: (isPinching: boolean) => void;

  // Client-side grabbed object
  grabbedObjectId: string | null;
  setGrabbedObjectId: (id: string | null) => void;

  // Movable objects local positions
  objectPositions: Record<string, [number, number, number]>;
  setObjectPosition: (id: string, pos: [number, number, number]) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  qualityTier: 'high',
  dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
  setQualityTier: (tier) =>
    set({
      qualityTier: tier,
      dpr: tier === 'high' ? 2 : tier === 'medium' ? 1.5 : 1,
    }),
  setDpr: (dpr) => set({ dpr: Math.min(Math.max(dpr, 0.75), 2) }),

  inspectedObject: null,
  setInspectedObject: (inspectedObject) => set({ inspectedObject }),

  handPosition: [0, 0, 0],
  isPinching: false,
  setHandPosition: (handPosition) => set({ handPosition }),
  setIsPinching: (isPinching) => set({ isPinching }),

  grabbedObjectId: null,
  setGrabbedObjectId: (grabbedObjectId) => set({ grabbedObjectId }),

  objectPositions: {
    'coffee-cup': [0.8, 0.78, -1.2],
    'rubiks-cube': [-0.8, 0.78, -1.2],
    notepad: [0.1, 0.76, -1.1],
  },
  setObjectPosition: (id, pos) =>
    set((state) => ({
      objectPositions: {
        ...state.objectPositions,
        [id]: pos,
      },
    })),
}));
