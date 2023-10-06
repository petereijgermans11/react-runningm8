import React from "react";
import {useAppSelector} from "../../../store";
import {SessionSelectors} from "../../../store/session";
import {formatTimeToHumanText} from "../../../common/utilsFunctions";

import {StatisticsDisplay} from "../../profile/components/StatisticsDisplay";
import {useTranslation} from "react-i18next";

export function WeeklyRecords() {
    const weekly = useAppSelector(SessionSelectors.getWeeklyProgress)
    const { t } = useTranslation();
    return (
        <StatisticsDisplay
            title={t('profile:titles:weekly')}
            data={
                [
                    {
                        title: t('common:Distance'),
                        value:weekly.distance.toString().substring(0,5) + " km"
                            ||  t('profile:noDistance')
                    },
                    {
                        title:t('common:totalTime'),
                        value:formatTimeToHumanText(weekly.time)
                            || t('profile:noTime')
                    },
                    {
                        title: t('common:averageSpeed'),
                        value:weekly.speed.toString().substring(0,5)+ ' kmh'
                            || t('profile:noSpeed')
                    },
                    {
                        title: t('common:totalWorkoutTime'),
                        value:formatTimeToHumanText(weekly.workoutTime)
                            || t('profile:noTime')
                    },
                    {
                        title: t('common:workouts'),
                        value:weekly.workouts.toString().substring(0,5)
                            || t('profile:noWorkouts')
                    },
                ]
            }
        />
    );
}
