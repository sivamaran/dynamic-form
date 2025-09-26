import { Injectable } from '@angular/core';
import { FormDefinition, FormFieldDef } from '../models/form-definition.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiFormService {
  private readonly API_KEY = environment.geminiApiKey;
  

  async generateFormDefinition(prompt: string): Promise<FormDefinition> {

    const fullPrompt = `
    You are a dynamic UI generator. You will be given a user request. Analyze it and generate a JSON response. Follow these scenarios in order of priority:

    **PRIORITY 1: Widget Definition**
    If the user's request starts with the word 'checkbox' and contains curly braces '{}', you MUST treat it as a 'CheckboxWidget' definition.
    - The format is 'checkbox {label; option1; option2; ...}'.
    - Set 'componentType' to 'widget' and 'widgetName' to 'CheckboxWidget'.
    - The text before the first semicolon is the 'label'.
    - All subsequent items separated by semicolons are the 'options' and MUST go into the 'props.options' array.
    - Create a 'fieldName' from the label in camelCase.

    **PRIORITY 2: Key-Value Data for Autofill**
    If the request does not match Priority 1, but it contains lines with colons ':' (e.g., 'Key: Value'), you MUST treat it as key-value data.
    - For each line, the text before the colon is the 'label'.
    - The text after the colon is the 'defaultValue'.
    - Set 'componentType' to 'field'.
    - Create a 'fieldName' from the label in camelCase.
    - Infer the 'fieldType' ('text' or 'textarea').

    **PRIORITY 3: Descriptive Prompt (Fallback)**
    If the request does not match Priority 1 or 2, treat it as a descriptive sentence.
    - Generate form fields based on the user's description.
    - DO NOT create any 'defaultValue'.

    **User Request:** "${prompt}"

    Now, generate the JSON response according to the first priority scenario that matches the user request.
    `;

    const schema = {
        type: "OBJECT",
        properties: {
            fields: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        componentType: { type: "STRING", enum: ["field", "widget"] },
                        fieldName: { type: "STRING" },
                        label: { type: "STRING" },
                        defaultValue: { type: "STRING" },
                        fieldType: { type: "STRING", enum: ["text", "email", "textarea", "select"] },
                        options: { type: "ARRAY", items: { type: "STRING" } },
                        validation: { type: "OBJECT", properties: { required: { type: "BOOLEAN" } } },
                        widgetName: { type: "STRING", enum: ["TableWidget", "CheckboxWidget", "CountryFlagDropDownWidget"] },
                        props: {
                            type: "OBJECT",
                            properties: {
                                columns: {
                                    type: "ARRAY",
                                    items: {
                                        type: "OBJECT",
                                        properties: {
                                            header: { type: "STRING" },
                                            key: { type: "STRING" }
                                        }
                                    }
                                },
                                options: { type: "ARRAY", items: { type: "STRING" } }
                            }
                        }
                    },
                    required: ["componentType", "fieldName", "label"]
                }
            },
            styling: {
                type: "OBJECT",
                properties: {
                    formBackground: { type: "STRING" },
                    fieldBackground: { type: "STRING" },
                    labelColor: { type: "STRING" },
                    textColor: { type: "STRING" },
                    buttonColor: { type: "STRING" },
                }
            },
            onSubmit: {
                type: "OBJECT",
                properties: {
                    action: { type: "STRING", enum: ["webhook", "modal"] },
                    url: { type: "STRING" }
                }
            }
        },
        required: ["fields"]
    };

    const payload = {
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: { responseMimeType: "application/json", responseSchema: schema },
    };

const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.API_KEY}`;

    console.log('Verifying API Key used. Ends in:', this.API_KEY.slice(-4));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error (${response.status}): ${errorBody}`);
    }

    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]) {
      const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
      console.log("AI Response JSON:", parsedJson);

      const definition: FormDefinition = {
        fields: parsedJson.fields || (Array.isArray(parsedJson) ? parsedJson : []),
        styling: parsedJson.styling || {},
        onSubmit: parsedJson.onSubmit || { action: 'modal' }
      };
      return definition;

    } else {
      throw new Error("The AI model did not return valid content.");
    }
  }

  async postToWebhook(url: string, data: any): Promise<void> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
  }
}