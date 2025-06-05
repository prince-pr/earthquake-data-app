import { parse } from "papaparse";

export interface Earthquake {
  id: string;
  time: string;
  latitude: number;
  longitude: number;
  mag: number;
  place: string;
}

interface EarthquakeCSVRow {
  id: string;
  time: string;
  latitude: number;
  longitude: number;
  mag: number;
  place: string;
}

export async function fetchEarthquakeData(): Promise<Earthquake[]> {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
    );
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      parse<EarthquakeCSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (result) => {
          const data = result.data.map((row) => ({
            id: row.id,
            time: row.time,
            latitude: row.latitude,
            longitude: row.longitude,
            mag: row.mag,
            place: row.place,
          }));
          resolve(data);
        },
        error: (error: Error) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
