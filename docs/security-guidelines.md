# Security Guidelines

## Principles

- **Authenticated Channels Only**: Only your Telegram device can issue commands.
- **Least Privilege**: Do not give your bot access to personal accounts (email, main Twitter).
- **Separate Wallets**: Use a dedicated wallet for the agent with limited funds.

## Implementation

1. Set `rules.md` with strict channel classification.
2. Add rule snippets in `rules.d/` to enforce.
3. Regularly audit logs for unexpected actions.
4. Rotate API keys periodically.

## What to Avoid

- Never give admin access to your Stripe account.
- Never share your OpenClaw config files publicly.
- Avoid web forms for sensitive inputs.
