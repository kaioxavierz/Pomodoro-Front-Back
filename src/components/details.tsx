import React, { useEffect, useState } from "react";
import { Settings, BookText  } from "lucide-react";
import { secondsToHours } from "../utils/seconds-to-hours";
import { minutesToSecounds, secoundsToMinute } from "../utils/convertSecounds";
import { DetailsProps } from "../interfaces/details";

export function Details(props: DetailsProps): React.ReactElement {
    const [showSettings, setShowSettings] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const [formConfig, setFormConfig] = useState(props.config);
    useEffect(() => {
        setFormConfig(props.config)
    }, [props.config])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const formatedValue = minutesToSecounds(Number(value))
        
        const newConfig = {
            ...formConfig,
            [name]: formatedValue,
        }
        setFormConfig(newConfig);
        props.onConfigChange(newConfig);
    };

    return(
        <div className="details">
            <div className="controlls">
                <button onClick={() => setShowSettings(!showSettings)}>
                <Settings/>
            </button>
            <button onClick={() => setShowDetails(!showDetails)}>
                <BookText/>
            </button>
            </div>
            
            {showSettings && (
                <form>
                <label>Pomodoro
                 <input
                  type="number"
                  name="PomodoroTime"
                  value={secoundsToMinute(formConfig.PomodoroTime)}
                  onChange={handleChange}
                />
                </label>

                <label>Descanso curto
                 <input
                  type="number"
                  name="shortRestTime"
                  value={secoundsToMinute(formConfig.shortRestTime)}
                  onChange={handleChange}
                />
                </label>

                <label>Descanso longo
                  <input
                  type="number"
                  name="longRestTime"
                  value={secoundsToMinute(formConfig.longRestTime)}
                  onChange={handleChange}
                  />
                </label>
              </form>
            )}
            {showDetails && (
                <p>Ciclos concluídos: {props.completedCycles}<br/>
                  Horas trabalhadas: {secondsToHours(props.fullWorkingTime)}<br/>
                  Pomodoros concluídos: {props.numberOfPomodoros}
                </p>
                
            )}
        </div>
    )
}