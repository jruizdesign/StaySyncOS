import { genkit, z } from 'genkit';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';

enableFirebaseTelemetry();

// Initialize Genkit
export const ai = genkit({
    plugins: [
        googleAI()
    ]
});

// Example flow
export const helloWorld = ai.defineFlow(
    {
        name: 'helloWorld',
        inputSchema: z.string(),
        outputSchema: z.string(),
    },
    async (subject) => {
        return `Hello, ${subject}!`;
    }
);

export { verifyRecaptcha } from './verify-recaptcha';
