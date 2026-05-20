import type { Locale } from '../i18n';
import type { DrawnCard, SpreadId } from './types';

export type AiReadingSettings = {
  enableAIReading: boolean;
  providerBaseUrl: string;
  apiKey: string;
  model: string;
};

export type AiReadingErrorCode =
  | 'disabled'
  | 'missingBaseUrl'
  | 'missingApiKey'
  | 'missingModel'
  | 'network'
  | 'auth'
  | 'rateLimit'
  | 'badRequest'
  | 'invalidJson'
  | 'empty'
  | 'provider';

export class AiReadingError extends Error {
  code: AiReadingErrorCode;

  constructor(code: AiReadingErrorCode, message: string) {
    super(message);
    this.name = 'AiReadingError';
    this.code = code;
  }
}

export type AiReadingContext = {
  spreadId: SpreadId;
  locale: Locale;
  question: string;
  drawnCards: DrawnCard[];
  localReportText: string;
};

export type AiReadingRequest = {
  settings: AiReadingSettings;
  context: AiReadingContext;
};