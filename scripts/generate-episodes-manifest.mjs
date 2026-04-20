import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const episodesRoot = path.join(rootDir, 'episodes', 'season-01');
const outputPath = path.join(rootDir, 'src', 'content', 'generated', 'episodes-manifest.json');

const manualCardExcerpts = {
  'episode-001':
    'Сбой в ПВЗ превращает обычное утро Лиры в ручную выдачу посылок под красными аварийными огнями.',
  'episode-002':
    'В ночных логах Айгуль находит след Phase Zero и понимает, что сбой был не случайностью.',
  'episode-003':
    'Жалоба на «неправильную» улыбку бьёт по Марте сильнее, чем любая открытая грубость.',
  'episode-004':
    'Руслана получает письмо с Земли и почти говорит «да» будущему, которого на самом деле не хочет.',
  'episode-005':
    'После закрытия ПВЗ четыре женщины остаются наедине друг с другом и со своими недосказанностями.',
  'episode-006':
    'В ПВЗ впервые приходит Силан из NovaCredit, и разговор о метриках задевает Лиру слишком лично.',
  'episode-007':
    'На грузовом терминале Айгуль сталкивается с Данилом и понимает, что прошлое вернулось всерьёз.',
  'episode-008':
    'Ночью Марта пишет злой текст и впервые не пугается того, какой живой сама себе кажется.',
  'episode-009':
    'Во время звонка домой Руслана снова врёт, что у неё всё под контролем, и слишком хорошо слышит эту ложь.',
  'episode-010':
    'Владимир пробует столкнуть Лиру и Айгуль, подбрасывая каждой искажённые слова другой.',
  'episode-011':
    'После тяжёлого дня Лира соглашается на чай с Силаном, который слишком быстро перестаёт быть просто чаем.',
  'episode-012':
    'На дне ящика Айгуль находит старый дневник и натыкается на себя, ещё умеющую хотеть нежности.',
  'episode-013':
    'Марта замечает небольшую ошибку в заказе и впервые не исправляет её мгновенно.',
  'episode-014':
    'Руслана почти подтверждает земное предложение, но в последний момент так и не находит в себе голос для «да».',
  'episode-015':
    'Алина передаёт Лире файл, после которого чужие подозрения впервые складываются в доказательства.',
  'episode-016':
    'Ночью Лира сверяет документы и понимает, что дело давно не в одном сбое, а в целой системе.',
  'episode-017':
    'Эйрон пишет Айгуль короткое письмо и предлагает сравнить данные там, где уже нельзя притворяться случайностью.',
  'episode-018':
    'Невинный вопрос о ключике едва не выводит Мартины стихи из тени и заставляет её по-настоящему испугаться.',
  'episode-019':
    'У искусственного моря Руслана впервые позволяет себе думать о ребёнке не как о слабости, а как о желании.',
  'episode-020':
    'Накопленное напряжение наконец прорывается, и ссора между четырьмя женщинами становится неизбежной.',
  'episode-021':
    'Лира впервые выбирает закрыть собой команду, а не собственную репутацию перед руководством.',
  'episode-022':
    'Айгуль всё-таки идёт к искусственному морю на встречу с Эйроном — спорить, проверять и немного бояться себя.',
  'episode-023':
    'Марта впервые не выходит на смену и позволяет себе исчезнуть без оправданий.',
  'episode-024':
    'Срок ответа Земле истекает, а Руслана всё ещё пытается решить свою жизнь как служебный вопрос.',
  'episode-025':
    'В Новой Заре официально объявляют Phase Zero, и угроза наконец получает лицо и язык власти.',
  'episode-026':
    'Лира узнаёт, что Силан вовлечён в Phase Zero куда глубже, чем ей хотелось себе позволить.',
  'episode-027':
    'Встреча с Эйроном подтверждает: Айгуль не ошиблась ни в данных, ни в масштабе чужой лжи.',
  'episode-028':
    'Марта признаётся Лире, что пишет стихи, и делает это дрожащим, но уже не совсем виноватым голосом.',
  'episode-029':
    'Руслана заполняет запрос на перевод, но так и не нажимает кнопку отправки.',
  'episode-030':
    'Команда решает скрыть опасную дыру в отчёте, чтобы выиграть себе немного времени.',
  'episode-031':
    'Владимир запускает формальную атаку на Лиру и превращает управленческое давление в процедуру.',
  'episode-032':
    'Данил приносит Айгуль флешку с данными, которые могут стать настоящим доказательством.',
  'episode-033':
    'Марта впервые выпускает свой текст в мир — анонимно, дрожащими руками и уже не совсем готовая молчать.',
  'episode-034':
    'Руслана наконец говорит Земле «нет» и впервые слышит в этом не поражение, а собственную правду.',
  'episode-035':
    'Женщины впервые прямо договариваются бороться вместе, а не спасать себя поодиночке.',
  'episode-036':
    'Лира идёт в закрытый архив, рискуя допуском и карьерой ради правды, которой уже нельзя отступить.',
  'episode-037':
    'Вечер с Эйроном оказывается для Айгуль слишком честным, и это пугает её сильнее самой близости.',
  'episode-038':
    'Марта впервые читает стихотворение вслух и остаётся жива после собственного страха.',
  'episode-039':
    'Руслана понимает, что мечта о семье не делает её слабее и не отнимает у неё взрослость.',
  'episode-040':
    'Владимир почти добивается распада команды, и привычная опора между женщинами начинает трещать.',
  'episode-041':
    'Лира формально теряет контроль над ПВЗ и остаётся перед этим фактом почти без защиты.',
  'episode-042':
    'Айгуль получает помощь сразу от Данила и Алины — там, где уже не ждала союзников.',
  'episode-043':
    'Марта впервые просит о помощи прямо, без обходных слов и привычной вежливой маски.',
  'episode-044':
    'Руслана говорит подругам и родителям правду о том, что остаётся на Марсе, без красивой версии для чужого спокойствия.',
  'episode-045':
    'Команда готовит сезонный маркет и одновременно собирает внутреннюю оборону против того, что надвигается.',
  'episode-046':
    'Лире предлагают тихо уйти или смотреть, как цену за её упрямство заплатят остальные.',
  'episode-047':
    'Айгуль решается передать Эйрону часть данных и тем самым делает шаг, которого боялась весь сезон.',
  'episode-048':
    'Марта читает стихи подругам и впервые позволяет им услышать то, что прятала даже от себя.',
  'episode-049':
    'Руслана окончательно выбирает свою жизнь в Новой Заре, а не чужое представление о правильном будущем.',
  'episode-050':
    'Владимир разоблачён, но самой системе этого мало — Phase Zero всё ещё не остановлен.',
  'episode-051':
    'Лира отказывается от личного спасения, которое предлагает Силан, и остаётся со всеми последствиями.',
  'episode-052':
    'Айгуль перестаёт считать себя виноватой в истории с Данилом и впервые отпускает эту старую боль.',
  'episode-053':
    'Марта впервые публикует текст под своим именем и выходит из тени уже без псевдонима.',
  'episode-054':
    'На городской встрече Руслана говорит своим голосом — без служебной гладкости и без страха показаться неудобной.',
  'episode-055':
    'Команда нарушает регламент, чтобы ПВЗ не закрылся в критический день и не отдал людей на милость системе.',
  'episode-056':
    'На внутренней встрече Лира впервые говорит вслух, что её сила много лет держалась не на доблести, а на страхе.',
  'episode-057':
    'Айгуль остаётся без привычной иронии-щита и понимает, как много в ней было живого, а не только собранного.',
  'episode-058':
    'Марта впервые улыбается не по обязанности, а из внутренней свободы, которой раньше стыдилась.',
  'episode-059':
    'Руслана дарит подругам маленькие игрушки — тихий знак того, что будущего больше не нужно стесняться.',
  'episode-060':
    'ПВЗ начинает становиться не просто узлом выдачи, а местом, где люди снова узнают друг друга.',
  'episode-061':
    'Лира вдруг понимает, что Марс больше не место, которое надо выдержать, а дом.',
  'episode-062':
    'Айгуль разрешает себе слабость и сама назначает Эйрону кофе после всего прожитого года.',
  'episode-063':
    'Под искусственным снегом команда встречает Новый год уже не как функция системы, а как живые люди.',
};

function extractMetadataValue(markdown, label) {
  const match = markdown.match(new RegExp(`^- ${label}: (.+)$`, 'm'));
  return match?.[1]?.trim() ?? '';
}

function stripLeadSections(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let skipMetadata = false;
  let skippedHeading = false;

  for (const line of lines) {
    if (!skippedHeading && line.startsWith('# ')) {
      skippedHeading = true;
      continue;
    }

    if (line.startsWith('## Метаданные')) {
      skipMetadata = true;
      continue;
    }

    if (skipMetadata) {
      const trimmed = line.trim();

      if (line.startsWith('## ')) {
        skipMetadata = false;
      } else if (trimmed === '' || trimmed.startsWith('- ')) {
        continue;
      } else {
        skipMetadata = false;
      }
    }

    if (!skipMetadata) {
      output.push(line);
    }
  }

  return output.join('\n').trim();
}

function firstParagraph(markdown) {
  return (
    markdown
      .split('\n\n')
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk.length > 0 && !chunk.startsWith('## ')) ?? ''
  );
}

function truncateAtWord(text, limit) {
  if (text.length <= limit) {
    return text;
  }

  const sliced = text.slice(0, limit);
  const boundary = sliced.lastIndexOf(' ');

  return `${(boundary > 0 ? sliced.slice(0, boundary) : sliced).trim()}…`;
}

function normalizeCardText(text) {
  return text.replace(/`([^`]+)`/g, '$1').replace(/\s+/g, ' ').trim();
}

function toSentence(text) {
  const normalized = normalizeCardText(text);

  if (!normalized) {
    return '';
  }

  const firstChar = normalized[0];
  const sentence = /[.!?…]$/.test(normalized) ? normalized : `${normalized}.`;

  return `${firstChar.toUpperCase()}${sentence.slice(1)}`;
}

function packParagraphExcerpt(text) {
  const normalized = normalizeCardText(text);

  if (!normalized) {
    return '';
  }

  const sentences = normalized.match(/[^.!?…]+[.!?…]?/g)?.map((sentence) => sentence.trim()) ?? [
    normalized,
  ];

  let cardExcerpt = '';

  for (const sentence of sentences) {
    const candidate = cardExcerpt ? `${cardExcerpt} ${sentence}`.trim() : sentence;

    if (!cardExcerpt || candidate.length <= 180) {
      cardExcerpt = candidate;
      continue;
    }

    break;
  }

  return truncateAtWord(cardExcerpt, 180);
}

function isAbstractCardExcerpt(text) {
  return /^(Иногда|Решение|Правда|Доверие|Осознание|Название|Псевдоним|Это произошло|Подарки|Снег|Ирония|Признание|Ультиматумы|Разоблачение|Прощать себя|Во второй раз|Слово |После официального объявления|Форма перевода|Дыра в отчёте|Письмо пришло|Когда прошлое приходит|Решение бороться|Закрытые архивы|Они собирались|Читать вслух|Он бил|Ограничение полномочий|Просить о помощи|Самое абсурдное|Раньше Руслана|Закрыть ПВЗ|Лира долго называла|Сообщение она писала)/.test(
    text,
  );
}

function buildCardExcerpt(paragraph, keyScene, explicitCard) {
  const explicit = toSentence(explicitCard);

  if (explicit) {
    return truncateAtWord(explicit, 160);
  }

  const packedParagraph = packParagraphExcerpt(paragraph);
  const sceneSentence = toSentence(keyScene);

  if (!packedParagraph) {
    return truncateAtWord(sceneSentence, 160);
  }

  if (
    sceneSentence &&
    (packedParagraph.includes('…') || packedParagraph.length < 24 || isAbstractCardExcerpt(packedParagraph))
  ) {
    return truncateAtWord(sceneSentence, 160);
  }

  return packedParagraph;
}

function optimizedPngPath(slug) {
  return `media/optimized/season-01/${slug}/illustration.png`;
}

function optimizedAvifPath(slug) {
  return `media/optimized/season-01/${slug}/illustration.avif`;
}

function optimizedAvifExists(slug) {
  return existsSync(path.join(rootDir, 'public', optimizedAvifPath(slug)));
}

function sourceIllustrationPath(slug) {
  return path.join(rootDir, 'art', 'season-01', slug, 'illustration.png');
}

function readImageDimensions(sourcePath) {
  const png = readFileSync(sourcePath);
  const signature = png.subarray(0, 8);
  const expectedSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  if (!signature.equals(expectedSignature)) {
    throw new Error(`Unsupported image format for dimension read: ${sourcePath}`);
  }

  const chunkType = png.toString('ascii', 12, 16);

  if (chunkType !== 'IHDR') {
    throw new Error(`Invalid PNG header for dimension read: ${sourcePath}`);
  }

  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);

  return { width, height };
}

const episodes = readdirSync(episodesRoot)
  .filter((entry) => entry.endsWith('.md'))
  .sort()
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/i, '').toLowerCase();
    const markdown = readFileSync(path.join(episodesRoot, fileName), 'utf8');
    const bodyMarkdown = stripLeadSections(markdown);
    const sourceIllustration = sourceIllustrationPath(slug);
    const hasIllustration = existsSync(sourceIllustration);
    const dimensions = hasIllustration ? readImageDimensions(sourceIllustration) : { width: 0, height: 0 };

    return {
      slug,
      number: Number(slug.split('-')[1]),
      title: extractMetadataValue(markdown, 'Заголовок'),
      focus: extractMetadataValue(markdown, 'Фокус'),
      timePoint: extractMetadataValue(markdown, 'Временная точка'),
      keyScene: extractMetadataValue(markdown, 'Ключевая сцена'),
      excerpt: firstParagraph(bodyMarkdown),
      cardExcerpt: buildCardExcerpt(
        firstParagraph(bodyMarkdown),
        extractMetadataValue(markdown, 'Ключевая сцена'),
        manualCardExcerpts[slug] ?? extractMetadataValue(markdown, 'Карточка'),
      ),
      illustration: hasIllustration
        ? {
            src: optimizedPngPath(slug),
            pngSrc: optimizedPngPath(slug),
            avifSrc: optimizedAvifExists(slug) ? optimizedAvifPath(slug) : '',
            width: dimensions.width,
            height: dimensions.height,
            isPlaceholder: false,
            alt: extractMetadataValue(markdown, 'Заголовок'),
          }
        : {
            src: '',
            pngSrc: '',
            avifSrc: '',
            width: 0,
            height: 0,
            isPlaceholder: true,
            alt: `Иллюстрация к эпизоду ${String(Number(slug.split('-')[1])).padStart(3, '0')} появится позже`,
          },
    };
  });

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(episodes, null, 2)}\n`);
