import React, { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { Button, Timer, Nav, Details } from "./exports";
import { PomodoroProps } from "../interfaces/pomodoro";

const bellStart = require('../sounds/bellStart.mp3');
const bellFinish = require('../sounds/bellFinish.mp3');

const audioStartWorking: HTMLAudioElement = new Audio(bellStart);
const audioSFinishtWorking: HTMLAudioElement = new Audio(bellFinish);

export function PomodoroTimer(props: PomodoroProps): React.ReactElement {
    const [mainTime, setMainTime] = useState(props.config.PomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);

    useEffect(() => {
        setMainTime(props.config.PomodoroTime);
      }, [props.config.PomodoroTime]);

    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [isLongResting, setIsLongResting] = useState(false)
    const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.config.cycles - 1).fill(true));
    
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    // Se timeCouting for true reduz o tempo um segundo
    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if(working) setFullWorkingTime(fullWorkingTime + 1)
        }, timeCounting ? 1000 : null)

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setIsLongResting(false)
        setMainTime(props.config.PomodoroTime);
        audioStartWorking.play();
    }, [props.config.PomodoroTime])

    const configureRest = useCallback((long?: boolean) => {
        setTimeCounting(false);
        setWorking(false);
        setResting(true);
        setMainTime(long ? props.config.longRestTime : props.config.shortRestTime);
        audioSFinishtWorking.play();
    }, [props.config.longRestTime, props.config.shortRestTime]);

    useEffect(() => {
        if(mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            const newManager = [...cyclesQtdManager];
            newManager.pop();
            setCyclesQtdManager(newManager);
            configureRest(false);
          } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true)
            setCyclesQtdManager(new Array(props.config.cycles - 1).fill(true))
            setCompletedCycles(completedCycles + 1)
            setIsLongResting(true)
        }
        if(working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if(resting) configureWork();
    }, [working, resting, mainTime, numberOfPomodoros, setCyclesQtdManager,cyclesQtdManager, completedCycles, props.config.cycles, setCompletedCycles])


    return (
        <div className="pomodoro">
          <Nav isLongResting={isLongResting} resting={resting} working={working}/>
          <Timer mainTime={mainTime} />
    
          <div className="controlls">
          {!working && !resting && (
            <Button
              text="INICIAR"
              onclick={() => configureWork()}
            />
          )}

          {(working || resting) && (
            <Button
              text={timeCounting ? "Pausar" : "Iniciar"}
              onclick={() => setTimeCounting(!timeCounting)}
            />
          )}

          {working && (
            <Button
              text="Descansar"
              onclick={() => configureRest()}
            />
          )}

           {!working && resting && (
            <Button
              text="Pular"
              onclick={() => configureWork()}
            />
          )}
          </div>
          <Details
            timeCounting={timeCounting}
            completedCycles={completedCycles}
            fullWorkingTime={fullWorkingTime}
            numberOfPomodoros={numberOfPomodoros}
            config={props.config}
            onConfigChange={props.onConfigChange}
         />
        </div>
      );
}