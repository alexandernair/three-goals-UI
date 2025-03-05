import React, { useState } from 'react';

interface HabitListProps {
    addItem: (newItem: string) => void;  // Expecting a function that takes a string as argument
  }
  
function HabitList(): React.FC<HabitListProps> = ({ addItem }) => {
    const [newItem, setNewItem] = useState(''); // State to manage the input value

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.trim()) {
            addItem(newItem); // Call the addItem function passed from the parent
            setNewItem(''); // Clear the input field
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter new item"
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}
export default HabitList