export interface PomodoroProps  {
    config: {
        PomodoroTime: number;
        shortRestTime: number;
        longRestTime: number;
        cycles: number;
    }
    onConfigChange: (newConfig: {
        PomodoroTime: number;
        shortRestTime: number;
        longRestTime: number;
    }) => void;
}