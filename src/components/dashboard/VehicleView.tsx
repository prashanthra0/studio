import { CarIcon } from '@/components/icons/CarIcon';

export function VehicleView() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative z-10">
        <CarIcon
          className="w-24 h-48 sm:w-32 sm:h-64 fill-background stroke-primary"
        />
      </div>
    </div>
  );
}
