import { RequireOnlyOne } from '../types';

type AppError = Error &
  RequireOnlyOne<{
    stderr?: string;
    stdout?: string;
    message?: string;
  }> & {
    code?: number;
  };

export function onError(error: AppError) {
  let output = 'message';

  for (const channel in ['stderr', 'stdout', 'message']) {
    const message = error[channel];
    if (Boolean(message && message.trim())) {
      output = channel;
      break;
    }
  }

  // eslint-disable-next-line no-console
  console.error(error[output].trim());
  process.exit(error.code || 1);
}
