import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Inertia } from '@inertiajs/inertia';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';


const CalendarE = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState(dayjs().set('hour', 10).set('minute', 0));
  const [endTime, setEndTime] = useState(dayjs().set('hour', 11).set('minute', 0));
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const handleAddEvent = () => {
    const dateDebut = new Date(date);
    dateDebut.setHours(startTime.hour());
    dateDebut.setMinutes(startTime.minute());

    const dateFin = new Date(date);
    dateFin.setHours(endTime.hour());
    dateFin.setMinutes(endTime.minute());

    Inertia.post('/events', {
      title_event: eventTitle,
      date_debut: dateDebut.toISOString(),
      date_fin: dateFin.toISOString(),
    });

    setEventTitle('');
    setStartTime(dayjs().set('hour', 10).set('minute', 0));
    setEndTime(dayjs().set('hour', 11).set('minute', 0));
    setIsCreatingEvent(false);
  };

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
    if (!isCreatingEvent) {
      setIsCreatingEvent(true);
    }
  };

  const eventsForSelectedDate = events.filter(event =>
    new Date(event.date_debut).toDateString() === date.toDateString()
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <Calendar
            onChange={setDate}
            value={date}
            className="mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Add Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={handleEventTitleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            {isCreatingEvent && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="space-y-4">
                  <div>
                   
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={setStartTime}
                      renderInput={(params) => <input {...params} className="w-full p-2 border border-gray-300 rounded" />}
                    />
                  </div>
                  <div>
                  
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={setEndTime}
                      renderInput={(params) => <input {...params} className="w-full p-2 border border-gray-300 rounded" />}
                    />
                  </div>
                  <button
                    onClick={handleAddEvent}
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                </div>
              </LocalizationProvider>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Events on {date.toDateString()}</h2>
            {eventsForSelectedDate.length === 0 ? (
              <p className="text-gray-500">No events for this day</p>
            ) : (
              <ul className="list-disc pl-5">
                {eventsForSelectedDate.map((event, index) => (
                  <li key={index} className="mb-2">
                    {event.title_event} from {new Date(event.date_debut).toLocaleTimeString()} to {new Date(event.date_fin).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarE;
