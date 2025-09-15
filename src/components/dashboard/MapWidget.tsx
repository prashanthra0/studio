'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PlaceHolderImages from '@/lib/placeholder-images.json';

export function MapWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const smallMapImage = PlaceHolderImages.find(img => img.id === 'map-widget-small');
  const largeMapImage = PlaceHolderImages.find(img => img.id === 'map-widget-large');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-4 right-4 z-30 cursor-pointer group">
          {smallMapImage && (
            <Image
              src={smallMapImage.imageUrl}
              alt={smallMapImage.description}
              width={100}
              height={75}
              className="rounded-lg border-2 border-primary shadow-lg group-hover:scale-105 transition-transform object-cover"
              data-ai-hint={smallMapImage.imageHint}
            />
          )}
          <div className="absolute top-1 right-1">
             <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:bg-primary/20">
                <Maximize className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-none p-0">
        <DialogHeader className="p-4 absolute top-0 left-0 z-10 bg-background/50 backdrop-blur-sm rounded-br-lg">
          <DialogTitle>Live Map</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-full">
          {largeMapImage && (
            <Image
              src={largeMapImage.imageUrl}
              alt={largeMapImage.description}
              fill
              className="object-cover object-bottom"
              data-ai-hint={largeMapImage.imageHint}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
