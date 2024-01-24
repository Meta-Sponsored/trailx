import React from 'react';

// Import the syncfusion color picker component and its functions.
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

// Import the header component created by ourselves. 
import { Header } from '../components';

// When the color picker component is triggered, 
// it calls this function to change the color of the preview div (i.e., pencil color).
const change = (args) => {
    document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
}

const ColorPicker = () => {
    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category='App' title='Color Picker' />
            <div className='text-center'>
                <div id='preview'></div>
                <div className='flex flex-wrap gap-20 justify-center items-center'>
                    <div>
                        <p className='mt-2 mb-4 text-2xl font-semibold'>Inline Pallete</p>
                        <ColorPickerComponent
                            id='inline-pallete'
                            mode='Palette'
                            modeSwitcher={false}
                            inline
                            showButtons={false}
                            change={change}
                        />
                    </div>
                    <div>
                        <p className='mt-2 mb-4 text-2xl font-semibold'>Inline Picker</p>
                        <ColorPickerComponent
                            id='inline-pallete'
                            mode='Picker'
                            modeSwitcher={false}
                            inline
                            showButtons={false}
                            change={change}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker