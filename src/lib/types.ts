export interface VehicleData {
  speed: number;
  rpm: number;
  fuel: number;
  temperature: number;
  battery: number;
  gear: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error';
  message: string;
}
