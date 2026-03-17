# INDEX

## Основные файлы

- `README.md` — стартовая точка и карта wiki.
- `site/index.html` — локальная HTML-версия wiki.
- `01-installation.md` — как поставить Codex CLI и проверить установку.
- `02-auth-and-plans.md` — как войти через ChatGPT или API key.
- `03-basic-commands.md` — команды, которые нужны в первый день.
- `04-interactive-workflow.md` — как реально работать в интерактивной сессии.
- `05-command-reference.md` — краткий reference по командам, флагам и режимам.
- `06-config.md` — устройство `~/.codex/config.toml`.
- `07-models-and-modes.md` — выбор моделей, sandbox и approvals.
- `08-skills.md` — reusable skills и структура skill-папок.
- `09-agents-md.md` — локальные инструкции через `AGENTS.md`.
- `10-best-practices.md` — рабочие практики для новых и существующих проектов.
- `11-prompting.md` — как ставить задачи Codex без размытых запросов.
- `12-debugging-recovery.md` — безопасный багфикс, проверка и откат.
- `13-anti-patterns.md` — ошибки, которые чаще всего ломают workflow.
- `cheatsheet.md` — короткие команды и быстрые рецепты.
- `playbooks.md` — пошаговые сценарии под типовые задачи.
- `tools/build_site.py` — генератор HTML-версии wiki.

## Каталог `examples/`

- `examples/prompts.md` — хорошие промпты по категориям задач.
- `examples/agents.md.example` — пример репозиторного `AGENTS.md`.
- `examples/skills/README.md` — что лежит в examples skills.
- `examples/skills/python-bugfix/SKILL.md` — skill для безопасного Python bugfix.
- `examples/skills/repo-docs/SKILL.md` — skill для генерации проектной документации.

## Как читать

- Нужен быстрый запуск: `README.md` -> `01` -> `02` -> `03`.
- Нужна ежедневная эксплуатация: `04` -> `05` -> `06` -> `07`.
- Нужна production-дисциплина: `10` -> `11` -> `12` -> `13`.
- Нужны готовые шаблоны: `cheatsheet.md` и `playbooks.md`.
