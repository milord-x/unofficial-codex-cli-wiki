# 05. Command Reference

Этот файл не заменяет `codex --help`, а дополняет его практическими заметками. Для спорных деталей сначала смотри локальную справку своей версии CLI.

## Общие флаги верхнего уровня

| Флаг | Что это | Когда использовать | Когда не использовать | Пример | Ошибки и безопасность |
|---|---|---|---|---|---|
| `-C, --cd <DIR>` | меняет рабочий корень | repo не в текущей папке | если уже стоишь в нужном корне | `codex -C ~/src/app` | неверный путь = работа не там |
| `-m, --model <MODEL>` | выбор модели | хочешь контролировать latency/качество | если модель уже зафиксирована профилем | `codex -m gpt-5.4` | неподдерживаемая модель в текущем аккаунте |
| `-p, --profile <NAME>` | профиль из `config.toml` | повторяемый режим | одноразовые ad hoc задачи | `codex -p review` | профиль не найден |
| `-c, --config key=value` | точечный override конфига | быстрый one-off override | если это постоянная настройка, лучше в профиль | `codex -c model_reasoning_effort=\"high\"` | TOML quoting и типы |
| `-s, --sandbox <MODE>` | sandbox mode | нужен явный filesystem policy | если не понимаешь риски | `codex -s workspace-write` | `danger-full-access` опасен |
| `-a, --ask-for-approval <POLICY>` | approval policy | регулируешь shell execution | если не понимаешь последствия автоматизации | `codex -a on-request` | `never` опасен в живом репо |
| `--full-auto` | alias для low-friction auto execution | понятная задача в доверенном repo | крупный рефактор, prod repo, unknown codebase | `codex --full-auto` | все равно проверяй diff |
| `--dangerously-bypass-approvals-and-sandbox` | полный bypass защиты | только во внешне sandboxed среде | почти всегда | `codex ... --dangerously-bypass-approvals-and-sandbox` | максимальный риск |
| `--search` | web search tool | нужны свежие данные | задача решается локальным контекстом | `codex --search` | не путай web факты с локальным кодом |
| `--add-dir <DIR>` | добавляет writable dir | нужен доступ за пределы repo | если можно обойтись корнем repo | `codex --add-dir ../shared` | не расширяй write scope без причины |
| `--oss` | локальный OSS provider | есть LM Studio/Ollama | нужен официальный hosted model | `codex --oss` | проверь, что локальный сервер поднят |
| `--local-provider <lmstudio|ollama>` | выбор локального провайдера | провайдеров несколько | если `--oss` не нужен | `codex --oss --local-provider ollama` | неверный provider |
| `-i, --image <FILE>` | прикрепляет изображения | UI bugs, screenshots, diagrams | если изображение не влияет на задачу | `codex -i screenshot.png` | не прикладывай секретные скриншоты |

## Команды

### `codex`

- Что это: интерактивная сессия.
- Синтаксис: `codex [OPTIONS] [PROMPT]`
- Что делает: запускает TUI/inline-сеанс.
- Когда использовать: исследование, диалог, итеративная работа.
- Когда не использовать: CI и batch automation.
- Пример: `codex -C ~/repo "найди причину flaky test"`
- Типичные ошибки: запуск вне repo, слишком широкий prompt, неверный sandbox.
- Безопасность: не включай bypass sandbox без необходимости.

### `codex exec`

- Что это: non-interactive one-shot execution.
- Синтаксис: `codex exec [OPTIONS] [PROMPT]`
- Когда использовать: скрипты, пайплайны, reproducible runs.
- Когда не использовать: если нужен живой диалог.
- Пример: `codex exec --json "run tests and summarize failures"`
- Полезные флаги: `--json`, `--ephemeral`, `--output-last-message`, `--output-schema`, `--skip-git-repo-check`.
- Ошибки: попытка запускать без git repo при включенной проверке; забытый output contract.
- Безопасность: для automation фиксируй `-C`, `-m`, sandbox и approval policy явно.

### `codex exec resume`

- Что это: non-interactive продолжение прошлой сессии.
- Синтаксис: `codex exec resume [SESSION_ID] [PROMPT]`
- Когда использовать: повторяемый batch-run поверх прошлого контекста.
- Когда не использовать: если проще стартовать новую чистую задачу.

### `codex review`

- Что это: code review по текущим изменениям.
- Синтаксис: `codex review [--uncommitted|--base <branch>|--commit <sha>] [PROMPT]`
- Что делает: выдает findings по diff.
- Когда использовать: self-review до PR или commit.
- Когда не использовать: если ты хочешь автоисправление, а не review.
- Пример: `codex review --uncommitted`
- Типичные ошибки: review не того диапазона diff; отсутствие базовой ветки.
- Безопасность: review безопаснее, чем auto-edit, и должен быть дефолтом перед merge.

### `codex login`

- Что это: управление входом.
- Синтаксис: `codex login`, `codex login status`, `codex logout`
- Полезные флаги: `--with-api-key`, `--device-auth`
- Когда использовать: при первичной настройке и смене аккаунта.
- Когда не использовать: в shared shell без контроля секретов.

### `codex resume`

- Что это: продолжение интерактивной сессии.
- Синтаксис: `codex resume [SESSION_ID] [PROMPT]`
- Полезные флаги: `--last`, `--all`
- Когда использовать: хочешь восстановить контекст и продолжить работу.
- Когда не использовать: если нужен clean-room start.

### `codex fork`

- Что это: форк прошлой сессии в новую ветку обсуждения.
- Синтаксис: `codex fork [SESSION_ID] [PROMPT]`
- Когда использовать: тест альтернативного решения без потери исходной ветки.
- Когда не использовать: если достаточно `resume`.

### `codex apply`

- Что это: применение diff от agent task к локальному working tree.
- Синтаксис: `codex apply <TASK_ID>`
- Когда использовать: переносишь diff из облачной/удаленной задачи.
- Когда не использовать: если не понимаешь происхождение task/diff.
- Безопасность: сначала смотри `git diff` и целевой repo state.

### `codex completion`

- Что это: генерация shell completions.
- Синтаксис: `codex completion [bash|zsh|fish|powershell|elvish]`
- Когда использовать: часто работаешь руками.
- Когда не использовать: одноразовая сессия или контейнер без shell profile.

### `codex mcp`

- Что это: управление MCP servers.
- Подкоманды: `list`, `get`, `add`, `remove`, `login`, `logout`
- Когда использовать: нужны внешние инструменты и интеграции.
- Когда не использовать: локальный контекст уже достаточен.

Ключевые формы:

```bash
codex mcp list
codex mcp add my-tool -- my-command --stdio-arg
codex mcp add docs --url https://example.invalid/mcp
codex mcp get my-tool
codex mcp remove my-tool
codex mcp login my-tool
codex mcp logout my-tool
```

Особенности:

- `mcp add` поддерживает либо `--url`, либо локальную команду после `--`.
- `--env KEY=VALUE` работает для stdio servers.
- `--bearer-token-env-var` — для HTTP MCP.
- `mcp list/get` поддерживают `--json`.

Безопасность:

- MCP server имеет доступ к данным через свой transport.
- Подключай только доверенные серверы.
- Токены для MCP держи в env/secrets, не в markdown.

### `codex sandbox`

- Что это: запуск команд в sandbox, отдельно от основной сессии.
- Подкоманды: `linux`, `macos`, `windows`
- Пример: `codex sandbox linux --full-auto make test`
- Когда использовать: хочешь руками проверить sandbox behavior.
- Когда не использовать: если достаточно задать sandbox через обычный `codex`.

### `codex features`

- Что это: управление feature flags.
- Подкоманды: `list`, `enable`, `disable`
- Примеры:

```bash
codex features list
codex features enable unified_exec
codex features disable unified_exec
```

- Когда использовать: controlled rollout или тест beta-функции.
- Когда не использовать: если не понимаешь, что именно включает feature flag.

### Редкие/экспериментальные команды

| Команда | Назначение | Замечание |
|---|---|---|
| `codex mcp-server` | запуск Codex как MCP server | специализированный integration use case |
| `codex app-server` | experimental app tooling | не базовая повседневная команда |
| `codex debug` | debugging tools | используй только при отладке CLI |
| `codex cloud` | работа с Codex Cloud tasks | experimental, поведение может меняться |

## Approval policy

Локально видны такие режимы:

- `untrusted`
- `on-request`
- `never`
- `on-failure` — deprecated

Практика:

- interactive: чаще всего `on-request`
- audit/review: `untrusted` или `read-only`
- automation in sandbox: иногда `never`

## Sandbox mode

- `read-only` — исследование без правок
- `workspace-write` — нормальный ежедневный режим
- `danger-full-access` — только для хорошо понятной и внешне sandboxed среды

## Источники

- https://developers.openai.com/codex/cli/reference
- https://developers.openai.com/codex/noninteractive
- локальная справка по всем подкомандам `codex ... --help`
