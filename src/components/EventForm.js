// src/EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = ({ onEventAdd }) => {
    const [newEvent, setNewEvent] = useState({ title: '', date: '', reminder: false });
    const [formattedDate, setFormattedDate] = useState('');

    const handleInputChange = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new event
        axios.post('http://localhost:5000/api/events', newEvent)
            .then(response => {
                onEventAdd(response.data);
                setNewEvent({ title: '', date: '', reminder: false });
                setFormattedDate(''); // Reset formatted date after event is added
            })
            .catch(error => console.error(error));
    };

    // Function to format the date as DD-MM-YYYY
    const formatDate = (dateString) => {
        if (!dateString) return ''; // Handle empty date string
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Update formatted date whenever newEvent.date changes
    useEffect(() => {
        setFormattedDate(formatDate(newEvent.date));
    }, [newEvent.date]);

    return (
        <form onSubmit={handleSubmit}>
            <label className="input-title">Title:</label>
            <input 
                type="text" 
                name="title"
                value={newEvent.title}
                onChange={handleInputChange} 
                required 
            />
            <label className="input-date">Date:</label>
            <input 
                type="date"
                name="date" 
                value={newEvent.date}
                onChange={handleInputChange} 
                required 
            />
            {/* Display the formatted date */}
            <p>Formatted Date: {formattedDate}</p>

            <button className="add-event" type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;