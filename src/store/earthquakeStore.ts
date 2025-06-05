import { create } from "zustand";

interface EarthquakeState {
  selectedEarthquake: string | null;
  setSelectedEarthquake: (id: string | null) => void;
  xAxis: string;
  yAxis: string;
  setXAxis: (axis: string) => void;
  setYAxis: (axis: string) => void;
}

export const useEarthquakeStore = create<EarthquakeState>((set) => ({
  selectedEarthquake: null,
  setSelectedEarthquake: (id) => set({ selectedEarthquake: id }),
  xAxis: "longitude",
  yAxis: "mag",
  setXAxis: (axis) => set({ xAxis: axis }),
  setYAxis: (axis) => set({ yAxis: axis }),
}));
