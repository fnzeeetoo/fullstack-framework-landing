# Telegram Multi-Threading

OpenClaw supports multiple isolated sessions via Telegram group chats.

## Setup

1. Create a new group in Telegram.
2. Add your bot to the group.
3. In BotFather, set bot privacy to OFF so it sees all messages.
4. Enable "Groups" in bot settings.
5. Each group chat will spawn a separate OpenClaw session with its own memory and context.

## Use Cases

- Separate projects (e.g., EasyClaw, Polylog, AgentTrader)
- Different personas or rules
- Keep unrelated contexts from polluting each other.

## Tips

- Name groups clearly.
- You can add the same bot to multiple groups.
- Use `/start` in the group to initialize the session.
