import { RequireOnlyOne } from '../types';

enum APP_ERROR_OUTPUTS {
  stderr = 'stderr',
  stdout = 'stdout',
  message = 'message',
}

type AppError = Error &
  RequireOnlyOne<
    {
      [key in APP_ERROR_OUTPUTS]: string;
    }
  > & {
    code?: number;
  };

export default function onError(error: AppError): void {
  // Prefer process outputs over error message
  const errorMessage =
    [
      error[APP_ERROR_OUTPUTS.stderr],
      error[APP_ERROR_OUTPUTS.stdout],
      error[APP_ERROR_OUTPUTS.message],
    ].find((message) => !!message?.trim()) || error[APP_ERROR_OUTPUTS.message];

  console.error(errorMessage.trim());
  process.exit(error.code || 1);
}
