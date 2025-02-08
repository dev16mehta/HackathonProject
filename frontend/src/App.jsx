import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const CarbonEmissionsTracker = () => {
  const [entries, setEntries] = useState([]);
  const [activity, setActivity] = useState("");
  const [emission, setEmission] = useState("");
  const [isPublicTransport, setIsPublicTransport] = useState(false);

  const handleAddEntry = () => {
    if (!activity || !emission || isNaN(Number(emission))) return;
    const newEntry = { activity, emission: parseFloat(emission) };
    setEntries([...entries, newEntry]);
    setActivity("");
    setEmission("");
  };

  const totalEmissions = entries.reduce((acc, entry) => acc + entry.emission, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-green-50 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-green-800 text-center">Carbon Emissions Tracker</h1>

      <Card className="rounded-xl bg-white shadow-md">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-green-700">Daily Commute Activity</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span>Use Public Transport:</span>
              <Switch
                checked={isPublicTransport}
                onCheckedChange={setIsPublicTransport}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Activity (e.g., Driving)"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="Emissions (kg CO2)"
              value={emission}
              onChange={(e) => setEmission(e.target.value)}
              className="w-1/2"
            />
            <Button onClick={handleAddEntry} className="bg-green-600 hover:bg-green-700 text-white">
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-white shadow-md">
        <CardContent>
          <h2 className="text-xl font-semibold text-green-700">Summary</h2>
          <p className="text-lg">Total Emissions: {totalEmissions.toFixed(2)} kg CO2</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl bg-white shadow-md">
        <CardContent>
          <h2 className="text-xl font-semibold text-green-700">Emission Chart</h2>
          {entries.length > 0 ? (
            <LineChart width={500} height={300} data={entries} className="mx-auto">
              <Line type="monotone" dataKey="emission" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="activity" />
              <YAxis />
              <Tooltip />
            </LineChart>
          ) : (
            <p className="text-center">No data to display</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonEmissionsTracker;
