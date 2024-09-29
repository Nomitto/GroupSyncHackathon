import React, { useEffect, useState } from "react";
import { auth, provider, handleSignIn } from "../firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { gapi } from "gapi-script";
import Home from "./Home";

function SignIn() {
  const [signedIn, setValue] = useState("");
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dates, setDates] = useState([]);
  const API_KEY = "AIzaSyBqy78XyR_vlenpR9IxSbrW_QNAPxq2jPI";
  const CLIENT_ID =
    "357613363605-s18klentru09gkgdjcqeo8q1k57r1hi1.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const handleClick = async () => {
    signInWithPopup(auth, provider).then(async (data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      await initializeGapiClient();

      await handleSignIn(data.user.displayName, data.user.uid);
      await fetchEvents();
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const initializeGapiClient = async () => {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
            ],
            scope: SCOPES,
          })
          .then(() => {
            console.log("GAPI client initialized");
            resolve();
          })
          .catch((error) => {
            console.error("Error initializing GAPI client", error);
            reject(error);
          });
      });
    });
  };

  const fetchEvents = async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn();
      console.log("User signed in");
      setIsSignedIn(true);
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      const events = response.result.items;
      setEvents(events);
      console.log("Events loaded:", events);
      const eventDates = events.map((event) =>
        new Date(event.start.dateTime || event.start.date).toLocaleDateString()
      );
      setDates(eventDates);
      console.log("Event dates:", eventDates);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  return (
    <div>
      {signedIn ? (
        <Home />
      ) : (
        <button onClick={handleClick}>Sign In With Google</button>
      )}
      {isSignedIn && (
        <div>
          <h2>Event Dates</h2>
          <ul>
            {dates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SignIn;
