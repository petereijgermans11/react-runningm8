import React, {useEffect, useState} from "react";
// router
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store";
import {AppSelectors} from "../../store/app";

export default function FirstUseOutlet() {
    const navigate = useNavigate()
    const selector = useAppSelector(AppSelectors.getFirstUse)

    useEffect(()=>{
      if(!selector){
          navigate('/app/home')
      }
    }, [selector,navigate])

    const [screenNumber, setScreenNumber] = useState(1)
    return (
        <div className='firstUseContainer'>
            <div className='screenCount'>
                {screenNumber}/5
            </div>
            <Outlet context={[screenNumber, setScreenNumber]}/>
        </div>
);
}
