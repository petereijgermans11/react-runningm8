import React from "react";
import {ScreenModal} from "../../modals/ScreenModal";
import {SchemaModal} from "../../modals/SchemaModal";
import {TrainingSchema} from "../../../store/schemas/schema.types";
import {formatTimeToHumanText} from "../../../common/utilsFunctions";

export function OthersItem({schema, index}: {schema: TrainingSchema, index: number}) {

    return (
        <ScreenModal>
            {/* preview item */}
            <div className={'previewContainer'}>
                <div className={'previewTitleContainer'}>
                    <h3 className={'previewTitle'}>
                        {schema.title}
                    </h3>
                    <hr className={'previewHR'}/>
                </div>
                <div className={'previewContentContainer'}>
                    <div className={'previewSummaryContainer'}>
                        <div className={'previewSummary'}>
                            <h4 className={'summaryLabel'}>Workout Time</h4>
                            <h4 className={'summaryLabel'}>exercises</h4>
                            <h4 className={'summaryLabel'}>published</h4>
                        </div>
                        <div className={'previewSummary'}>
                            <h4 className={'summaryValue'}>{formatTimeToHumanText(schema.totalTime as number * 60000)}</h4>
                            <h4 className={'summaryValue'}>{schema.exercises.length}</h4>
                            <h4 className={'summaryValue'}>{schema.public ? 'yes':'no'}</h4>
                        </div>
                    </div>
                    <hr className={'previewHR'}/>
                    <div className={'metaContainer'}>
                        <div style={{color: schema.difficulty === 'Hard' ? 'red': schema.difficulty === 'Medium' ? 'orange' : 'green'}}>{schema.difficulty}</div>
                    </div>
                </div>
            </div>
            {/*// actual modal*/}
            <SchemaModal schema={schema} index={index}/>
        </ScreenModal>

    );
}
