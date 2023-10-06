import React from "react";

export function SchemasTitleContainer({title,children}:{title: string, children?: React.ReactNode}) {
    return (
        <div className={'sectionTitleContainer'}>
                    <div className='screenSectionTitle textLeft'>
                        <h1>{title}</h1>
                    </div>
                    <hr className={'screenTitleHR'}/>
        </div>
    );
}
