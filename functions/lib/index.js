"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = exports.ai = void 0;
const genkit_1 = require("genkit");
const firebase_1 = require("@genkit-ai/firebase");
const googleai_1 = require("@genkit-ai/googleai");
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
//# sourceMappingURL=index.js.map