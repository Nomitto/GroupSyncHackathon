import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

function Calendar() {
  const [events, setEvents] = useState([]);
  const API_KEY = 'AIzaSyBqy78XyR_vlenpR9IxSbrW_QNAPxq2jPI'
  const CLIENT_ID = '357613363605-s18klentru09gkgdjcqeo8q1k57r1hi1.apps.googleusercontent.com'
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  useEffect(() => {
    function initiate() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: SCOPES,
      }).then(() => {
        console.log('GAPI client initialized');
        return gapi.auth2.getAuthInstance().signIn();
      }).then(() => {
        console.log('User signed in');
        loadEvents();
      }).catch(error => {
        console.error("Error initializing GAPI client or signing in", error);
      });
    }
    gapi.load('client:auth2', initiate);
  }, []);

  const loadEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      setEvents(response.result.items);
      console.log('Events loaded:', response.result.items);
    }).catch(error => {
      console.error("Error loading events", error);
    });
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.summary} ({new Date(event.start.dateTime || event.start.date).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;