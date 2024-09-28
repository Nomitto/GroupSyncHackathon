import React, {useState, useEffect} from 'react'
import CalendarHeatMap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'

function GroupCalendarHeatmap({groupId}){
    const [heatMapData, setHeatMapData] = useState([])
    useEffect(() => {
        fetchGroupCalendarData(groupId)
    }, [groupId])
    const fetchGroupCalendarData = async (groupId) => {
        const dummyData = generateDummyData()
        setHeatMapData(dummyData)
    }
    const generateDummyData = () => {
        const startDate = moment().subtract(1, 'year')
        const endDate = moment()
        const data = []
        while(startDate.isSameOrBefore(endDate)){
            data.push({
                date: startDate.format('YYYY-MM-DD'),
                count: Math.floor(Math.random() * 5)
            })
            startDate.add(1, 'day')
        }
        return data
    }

    const getColor = (value) => {
        if (!value) { 
            return 'color-empty'
        }
        const scale = ['#d6e685', '#8cc665', '#44a340', '#1e6823'];
        return `color-scale-${Math.min(value.count, scale.length)}`;
    }
    return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Group Availability</h2>
          <CalendarHeatmap
            startDate={moment().subtract(1, 'year').toDate()}
            endDate={moment().toDate()}
            values={heatmapData}
            classForValue={(value) => getColor(value)}
            titleForValue={(value) => value ? `${value.date}: ${value.count} events` : 'No data'}
          />
          <div className="mt-4 flex justify-center">
            <div className="flex items-center">
              <span className="mr-2">Less busy</span>
              {['#d6e685', '#8cc665', '#44a340', '#1e6823'].map((color, index) => (
                <div
                  key={color}
                  className="w-4 h-4 mr-1"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="ml-2">More busy</span>
            </div>
          </div>
        </div>
      );
}
export default GroupCalendarHeatmap