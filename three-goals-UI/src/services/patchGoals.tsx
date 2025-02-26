import React, { useState } from 'react';

function PatchGoals() {
  const [goals, setGoals] = useState(["", "", ""]);

  const handleChange = (e: any, index: any) => {
    const newGoals = [...goals];
    newGoals[index] = e.target.value;
    setGoals(newGoals);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/goals.php', {
        method: 'POST', // or POST, depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goals: goals }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Three Goals For The Day:</h1>
        <div className="input-fields">
          <input
            name="myInput"
            value={goals[0]}
            onChange={(e) => handleChange(e, 0)}
            placeholder="Goal 1"
          />
          <input
            name="myInput"
            value={goals[1]}
            onChange={(e) => handleChange(e, 1)}
            placeholder="Goal 2"
          />
          <input
            name="myInput"
            value={goals[2]}
            onChange={(e) => handleChange(e, 2)}
            placeholder="Goal 3"
          />
        </div>
        <button onClick={handleSubmit}>Submit Goals</button>
      </div>
    </>
  );
}

export default PatchGoals;
