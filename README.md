# Mars90210

`Mars90210` — это canon-first story/IP repository о мягкой марсианской драмеди, где четыре женщины под куполом колонии `Новая Заря` работают в ПВЗ `Orbita` и постепенно отказываются быть только функцией в мире тотальной оптимизации. Репозиторий хранит не только сайт-витрину, но и сам канон проекта: world bible, профили персонажей, сезонную арку, эпизоды и связанные визуальные материалы.

## Что внутри

В репозитории есть три главных слоя:

- `canon/` — источник правды: серия, мир, персонажи, отношения, сезонная дуга.
- `episodes/season-01/` — 63 финальных markdown-эпизода первого сезона.
- `art/` — структурированное хранилище иллюстраций, портретов и sidecar-файлов с визуальными описаниями.

Поверх этого лежит веб-витрина на `Vite + React`, которая читает markdown-контент прямо из репозитория и собирает из него сайт проекта.

## Структура проекта

```text
Mars90210/
├── canon/
│   ├── series-bible.md
│   ├── characters/
│   └── world/
├── episodes/
│   └── season-01/
├── art/
│   ├── portraits/
│   └── season-01/
├── src/
├── site/
├── AGENTS.md
└── package.json
```

Ключевые директории:

- `canon/` — канон, world bible, персонажи и сезонный outline.
- `episodes/` — итоговые тексты серий в `.md`.
- `art/` — эпизодные иллюстрации и портреты с companion `.md`.
- `src/` — React-приложение и контент-лоадеры.
- `site/` — статические и презентационные материалы для веб-витрины.

## Быстрый старт

Требования:

- `pnpm`
- актуальная версия `Node.js`, совместимая с `Vite`

Установка и запуск:

```bash
pnpm install
pnpm dev
```

Сборка и тесты:

```bash
pnpm build
pnpm test
```

Сайт работает на `Vite + React` и читает markdown-контент из репозитория через локальные content loaders.

## Как читать проект

Рекомендуемый канонический маршрут:

1. [canon/series-bible.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/series-bible.md)
2. [canon/world/season-01-outline.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/world/season-01-outline.md)
3. профили героинь:
   [lira.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/characters/lira.md),
   [aigul.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/characters/aigul.md),
   [marta.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/characters/marta.md),
   [ruslana.md](/Users/ilyagmirin/PycharmProjects/Mars90210/canon/characters/ruslana.md)
4. эпизоды сезона:
   [episodes/season-01](/Users/ilyagmirin/PycharmProjects/Mars90210/episodes/season-01)

Если нужен именно тон и рабочие правила генерации, исходный редакторский контракт зафиксирован в [AGENTS.md](/Users/ilyagmirin/PycharmProjects/Mars90210/AGENTS.md).

## Контентные принципы

Проект держится на нескольких жёстких правилах:

- новый канон приоритетнее старых противоречивых материалов
- тексты пишутся на мягком литературном русском, без AI-summary тона
- у Лиры, Айгуль, Марты и Русланы должны быть различимые голоса
- большой сюжет всегда проходит через маленький человеческий жест
- одна иллюстрация соответствует одному эпизоду и хранится структурно
- мир важен, но человек всегда важнее техно-экспозиции

Иными словами: `world-first` по устройству репозитория, `human-first` по драматургии.

## Текущий статус

На текущий момент:

- сезон 1 текстом завершён
- в [episodes/season-01](/Users/ilyagmirin/PycharmProjects/Mars90210/episodes/season-01) лежат все 63 эпизода
- канон и season outline собраны в `canon/`
- иллюстрации заполнены частично: часть эпизодов уже имеет готовые `.png`, часть пока представлена только `illustration.md`
- веб-витрина уже читает markdown-контент из репозитория

## Лицензия

Юридический статус проекта описан в [LICENSE](/Users/ilyagmirin/PycharmProjects/Mars90210/LICENSE).

Коротко: тексты, персонажи, мир, сюжетные материалы, изображения и сопутствующие файлы `Mars90210` не разрешены к свободному копированию, переработке, перепубликации или переиспользованию без письменного разрешения правообладателя.
