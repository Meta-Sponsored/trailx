import React from 'react';

// Import the syncfusion schedule component and its functions.
import {
    ScheduleComponent, ViewsDirective, ViewDirective,
    Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';

// Import the syncfusion date picker component.
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

// Import the data source of the page.
import { ScheduleData, scheduleData } from '../data/dummy';

// Import the header component created by ourselves. 
import { Header } from '../components';

const Calendar = () => {
    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category='App' title='Calendar' />
            <ScheduleComponent
                height='650px'
                eventSettings={{ dataSource: scheduleData }}
                selectedDate={new Date(2021, 0, 10)}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />

            </ScheduleComponent>
        </div>
    )
}

export default Calendar