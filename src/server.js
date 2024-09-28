const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const app = express(); // Ensure this is declared only once
const port = 3000;

// Read credentials from credentials.json
const credentials = JSON.parse(fs.readFileSync("credentials.json"));

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  credentials.google_calendar_api.client_id,
  credentials.google_calendar_api.client_secret,
  credentials.google_calendar_api.javascript_origins[0]
);

// Import the functions from calendar.js
const { listCalendarIds, getAvailableDays } = require("./backend/calendar");

// Endpoint to list calendar IDs
app.get("/listCalendarIds", async (req, res) => {
  try {
    const calendarIds = await listCalendarIds(oAuth2Client);
    res.json(calendarIds);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Endpoint to get available days
app.get("/getAvailableDays", async (req, res) => {
  const { calendarId } = req.query;
  try {
    const availableDays = await getAvailableDays(oAuth2Client, "primary");
    res.json(availableDays);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
