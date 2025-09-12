import { Droplet, Thermometer, BatteryFull } from 'lucide-react';
import { type VehicleData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RouteOptimizer } from './RouteOptimizer';

interface StatusGaugesProps {
  data: VehicleData;
}

const GaugeBar = ({ value, icon, colorClass }: { value: number; icon: React.ReactNode; colorClass: string }) => (
    <div className="flex items-center gap-2 w-32">
        {icon}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
                className={cn("h-full rounded-full transition-all duration-500", colorClass)}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

export function StatusGauges({ data }: StatusGaugesProps) {
  const getTempColor = (temp: number) => {
    if (temp > 110) return 'bg-destructive';
    if (temp > 95) return 'bg-warning';
    return 'bg-primary';
  };

  const getFuelColor = (fuel: number) => {
    if (fuel < 15) return 'bg-destructive';
    if (fuel < 30) return 'bg-warning';
    return 'bg-primary';
  }

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-sm sm:max-w-md px-4 z-20">
      <div className="flex justify-between items-center p-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
        <GaugeBar value={data.fuel} icon={<Droplet className="w-5 h-5 text-primary" />} colorClass={getFuelColor(data.fuel)} />
        <GaugeBar value={(data.temperature / 130) * 100} icon={<Thermometer className="w-5 h-5 text-primary" />} colorClass={getTempColor(data.temperature)} />
        <GaugeBar value={data.battery} icon={<BatteryFull className="w-5 h-5 text-primary" />} colorClass={'bg-primary'} />
        <RouteOptimizer />
      </div>
    </div>
  );
}