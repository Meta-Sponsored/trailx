import React from 'react';

// Import the syncfusion grid component and its functions.
import {
    GridComponent, ColumnsDirective, ColumnDirective, Page,
    Selection, Inject, Edit, Search, Toolbar, Sort, Filter
} from '@syncfusion/ej2-react-grids';

// Import the data source of the page.
import { customersData, customersGrid } from '../data/dummy';

// Import the header component created by ourselves. 
import { Header } from '../components';

const Users = () => {
    return (
        <div className='m-2 md:m-10 p-2 md:p-10 
        bg-white rounded-3xl'>
            <Header category='Page' title='Customers' />
            <GridComponent id='gridcomp' dataSource={customersData}
                allowPaging
                allowSorting
                toolbar={['Delete']}
                editSettings={{ allowDeleting: true, allowEditing: true }}
                width='auto'>
                <ColumnsDirective>
                    {customersGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
            </GridComponent>
        </div>
    )
}
export default Users