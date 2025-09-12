'use server';
/**
 * @fileOverview A route optimization AI agent that adjusts routes based on traffic conditions.
 *
 * - optimizeRouteWithTrafficAnalysis - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRouteWithTrafficAnalysis function.
 * - OptimizeRouteOutput - The return type for the optimizeRouteWithTrafficAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  start: z.string().describe('The starting location for the route.'),
  destination: z.string().describe('The destination for the route.'),
  currentTrafficConditions: z.string().describe('A description of the current traffic conditions.'),
  driverPreferences: z.string().optional().describe('Any preferences the driver has for the route, such as avoiding tolls or highways.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized route, taking into account traffic conditions and driver preferences.'),
  estimatedTravelTime: z.string().describe('The estimated travel time for the optimized route.'),
  reasoning: z.string().describe('The reasoning behind the route optimization decisions.'),
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRouteWithTrafficAnalysis(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteWithTrafficAnalysisFlow(input);
}

const optimizeRoutePrompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are an expert route optimizer, skilled at finding the best routes based on traffic conditions and driver preferences.

  Given the following information, provide an optimized route, the estimated travel time, and the reasoning behind your decisions.

  Starting Location: {{{start}}}
  Destination: {{{destination}}}
  Current Traffic Conditions: {{{currentTrafficConditions}}}
  Driver Preferences: {{{driverPreferences}}}

  Optimize the route to minimize travel time while respecting the driver's preferences.
  Explain the reasoning behind the route optimization decisions.
  Return the optimized route, estimated travel time, and reasoning in the specified JSON format.
  `,
});

const optimizeRouteWithTrafficAnalysisFlow = ai.defineFlow(
  {
    name: 'optimizeRouteWithTrafficAnalysisFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await optimizeRoutePrompt(input);
    return output!;
  }
);
