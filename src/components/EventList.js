import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import moment from 'moment';

const EventList = ({ events, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [sortedEvents, setSortedEvents] = useState([]);

    useEffect(() => {
        // Sort events by date in ascending order whenever events change
        const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
        setSortedEvents(sorted);
    }, [events]); // Dependency array includes events, so useEffect runs when events change

    const handleEventEdit = (eventId, updatedData) => {
        // Your existing handleEventEdit logic
        const eventIndex = sortedEvents.findIndex(event => event._id === eventId);

        if (eventIndex !== -1) {
            const updatedEditedEvents = [...sortedEvents];
            updatedEditedEvents[eventIndex] = {
                ...updatedEditedEvents[eventIndex],
                ...updatedData,
            };
            setSortedEvents(updatedEditedEvents);
        } else {
            setSortedEvents([...sortedEvents, { _id: eventId, ...updatedData }]);
        }
        onEventEdit(eventId, updatedData);
    };

    return (
        <div className="event-list">
            {sortedEvents.map(event => {
                const formattedDate = moment.utc(event.date).local().format('Do MMMM YYYY, h:mm:ss a');
                
                return (
                    <EventItem
                        key={event._id}
                        event={{
                            ...event,
                            formattedDate: formattedDate
                        }}
                        onToggleReminder={onToggleReminder}
                        onEventDelete={onEventDelete}
                        onEventEdit={handleEventEdit}
                    />
                );
            })}
        </div>
    );
};

export default EventList;