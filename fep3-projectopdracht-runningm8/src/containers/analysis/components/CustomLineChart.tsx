import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {useTranslation} from "react-i18next";
import {LineDataFormat} from "../analysis.types";

export function CustomLineChart(
    {data, dataKey, timeFrame}:
        {
            data: Array<LineDataFormat>,
            dataKey: string,
            timeFrame:string
        }
    ) {
    const { t } = useTranslation();
    return (
        <ResponsiveContainer width={'100%'} height={400}>
            <LineChart
                width={400}
                height={400}
                data={data.reverse().filter(
                    (item, index) => index < 5)
                }
                margin={{top: 5, right: 55, left: 0, bottom: 5}}
            >
                <Line type={ "monotone"}
                      dataKey={dataKey}
                      stroke="rgba(255,125,255, 1)"
                />
                <CartesianGrid stroke="rgba(255,125,255, 0.2)"  />
                <XAxis
                    dataKey="timestamp"
                    allowDataOverflow={true}
                    allowDuplicatedCategory={true}
                    allowReorder={"yes"}
                    interval={timeFrame === 'day' ? 5 : 15}
                    allowDecimals={false}
                    stroke={'rgba(255,125,255, 1)'}
                    fill={'rgba(255,125,255, 1)'}
                    label={{
                        value: t('common:Date'),
                        angle: 0,
                        position: 'insideBottomRight',
                        offset: -5,
                        fill: 'rgba(255,255,255, 1)'
                    }}
                />
                <YAxis
                    stroke={'rgba(255,125,255, 1)'}
                    label={{
                        value: dataKey === 'distance' ?
                            'KM' : dataKey === 'time' ?
                                t('common:minutes') : 'Kmh',
                        angle: -90,
                        position: 'insideTopRight',
                        offset:40,
                        fill: 'rgba(255,125,255, 1)'
                    }}
                    dataKey={dataKey}/>
            </LineChart>
        </ResponsiveContainer>
    );
}
