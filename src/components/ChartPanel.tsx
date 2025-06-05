import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  type TooltipProps,
} from "recharts";
import { useEarthquakeStore } from "../store/earthquakeStore";
import type { Earthquake } from "../services/earthquakeData";

interface ChartPanelProps {
  data: Earthquake[];
  visibleCount: number;
  setVisibleCount: (count: number) => void;
}

export default function ChartPanel({
  data,
  visibleCount,
  setVisibleCount,
}: ChartPanelProps) {
  const { xAxis, yAxis, setXAxis, setYAxis, selectedEarthquake } =
    useEarthquakeStore();

  // Custom tooltip for scatter plot
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p className="capitalize">
          <strong>{d.place}</strong>
        </p>
        <p>Mag: {d.mag}</p>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-md min-w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Earthquake Scatter Plot</h2>
      <div className="mb-4">
        <label className="mr-2">X-Axis:</label>
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="border p-1 rounded border-gray-400"
        >
          <option value="longitude">Longitude</option>
          <option value="latitude">Latitude</option>
          <option value="mag">Magnitude</option>
        </select>
        <label className="ml-4 mr-2">Y-Axis:</label>
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="border p-1 rounded border-gray-400"
        >
          <option value="mag">Magnitude</option>
          <option value="latitude">Latitude</option>
          <option value="longitude">Longitude</option>
        </select>
        <label className="ml-4 mr-2">Data Count:</label>
        <select
          value={visibleCount}
          onChange={(e) => setVisibleCount(Number(e.target.value))}
          className="border p-1 rounded border-gray-400"
        >
          {[10, 25, 50, 100, data.length].map((count) => (
            <option key={count} value={count}>
              {count === data.length ? "All" : count}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400} className={"pr-10 my-10"}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey={xAxis}
            name={xAxis}
            label={{
              value: xAxis.toUpperCase(),
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            type="number"
            dataKey={yAxis}
            name={yAxis}
            label={{
              value: yAxis.toUpperCase(),
              angle: -90,
              position: "insideLeft",
            }}
          />
          <ZAxis type="number" dataKey="mag" range={[60, 200]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<CustomTooltip />}
          />
          <Scatter
            name="Earthquakes"
            data={data.slice(0, visibleCount)}
            fill="#8884d8"
            shape="circle"
            onClick={(point) =>
              useEarthquakeStore.getState().setSelectedEarthquake(point.id)
            }
          >
            {data.slice(0, visibleCount).map((entry) => (
              <Cell
                key={entry.id}
                fill={entry.id === selectedEarthquake ? "#ff0000" : "#8884d8"}
                radius={entry.id === selectedEarthquake ? 8 : 4}
              />
            ))}
          </Scatter>
          <Legend layout="horizontal" verticalAlign="bottom" align="right" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
