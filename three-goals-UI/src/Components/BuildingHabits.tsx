import { useState } from "react";
import dayjs from "dayjs";
import '../Styles/BuildingHabits.css'
const HabitTable = () => {
  const initialHabits = ["Walk the dog", "Eat healthy"];
  
  // Get the current Monday of the week
  const getStartOfWeek = (offset = 0) => dayjs().startOf("week").add(offset, "week");

  // State to track the current week
  const [weekOffset, setWeekOffset] = useState(0);
  const [habits, setHabits] = useState(initialHabits);
  const [tracking, setTracking] = useState(
    initialHabits.map(() => Array(7).fill(false))
  );

  // Generate the dates dynamically for the week
  const getWeekDates = () => {
    const startOfWeek = getStartOfWeek(weekOffset);
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("MMM DD"));
  };

  // Toggle Checkbox State
  const toggleHabit = (habitIndex:any, dateIndex:any) => {
    const updatedTracking = tracking.map((habit, i) =>
      i === habitIndex ? habit.map((done, j) => (j === dateIndex ? !done : done)) : habit
    );
    setTracking(updatedTracking);
  };

  // Add New Habit
  const addHabit = () => {
    const newHabit = prompt("Enter new habit:");
    if (newHabit) {
      setHabits([...habits, newHabit]);
      setTracking([...tracking, Array(7).fill(false)]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setWeekOffset(weekOffset - 1)} 
          className="p-2 bg-gray-300 rounded"
        >
          ⬅ Prev Week
        </button>
        <div>
        <h2 className="text-lg font-semibold">
          {getStartOfWeek(weekOffset).format("MMM DD")} - {getStartOfWeek(weekOffset).add(6, "day").format("MMM DD")}
        </h2>
        <button onClick={() => setWeekOffset(0)}
            className="p-2 bg-gray-300 rounded"
        >
        Current Week
        </button>
        </div>
        <button 
          onClick={() => setWeekOffset(weekOffset + 1)} 
          className="p-2 bg-gray-300 rounded"
        >
          Next Week ➡
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Habit</th>
              {getWeekDates().map((date, index) => (
                <th key={index} className="border p-2">{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, habitIndex) => (
              <tr key={habitIndex} className="text-center">
                <td className="border p-2 text-left font-semibold">{habit}</td>
                {tracking[habitIndex].map((done, dateIndex) => (
                  <td key={dateIndex} className="border p-2">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleHabit(habitIndex, dateIndex)}
                      className="w-5 h-5"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addHabit}
        className="mt-4 p-2 bg-green-500 text-white rounded shadow"
      >
        + Add Habit
      </button>
    </div>
  );
};

export default HabitTable;
