'use client';

import { Gauge } from '@/components/dashboard/Gauge';
import { StatusGauges } from '@/components/dashboard/StatusGauges';
import { VehicleView } from '@/components/dashboard/VehicleView';
import { Alerts } from '@/components/dashboard/Alerts';
import { useVehicleData } from '@/hooks/useVehicleData';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const { vehicleData, alerts } = useVehicleData();
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-background');

  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden relative font-headline"
    >
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt={mapImage.description}
          fill
          className="object-cover opacity-20"
          data-ai-hint={mapImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>

      <Alerts alerts={alerts} />
      <StatusGauges data={vehicleData} />

      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto] items-center w-full max-w-7xl gap-y-4 p-4 sm:p-8 md:p-12" style={{height: 'min(80vh, 500px)'}}>
        
        {/* Tachometer (RPM) */}
        <div className="row-start-1 justify-self-center">
          <Gauge value={vehicleData.rpm / 1000} max={8} label="RPM" unit="x1000" className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]" />
        </div>

        {/* Central Vehicle View */}
        <div className="col-start-2 row-start-1 w-full h-full">
          <VehicleView />
        </div>

        {/* Speedometer (MPH) */}
        <div className="row-start-1 justify-self-center">
          <Gauge value={vehicleData.speed} max={240} label="Speed" unit="MPH" className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]" />
        </div>

        {/* Gear Indicator */}
        <div className="col-span-3 row-start-2 self-end text-center">
            <div className="flex items-baseline justify-center gap-4">
                <span className="text-8xl font-bold text-foreground tabular-nums">{vehicleData.gear}</span>
                <span className="text-2xl text-primary font-medium">GEAR</span>
            </div>
        </div>
      </div>
    </main>
  );
}
