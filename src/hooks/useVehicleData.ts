'use client';

import { useState, useEffect } from 'react';
import { type VehicleData, type Alert } from '@/lib/types';

const MAX_SPEED = 240;
const MAX_RPM = 8000;

function generateRandomFluctuation(base: number, fluctuation: number) {
  return base * (1 + (Math.random() - 0.5) * fluctuation);
}

export function useVehicleData() {
  const [data, setData] = useState<VehicleData>({
    speed: 65,
    rpm: 2200,
    fuel: 75,
    temperature: 90,
    battery: 98,
    gear: 'D',
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Simulate more realistic driving fluctuations
        const speedChange = (Math.random() - 0.48) * 5;
        const newSpeed = Math.max(0, Math.min(MAX_SPEED, prevData.speed + speedChange));
        
        let newRpm;
        if (newSpeed < 1) {
          newRpm = generateRandomFluctuation(800, 0.1);
        } else {
          newRpm = Math.max(800, Math.min(MAX_RPM, (newSpeed / 40) * 1000 + (Math.random() - 0.5) * 500));
        }
        
        const gear = newSpeed < 1 ? 'P' : newSpeed < 20 ? '1' : newSpeed < 40 ? '2' : newSpeed < 65 ? '3' : newSpeed < 90 ? '4' : '5';
        
        // Simulate resource consumption
        const newFuel = Math.max(0, prevData.fuel - (newSpeed / MAX_SPEED) * 0.1);
        const newTemp = Math.min(130, Math.max(85, prevData.temperature + (newSpeed / MAX_SPEED - 0.2) * 0.5 + (Math.random() - 0.5) * 1));
        const newBattery = Math.max(80, prevData.battery - 0.001);
        
        return {
          speed: newSpeed,
          rpm: newRpm,
          fuel: newFuel,
          temperature: newTemp,
          battery: newBattery,
          gear,
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAlerts(currentAlerts => {
      const newAlerts: Alert[] = [];
      const hasLowFuelAlert = currentAlerts.some(a => a.id === 'low-fuel');
      const hasHighTempAlert = currentAlerts.some(a => a.id === 'high-temp');

      if (data.fuel < 15 && !hasLowFuelAlert) {
        newAlerts.push({ id: 'low-fuel', type: 'warning', message: 'Low Fuel. Please refuel soon.' });
      }
      if (data.temperature > 115 && !hasHighTempAlert) {
        newAlerts.push({ id: 'high-temp', type: 'error', message: 'Engine Overheating. Stop the vehicle.' });
      }

      // Logic to remove alerts when condition is no longer met
      let updatedAlerts = [...currentAlerts];
      if (data.fuel >= 15 && hasLowFuelAlert) {
        updatedAlerts = updatedAlerts.filter(a => a.id !== 'low-fuel');
      }
      if (data.temperature <= 115 && hasHighTempAlert) {
        updatedAlerts = updatedAlerts.filter(a => a.id !== 'high-temp');
      }
      
      return [...updatedAlerts, ...newAlerts];
    });

  }, [data.fuel, data.temperature]);

  return { vehicleData: data, alerts };
}
