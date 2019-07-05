function onError(error) {
  // Find the error (might be a straight error or the result of execa)
  const msg = ['stderr', 'stdout', 'message'].find(
    output => !!(error[output] || '').trim()
  );
  // eslint-disable-next-line no-console
  console.error(error[msg].trim());
  process.exit(error.code || 1);
}

module.exports = onError;
