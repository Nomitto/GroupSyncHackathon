import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
// import Chat from './Chat'
// import {CalendarIcon, ChatIcon} from '@heroicons/react/outline'

function Calendar() {
  const [events, setEvents] = useState([]);
  // const [displayChat, setdisplayChat] = useState(false)
  // const [groupId, setGroupId] = useState('default')
  const [isSignedIn, setIsSignedIn] = useState(false)
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
        setIsSignedIn(true)
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

  // const toggleChat = () => {
  //   setdisplayChat(displayChat)
  // }

  return (
    // <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    //   <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
    //     <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    //     <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    //       <div className="max-w-md mx-auto">
    //         <div className="flex items-center justify-between mb-6">
    //           <div className="flex items-center">
    //             <CalendarIcon className="h-10 w-10 text-cyan-500 mr-3" />
    //             <h1 className="text-2xl font-semibold text-gray-900">My Calendar</h1>
    //           </div>
    //           {isSignedIn && (
    //             <button
    //               onClick={toggleChat}
    //               className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
    //             >
    //               <ChatIcon className="h-5 w-5 mr-2" />
    //               {displayChat ? 'Hide Chat' : 'Show Chat'}
    //             </button>
    //           )}
    //         </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <ul className="space-y-3">
                {events.map(event => (
                  <li key={event.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                    <h3 className="font-medium">{event.summary}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

    //         {displayChat && isSignedIn && (
    //           <div className="mt-6">
    //             <Chat groupId={groupId} />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Calendar;