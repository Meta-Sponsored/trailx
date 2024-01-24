import React from 'react';

// Import the syncfusion grid component and its functions.
import {
    GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar
} from '@syncfusion/ej2-react-grids';

// Import the data source of the page.
import { employeesData, employeesGrid } from '../data/dummy';

// Import the header component created by ourselves. 
import { Header } from '../components';

const Employees = () => {
    return (
        <div className='m-2 md:m-10 p-2 md:p-10 
        bg-white rounded-3xl'>
            <Header category='Page' title='Employees' />
            <GridComponent id='gridcomp' dataSource={employeesData}
                allowPaging allowSorting toolbar={['Search']} width='auto'>
                <ColumnsDirective>
                    {employeesGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Search, Toolbar]} />
            </GridComponent>
        </div>
    )
}

export default Employees