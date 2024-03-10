import React from 'react';

// Import the syncfusion chart component and its functions.
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, SplineAreaSeries, DateTime, Legend, Tooltip
} from '@syncfusion/ej2-react-charts';

// Import the header component created by ourselves. 
import { Header } from '../../components';

// Import the data source of the page.
import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy';

// Import the current stage.
import { useStateContext } from '../../contexts/ContextProvider';

const Area = () => {
    const { currentMode } = useStateContext();

    return (
        <div className='m-4 md:m-10 mt-24 p-10 
        bg-white dark:bg-secondary-dark-bg rounded-3xl'>
            <Header category='Area' title='Inflation Rate in Percentage' />
            <div className='w-full'>
                <ChartComponent
                    id='area-chart'
                    height='420px'
                    primaryXAxis={areaPrimaryXAxis}
                    primaryYAxis={areaPrimaryYAxis}
                    chartArea={{ border: { width: 0 } }}
                    tooltip={{ enable: true }}
                    background={currentMode === 'Dark' ? '#33373E' : '#FFFFFF'}
                >
                    <Inject services={[SplineAreaSeries, DateTime, Legend]} />
                    <SeriesCollectionDirective>
                        {areaCustomSeries.map((item, index) =>
                            <SeriesDirective key={index} {...item} />
                        )}
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>
    )
}

export default Area