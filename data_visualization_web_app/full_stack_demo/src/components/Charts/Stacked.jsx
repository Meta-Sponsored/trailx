import React from 'react';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    Inject, Legend, Category, StackingColumnSeries, Tooltip
}
    from '@syncfusion/ej2-react-charts';
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis }
    from '../../data/dummy';
import { monthlyStackedCustomSeries, monthlyStackedPrimaryXAxis, monthlyStackedPrimaryYAxis }
    from '../../data/monthly-analysis';
import { useStateContext } from '../../contexts/ContextProvider';

const Stacked = ({ width, height }) => {
    const { currentMode } = useStateContext();

    return (
        <ChartComponent
            width={width}
            height={height}
            id='charts'
            primaryXAxis={monthlyStackedPrimaryXAxis}
            primaryYAxis={monthlyStackedPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            legendSettings={{ background: currentMode === 'Dark' ? '#33373E' : '#FFFFFF' }}
            background={currentMode === 'Dark' ? '#33373E' : '#FFFFFF'}
        >
            <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
            <SeriesCollectionDirective>
                {monthlyStackedCustomSeries.map((item, index) =>
                    <SeriesDirective key={index} {...item} />)}
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}

export default Stacked