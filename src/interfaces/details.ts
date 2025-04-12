export interface DetailsProps {
    completedCycles: number;
    fullWorkingTime: number;
    numberOfPomodoros: number;
    timeCounting: boolean
    config: {
        PomodoroTime: number;
        shortRestTime: number;
        longRestTime: number;
    };
    onConfigChange: (newConfig: {
        PomodoroTime: number;
        shortRestTime: number;
        longRestTime: number;
    }) => void;
};