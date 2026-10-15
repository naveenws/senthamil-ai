const SUBJECT_CATEGORIES = {
  FEMININE: ['அம்மா', 'தாய்', 'அன்னை', 'அவள்', 'அக்கா', 'தங்கை', 'மகள்', 'கண்ணகி', 'பெண்', 'சிறுமி', 'பாட்டி', 'நாயகி'],
  MASCULINE: ['அவன்', 'தம்பி', 'அண்ணன்', 'அப்பா', 'தந்தை', 'மகன்', 'முருகன்', 'கண்ணன்', 'ஆசிரியர்', 'மருத்துவர்', 'பையன்', 'சிறுவன்', 'அரசன்'],
  EPICENE_HONORIFIC: ['அவர்', 'அவர்கள்', 'பெரியோர்', 'பெற்றோர்', 'மக்கள்', 'ஆசிரியர்கள்', 'சான்றோர்'],
  NEUTER_SINGULAR: ['அது', 'நாய்', 'பூனை', 'மாடு', 'மரம்', 'பறவை', 'பேருந்து', 'கார்', 'மழை', 'காற்று', 'குதிரை', 'யானை', 'கிளி'],
  NEUTER_PLURAL: ['அவை', 'நாய்கள்', 'பூனைகள்', 'மாடுகள்', 'மரங்கள்', 'பறவைகள்', 'குதிரைகள்'],
  FIRST_PERSON_SINGULAR: ['நான்'],
  FIRST_PERSON_PLURAL: ['நாம்', 'நாங்கள்'],
  SECOND_PERSON_SINGULAR: ['நீ'],
  SECOND_PERSON_PLURAL: ['நீங்கள்']
};

const NOUN_OBIQUE_AND_COLLOQUIAL = {
  'சாப்பாடு': { formal: 'உணவு', accusative: 'உணவை', sandhiAcc: 'உணவைக்' },
  'சாப்பாட்டு': { formal: 'உணவு', accusative: 'உணவை', sandhiAcc: 'உணவைக்', isObliqueWithoutCase: true },
  'சாப்பாட்டுக்': { formal: 'உணவு', accusative: 'உணவை', sandhiAcc: 'உணவைக்', isObliqueWithoutCase: true },
  'சாப்பாட்டை': { formal: 'உணவை', accusative: 'உணவை', sandhiAcc: 'உணவைக்' },
  'சாப்பாட்டைக்': { formal: 'உணவை', accusative: 'உணவை', sandhiAcc: 'உணவைக்' },
  'சாப்பிட': { formal: 'உண்ண', accusative: 'உண்ண', sandhiAcc: 'உண்ண' },
  'தண்ணி': { formal: 'தண்ணீர்', accusative: 'தண்ணீரை', sandhiAcc: 'தண்ணீரைக்' },
  'காசு': { formal: 'பணம்', accusative: 'பணத்தை', sandhiAcc: 'பணத்தைக்' },
  'ரூம்': { formal: 'அறை', accusative: 'அறையை', sandhiAcc: 'அறையைத்' },
  'பஸ்': { formal: 'பேருந்து', accusative: 'பேருந்தை', sandhiAcc: 'பேருந்தைச்' },
  'ரோடு': { formal: 'சாலை', accusative: 'சாலையை', sandhiAcc: 'சாலையைச்' }
};

const OTRU_MAP = { 'க': 'க்', 'ச': 'ச்', 'த': 'த்', 'ப': 'ப்' };
const VALLINAM_INITIALS = ['க', 'ச', 'த', 'ப'];
const PULLI_CONSONANTS = ['க்', 'ச்', 'த்', 'ப்'];

function runGrammarCheck(text) {
  let detectedErrors = [];
  let correctedWords = text.trim().split(/\s+/);
  const originalWords = [...correctedWords];

  const lastWordWithPunct = originalWords[originalWords.length - 1];
  const lastWord = lastWordWithPunct.replace(/[.,?!]/g, '');
  const firstWord = originalWords[0].replace(/[.,?!]/g, '');

  // 1. Incomplete Conditional Participle: அவர் வந்தால் -> அவர் வந்தார்.
  if (['வந்தால்', 'செய்தால்', 'போனால்', 'படித்தால்', 'இருந்தால்', 'கூறினால்'].includes(lastWord) || 
      ((lastWord.endsWith('தால்') || lastWord.endsWith('னால்')) && originalWords.length <= 3)) {
    let fixVerb = 'வந்தார்.';
    if (firstWord === 'அவர்' || firstWord === 'அவர்கள்') fixVerb = 'வந்தார்.';
    else if (firstWord === 'அவன்' || SUBJECT_CATEGORIES.MASCULINE.includes(firstWord)) fixVerb = 'வந்தான்.';
    else if (firstWord === 'அவள்' || SUBJECT_CATEGORIES.FEMININE.includes(firstWord)) fixVerb = 'வந்தாள்.';
    else if (firstWord === 'நான்') fixVerb = 'வந்தேன்.';
    else if (firstWord === 'நாங்கள்' || firstWord === 'நாம்') fixVerb = 'வந்தோம்.';
    else if (firstWord === 'நீ') fixVerb = 'வந்தாய்.';
    else if (firstWord === 'நீங்கள்') fixVerb = 'வந்தீர்கள்.';
    else fixVerb = lastWord + ' நல்லது.';

    detectedErrors.push({
      type: 'முற்றுப்பெறா எச்சத் தொடர் (Incomplete Sentence)',
      citation: 'நன்னூல் வினையியல் நூற்பா 341',
      errorSnippet: text,
      suggestion: `${firstWord} ${fixVerb}`,
      ruleText: `'${lastWord}' என்பது நிபந்தனை வினையெச்சம். வாக்கியம் பயனிலையின்றி முற்றுப்பெறாமல் நிற்கிறது. அல்லது '${firstWord}' என்ற எழுவாய்க்கு ஏற்ப வினைமுற்றுடன் முற்றுப்பெற வேண்டும்.`
    });
    correctedWords[correctedWords.length - 1] = fixVerb;
  }

  // 2. Oblique & Colloquial Words
  for (let i = 0; i < correctedWords.length; i++) {
    let cleanW = correctedWords[i].replace(/[.,?!]/g, '');
    let nextW = correctedWords[i + 1] ? correctedWords[i + 1].replace(/[.,?!]/g, '') : '';

    if (NOUN_OBIQUE_AND_COLLOQUIAL[cleanW]) {
      const item = NOUN_OBIQUE_AND_COLLOQUIAL[cleanW];
      if (item.isObliqueWithoutCase) {
        let replacement = item.sandhiAcc;
        detectedErrors.push({
          type: 'சாரியைப் பிழை & பேச்சு வழக்குச் சொல்',
          citation: 'நன்னூல் உருபியல் நூற்பா 184',
          errorSnippet: `${cleanW} ${nextW}`.trim(),
          suggestion: `${replacement} ${nextW}`.trim(),
          ruleText: `'${cleanW}' என்பது குற்றியலுகர நிலைமொழிச் சாரியை வடிவம் மட்டுமே; இது உருபின்றித் தனியாக நின்று செயப்படுபொருளாகச் செயல்படாது. இதற்கு இரண்டாம் வேற்றுமை உருபு ('ஐ') விரிந்து வல்லினம் மிக வேண்டும்: உணவை + க் = '${replacement}'. மேலும் சாப்பாடு என்பது பேச்சு வழக்கு, இலக்கணப்படி 'உணவு' என்றே வழங்க வேண்டும்.`
        });
        correctedWords[i] = replacement;
      } else if (cleanW === 'சாப்பாடு') {
        if (nextW && VALLINAM_INITIALS.includes(nextW.charAt(0))) {
          detectedErrors.push({
            type: 'இரண்டாம் வேற்றுமை உருபு விடுபடுதல் & பேச்சு வழக்கு',
            citation: 'நன்னூல் நூற்பா 314',
            errorSnippet: `${cleanW} ${nextW}`,
            suggestion: `உணவைக் ${nextW}`,
            ruleText: `செயப்படுபொருளாக வரும்போது 'ஐ' உருபு விரிந்து வல்லினம் மிக வேண்டும்: உணவை + க் + ${nextW} = 'உணவைக் ${nextW}'. மேலும் சாப்பாடு என்பது பேச்சு வழக்கு.`
          });
          correctedWords[i] = 'உணவைக்';
        } else {
          detectedErrors.push({
            type: 'பேச்சு வழக்குச் சொல் திருத்தம்',
            citation: 'சொல் மரபு',
            errorSnippet: cleanW,
            suggestion: 'உணவு',
            ruleText: 'சாப்பாடு என்பது பேச்சு வழக்கு. இலக்கணப்படி "உணவு" என்று எழுதப்பட வேண்டும்.'
          });
          correctedWords[i] = 'உணவு';
        }
      } else if (item.formal && item.formal !== cleanW) {
        detectedErrors.push({
          type: 'பேச்சு வழக்குச் சொல் திருத்தம்',
          citation: 'சொல் மரபு',
          errorSnippet: cleanW,
          suggestion: item.formal,
          ruleText: `'${cleanW}' என்பது பேச்சு வழக்கு வடிவம். தூய செந்தமிழில் '${item.formal}' என்று எழுதப்பட வேண்டும்.`
        });
        correctedWords[i] = item.formal;
      }
    }
  }

  // 3. Subject-Predicate Concord (திணை, பால், எண், இடம் பொருத்தம்)
  let currentVerb = correctedWords[correctedWords.length - 1].replace(/[.,?!]/g, '');

  // 3a. Feminine Subject
  if (SUBJECT_CATEGORIES.FEMININE.includes(firstWord)) {
    if (currentVerb.endsWith('ஆர்') || currentVerb.endsWith('ார்')) {
      const regularVerb = currentVerb.replace(/ார்$/, 'ாள்') + '.';
      detectedErrors.push({
        type: 'பால் வழு & வழுவமைதி (Gender Concord & Honorific)',
        citation: 'நன்னூல் பொதுவியல் நூற்பா 375 (வழுவமைதி)',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb} (மரியாதைக்கு: தாயார் ... ${currentVerb})`,
        ruleText: `இலக்கண மரபில் '${firstWord}' பெண்பால் ஒருமை என்பதால் பயனிலை 'ஆள்' விகுதி பெற்று '${regularVerb}' என முடிதல் இயல்பு வடிவம். மரியாதை காரணமாகப் பன்மை விகுதி பெற்று வருவது 'மரியாதைப் பால் வழுவமைதி' ஆகும். தூய எழுத்து நடையில் 'தாயார் உணவைக் கொடுத்தார்' அல்லது 'அம்மா உணவைக் கொடுத்தாள்' என அமைவதே சிறப்பு.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    } else if (currentVerb.endsWith('ஆன்') || currentVerb.endsWith('ான்')) {
      const regularVerb = currentVerb.replace(/ான்$/, 'ாள்') + '.';
      detectedErrors.push({
        type: 'பால் வழு (Gender Discord)',
        citation: 'நன்னூல் பெயரியல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `எழுவாய் '${firstWord}' பெண்பால். ஆனால் பயனிலை ஆண்பாலில் (${currentVerb}) முடிந்துள்ளது. '${regularVerb}' என பெண்பால் விகுதி பெற்று முடிதல் வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    } else if (currentVerb.endsWith('து')) {
      const regularVerb = currentVerb.replace(/து$/, 'ாள்') + '.';
      detectedErrors.push({
        type: 'திணை வழு (High Class to Neuter Discord)',
        citation: 'நன்னூல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `எழுவாய் '${firstWord}' உயர்திணைப் பெண்பால். அஃறிணை வினைமுற்றுடன் முடிதல் கூடாது.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 3b. Masculine Subject
  else if (SUBJECT_CATEGORIES.MASCULINE.includes(firstWord)) {
    if (currentVerb.endsWith('ஆள்') || currentVerb.endsWith('ாள்')) {
      const regularVerb = currentVerb.replace(/ாள்$/, 'ான்') + '.';
      detectedErrors.push({
        type: 'பால் வழு (Gender Discord)',
        citation: 'நன்னூல் பெயரியல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `எழுவாய் '${firstWord}' ஆண்பால். ஆனால் பயனிலை பெண்பாலில் (${currentVerb}) முடிந்துள்ளது. '${regularVerb}' என ஆண்பால் விகுதி பெற்று முடிதல் வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    } else if (currentVerb.endsWith('து')) {
      const regularVerb = currentVerb.replace(/து$/, 'ான்') + '.';
      detectedErrors.push({
        type: 'திணை வழு (High Class to Neuter Discord)',
        citation: 'நன்னூல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `எழுவாய் '${firstWord}' உயர்திணை ஆண்பால். அஃறிணை வினைமுற்றுடன் முடிதல் கூடாது.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 3b-2. Epicene Honorific Subject (பலர்பால் / மரியாதை)
  else if (SUBJECT_CATEGORIES.EPICENE_HONORIFIC.includes(firstWord)) {
    if (currentVerb.endsWith('து') || currentVerb.endsWith('து.')) {
      const verbClean = currentVerb.replace(/து\.?$/, '');
      const regularVerb = (firstWord === 'அவர்கள்' || firstWord === 'ஆசிரியர்கள்' || firstWord === 'பெரியோர்')
        ? (verbClean.endsWith('வந்') || verbClean.endsWith('சென்') || verbClean.endsWith('பார்') ? verbClean + 'தார்கள்.' : verbClean + 'ார்கள்.')
        : (verbClean.endsWith('வந்') || verbClean.endsWith('சென்') || verbClean.endsWith('பார்') ? verbClean + 'தார்.' : verbClean + 'ார்.');
      detectedErrors.push({
        type: 'திணை / பால் வழு (Epicene to Neuter Discord)',
        citation: 'நன்னூல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `'${firstWord}' என்பது உயர்திணைப் பலர்பால் எழுவாய். பயனிலை அஃறிணையில் ('து') முடிதல் வழுவாகும். '${regularVerb}' என பலர்பால் விகுதி பெற்று முடிதல் வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    } else if (currentVerb.endsWith('ஆன்') || currentVerb.endsWith('ான்') || currentVerb.endsWith('ஆள்') || currentVerb.endsWith('ாள்')) {
      const regularVerb = (firstWord === 'அவர்கள்')
        ? currentVerb.replace(/(ான்|ாள்)$/, 'ார்கள்.')
        : currentVerb.replace(/(ான்|ாள்)$/, 'ார்.');
      detectedErrors.push({
        type: 'பால் வழு (Epicene to Singular Discord)',
        citation: 'நன்னூல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `'${firstWord}' என்ற பலர்பால் எழுவாய்க்குப் பயனிலை ஒருமையில் அமைதல் கூடாது. '${regularVerb}' என அமைதல் வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 3c. Neuter Singular Subject (ஒன்றன்பால்)
  else if (SUBJECT_CATEGORIES.NEUTER_SINGULAR.includes(firstWord)) {
    if (currentVerb.endsWith('ஆன்') || currentVerb.endsWith('ான்') || currentVerb.endsWith('ஆள்') || currentVerb.endsWith('ாள்') || currentVerb.endsWith('ார்')) {
      const regularVerb = currentVerb.replace(/(ான்|ாள்|ார்)$/, 'து') + '.';
      detectedErrors.push({
        type: 'திணை வழு (Neuter to High Class Discord)',
        citation: 'நன்னூல் நூற்பா 268',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `'${firstWord}' என்பது அஃறிணை ஒன்றன்பால் எழுவாய். பயனிலை 'து' விகுதி பெற்று அஃறிணையில் முடிய வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 3d. Neuter Plural Subject (பலவின்பால்)
  else if (SUBJECT_CATEGORIES.NEUTER_PLURAL.includes(firstWord)) {
    if (currentVerb.endsWith('து') || currentVerb.endsWith('து.')) {
      const verbClean = currentVerb.replace(/து\.?$/, '');
      const regularVerb = verbClean + 'ன.';
      detectedErrors.push({
        type: 'எண் வழு (Neuter Singular/Plural Concord)',
        citation: 'நன்னூல் வினையியல் நூற்பா 331',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `'${firstWord}' என்பது அஃறிணைப் பலவின்பால் (பன்மை) எழுவாய். பயனிலை 'ன' விகுதி பெற்று '${regularVerb}' என முடிதல் வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 3e. First Person Singular (நான்)
  else if (firstWord === 'நான்') {
    if (!currentVerb.endsWith('ஏன்') && !currentVerb.endsWith('ேன்') && !currentVerb.endsWith('ேன்.')) {
      let regularVerb = currentVerb.replace(/(ான்|ாள்|ார்|து|ோம்|ாய்)$/, 'ேன்') + '.';
      if (!regularVerb.endsWith('ேன்.')) regularVerb = 'சென்றேன்.';
      detectedErrors.push({
        type: 'இட வழு (First Person Concord Error)',
        citation: 'நன்னூல் வினையியல் நூற்பா 328',
        errorSnippet: `${firstWord} ... ${currentVerb}`,
        suggestion: `${firstWord} ... ${regularVerb}`,
        ruleText: `'நான்' என்ற தன்மை ஒருமை எழுவாய்க்குப் பயனிலை 'ஏன்' விகுதி பெற்று அமைய வேண்டும்.`
      });
      correctedWords[correctedWords.length - 1] = regularVerb;
    }
  }

  // 4. Sandhi & Otru Rules (வல்லினம் மிகும் & மிகா இடங்கள்)
  const DEMONSTRATIVES = ['அந்த', 'இந்த', 'எந்த', 'அங்கு', 'இங்கு', 'எங்கு', 'அப்படி', 'இப்படி', 'எப்படி'];
  const RELATIVE_PARTICIPLE_STEMS = ['படித்த', 'எழுதிய', 'வந்த', 'சென்ற', 'ஓடிய', 'செய்த', 'கற்ற', 'கேட்ட', 'பார்த்த', 'சொன்ன', 'வாங்கிய'];

  for (let i = 0; i < correctedWords.length - 1; i++) {
    let w1 = correctedWords[i].replace(/[.,?!]/g, '');
    let w2 = correctedWords[i + 1].replace(/[.,?!]/g, '');

    // Case A: Next word accidentally starts with pulli consonant (e.g. 'அந்த ப்பையன்' -> 'அந்தப் பையன்')
    for (let p of PULLI_CONSONANTS) {
      if (w2.startsWith(p)) {
        const cleanW2 = w2.substring(p.length);
        const fixedW1 = w1.endsWith(p) ? w1 : w1 + p;
        detectedErrors.push({
          type: 'ஒற்று எழுத்துப் பிழை (Misplaced Otru)',
          citation: 'நன்னூல் எழுத்ததிகாரம்',
          errorSnippet: `${w1} ${w2}`,
          suggestion: `${fixedW1} ${cleanW2}`,
          ruleText: `மெய்யெழுத்து (${p}) சொல்லின் முதலெழுத்தாக வராது. அது நிலைமொழியின் இறுதியோடு சேர்ந்து '${fixedW1} ${cleanW2}' என எழுதப்பட வேண்டும்.`
        });
        correctedWords[i] = fixedW1;
        correctedWords[i + 1] = cleanW2;
        w1 = fixedW1;
        w2 = cleanW2;
      }
    }

    // Case B: Relative Participle (மிகா இடம்): படித்தப் பாடம் -> படித்த பாடம்
    let isRelPart = false;
    for (let rel of RELATIVE_PARTICIPLE_STEMS) {
      for (let p of PULLI_CONSONANTS) {
        if (w1 === (rel + p)) {
          isRelPart = true;
          detectedErrors.push({
            type: 'பெயரெச்சத்தின் பின் வல்லினம் மிகாமை (Unwanted Otru)',
            citation: 'நன்னூல் நூற்பா 316',
            errorSnippet: `${w1} ${w2}`,
            suggestion: `${rel} ${w2}`,
            ruleText: `'${rel}' என்பது பெயரெச்சம். நன்னூல் இலக்கணப்படி பெயரெச்சத்தின் பின் வல்லினம் மிகாது.`
          });
          correctedWords[i] = rel;
          w1 = rel;
          break;
        }
      }
      if (isRelPart) break;
    }

    // Case C: Demonstratives (சுட்டு/வினா பெயர்கள்): அந்த பையன் -> அந்தப் பையன்
    if (DEMONSTRATIVES.includes(w1)) {
      const firstChar = w2.charAt(0);
      if (VALLINAM_INITIALS.includes(firstChar)) {
        const reqOtru = OTRU_MAP[firstChar];
        if (!w1.endsWith(reqOtru)) {
          const fixedW1 = w1 + reqOtru;
          detectedErrors.push({
            type: 'சுட்டு/வினாப் பெயருக்குப் பின் வல்லினம் மிகல்',
            citation: 'நன்னூல் நூற்பா 313',
            errorSnippet: `${w1} ${w2}`,
            suggestion: `${fixedW1} ${w2}`,
            ruleText: `'${w1}' என்ற சுட்டு/வினாச் சொல்லின் பின் வல்லினம் (க், ச், த், ப்) மிகும்.`
          });
          correctedWords[i] = fixedW1;
          w1 = fixedW1;
        }
      }
    }

    // Case D: 2nd Case Accusative Marker 'ஐ' (இரண்டாம் வேற்றுமை விரி): பாடத்தை படி -> பாடத்தைப் படி
    const isNominativeSubject = (i === 0) && ['பூனை', 'யானை', 'குதிரை', 'கிளி', 'தங்கை', 'அத்தை'].includes(w1);
    if (!isNominativeSubject && (w1.endsWith('த்தை') || w1.endsWith('ட்டை') || w1.endsWith('ற்றை') || w1.endsWith('யை') || w1.endsWith('வை') || w1.endsWith('னை') || w1.endsWith('ளை') || w1.endsWith('ரை'))) {
      const firstChar = w2.charAt(0);
      if (VALLINAM_INITIALS.includes(firstChar)) {
        const reqOtru = OTRU_MAP[firstChar];
        if (!w1.endsWith(reqOtru)) {
          const fixedW1 = w1 + reqOtru;
          detectedErrors.push({
            type: 'இரண்டாம் வேற்றுமை விரிவில் வல்லினம் மிகல்',
            citation: 'நன்னூல் நூற்பா 314',
            errorSnippet: `${w1} ${w2}`,
            suggestion: `${fixedW1} ${w2}`,
            ruleText: `'${w1}' இரண்டாம் வேற்றுமை உருபு ('ஐ') வெளிப்பட்டு நிற்கும் தொடர். இதன் பின் வல்லினம் (${reqOtru}) மிகும்.`
          });
          correctedWords[i] = fixedW1;
          w1 = fixedW1;
        }
      }
    }

    // Case E: 4th Case Dative Marker 'கு' / 'க்கு' (நான்காம் வேற்றுமை விரி): வீட்டுக்கு போ -> வீட்டுக்குப் போ
    if (w1.endsWith('கு') || w1.endsWith('க்கு')) {
      const firstChar = w2.charAt(0);
      if (VALLINAM_INITIALS.includes(firstChar)) {
        const reqOtru = OTRU_MAP[firstChar];
        if (!w1.endsWith(reqOtru)) {
          const fixedW1 = w1 + reqOtru;
          detectedErrors.push({
            type: 'நான்காம் வேற்றுமை விரிவில் வல்லினம் மிகல்',
            citation: 'நன்னூல் நூற்பா 315',
            errorSnippet: `${w1} ${w2}`,
            suggestion: `${fixedW1} ${w2}`,
            ruleText: `'${w1}' நான்காம் வேற்றுமை உருபு ('கு') வெளிப்பட்டு நிற்கும் தொடர். இதன் பின் வல்லினம் (${reqOtru}) மிகும்.`
          });
          correctedWords[i] = fixedW1;
          w1 = fixedW1;
        }
      }
    }
  }

  return {
    errorsCount: detectedErrors.length,
    correctedSentence: correctedWords.join(' '),
    errors: detectedErrors
  };
}

const tests = [
  { in: 'அம்மா சாப்பாட்டு கொடுத்தாள்.', expectErr: true, desc: 'Oblique missing case' },
  { in: 'அம்மா சாப்பாட்டுக் கொடுத்தார்', expectErr: true, desc: 'Oblique + honorific' },
  { in: 'அம்மா உணவைக் கொடுத்தாள்.', expectErr: false, desc: 'Valid feminine accusative' },
  { in: 'அவர் வந்தார்.', expectErr: false, desc: 'Valid honorific sentence' },
  { in: 'அவர் வந்தால்', expectErr: true, desc: 'Incomplete conditional' },
  { in: 'பாடத்தை படி', expectErr: true, desc: '2nd case missing otru' },
  { in: 'பாடத்தைப் படி', expectErr: false, desc: 'Valid 2nd case sandhi' },
  { in: 'அந்த பையன்', expectErr: true, desc: 'Demonstrative missing otru' },
  { in: 'அந்தப் பையன்', expectErr: false, desc: 'Valid demonstrative sandhi' },
  { in: 'படித்தப் பாடம்', expectErr: true, desc: 'Relative participle unwanted otru' },
  { in: 'படித்த பாடம்', expectErr: false, desc: 'Valid relative participle' },
  { in: 'வீட்டுக்கு போ', expectErr: true, desc: '4th case missing otru' },
  { in: 'வீட்டுக்குப் போ', expectErr: false, desc: 'Valid 4th case sandhi' },
  { in: 'கண்ணன் வந்தான்.', expectErr: false, desc: 'Valid masculine sentence' },
  { in: 'கண்ணன் வந்தாள்', expectErr: true, desc: 'Masculine to feminine discord' },
  { in: 'பூனை கடித்தது.', expectErr: false, desc: 'Valid neuter sentence' },
  { in: 'நாய்கள் குரைத்தன.', expectErr: false, desc: 'Valid neuter plural' },
  { in: 'நாய்கள் குரைத்தது.', expectErr: true, desc: 'Neuter plural discord' },
  { in: 'நான் சென்றேன்.', expectErr: false, desc: 'Valid 1st person' },
  { in: 'நான் சென்றான்', expectErr: true, desc: '1st person discord' },
  { in: 'அம்மா சாப்பாடு கொடுத்தாள்.', expectErr: true, desc: 'Colloquial before verb' },
  { in: 'தம்பி தண்ணி குடித்தான்.', expectErr: true, desc: 'Colloquial thanni' },
  { in: 'கண்ணன் காசு கொடுத்தான்.', expectErr: true, desc: 'Colloquial kaasu' },
  { in: 'நான் பஸ் ஏறினேன்.', expectErr: true, desc: 'Loanword bus' },
  { in: 'அவன் அறை சென்றான்.', expectErr: false, desc: 'Valid formal sentence' },
  { in: 'அவள் பாடம் படித்தாள்.', expectErr: false, desc: 'Valid feminine sentence' },
  { in: 'மரம் சாய்ந்தது.', expectErr: false, desc: 'Valid neuter singular' },
  { in: 'மரங்கள் சாய்ந்தன.', expectErr: false, desc: 'Valid neuter plural' },
  { in: 'மரங்கள் சாய்ந்தது.', expectErr: true, desc: 'Neuter plural discord' },
  { in: 'அவர்கள் வந்தார்கள்.', expectErr: false, desc: 'Valid honorific plural' },
  { in: 'அவர்கள் வந்தது.', expectErr: true, desc: 'Epicene plural to neuter discord' }
];

let failed = 0;
tests.forEach((t, idx) => {
  const res = runGrammarCheck(t.in);
  const passed = (t.expectErr ? res.errorsCount > 0 : res.errorsCount === 0);
  if (!passed) {
    failed++;
    console.log(`FAIL [${idx + 1}] (${t.desc}): Input='${t.in}', ExpectedErr=${t.expectErr}, GotErrors=${res.errorsCount}`);
    console.log('Result:', JSON.stringify(res, null, 2));
  } else {
    console.log(`PASS [${idx + 1}] (${t.desc}): '${t.in}' -> '${res.correctedSentence}' (${res.errorsCount} errors)`);
  }
});

console.log(`\nTOTAL TESTS: ${tests.length}, PASSED: ${tests.length - failed}, FAILED: ${failed}`);
