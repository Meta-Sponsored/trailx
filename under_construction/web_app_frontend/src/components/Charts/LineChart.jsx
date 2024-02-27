import React, { useEffect, useState } from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, LineSeries, DateTime, Legend, Tooltip
} from '@syncfusion/ej2-react-charts';
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"; 
import { db } from '../../firebase-config'; // Adjust the path as per your project structure
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
    const { currentMode } = useStateContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date();
            const pastDate = new Date(now);
            pastDate.setDate(pastDate.getDate() - 5); // Get past 5 days

            const q = query(
                collection(db, "daily_user_counts"), // Replace with your collection name
                orderBy("date"), // Assuming you have a 'date' field in each document
                where("date", ">=", pastDate),
                limit(5)
            );

            const querySnapshot = await getDocs(q);
            const processedData = querySnapshot.docs.map(doc => ({
                // Assuming the document data has a structure where the date is stored under 'date' and the total user count under 'Total User Count'
                x: new Date(doc.data().date), // Make sure the date is correctly formatted or converted
                y: doc.data()['Total User Count'] // Access the Total User Count
            }));

            setData(processedData);
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
              dateFormat: 'yyyy-MM-dd'
            }}
            primaryYAxis={{
              labelFormat: '{value}',
              lineStyle: { width: 0 },
              maximum: 'auto', // Adjust based on your data
              interval: 'auto', // Adjust based on your data
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 }
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === 'Dark' ? '#33373E' : '#FFFFFF'}
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                {/* Map your data to the series */}
                <SeriesDirective dataSource={data} xName='x' yName='y' type='Line' width={2} marker={{ visible: true, width: 10, height: 10 }}/>
            </SeriesCollectionDirective>
        </ChartComponent>
    );
}

export default LineChart;
