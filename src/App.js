// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css';

const App = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleEventAdd = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const handleEventDelete = (id) => {
        axios.delete(`http://localhost:5000/api/events/${id}`)
            .then(() => setEvents(events.filter(event => event._id !== id)))
            .catch(error => console.error(error));
    };

    const handleToggleReminder = (eventId) => {
        const selectedEvent = events.find(event => event._id === eventId);
        const updatedEvent = { ...selectedEvent, reminder: !selectedEvent.reminder };

        axios.put(`http://localhost:5000/api/events/${eventId}`, updatedEvent)
            .then(() => {
                const updatedEvents = events.map(event =>
                    event._id === eventId ? updatedEvent : event
                );
                setEvents(updatedEvents);
            })
            .catch(error =>
                console.error(`Error updating reminder status for event with ID ${eventId}:`, error));
    };

    const onEventEdit = (eventId, updatedData) => {
        axios.put(`http://localhost:5000/api/events/${eventId}`, updatedData)
            .then(() => {
                const updatedEvents = events.map(event =>
                    event._id === eventId ? { ...event, ...updatedData } : event
                );
                setEvents(updatedEvents);
            })
            .catch(error =>
                console.error(`Error updating event with ID ${eventId}:`, error)
            );
    };

    return (
        <div className='main-container'>
            <h2 className="page-title">Anantha Lakshmi College Event Management App</h2>
            
            {/* Clipart container */}
            <div className="clipart-container">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/event-management-illustration-download-in-svg-png-gif-file-formats--female-planner-coordination-planning-organization-pack-services-illustrations-5395861.png?f=webp" alt="Corner Clipart" className="clipart-corner" />
                <EventForm onEventAdd={handleEventAdd} />

            </div>
            
            <EventList
                events={events}
                onEventDelete={handleEventDelete}
                onToggleReminder={handleToggleReminder}
                onEventEdit={onEventEdit}
            />
        </div>
    );
};

export default App;