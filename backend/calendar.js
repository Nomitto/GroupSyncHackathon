import { google } from "googleapis";

async function listCalendarIds(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    const response = await calendar.calendarList.list();
    const calendarIds = response.data.items.map((item) => ({
      id: item.id,
      summary: item.summary,
    }));
    return calendarIds;
}
  
  // Function to get available days using freebusy query for the current month
async function getAvailableDays(auth, calendarId) {
    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const lastDayCurrentMonth = new Date(firstDayNextMonth - 1);

    const response = await calendar.freebusy.query({
        requestBody: {
        timeMin: now.toISOString(),
        timeMax: lastDayCurrentMonth.toISOString(),
        items: [{ id: calendarId }],
        },
    });

    const busyTimes = response.data.calendars[calendarId].busy;
    const availableDays = [];

    for (let day = now.getDate(); day <= lastDayCurrentMonth.getDate(); day++) {
        const date = new Date(now.getFullYear(), now.getMonth(), day);
        const dateString = date.toISOString().split("T")[0];

        const isBusy = busyTimes.some((busyTime) => {
        const busyDate = new Date(busyTime.start).toISOString().split("T")[0];
        return busyDate === dateString;
        });

        if (!isBusy) {
        availableDays.push(dateString);
        }
    }

    return availableDays;
}