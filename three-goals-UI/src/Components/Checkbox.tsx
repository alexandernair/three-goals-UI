import React, { useState } from 'react';

const CheckboxWithServerRequest = () => {
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = async (e: any) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    // Send request to the server when the checkbox is checked
    if (checked) {
      try {
        const response = await fetch('https://your-server-endpoint.com/api', {
          method: 'POST', // or 'PUT' depending on your needs
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ checked: true }),
        });

        if (response.ok) {
          console.log('Server successfully updated');
        } else {
          console.error('Server error:', response.statusText);
        }
      } catch (error) {
        console.error('Request failed', error);
      }
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Send data to server when checked
      </label>
    </div>
  );
};

export default CheckboxWithServerRequest;
