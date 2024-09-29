import React, { useState, useEffect } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'
import './GroupCalendarHeatmap.css';

function GroupCalendarHeatmap({groupId}) {
    const [heatMapData, setHeatMapData] = useState([])
    const today = new Date()

    useEffect(() => {
        fetchGroupCalendarData(groupId)
    }, [groupId])

    const fetchGroupCalendarData = async (groupId) => {
        const dummyData = generateDummyData()
        setHeatMapData(dummyData)
    }

    const generateDummyData = () => {
        return getRange(200).map(index => {
            return {
                date: shiftDate(today, -index),
                count: getRandomInt(0, 4),
            }
        })
    }

    const getColor = (value) => {
        if (!value) {
            return 'color-empty'
        }
        return `color-github-${value.count}`
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Group Availability</h2>
            <CalendarHeatmap
                startDate={shiftDate(today, -150)}
                endDate={today}
                values={heatMapData}
                classForValue={(value) => getColor(value)}
                tooltipDataAttrs={value => {
                    if (!value || !value.date) {
                        return null
                    }
                    return {
                        'data-tip': `${value.date.toISOString().slice(0, 10)}: ${value.count} people available`,
                    }
                }}
                showWeekdayLabels={true}
                onClick={value => value && alert(`${value.date.toISOString().slice(0, 10)}: ${value.count} people available`)}
            />
            <Tooltip />
            <div className="mt-4 flex justify-center">
                <div className="flex items-center">
                </div>
            </div>
        </div>
    );
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default GroupCalendarHeatmap