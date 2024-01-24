import React from 'react';

// Import the syncfusion grid component and its functions.
import {
    GridComponent, ColumnsDirective, ColumnDirective, Resize,
    Sort, ContextMenu, Filter, Page, ExcelExport,
    PdfExport, Edit, Inject
} from '@syncfusion/ej2-react-grids';

// Import the data source of the page.
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';

// Import the header component created by ourselves. 
import { Header } from '../components';

const Orders = () => {
    return (
        <div className='m-2 md:m-10 p-2 md:p-10 
        bg-white rounded-3xl'>
            <Header category='Page' title='Orders' />
            <GridComponent id='gridcomp' dataSource={ordersData}
                allowPaging allowSorting>
                <ColumnsDirective>
                    {ordersGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    )
}

export default Orders