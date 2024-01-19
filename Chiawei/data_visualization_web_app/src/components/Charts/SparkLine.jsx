import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

// Check: https://ej2.syncfusion.com/react/documentation/sparkline/getting-started
const SparkLine = ({ id, height, width, color, data, type, currentColor }) => {
    return (
        <SparklineComponent
            id={id}
            height={height}
            width={width}
            lineWidth={1}
            valueType='Numeric'
            fill={color}
            border={{ color: currentColor, width: 2 }}
            dataSource={data}
            xName='x'
            yName='y'
            type={type}
            tooltipSettings={{
                visible: true,
                format: '${x}: data ${y}',
                trackLineSettings: {
                    visible: true
                }
            }}
        >
            {/* Check: https://ej2.syncfusion.com/react/documentation/sparkline/user-interaction */}
            <Inject services={[SparklineTooltip]} />
        </SparklineComponent>
    )
}

export default SparkLine