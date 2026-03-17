# Cheatsheet

## Установка и вход

```bash
npm install -g @openai/codex
codex --version
codex login
codex login status
printenv OPENAI_API_KEY | codex login --with-api-key
codex logout
```

## Старт сессии

```bash
codex
codex -C ~/repo
codex -C ~/repo "сначала изучи проект, потом предложи план"
codex -m gpt-5.4 -C ~/repo
```

## Wiki

```bash
wiki codex
wiki codex --build-only
wiki codex --print-path
```

## Безопасные режимы

```bash
codex -s read-only -a untrusted
codex -s workspace-write -a on-request
codex --full-auto
```

## Non-interactive

```bash
codex exec "summarize this repository"
codex exec --json "run tests and summarize failures"
codex exec --ephemeral "explain this stack trace"
codex exec -o result.txt "write final summary only"
```

## Review

```bash
codex review --uncommitted
codex review --base main
codex review --commit <sha>
```

## Сессии

```bash
codex resume --last
codex fork --last
codex exec resume --last "continue and produce final summary"
```

## Config

```bash
codex -p review
codex -c model=\"gpt-5.4\"
codex -c approval_policy=\"on-request\"
codex -c sandbox_mode=\"workspace-write\"
```

## MCP

```bash
codex mcp list
codex mcp add docs --url https://example.invalid/mcp
codex mcp add mytool -- my-command --serve
codex mcp get docs
codex mcp remove docs
```

## Features

```bash
codex features list
codex features enable unified_exec
codex features disable unified_exec
```

## Completion

```bash
codex completion bash
codex completion zsh
codex completion fish
```

## Хорошие стартовые промпты

```text
Изучи репозиторий. Найди entrypoint, тесты и команду запуска. Ничего не меняй без плана.
```

```text
Воспроизведи баг, исправь его минимальным patch, прогони релевантные тесты и дай короткий diff summary.
```

```text
Сделай code review только по измененным файлам. Нужны findings по серьезности, без воды.
```
