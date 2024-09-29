import React, { useState, useEffect } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Tooltip } from 'react-tooltip';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'
import './GroupCalendarHeatmap.css';

function GroupCalendarHeatmap() {
    const [heatMapData, setHeatMapData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const today = new Date()

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });

    useEffect(() => {
        if (user) {
            fetchCalendarData()
        }
    }, [user])

    const fetchCalendarData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    },
                    params: {
                        timeMin: moment().subtract(150, 'days').toISOString(),
                        timeMax: moment().toISOString(),
                        singleEvents: true,
                        orderBy: 'startTime'
                    }
                }
            )
            const formattedData = formatCalendarData(response.data.items)
            setHeatMapData(formattedData)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const formatCalendarData = (events) => {
        const eventCounts = {}
        events.forEach(event => {
            const date = moment(event.start.dateTime || event.start.date).format('YYYY-MM-DD')
            eventCounts[date] = (eventCounts[date] || 0) + 1
        })
        return Object.entries(eventCounts).map(([date, count]) => ({
            date: new Date(date),
            count: Math.min(count, 4)
        }))
    }

    const getColor = (value) => {
        if (!value) {
            return 'color-empty'
        }
        return `color-github-${value.count}`
    }

    if (!user) {
        return <button onClick={() => login()}><b>Allow Google Calendar Permissions</b></button>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Group Activity</h2>
            <CalendarHeatmap
                startDate={moment().subtract(150, 'days').toDate()}
                endDate={today}
                values={heatMapData}
                classForValue={(value) => getColor(value)}
                tooltipDataAttrs={value => {
                    if (!value || !value.date) {
                        return {
                            'data-tooltip-content': `${moment(value.date).format('YYYY-MM-DD')}: ${0} events`,
                        }
                    }
                    return {
                        'data-tooltip-id': 'calendar-tooltip',
                        'data-tooltip-content': `${moment(value.date).format('YYYY-MM-DD')}: ${value.count} events`,
                    }
                }}
                showWeekdayLabels={true}
                horizontal={false}
                onClick={value => value && alert(`${moment(value.date).format('YYYY-MM-DD')}: ${value.count} events`)}
            />
            <Tooltip id="calendar-tooltip" />
            <div className="mt-4 flex justify-center">
                <div className="flex items-center">
                </div>
            </div>
        </div>
    );
}

export default GroupCalendarHeatmap