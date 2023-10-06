import React from "react";
// router
import {Outlet} from "react-router-dom";
import Footer from "../../containers/footer/Footer";


export function AppOutlet() {
    return (
        <div className={'appContainer'}>
            <div className={'appInnerContainer'}>
                <Outlet />
            </div>
            <Footer />
        </div>

    );
}
