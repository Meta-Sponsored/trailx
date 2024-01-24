import React from 'react';

// Import the syncfusion htmleditor component and its functions.
import {
    HtmlEditor, Image, Inject, Link, QuickToolbar,
    RichTextEditorComponent, Toolbar
} from '@syncfusion/ej2-react-richtexteditor';

// Import the data source of the page.
import { EditorData } from '../data/dummy';

// Import the header component created by ourselves. 
import { Header } from '../components';

const Editor = () => {
    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category='App' title='Editor' />
            <RichTextEditorComponent
                toolbarSettings={{
                    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                        'LowerCase', 'UpperCase', '|',
                        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                        'Outdent', 'Indent', '|',
                        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
                    ],
                    type: 'Expand'
                }}>
                <EditorData />
                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
        </div>
    )
}

export default Editor