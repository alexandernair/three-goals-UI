import { useState, useEffect } from "react";
import dayjs from "dayjs";
import '../Styles/BuildingHabits.css'

export type Habit = {
  id: number;
  name: string;
};

export type TrackingData = {
  [key: string]: boolean; // Key: `${habit_id}-${date}`
};

export type ApiHabitResponse = {
  id: number;
  name: string;
  date: string | null;
  completed: number | null;
};
const API_URL = "http://localhost:8000/api/habits.php"; // Update this if needed

const HabitTable: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tracking, setTracking] = useState<TrackingData>({});

  // Get the Monday of the current week
  const getStartOfWeek = (offset: number = 0): dayjs.Dayjs =>
    dayjs().startOf("week").add(offset, "week");

  // Fetch habits & tracking data
  const fetchHabits = async (): Promise<void> => {
    const startOfWeek = getStartOfWeek(weekOffset).format("YYYY-MM-DD");

    try {
      const response = await fetch(`${API_URL}?start_date=${startOfWeek}`);
      if (!response.ok) throw new Error("Failed to fetch habits");

      const data: ApiHabitResponse[] = await response.json();

      const habitList: Habit[] = [];
      const trackingData: TrackingData = {};

      data.forEach(({ id, name, date, completed }) => {
        if (!habitList.some(h => h.id === id)) habitList.push({ id, name });
        if (date) trackingData[`${id}-${date}`] = completed === 1;
      });

      setHabits(habitList);
      setTracking(trackingData);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [weekOffset]);

  // Get the current week's dates
  const getWeekDates = (): string[] => {
    const startOfWeek = getStartOfWeek(weekOffset);
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day").format("YYYY-MM-DD")
    );
  };

  // Toggle habit completion
  const toggleHabit = async (habitId: number, date: string): Promise<void> => {
    const newValue = !tracking[`${habitId}-${date}`];

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit_id: habitId, date, completed: newValue }),
      });

      setTracking(prev => ({ ...prev, [`${habitId}-${date}`]: newValue }));
    } catch (error) {
      console.error("Error updating habit tracking:", error);
    }
  };
  //Delete habbit
  const deleteHabit = async (habitId: number) => {
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habitId }),
      });

      setHabits(prev => prev.filter(habit => habit.id !== habitId));

      setTracking(prevTracking => {
        const updatedTracking = { ...prevTracking };
        Object.keys(updatedTracking).forEach(key => {
          if (key.startsWith(`${habitId}-`)) delete updatedTracking[key];
        });
        return updatedTracking;
      });

    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };
  // Add a new habit
  const addHabit = async (): Promise<void> => {
    const name = prompt("Enter new habit:");
    if (!name) return;

    try {
      const response = await fetch(`${API_URL}?addHabit=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit: name }),
      });

      const data: { habit_id: number } = await response.json();
      setHabits(prev => [...prev, { id: data.habit_id, name }]);
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setWeekOffset(weekOffset - 1)} className="p-2 bg-gray-300 rounded">⬅ Prev Week</button>
        <h2 className="text-lg font-semibold">
          {getStartOfWeek(weekOffset).format("MMM DD")} - {getStartOfWeek(weekOffset).add(6, "day").format("MMM DD")}
        </h2>
        <button onClick={() => setWeekOffset(0)} className="p-2 bg-gray-300 rounded">Current Week</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)} className="p-2 bg-gray-300 rounded">Next Week ➡</button>
      </div>

      {/* Habit Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Habit</th>
              {getWeekDates().map((date, index) => (
                <th key={index} className="border p-2">{dayjs(date).format("MMM DD")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map(({ id, name }) => (
              <tr key={id} className="text-center">
                <td className="border p-2 text-left font-semibold flex items-center">
                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => deleteHabit(id)}
                    className="mr-2 p-1 bg-red-500 text-white rounded"
                  >
                    ❌
                  </button>
                  {name}
                </td>
                {getWeekDates().map(date => (
                  <td key={date} className="border p-2">
                    <input
                      type="checkbox"
                      checked={tracking[`${id}-${date}`] || false}
                      onChange={() => toggleHabit(id, date)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addHabit} className="mt-4 p-2 bg-green-500 text-white rounded shadow">+ Add Habit</button>
    </div>
  );
};

export default HabitTable;
