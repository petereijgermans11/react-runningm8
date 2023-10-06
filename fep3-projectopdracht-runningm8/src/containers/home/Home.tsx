import React, {useEffect, useState} from "react";
//utils
import {
    calcWeeklyGoalProgression,
} from "../../common/utilsFunctions";
// elements
import {Cell, Label, Legend, Pie, PieChart} from "recharts";
import {WeeklyRecords} from "../analysis/components/WeeklyRecords";
import {ButtonModal} from "../modals/ButtonModal";
// data
import {useAppDispatch, useAppSelector} from "../../store";
import {GoalSelectors, GoalThunks} from "../../store/goal";
import {SessionSelectors} from "../../store/session";
import {GoalChange} from "../modals/GoalChange";

import {useTranslation} from "react-i18next";
import {AppSelectors} from "../../store/app";
import {useLocation, useNavigate} from "react-router-dom";


export function Home() {
    const sessions = useAppSelector(SessionSelectors.getAllSessions)
    const goal = useAppSelector(GoalSelectors.getGoal)
    const firstUse = useAppSelector(AppSelectors.getFirstUse)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation();

    const [displayedGoal, setDisplayedGoal] = useState(goal.goalAmount || 0)
    const [displayedGoalCompleted, setDisplayedGoalCompleted] = useState(0)
    const { t } = useTranslation();

    useEffect(()=>{
        dispatch(GoalThunks.checkGoal())
        if(!firstUse){
            if(sessions.length >= 0){
                setDisplayedGoal(goal.goalAmount as number)
                setDisplayedGoalCompleted(calcWeeklyGoalProgression({sessions, goal}))
            }
        } else {
            if(!pathname.startsWith('/firstUse'))
                navigate('/firstUse/welcome')
        }
    }, [ sessions, goal, dispatch, setDisplayedGoalCompleted, firstUse, navigate, pathname])

    const data = [
        {
            "name": t('common:'+goal.goalType) + ' ' + t('home:left'),
            "value": (displayedGoal - displayedGoalCompleted) > 0 ? displayedGoal - displayedGoalCompleted : 0,
            color:'#BBB'
        },
        {
            "name": t('home:completed'),
            "value": displayedGoalCompleted,
            color:'rgba(255,125,255,0.8)'
        },
    ];
    return (
        <div className='screenContainer'>
            <section className='screenTitleContainer'>
                <h2 className='screenTitle '>
                    {t('home:title')}
                </h2>
                <hr className='screenHR'/>
            </section>
            <div className='screenContentContainer'>
                <h3 className='screenTitle'>
                    {t('home:goalTitle')}
                </h3>
                    <PieChart width={450} height={350}>
                        <Pie
                            data={data}
                            startAngle={-270}
                            endAngle={360}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            fill={'#0b2038'}
                            innerRadius={100}
                            outerRadius={130}  >
                            {data.map(
                                (
                                    item, index) =>
                                        <Cell key={index} fill={item.color} stroke={'#0b2038'}/>
                                )
                            }
                            <Label offset={0} position="center" fill={'white'} fontSize={46} fontWeight={'bold'}>
                                {
                                    Math.floor(
                                        (displayedGoalCompleted / displayedGoal ) * 100
                                    ).toString() + "%"
                                }
                            </Label>
                        </Pie>
                        <Legend />
                    </PieChart>
                <ButtonModal text={t('buttons:changeGoal')}>
                    <GoalChange />
                </ButtonModal>
                <hr className={'screenHR'}/>
                <WeeklyRecords />
            </div>
        </div>
    );
}
