import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../store";
import {SessionSelectors} from "../../store/session";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {
    calcChartData,
    filterSessionsOnDate
} from "../../common/utilsFunctions";
import {CustomLineChart} from "./components/CustomLineChart";
import {CustomRadarChart} from "./components/CustomRadarChart";
import {useTranslation} from "react-i18next";
import {LineDataFormat, RadarDataFormat} from "./analysis.types";


export function Analysis() {
    const sessions = useAppSelector(SessionSelectors.getAllSessions)
    let date = new Date(Date.now())

    const [timeFrame, setTimeFrame] = useState('day')
    const [dataKey, setDataKey] = useState('distance')
    const [day,setDay] = useState(date.getDate())
    const [month,setMonth] = useState(date.getMonth())
    const [year,setYear] = useState(date.getFullYear())
    const [lineData,setLineData] = useState<Array<LineDataFormat>>([])
    const [radarData,setRadarData] = useState<Array<RadarDataFormat>>([])

    const { t } = useTranslation();

    const changeTimeFrame = ({value}:{value:string}) => {
        setTimeFrame(value)
    }
    const changeDate = ({value}:{value:number}) => {
        let date;
        if(timeFrame === 'day'){
            date = new Date(year, month, day + value)
        }else if(timeFrame ==='month'){
            date = new Date(year,  month+ value, day)
        }else{
            date = new Date(year + value, month, day)
        }
        setDay(date.getDate())
        setMonth(date.getMonth())
        setYear(date.getFullYear())
    }

    useEffect(()=>{
        let date = new Date(year, month, day)
        let selectedList;

        selectedList = filterSessionsOnDate({sessions:sessions, date: date, timeFrame:timeFrame})
        const {selectedLines, selectedRadar} = calcChartData({sessions: selectedList})

        setLineData(selectedLines)
        setRadarData(selectedRadar)
    },[setDay, setMonth, setYear, year, day, month, timeFrame, setRadarData, setLineData, sessions])

    return (
        <div className={'screenContainer chartsContainer'}>
            <div className={'timeSelectContainer'}>
                <div  className={'timeSelectButtonContainer'}>
                    <button
                        style={{ backgroundColor: timeFrame === 'day' ? undefined : '#333' }}
                        onClick={() => timeFrame !== 'day' ? changeTimeFrame({value:'day'}) : null}
                        className={'addButton changeButton'}>
                        {t('analysis:day')}
                    </button>
                    <button
                        style={{ backgroundColor: timeFrame === 'month' ? undefined : '#333' }}
                        onClick={() => timeFrame !== 'month' ? changeTimeFrame({value:'month'}) : null}
                        className={'addButton changeButton'}>
                        {t('analysis:month')}
                    </button>
                    <button
                        style={{ backgroundColor: timeFrame === 'year' ? undefined : '#333' }}
                        onClick={() => timeFrame !== 'year' ? changeTimeFrame({value:'year'}) : null}
                        className={'addButton changeButton'}>
                        {t('analysis:year')}
                    </button>
                </div>
                <div className={'datePickerContainer'}>
                    <div className={'timeFrameContainer'}>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                changeDate({value: -1})
                            }}
                            className={'addButton changeButton'}>
                            <FontAwesomeIcon icon={faCaretLeft}/>
                        </button>
                        <div className={'dateContainer'}>
                            <label>{day}</label>/
                            <label>{month + 1}</label>/
                            <label>{year}</label>
                        </div>
                        <button
                            onClick={() => changeDate({value:1 })}
                            className={'addButton changeButton'}>
                            <FontAwesomeIcon icon={faCaretRight}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={'lineChartContainer'}>
                <h4 className={'dataKeyWidth'}>
                    {t('common:Distance')}
                </h4>
                {lineData.length !== 0 ?
                    <CustomLineChart  data={lineData} dataKey={dataKey} timeFrame={timeFrame}/>
                :
                   <h1 className='textCenter buttonWiden'>
                       {t('analysis:noData')}
                   </h1>
                }
            </div>
            <div className={'dataKeyContainer'}>
                <button
                    onClick={() => setDataKey('speed')}
                    className={'addButton changeButton'}>
                    {t('common:Speed')}
                </button>
                <button
                    onClick={() => setDataKey('distance')}
                    className={'addButton changeButton'}>
                    {t('common:Distance')}
                </button>
                <button
                    onClick={() => setDataKey('time')}
                    className={'addButton changeButton'}>
                    {t('common:Time')}
                </button>
            </div>
            <div className={'radarChartContainer'}>
                <h4 className={'dataKeyWidth'}>
                    {t('common:Exercises')}
                </h4>
                <CustomRadarChart data={[...radarData]}/>
            </div>
        </div>

    );
}
