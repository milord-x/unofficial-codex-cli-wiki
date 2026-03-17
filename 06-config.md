# 06. `config.toml`

## Где лежит файл

Базовый путь:

```text
~/.codex/config.toml
```

На этой машине локально подтверждено наличие файла:

```toml
model = "gpt-5.4"
model_reasoning_effort = "xhigh"

[projects."/home/proxy"]
trust_level = "trusted"
```

## Что это такое

`config.toml` хранит постоянные настройки CLI:

- дефолтную модель;
- reasoning effort;
- sandbox/approval defaults;
- feature flags;
- profiles;
- project-specific overrides;
- MCP configuration.

## Как работает приоритет

Практическое правило:

1. явные CLI overrides через `-c` и flags;
2. выбранный `--profile`;
3. базовый `~/.codex/config.toml`;
4. project-specific блоки `[projects."..."]`.

Если поведение неожиданное, сначала ищи override в командной строке.

## Минимальный полезный пример

```toml
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[profiles.review]
model_reasoning_effort = "high"
sandbox_mode = "read-only"
approval_policy = "untrusted"

[profiles.fast]
model_reasoning_effort = "medium"

[projects."/home/user/src/app"]
trust_level = "trusted"
```

## Что означает `trust_level`

`trust_level = "trusted"` говорит CLI, что проект доверенный. Это влияет на UX безопасности и automation workflow.

Когда использовать:

- свой репозиторий;
- понятный внутренний код;
- локальная dev-среда.

Когда не использовать:

- чужой неизвестный репозиторий;
- временный каталог с непонятными скриптами.

## Профили

Профиль — именованный набор настроек.

Пример запуска:

```bash
codex -p review
codex exec -p fast "summarize this repository"
```

Рекомендуемые профили:

- `review` — `read-only` + conservative approval;
- `fast` — сниженный reasoning effort;
- `deep` — высокий reasoning effort;
- `danger` — только для очень осознанных controlled сценариев.

## Временный override без правки файла

```bash
codex -c model=\"gpt-5.4\" -c model_reasoning_effort=\"high\"
codex -c approval_policy=\"on-request\"
```

Когда использовать:

- one-shot задачи;
- A/B проверка настроек.

Когда не использовать:

- если режим нужен постоянно, оформи его профилем.

## Типичные ошибки

- писать относительные пути в `[projects."..."]` вместо абсолютных;
- забывать кавычки TOML;
- смешивать постоянные настройки с временными CLI override;
- хранить секреты прямо в конфиге.

## Безопасность

- не клади API keys в `config.toml`, если есть env/secrets;
- внимательно проверяй `trust_level`;
- не включай risky settings глобально, если они нужны только одному repo.

## Источники

- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/config-advanced
- https://developers.openai.com/codex/config-reference
