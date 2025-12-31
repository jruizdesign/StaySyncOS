import { genkit, z } from 'genkit';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

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

const client = new RecaptchaEnterpriseServiceClient();

export const verifyRecaptcha = onCall(async (request) => {
    const token = request.data.token;
    const action = request.data.action;

    // TODO: Move these to environment variables
    const projectID = "gen-lang-client-0073207940";
    const recaptchaSiteKey = "6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC";

    if (!token) {
        throw new HttpsError("invalid-argument", "Token is missing");
    }

    const projectPath = client.projectPath(projectID);

    const assessmentRequest = {
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaSiteKey,
            },
        },
        parent: projectPath,
    };

    try {
        const [response] = await client.createAssessment(assessmentRequest);

        if (!response.tokenProperties?.valid) {
            throw new HttpsError(
                "invalid-argument",
                `The function must be called with a valid token. Reason: ${response.tokenProperties?.invalidReason}`
            );
        }

        if (response.tokenProperties.action === action) {
            return {
                score: response.riskAnalysis?.score,
                reasons: response.riskAnalysis?.reasons,
            };
        } else {
            throw new HttpsError(
                "failed-precondition",
                `The action attribute in the reCAPTCHA tag does not match the action you are expecting to score`
            );
        }
    } catch (e: any) {
        console.error("reCAPTCHA verification failed:", e);
        throw new HttpsError("internal", "reCAPTCHA verification failed");
    }
});