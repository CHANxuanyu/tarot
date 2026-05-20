import { buildAiReadingMessages } from './AiReadingPrompt';
import { AiReadingError, type AiReadingRequest } from './AiReadingTypes';

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function generateAiReading({ settings, context }: AiReadingRequest): Promise<string> {
  const baseUrl = settings.providerBaseUrl.trim().replace(/\/+$/, '');
  const apiKey = settings.apiKey.trim();
  const model = settings.model.trim();

  if (!settings.enableAIReading) {
    throw new AiReadingError('disabled', 'AI reading is disabled.');
  }

  if (!baseUrl) {
    throw new AiReadingError('missingBaseUrl', 'Provider base URL is required.');
  }

  if (!apiKey) {
    throw new AiReadingError('missingApiKey', 'API key is required.');
  }

  if (!model) {
    throw new AiReadingError('missingModel', 'Model is required.');
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: buildAiReadingMessages(context),
        temperature: 0.7,
      }),
    });
  } catch {
    throw new AiReadingError('network', 'Unable to reach the provider. Check the base URL, network connection, and browser CORS support.');
  }

  let data: ChatCompletionResponse | null = null;
  try {
    data = await response.json() as ChatCompletionResponse;
  } catch {
    if (response.ok) {
      throw new AiReadingError('invalidJson', 'The provider returned a response that could not be read as JSON.');
    }
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new AiReadingError('auth', data?.error?.message || 'Authentication failed. Check your API key.');
    }

    if (response.status === 429) {
      throw new AiReadingError('rateLimit', data?.error?.message || 'Rate limit reached. Please wait and try again.');
    }

    if (response.status >= 400 && response.status < 500) {
      throw new AiReadingError('badRequest', data?.error?.message || `Provider rejected the request with status ${response.status}.`);
    }

    throw new AiReadingError('provider', data?.error?.message || `Provider request failed with status ${response.status}.`);
  }

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new AiReadingError('empty', 'The provider returned an empty response.');
  }

  return content;
}