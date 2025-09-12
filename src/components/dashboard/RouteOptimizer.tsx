'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Route, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { optimizeRouteWithTrafficAnalysis, OptimizeRouteOutput } from '@/ai/flows/route-optimization-with-traffic-analysis';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  start: z.string().min(2, { message: 'Start location is required.' }),
  destination: z.string().min(2, { message: 'Destination is required.' }),
  currentTrafficConditions: z.string().min(5, { message: 'Traffic description is required.' }),
  driverPreferences: z.string().optional(),
});

export function RouteOptimizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: '1 Infinite Loop, Cupertino, CA',
      destination: 'Golden Gate Bridge, San Francisco, CA',
      currentTrafficConditions: 'Heavy congestion on US-101 North near Palo Alto due to an accident. Moderate traffic on I-280.',
      driverPreferences: 'Avoid tolls, prefer scenic routes.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await optimizeRouteWithTrafficAnalysis(values);
      setResult(response);
    } catch (error) {
      console.error('Error optimizing route:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to optimize route. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/20">
          <Route className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Route Optimizer</DialogTitle>
          <DialogDescription>
            Enter your route details and let our AI find the best path for you, considering live traffic and your preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentTrafficConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Traffic</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe traffic conditions..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="driverPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferences (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Avoid highways" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Optimize Route
              </Button>
            </form>
          </Form>

          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-2">Optimized Route</h3>
            <ScrollArea className="h-[420px] w-full rounded-md border p-4 bg-secondary/50">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {result && !isLoading && (
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-primary">Route Details</h4>
                    <p className="text-foreground">{result.optimizedRoute}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Est. Travel Time</h4>
                    <p className="text-foreground">{result.estimatedTravelTime}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Reasoning</h4>
                    <p className="text-muted-foreground">{result.reasoning}</p>
                  </div>
                </div>
              )}
              {!result && !isLoading && (
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  <p>Your optimized route and AI analysis will appear here.</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}