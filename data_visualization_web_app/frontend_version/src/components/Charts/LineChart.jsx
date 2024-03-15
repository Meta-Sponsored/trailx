import React from 'react';

// Import the syncfusion chart component and its functions.
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, LineSeries, DateTime, Legend, Tooltip
} from '@syncfusion/ej2-react-charts';

// Import the data source of the page.
import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';

// Import the current state. 
import { useStateContext } from '../../contexts/ContextProvider';

const LineChart = () => {
    const { currentMode } = useStateContext();

    return (
        <ChartComponent
            id='line-chart'
            height='420px'
            primaryXAxis={LinePrimaryXAxis}
            primaryYAxis={LinePrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === 'Dark' ? '#33373E' : '#FFFFFF'}
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                {lineCustomSeries.map((item, index) =>
                    <SeriesDirective key={index} {...item} />
                )}
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}

export default LineChart