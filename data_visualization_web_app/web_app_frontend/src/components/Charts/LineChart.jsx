import React, { useEffect, useState } from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, LineSeries, DateTime, Legend, Tooltip
} from '@syncfusion/ej2-react-charts';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../firebase-config'; // Adjust the path as per your project structure
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
    const { currentMode } = useStateContext();
    const [data, setData] = useState({
        totalUserCount: [],
        dogWalkers: [],
        pedestrians: [],
        cyclists: []
    });
    const [yAxisInfo, setYAxisInfo] = useState({ maximum: 100, interval: 20 });
    const friendlyNameMapping = {
        totalUserCount: "Total User Count",
        dogWalkers: "Dog Walkers",
        pedestrians: "Pedestrians",
        cyclists: "Cyclists"
    };

    useEffect(() => {
        const fetchData = async () => {
            let tempData = {
                totalUserCount: [],
                dogWalkers: [],
                pedestrians: [],
                cyclists: []
            };
            const categoryMapping = {
                'Total User Count': 'totalUserCount',
                'Dog Walkers': 'dogWalkers',
                'Pedestrians': 'pedestrians',
                'Cyclists': 'cyclists'
            };

            const now = new Date();
            for (let i = 0; i < 5; i++) {
                const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
                // Set the time to noon to avoid time zone issues affecting the date position
                date.setHours(0, 0, 0, 0);
                const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
                const docRef = doc(db, "daily_user_counts", dateString);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    Object.keys(categoryMapping).forEach(category => {
                        const key = categoryMapping[category]; // Use the mapping for consistent keys
                        if (data[category] !== undefined) {
                            tempData[key].push({ x: date, y: data[category] });
                        }
                    });
                }
            }

            // Determine the maximum value and suitable interval
            const allValues = [].concat(...Object.values(tempData).map(categoryData => categoryData.map(dataPoint => dataPoint.y)));
            const maxValue = Math.max(...allValues);
            const yAxisMaximum = maxValue + (10 - maxValue % 10); // Round up to the nearest 10
            const yAxisInterval = yAxisMaximum / 4; // Example interval calculation

            setYAxisInfo({ maximum: yAxisMaximum, interval: yAxisInterval });

            // Sort data by date for each category
            Object.keys(tempData).forEach(key => {
                tempData[key].sort((a, b) => a.x - b.x);
            });

            setData(tempData);
        };

        fetchData();
    }, []);

    return (
        <ChartComponent
            id='line-chart'
            height='420px'
            primaryXAxis={{
                valueType: 'DateTime',
                intervalType: 'Days',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 },
                dateFormat: 'dd/MM/yyyy'
            }}
            primaryYAxis={{
                labelFormat: '{value}',
                lineStyle: { width: 0 },
                maximum: yAxisInfo.maximum,
                interval: yAxisInfo.interval,
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 }
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === 'Dark' ? '#33373E' : '#FFFFFF'}
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                {/* Map through data object keys to create a SeriesDirective for each category */}
                {Object.keys(data).map((category, index) => (
                    <SeriesDirective
                        key={index}
                        dataSource={data[category]}
                        xName='x'
                        yName='y'
                        name={friendlyNameMapping[category]} // Capitalize the first letter
                        type='Line'
                        width={2}
                        marker={{ visible: true, width: 10, height: 10 }}
                    />
                ))}
            </SeriesCollectionDirective>
        </ChartComponent>
    );
}

export default LineChart;
