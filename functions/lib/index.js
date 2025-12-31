"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecaptcha = exports.helloWorld = exports.ai = void 0;
const genkit_1 = require("genkit");
const firebase_1 = require("@genkit-ai/firebase");
const googleai_1 = require("@genkit-ai/googleai");
const https_1 = require("firebase-functions/v2/https");
const recaptcha_enterprise_1 = require("@google-cloud/recaptcha-enterprise");

(0, firebase_1.enableFirebaseTelemetry)();

// Initialize Genkit
exports.ai = (0, genkit_1.genkit)({
    plugins: [
        (0, googleai_1.googleAI)()
    ]
});

// Example flow
exports.helloWorld = exports.ai.defineFlow({
    name: 'helloWorld',
    inputSchema: genkit_1.z.string(),
    outputSchema: genkit_1.z.string(),
}, async (subject) => {
    return `Hello, ${subject}!`;
});

const client = new recaptcha_enterprise_1.RecaptchaEnterpriseServiceClient();
exports.verifyRecaptcha = (0, https_1.onCall)(async (request) => {
    var _a, _b, _c, _d;
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
        if (!((_a = response.tokenProperties) === null || _a === void 0 ? void 0 : _a.valid)) {
            throw new https_1.HttpsError("invalid-argument", `The function must be called with a valid token. Reason: ${(_b = response.tokenProperties) === null || _b === void 0 ? void 0 : _b.invalidReason}`);
        }
        if (response.tokenProperties.action === action) {
            return {
                score: (_c = response.riskAnalysis) === null || _c === void 0 ? void 0 : _c.score,
                reasons: (_d = response.riskAnalysis) === null || _d === void 0 ? void 0 : _d.reasons,
            };
        }
        else {
            throw new https_1.HttpsError("failed-precondition", `The action attribute in the reCAPTCHA tag does not match the action you are expecting to score`);
        }
    }
    catch (e) {
        console.error("reCAPTCHA verification failed:", e);
        throw new https_1.HttpsError("internal", "reCAPTCHA verification failed");
    }
});
//# sourceMappingURL=index.js.map
