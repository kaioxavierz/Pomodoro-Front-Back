export interface DefaultConfig {
    PomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export interface OnConfigChange {
    PomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
}