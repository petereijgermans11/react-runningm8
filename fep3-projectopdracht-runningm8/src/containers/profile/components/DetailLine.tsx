import React from "react";

export type DetailLineProps = {
    title: string, value: string | number | undefined
}
// this component shows the individual line in the StatisticsDisplay
export const DetailLine:React.FunctionComponent<DetailLineProps> = (
        {title, value}
    ) =>{
    return (
            <div className={'detailContainer'}>
                <p className={'statisticLabel'}>{title}:</p>
                <p className={'statisticValue'}>{value}</p>
            </div>
    );
}
