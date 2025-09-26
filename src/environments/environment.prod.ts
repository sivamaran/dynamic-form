declare global {
  interface Window {
    env: {
      GEMINI_API_KEY: string;
    };
  }
}

export const environment = {
  production: true,
  get geminiApiKey(): string {
    return window.env?.GEMINI_API_KEY || '';
  }
};