// src/types/WeatherData.ts
export interface EstimatedActual {
    air_temp: number;
    dni: number;
    ghi: number;
    period_end: string;
    period: string;
}

export interface WeatherData {
    estimated_actuals: EstimatedActual[];
}
