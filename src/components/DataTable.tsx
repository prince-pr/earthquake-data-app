import { useEffect, useRef } from "react";
import { useEarthquakeStore } from "../store/earthquakeStore";
import type { Earthquake } from "../services/earthquakeData";

interface DataTableProps {
  data: Earthquake[];
  visibleCount: number;
}

export default function DataTable({ data, visibleCount }: DataTableProps) {
  const { selectedEarthquake, setSelectedEarthquake } = useEarthquakeStore();
  const tableRef = useRef<HTMLTableElement>(null);

  // Scroll to selected earthquake row when it changes
  useEffect(() => {
    if (selectedEarthquake && tableRef.current) {
      const row = tableRef.current.querySelector(
        `tr[data-id="${selectedEarthquake}"]`
      );
      if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedEarthquake]);

  return (
    <div className="h-[640px] min-w-[49%] bg-white rounded-md flex flex-col py-4 pl-4 pr-2">
      <h2 className="text-xl font-semibold mb-4">Earthquake Data</h2>
      <div className="min-h-0 overflow-auto w-full pr-2">
        <table ref={tableRef} className="w-full">
          <thead className="sticky top-0 z-10 bg-[#8c88d6]">
            <tr className="text-white">
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Latitude</th>
              <th className="p-2">Longitude</th>
              <th className="p-2">Magnitude</th>
              <th className="p-2">Place</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, visibleCount).map((row) => (
              <tr
                key={row.id}
                data-id={row.id}
                className={`cursor-pointer border-b border-gray-200 transition-colors duration-200 ${
                  row.id === selectedEarthquake
                    ? "bg-[#E6E5F8] text-[#4e49ac] border-[#8c88d6] font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedEarthquake(row.id)}
              >
                <td className="p-2">
                  {new Date(row.time).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(row.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-2">{row.latitude}</td>
                <td className="p-2">{row.longitude}</td>
                <td className="p-2">{row.mag.toFixed(2)}</td>
                <td className="p-2">{row.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
