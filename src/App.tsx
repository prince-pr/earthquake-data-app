import { useState, useEffect } from "react";
import ChartPanel from "./components/ChartPanel";
import DataTable from "./components/DataTable";
import {
  fetchEarthquakeData,
  type Earthquake,
} from "./services/earthquakeData";
import Spinner from "./components/Spinner";

function App() {
  const [data, setData] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    // Get data and wait 1 second to show loading spinner
    Promise.all([
      fetchEarthquakeData().then(setData),
      new Promise((res) => setTimeout(res, 1000)),
    ]).then(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eee] py-4">
      <h1 className="text-3xl font-bold text-center lg:text-left my-2 ml-4">
        Earthquake Data Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <ChartPanel
          data={data}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
        />
        <DataTable data={data} visibleCount={visibleCount} />
      </div>
    </div>
  );
}

export default App;
