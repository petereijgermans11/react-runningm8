import React from "react";
import {PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer} from "recharts";
import {RadarDataFormat} from "../analysis.types";


export function CustomRadarChart({data}:{data: Array<RadarDataFormat>}) {
    return (
        <ResponsiveContainer aspect={1.5}>
            <RadarChart data={data}>
                <PolarGrid
                    stroke="rgba(255,125,255, 0.2)"
                    fill="rgba(255,125,255, 0.1)"
                />
                <PolarAngleAxis
                    dataKey="exercise"
                    stroke="rgba(255,125,255, 1)"
                    fill="rgba(255,125,255, 0.1)"
                />
                <Radar
                    name={'test'}
                    dataKey="duration"
                    stroke="rgba(255,125,255, 1)"
                    fill="rgba(255,125,255,1)"
                    fillOpacity={0.7}
                    animationEasing={'ease-in-out'}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}
