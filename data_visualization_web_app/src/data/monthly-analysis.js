export const stackedChartData = [
    [
        { x: 'Jan', y: 111 },
        { x: 'Feb', y: 127 },
        { x: 'Mar', y: 143 },
        { x: 'Apr', y: 159 },
        { x: 'May', y: 159 },
        { x: 'Jun', y: 159 },
        { x: 'July', y: 159 },
    ],
    [
        { x: 'Jan', y: 111 },
        { x: 'Feb', y: 127 },
        { x: 'Mar', y: 143 },
        { x: 'Apr', y: 159 },
        { x: 'May', y: 159 },
        { x: 'Jun', y: 159 },
        { x: 'July', y: 159 },
    ],
];

export const monthlyStackedCustomSeries = [

    {
        dataSource: stackedChartData[0],
        xName: 'x',
        yName: 'y',
        name: 'Cyclists',
        type: 'StackingColumn',
        background: 'blue',

    },

    {
        dataSource: stackedChartData[1],
        xName: 'x',
        yName: 'y',
        name: 'Pedestrians',
        type: 'StackingColumn',
        background: 'red',

    },

];

export const monthlyStackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
};

export const monthlyStackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 100,
    maximum: 400,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
};