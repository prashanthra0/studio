import Image from 'next/image';
import { CarIcon } from '@/components/icons/CarIcon';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function VehicleView() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-background');

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt={mapImage.description}
          fill
          className="object-cover opacity-10"
          data-ai-hint={mapImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      <div className="relative z-10">
        <CarIcon
          className="w-24 h-48 sm:w-32 sm:h-64 fill-background stroke-primary"
        />
      </div>
    </div>
  );
}