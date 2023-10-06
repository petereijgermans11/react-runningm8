import React, {useEffect} from "react";
//styling files
import '../index.css';
import '../styling/splashScreen.scss'
import '../styling/OutletStyling.scss'
import '../styling/modalStyling.scss'
import '../styling/screenStyling.scss'
import '../styling/previewStyling.scss'
import '../styling/footer.scss'
import '../styling/mapStyling.scss'
import 'react-toastify/dist/ReactToastify.css';
import '../styling/toast.scss'
// routing
import {Route, Routes} from "react-router-dom";
import {Slide, ToastContainer} from "react-toastify";
import {useAppDispatch} from "../store";
// components
import SplashScreen from "../containers/splashscreens/SplashScreen";
import FirstUseOutlet from "./outlets/FirstUseOutlet";
import Gender from "../containers/firstUse/components/Gender";
import Weight from "../containers/firstUse/components/Weight";
import Height from "../containers/firstUse/components/Height";
import Goal from "../containers/firstUse/components/Goal";
import {AppOutlet} from "./outlets/AppOutlet";
import {Run} from "../containers/map/Run";
import Welcome from "../containers/firstUse/components/Welcome";
import {Home} from "../containers/home/Home";
import {Schemas} from "../containers/trainingschema/Schemas";
import {Analysis} from "../containers/analysis/Analysis";
import {Profile} from "../containers/profile/Profile";
// thunks
import {UserThunks} from "../store/user";
import {SessionThunks} from "../store/session";
import {GoalThunks} from "../store/goal";
import {SchemaThunks} from "../store/schemas";


export function Navigator() {
    const dispatch = useAppDispatch()

    useEffect(()=>{
            let user = dispatch(UserThunks.loadUser()).unwrap()
            let id;
            user.then((user) => {
                if(user)
                id = user.id
            })
            dispatch(SessionThunks.loadSessions())
            dispatch(GoalThunks.loadGoal())
            dispatch(SchemaThunks.loadSchemas())
            dispatch(SchemaThunks.loadOthersSchemas())

            if(id){
                dispatch(UserThunks.loadFromFirebase(id))
            }

    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/app" element={<AppOutlet />}>
                    <Route path='home' element={<Home />}/>
                    <Route path='schemas' element={<Schemas />}/>
                    <Route path='run' element={<Run />}/>
                    <Route path='analysis' element={<Analysis />}/>
                    <Route path='profile' element={<Profile />}/>
                </Route>
                <Route path="/firstUse" element={<FirstUseOutlet />} >
                    <Route path='welcome' element={<Welcome/>}/>
                    <Route path='gender' element={<Gender/>}/>
                    <Route path='weight' element={<Weight/>}/>
                    <Route path='height' element={<Height />}/>
                    <Route path='goal' element={<Goal />}/>
                </Route>
            </Routes>
            <ToastContainer
                autoClose={2500}
                position={'bottom-center'}
                hideProgressBar={false}
                newestOnTop={true}
                transition={Slide}
                closeButton={false}
                draggableDirection={'x'}
                bodyClassName={'toastBody'}
                limit={3}
                role={'alert'}
            />
        </>
    );
}
