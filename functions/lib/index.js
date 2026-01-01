"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecaptcha = void 0;
// import { genkit, z } from 'genkit';
// import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
// import { googleAI } from '@genkit-ai/googleai';
const https_1 = require("firebase-functions/v2/https");
const recaptcha_enterprise_1 = require("@google-cloud/recaptcha-enterprise");
// enableFirebaseTelemetry();
// // Initialize Genkit
// export const ai = genkit({
//     plugins: [
//         googleAI()
//     ]
// });
// // Example flow
// export const helloWorld = ai.defineFlow(
//     {
//         name: 'helloWorld',
//         inputSchema: z.string(),
//         outputSchema: z.string(),
//     },
//     async (subject) => {
//         return `Hello, ${subject}!`;
//     }
// );
let client = null;
exports.verifyRecaptcha = (0, https_1.onCall)({ cors: ["https://www.staysync.space"] }, async (request) => {
    var _a, _b, _c, _d, _e;
    if (!client) {
        client = new recaptcha_enterprise_1.RecaptchaEnterpriseServiceClient();
    }
    const token = request.data.token;
    const action = request.data.action;
    // TODO: Move these to environment variables
    const projectID = "gen-lang-client-0073207940";
    const recaptchaSiteKey = "6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC";
    if (!token) {
        throw new https_1.HttpsError("invalid-argument", "Token is missing");
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
        // Check if the token is valid.
        if (!((_a = response.tokenProperties) === null || _a === void 0 ? void 0 : _a.valid)) {
            console.log(`The CreateAssessment call failed because the token was: ${(_b = response.tokenProperties) === null || _b === void 0 ? void 0 : _b.invalidReason}`);
            throw new https_1.HttpsError("invalid-argument", `The function must be called with a valid token. Reason: ${(_c = response.tokenProperties) === null || _c === void 0 ? void 0 : _c.invalidReason}`);
        }
        // Check if the expected action was executed.
        if (response.tokenProperties.action === action) {
            const score = (_d = response.riskAnalysis) === null || _d === void 0 ? void 0 : _d.score;
            const reasons = (_e = response.riskAnalysis) === null || _e === void 0 ? void 0 : _e.reasons;
            console.log(`The reCAPTCHA score is: ${score}`);
            reasons === null || reasons === void 0 ? void 0 : reasons.forEach((reason) => {
                console.log(reason);
            });
            return {
                score: score,
                reasons: reasons,
            };
        }
        else {
            console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
            throw new https_1.HttpsError("failed-precondition", `The action attribute in the reCAPTCHA tag does not match the action you are expecting to score`);
        }
    }
    catch (e) {
        console.error("reCAPTCHA verification failed:", e);
        throw new https_1.HttpsError("internal", "reCAPTCHA verification failed");
    }
});
//# sourceMappingURL=index.js.map