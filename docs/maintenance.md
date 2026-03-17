# Maintenance

## Daily

- Check daily note in `notes/` for updates.
- Review any alerts from heartbeat.

## Weekly

- Verify cron jobs are running (`systemctl status cron`).
- Inspect `~/.openclaw/logs/` for errors.

## Monthly

- Update QMD binary if new version available.
- Review and prune knowledge files.
- Audit API key usage.

## When Things Break

- Check `HEARTBEAT.md` for session status.
- Look at `consolidate.sh` logs at `/var/log/openclaw-consolidate.log`.
- Restart the OpenClaw service: `sudo systemctl restart openclaw`.
