import React, { useEffect } from "react";
import { NavProps } from "../interfaces/nav";

export function Nav(props: NavProps): React.ReactElement {
    return(
        <div className="nav">
            <p className={props.working ? 'isOnWork' : ''}>Pomodoro</p>
            <p className={props.resting && !props.isLongResting ? 'isOnResting' : ''}>Pausa curta</p>
            <p className={props.isLongResting ? 'isOnResting' : ''}>Pausa longa</p>
        </div>
    )
}