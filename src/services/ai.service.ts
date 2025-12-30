import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from "@google/genai";
import { MaintenanceRequest, FinancialDocument } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  async generateDailyReport(logs: string, debts: string): Promise<string> {
    if (!process.env['API_KEY']) return "API Key not configured. Unable to generate AI report.";

    try {
      const prompt = `
        You are a Hotel Manager Assistant. 
        Analyze the following system logs and current guest debts. 
        Provide a concise executive summary (3-4 bullet points) highlighting critical issues (like high debt or maintenance) and general activity.
        
        LOGS:
        ${logs}

        DEBTS:
        ${debts}
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text || "No insights generated.";
    } catch (e) {
      console.error(e);
      return "Error generating report. Please try again later.";
    }
  }

  async draftPaymentReminder(guestName: string, amount: number): Promise<string> {
    if (!process.env['API_KEY']) return "API Key missing.";
    
    try {
      const prompt = `Draft a polite but firm email to guest ${guestName} regarding an outstanding balance of $${amount}. Keep it professional and under 100 words.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      return response.text || "Could not generate draft.";
    } catch (e) {
      return "Error generating draft.";
    }
  }

  async draftMaintenanceAlert(req: MaintenanceRequest): Promise<string> {
    if (!process.env['API_KEY']) return `Maintenance Request for Room ${req.roomNumber}: ${req.description}`;

    try {
        const prompt = `
            Write a formal internal maintenance work order email.
            Details:
            - Room: ${req.roomNumber}
            - Priority: ${req.priority}
            - Issue: ${req.description}
            - Reported By: ${req.reportedBy}
            
            Keep it actionable and concise.
        `;

        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text || "New Work Order Generated.";
    } catch (e) {
        return "New Maintenance Work Order";
    }
  }

  async analyzeDocument(base64DataUrl: string): Promise<{ title?: string, category?: string, tags?: string[], summary?: string }> {
    if (!process.env['API_KEY']) return {};

    try {
      // Extract mime and data
      const matches = base64DataUrl.match(/^data:(.+);base64,(.+)$/);
      if (!matches) return {};
      
      const mimeType = matches[1];
      const data = matches[2];

      const prompt = `Analyze this document for efficient storage and recall. 
      1. Provide a short, descriptive title if the one on the document is clear (otherwise suggest one).
      2. Categorize it into one of: 'ID', 'Contract', 'Invoice', 'Report', 'Other'.
      3. Generate 3-5 keywords/tags for search recall.
      4. A brief 1-sentence summary of the content.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { inlineData: { mimeType, data } },
            { text: prompt }
          ]
        },
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ['ID', 'Contract', 'Invoice', 'Report', 'Other'] },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    summary: { type: Type.STRING }
                }
            }
        }
      });
      
      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (e) {
      console.error("AI Analysis failed", e);
      return {};
    }
  }

  async analyzeSystemDocument(doc: FinancialDocument): Promise<{ tags?: string[], summary?: string }> {
    if (!process.env['API_KEY']) return {};

    const docStr = JSON.stringify({
        type: doc.type,
        guest: doc.guestName,
        items: doc.items,
        total: doc.totalAmount,
        notes: doc.notes
    });

    const prompt = `
    Analyze this hotel financial document (JSON format).
    1. Generate 3-5 relevant tags for search/categorization (e.g. "Room Service", "VIP", "High Value").
    2. Write a brief 1-sentence summary of the transaction.
    
    Document Data:
    ${docStr}
    `;

    try {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        summary: { type: Type.STRING }
                    }
                }
            }
        });
        
        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error('System Doc Analysis Failed', e);
        return {};
    }
  }
}