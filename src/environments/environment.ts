declare global {
  interface Window {
    env: {
      GEMINI_API_KEY: string;
    };
  }
}

export const environment = {
  production: false,
  get geminiApiKey(): string {
    return window.env?.GEMINI_API_KEY || 'AIzaSyAVzjrMUsaYuTYYp5n_k3ITqxeZjSFgkZs';
  }
};