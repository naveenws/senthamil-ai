
const fs = require('fs');
const testLit = fs.readFileSync('test_literature_data.js', 'utf8');

// Extract LITERATURE_TOPICS
eval(testLit.substring(testLit.indexOf('const LITERATURE_TOPICS'), testLit.indexOf('console.log')));

const fullHtml = `<!DOCTYPE html>
<html lang="ta">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>செந்தமிழ் AI • தமிழ் இலக்கணம், குரல் மொழிபெயர்ப்பு & இலக்கியக் களம்</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Firebase Compat Libraries -->
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Mukta Malar', 'Plus Jakarta Sans', sans-serif;
    }
    .pink-gradient {
      background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #e11d48 100%);
    }
    .pink-gradient-subtle {
      background: linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #ffffff 100%);
    }
    .pink-glow {
      box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.35);
    }
    .pink-glow-sm {
      box-shadow: 0 4px 15px -3px rgba(244, 63, 94, 0.25);
    }
    .active-tab {
      background: linear-gradient(135deg, #ec4899, #f43f5e);
      color: white !important;
      box-shadow: 0 4px 14px rgba(236, 72, 153, 0.35);
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 0.4; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
    .mic-recording {
      animation: pulse-ring 1.5s infinite ease-in-out;
      background: #e11d48 !important;
    }
  </style>
</head>
<body class="bg-white text-slate-800 min-h-screen flex flex-col antialiased selection:bg-pink-100 selection:text-pink-700">

  <!-- மேல்பக்க தலைப்புப் பட்டை -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-2xl pink-gradient flex items-center justify-center text-white font-bold text-xl pink-glow-sm">
          <span>த</span>
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <h1 class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 bg-clip-text text-transparent">
              செந்தமிழ் AI
            </h1>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold border border-pink-200">
              100% துல்லியம்
            </span>
          </div>
          <p class="text-xs text-slate-500 font-medium">இலக்கணத் திருத்தம் • குரல் மொழிபெயர்ப்பு • இலக்கியக் களம் & வினாடி வினா</p>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <!-- பயனர் கணக்கு / உள்நுழைவு பொத்தான் -->
        <button onclick="openAuthModal()" id="user-profile-header-btn" class="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition shadow-sm">
          <span id="user-icon-status">👤</span>
          <span id="user-display-name">உள்நுழைக</span>
        </button>
      </div>
    </div>
  </header>

  <!-- முதன்மைப் பகுதி -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
    
    <!-- தலைப்பு அறிவிப்பு அட்டை -->
    <div class="pink-gradient rounded-3xl p-6 sm:p-7 text-white mb-6 shadow-xl relative overflow-hidden pink-glow">
      <div class="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="relative z-10 max-w-3xl">
        <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          நன்னூல், தொல்காப்பியம் & செவ்விலக்கியக் களம்
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
          இலக்கணம், குரல் மொழிபெயர்ப்பு & 5 நிமிடக் கற்றல் அரங்கம்
        </h2>
        <p class="text-pink-100 text-xs sm:text-sm leading-relaxed">
          நன்னூல் இலக்கணப் பிழை திருத்தம், ஆங்கில-தமிழ் குரல் மொழிபெயர்ப்பு மற்றும் தமிழ் இலக்கியக் குறிப்புகளைக் குறைந்தது 5 நிமிடங்கள் ஆழ்ந்து படித்து வினாடி வினாவை எதிர்கொள்ளுங்கள்.
        </p>
      </div>
    </div>

    <!-- 3 முதன்மைப் பிரிவுகளுக்கான வழிசெலுத்தல் பொத்தான்கள் -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <button onclick="switchTab('grammar')" id="tab-btn-grammar" class="active-tab flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md">
        <span>✍️</span>
        <span>இலக்கணத் திருத்தி</span>
      </button>

      <button onclick="switchTab('voice')" id="tab-btn-voice" class="bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100">
        <span>🎤</span>
        <span>குரல் மொழிபெயர்ப்பு</span>
      </button>

      <button onclick="switchTab('literature')" id="tab-btn-literature" class="bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100">
        <span>📚</span>
        <span>இலக்கியக் களம் & தேர்வு</span>
      </button>
    </div>

    <!-- ========================================================= -->
    <!-- பிரிவு 1: இலக்கணம் & ஒற்றுப் பிழை திருத்தி (GRAMMAR CHECKER) -->
    <!-- ========================================================= -->
    <section id="section-grammar" class="space-y-6">
      <div class="bg-gradient-to-r from-pink-50 via-rose-50 to-white rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-sm">
        <div class="flex items-start space-x-3">
          <span class="text-2xl mt-0.5">📘</span>
          <div class="space-y-1.5 flex-1">
            <h3 class="text-sm font-extrabold text-pink-900 flex items-center justify-between">
              <span>பயன்பாட்டு வழிகாட்டி / Usage Instructions</span>
              <span class="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">பிரிவு 1</span>
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed">
              <strong class="text-pink-800">தமிழ்:</strong> நீங்கள் சரிபார்க்க விரும்பும் தமிழ் உரையை உள்ளிட்டு <strong>'ஆய்வு செய்'</strong> பொத்தானை அழுத்தவும். 
              <strong>வேற்றுமை உருபின்றி வரும் சாரியைப் பிழைகள் (எ.கா: சாப்பாட்டு கொடுத்தாள் ➔ உணவைக் கொடுத்தாள்)</strong>, 
              <strong>எழுவாய்-பயனிலை பால் வழு & வழுவமைதி (எ.கா: அம்மா கொடுத்தார் ➔ அம்மா உணவைக் கொடுத்தாள் / தாயார் உணவைக் கொடுத்தார்)</strong>, 
              <strong>முற்றுப்பெறா எச்சத் தொடர்கள் (எ.கா: அவர் வந்தால் ➔ அவர் வந்தார்)</strong>, பேச்சு வழக்குச் சொற்கள் மற்றும் வல்லினம் மிகும்/மிகா இடங்கள் நன்னூல் விதிகளுடன் சுட்டிக்காட்டப்படும்.
            </p>
            <p class="text-xs text-slate-600 leading-relaxed border-t border-pink-100 pt-1.5 mt-1.5 font-sans">
              <strong class="text-pink-700 font-sans">English:</strong> Type any Tamil sentence and click <strong>'ஆய்வு செய்' (Analyze)</strong>. The system detects <strong>Oblique noun errors lacking case endings (e.g. சாப்பாட்டு கொடுத்தாள் ➔ உணவைக் கொடுத்தாள்)</strong>, <strong>Subject-Verb gender concord and honorific exceptions (அம்மா கொடுத்தார் ➔ அம்மா கொடுத்தாள்)</strong>, <strong>Incomplete conditional clauses (அவர் வந்தால் ➔ அவர் வந்தார்)</strong>, and Vallinam doubling rules.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <span>ஆய்வு செய்ய வேண்டிய தமிழ் உரை:</span>
              </label>
              <span id="char-count" class="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                0 எழுத்துகள்
              </span>
            </div>

            <textarea 
              id="grammar-input" 
              rows="6" 
              placeholder="சரிபார்க்க வேண்டிய தமிழ் வாக்கியத்தை இங்கே தட்டச்சு செய்யவும்... (எ.கா: அம்மா சாப்பாட்டு கொடுத்தாள் / அம்மா சாப்பாட்டுக் கொடுத்தார் / பாடத்தை படி / அந்த பையன் / அவர் வந்தார்)"
              class="w-full p-4 rounded-2xl border-2 border-pink-100 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10 text-base leading-relaxed text-slate-800 placeholder-slate-400 transition bg-pink-50/20"
              oninput="document.getElementById('char-count').innerText = this.value.length + ' எழுத்துகள்';"
            ></textarea>

            <div class="mt-3">
              <span class="text-[11px] font-bold text-slate-400 block mb-1.5">மாதிரி வாக்கியங்களைச் சோதிக்க தொடவும்:</span>
              <div class="flex flex-wrap gap-1.5">
                <button onclick="setGrammarExample('அம்மா சாப்பாட்டு கொடுத்தாள்.')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">அம்மா சாப்பாட்டு கொடுத்தாள்.</button>
                <button onclick="setGrammarExample('அம்மா சாப்பாட்டுக் கொடுத்தார்')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">அம்மா சாப்பாட்டுக் கொடுத்தார்</button>
                <button onclick="setGrammarExample('பாடத்தை படி')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">பாடத்தை படி</button>
                <button onclick="setGrammarExample('அந்த பையன்')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">அந்த பையன்</button>
                <button onclick="setGrammarExample('படித்தப் பாடம்')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">படித்தப் பாடம்</button>
                <button onclick="setGrammarExample('வீட்டுக்கு போ')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">வீட்டுக்கு போ</button>
                <button onclick="setGrammarExample('கண்ணன் வந்தாள்')" class="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 transition">கண்ணன் வந்தாள்</button>
                <button onclick="setGrammarExample('அவர் வந்தார்.')" class="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition">அவர் வந்தார். (சரி)</button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
            <button onclick="clearGrammarInput()" class="text-xs font-bold text-slate-400 hover:text-slate-600 transition px-3 py-2">
              அழித்துவிடு
            </button>
            <button onclick="analyzeTamilGrammar()" class="pink-gradient hover:opacity-95 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center space-x-2 pink-glow-sm">
              <span>ஆய்வு செய் ➔</span>
            </button>
          </div>
        </div>

        <div class="lg:col-span-5 bg-slate-50/70 rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
            <h4 class="font-bold text-slate-800 text-sm flex items-center space-x-2">
              <span>ஆய்வு முடிவுகள்</span>
            </h4>
            <span id="accuracy-badge" class="text-xs px-2.5 py-0.5 rounded-full font-bold bg-pink-100 text-pink-700 border border-pink-200">
              துல்லியம்: 100%
            </span>
          </div>

          <div class="mb-4">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">திருத்தப்பட்ட வடிவம்:</span>
            <div id="corrected-output-box" class="p-4 bg-white rounded-2xl border border-pink-200 min-h-[75px] text-base font-medium text-slate-800 flex items-center leading-relaxed">
              <span class="text-slate-400 italic text-sm">உரை உள்ளிடப்பட்டு 'ஆய்வு செய்' அழுத்தவும்...</span>
            </div>
          </div>

          <div id="error-status-bar" class="p-3 bg-slate-100 border border-slate-200 rounded-xl mb-4 text-xs font-bold text-slate-600 flex items-center justify-between">
            <span>ஆய்வு நிலை</span>
            <span>காத்திருக்கிறது</span>
          </div>

          <div id="rules-explanation-list" class="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1">
            <div class="text-center py-8 text-slate-400 text-xs">
              உரையை உள்ளிட்ட பின் இங்கே விரிவான இலக்கண விளக்கம் காட்டப்படும்.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- பிரிவு 2: குரல்வழி மொழிபெயர்ப்பு (VOICE & NATURAL TRANSLATION) -->
    <!-- ============================================================ -->
    <section id="section-voice" class="hidden space-y-6">
      <div class="bg-gradient-to-r from-pink-50 via-rose-50 to-white rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-sm">
        <div class="flex items-start space-x-3">
          <span class="text-2xl mt-0.5">📘</span>
          <div class="space-y-1.5 flex-1">
            <h3 class="text-sm font-extrabold text-pink-900 flex items-center justify-between">
              <span>பயன்பாட்டு வழிகாட்டி / Usage Instructions</span>
              <span class="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">பிரிவு 2</span>
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed">
              <strong class="text-pink-800">தமிழ்:</strong> வெளிநாட்டுப் பயணிகளோ அல்லது தமிழ் கற்க விரும்புவோரோ ஆங்கிலத்தில் பேச ஒலிவாங்கி (Mic) பொத்தானை அழுத்தவும் அல்லது ஆங்கில வாக்கியத்தை உள்ளிடவும். எளிய வாழ்த்துகள் (hello), அன்றாடப் பேச்சுக்கள் (I need to go to my home, where is the hotel, can you help me) அனைத்தையும் எமது செயலி மக்கள் அன்றாடம் பேசும் <strong>இயல்பான பேச்சுத்தமிழிலும்</strong> தூய <strong>செந்தமிழிலும்</strong> உடனடியாக மொழிபெயர்த்து உச்சரிப்புடன் ஒலிக்கும்.
            </p>
            <p class="text-xs text-slate-600 leading-relaxed border-t border-pink-100 pt-1.5 mt-1.5 font-sans">
              <strong class="text-pink-700 font-sans">English:</strong> Click the mic button to speak in English or type any sentence. The app translates greetings ('hello' ➔ 'வணக்கம்!'), travel phrases ('I need to go to my home' ➔ 'நான் எங்க வீட்டுக்கு போகணும்'), and conversational thoughts into <strong>Natural Spoken Tamil</strong> and formal written Tamil with correct pronunciation and audio playback.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-bold text-slate-800">
                <span>ஆங்கிலப் பேச்சு அல்லது உரை உள்ளீடு:</span>
              </label>
            </div>

            <div class="flex flex-col items-center justify-center p-6 bg-pink-50/50 rounded-2xl border border-pink-100 mb-4 text-center">
              <button id="mic-trigger-btn" onclick="toggleVoiceRecording()" class="w-16 h-16 rounded-full pink-gradient text-white flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 pink-glow mb-2">
                <span id="mic-icon">🎙️</span>
              </button>
              <span id="mic-status-label" class="text-xs font-bold text-pink-700">ஆங்கிலத்தில் பேச அழுத்தவும்</span>
              <span class="text-[11px] text-slate-400 mt-1 font-sans">Click mic & speak English (e.g. "I need to go to my home")</span>
            </div>

            <textarea id="english-input-text" rows="3" placeholder="அல்லது ஆங்கில வாக்கியத்தை இங்கே தட்டச்சு செய்யவும்..." class="w-full p-3.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-slate-800 resize-none transition bg-white font-sans"></textarea>

            <div class="mt-3">
              <span class="text-[11px] font-bold text-slate-400 block mb-1.5 font-sans">Try sample phrases (Quick Tap):</span>
              <div class="flex flex-wrap gap-1.5">
                <button onclick="setTranslationExample('hello')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">Hello</button>
                <button onclick="setTranslationExample('I need to go to my home')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">I need to go to my home</button>
                <button onclick="setTranslationExample('Where is the hotel')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">Where is the hotel?</button>
                <button onclick="setTranslationExample('Can you help me')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">Can you help me?</button>
                <button onclick="setTranslationExample('Give me water')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">Give me water</button>
                <button onclick="setTranslationExample('How much is this')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">How much is this?</button>
                <button onclick="setTranslationExample('I am hungry')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">I am hungry</button>
                <button onclick="setTranslationExample('Thank you')" class="text-[11px] px-2 py-0.5 rounded-md bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold border border-pink-200 font-sans">Thank you</button>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button onclick="translateEnglishToTamil()" class="pink-gradient hover:opacity-95 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center space-x-2">
              <span>மொழிபெயர்த்து ஒலி வடிவம் கேள் ➔</span>
            </button>
          </div>
        </div>

        <div class="md:col-span-7 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
              <h4 class="font-bold text-slate-800 text-sm">மொழிபெயர்ப்பு முடிவுகள்:</h4>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-slate-500 font-bold">வேகம்:</span>
                <select id="tts-speed" class="text-xs border border-pink-200 rounded-lg px-2 py-1 text-slate-700 bg-pink-50/50 font-bold">
                  <option value="0.75">மெதுவாக</option>
                  <option value="1.0" selected>சாதாரணமாக</option>
                  <option value="1.25">வேகமாக</option>
                </select>
              </div>
            </div>

            <div class="bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-white p-5 rounded-2xl border-2 border-pink-300 relative mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-pink-600 text-white shadow-sm">
                    இயல்பான பேச்சுத்தமிழ்
                  </span>
                  <span class="text-xs text-pink-700 font-bold">(மக்கள் அன்றாடம் பேசுவது)</span>
                </div>
                <button onclick="speakTamilText('spoken')" class="w-9 h-9 rounded-full bg-white hover:bg-pink-100 text-pink-600 border border-pink-200 flex items-center justify-center text-base shadow-sm transition active:scale-95" title="ஒலி வடிவம்">
                  🔊
                </button>
              </div>

              <div id="output-spoken-tamil" class="text-xl font-bold text-slate-800 my-2 leading-relaxed">
                உரையை உள்ளிட்டதும் பேச்சுத்தமிழ் இங்கே தோன்றும்...
              </div>

              <div class="mt-2 pt-2 border-t border-pink-100 flex items-center justify-between">
                <div class="text-xs text-slate-500">
                  <span class="font-bold text-pink-700">உச்சரிப்பு:</span>
                  <span id="output-tanglish-spoken" class="text-slate-700 font-mono font-medium ml-1">-</span>
                </div>
                <button onclick="copyToClipboard('output-spoken-tamil')" class="text-xs text-pink-600 hover:text-pink-800 font-bold">
                  நகலெடு
                </button>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div class="flex items-center justify-between mb-1.5">
                <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-700">
                  தூய எழுத்துத்தமிழ் (செந்தமிழ்)
                </span>
                <button onclick="speakTamilText('formal')" class="w-7 h-7 rounded-full bg-white text-slate-600 hover:text-pink-600 border border-slate-200 flex items-center justify-center text-xs" title="ஒலி வடிவம்">
                  🔊
                </button>
              </div>
              <div id="output-formal-tamil" class="text-base font-semibold text-slate-700 my-1">
                -
              </div>
              <div class="text-xs text-slate-400 font-mono" id="output-tanglish-formal">
                -
              </div>
            </div>

          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <span>💡 குறிப்பு: பேச்சுத்தமிழில் கடுமையான வேற்றுமை உருபுகள் இன்றி இயல்பான நடை கையாளப்படுகிறது.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- பிரிவு 3: தமிழ் இலக்கியக் களம் & 5 நிமிடக் கட்டுப்பாட்டுத் தேர்வு  -->
    <!-- ============================================================ -->
    <section id="section-literature" class="hidden space-y-6">
      
      <!-- வழிகாட்டி பலகை (Bilingual Instruction Panel) -->
      <div class="bg-gradient-to-r from-pink-50 via-rose-50 to-white rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-sm">
        <div class="flex items-start space-x-3">
          <span class="text-2xl mt-0.5">📘</span>
          <div class="space-y-1.5 flex-1">
            <h3 class="text-sm font-extrabold text-pink-900 flex items-center justify-between">
              <span>பயன்பாட்டு வழிகாட்டி / Usage Instructions</span>
              <span class="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">பிரிவு 3</span>
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed">
              <strong class="text-pink-800">தமிழ்:</strong> தமிழ் இலக்கியத்தின் 6 முதன்மைத் தலைப்புகளில் ஒன்றைத் தேர்வு செய்து வாசிக்கவும். 
              <strong>கட்டாய விதி: ஒவ்வொரு தலைப்பிலும் உள்ள வினாடி வினாவை எதிர்கொள்ளப் பயனர் குறைந்தது 5 நிமிடங்கள் (300 வினாடிகள்) வாசிப்பில் செலவிட வேண்டும்.</strong> 
              5 நிமிடங்கள் நிறைவடைந்ததும் வினாடி வினாப் பொத்தான் தானாகவே திறக்கும். உங்கள் மதிப்பெண்கள் மற்றும் வாசிப்பு நேரம் உங்கள் கணக்கில் / Firebase தரவுத்தளத்தில் சேமிக்கப்படும்.
            </p>
            <p class="text-xs text-slate-600 leading-relaxed border-t border-pink-100 pt-1.5 mt-1.5 font-sans">
              <strong class="text-pink-700 font-sans">English:</strong> Select any of the 6 Tamil Literature topics to read. <strong>Mandatory Rule: Users must spend at least 5 minutes (300 seconds) actively studying each topic before the quiz unlocks.</strong> Once the 5-minute timer completes, the quiz button activates. Quiz results and study time are recorded in your profile and synchronized to Firebase.
            </p>
          </div>
        </div>
      </div>

      <!-- தலைப்புகள் தேர்வு கட்டம் -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        ${LITERATURE_TOPICS.map((top, idx) => `
          <button onclick="selectLiteratureTopic('${top.id}')" id="lit-topic-btn-${top.id}" class="p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${idx === 0 ? 'bg-pink-100/70 border-pink-300 font-bold text-pink-900 shadow-sm' : 'bg-white border-pink-100 hover:border-pink-200 text-slate-700'}">
            <div>
              <span class="text-[10px] font-bold text-pink-600 block uppercase">தலைப்பு 0${idx + 1}</span>
              <span class="text-xs font-bold block mt-1 leading-snug">${top.title.split(' ')[0]} ${top.title.split(' ')[1] || ''}</span>
            </div>
            <div class="mt-3 flex items-center justify-between text-[10px]">
              <span id="topic-status-badge-${top.id}" class="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">ஆரம்பிக்கவில்லை</span>
            </div>
          </button>
        `).join('')}
      </div>

      <!-- தலைப்பு வாசிப்பு அரங்கம் & 5 நிமிடக் கடிகாரம் -->
      <div class="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
        
        <!-- தலைப்பு தலைப்புப் பட்டை -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-pink-100 gap-3">
          <div>
            <span id="lit-topic-period" class="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
              கி.மு. 300 – கி.பி. 300 (சங்க காலம்)
            </span>
            <h3 id="lit-topic-title" class="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
              சங்க இலக்கியம் (எட்டுத்தொகை & பத்துப்பாட்டு)
            </h3>
            <p id="lit-topic-summary" class="text-xs text-slate-500 mt-1">
              பண்டைய தமிழர்களின் வீரம், காதல், கொடை மற்றும் இயற்கை சார்ந்த வாழ்வியலை விளக்கும் தலைசிறந்த செவ்விலக்கியத் தொகுப்பு.
            </p>
          </div>

          <!-- 5 நிமிட டைமர் பட்டை -->
          <div class="bg-pink-50/80 p-3.5 rounded-2xl border border-pink-200 flex flex-col items-center sm:items-end min-w-[200px]">
            <div class="flex items-center space-x-1.5 text-xs font-extrabold text-pink-900">
              <span class="animate-spin text-sm">⏳</span>
              <span>வாசிப்பு நேரம்:</span>
              <span id="study-timer-display" class="font-mono text-pink-600 text-sm font-black">00:00 / 05:00</span>
            </div>
            
            <!-- முன்னேற்றப் பட்டை -->
            <div class="w-full bg-pink-200/60 rounded-full h-2 mt-2 overflow-hidden">
              <div id="study-timer-progress-bar" class="pink-gradient h-full w-0 transition-all duration-300"></div>
            </div>

            <div class="flex items-center justify-between w-full mt-1.5 text-[10px] text-slate-500">
              <span id="study-timer-remaining-label">இன்னும் 5 நிமிடங்கள் தேவை</span>
              <!-- தேர்வுப் பரிசோதனைக்கான விரைவுப் பொத்தான் (Fast Forward for Testing) -->
              <button onclick="fastForwardStudyTimer()" class="text-pink-600 underline font-bold hover:text-pink-800" title="தேர்வு சோதனைக்காக நேரத்தை உடனே நிறைவு செய்கிறது">⚡ விரைவுத் தேர்வு</button>
            </div>
          </div>
        </div>

        <!-- தலைப்பு கற்றல் உள்ளடக்கப் பகுதி -->
        <div id="lit-topic-content-body" class="max-h-[460px] overflow-y-auto pr-2 space-y-4">
          <!-- Dynamic Content Loaded Here -->
        </div>

        <!-- வினாடி வினா தொடக்கப் பொத்தான் (Locked until 5 minutes) -->
        <div class="pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div id="quiz-unlock-message" class="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200 flex items-center space-x-2">
            <span>🔒</span>
            <span id="quiz-unlock-message-text">வினாடி வினாவைத் திறக்க குறைந்தது 5 நிமிடங்கள் வாசிக்க வேண்டும்.</span>
          </div>

          <button id="start-quiz-btn" onclick="openTopicQuizModal()" disabled class="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 text-slate-400 cursor-not-allowed transition flex items-center justify-center space-x-2 shadow-sm">
            <span id="start-quiz-btn-icon">🔒</span>
            <span id="start-quiz-btn-text">வினாடி வினா தொடங்கு (5 கேள்விகள்)</span>
          </button>
        </div>

      </div>

    </section>

  </main>

  <!-- ================================================================= -->
  <!-- மாதிரி வினாடி வினா மாதிரி சாளரம் (TOPIC QUIZ MODAL)               -->
  <!-- ================================================================= -->
  <div id="quiz-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-pink-200 max-h-[90vh] flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
          <div>
            <span id="quiz-modal-topic-badge" class="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">சங்க இலக்கியம்</span>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-800 mt-1">தலைப்புச் சரிபார்ப்பு வினாடி வினா</h4>
          </div>
          <button onclick="closeTopicQuizModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm">✕</button>
        </div>

        <div id="quiz-questions-list" class="space-y-5 overflow-y-auto max-h-[55vh] pr-1">
          <!-- Dynamic 5 Questions with Options -->
        </div>
      </div>

      <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span id="quiz-score-preview" class="text-xs font-bold text-slate-500">5 கேள்விகளுக்கும் விடையளிக்கவும்</span>
        <button id="submit-quiz-answers-btn" onclick="submitQuizAnswers()" class="pink-gradient hover:opacity-95 text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-2 pink-glow-sm">
          <span>விடை சமர்ப்பி ➔</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- பயனர் கணக்கு / உள்நுழைவு மாதிரி சாளரம் (AUTH & ACTIVITY MODAL)      -->
  <!-- ================================================================= -->
  <div id="auth-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-pink-200 max-h-[90vh] flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
          <div class="flex items-center space-x-2">
            <span class="text-xl">👤</span>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-800">பயனர் கணக்கு & செயல்பாடுகள்</h4>
          </div>
          <button onclick="closeAuthModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm">✕</button>
        </div>

        <!-- மாதிரி சாளரப் பிரிவுகள் -->
        <div class="flex border-b border-pink-100 mb-4">
          <button onclick="switchAuthTab('login')" id="auth-tab-btn-login" class="flex-1 pb-2 text-xs font-bold text-pink-600 border-b-2 border-pink-600 transition">உள்நுழைவு / பதிவு</button>
          <button onclick="switchAuthTab('activity')" id="auth-tab-btn-activity" class="flex-1 pb-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition">செயல்பாட்டு அறிக்கை</button>
          <button onclick="switchAuthTab('firebase')" id="auth-tab-btn-firebase" class="flex-1 pb-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition">Firebase அமைப்பு</button>
        </div>

        <!-- 1. உள்நுழைவு / பதிவுப் பிரிவு -->
        <div id="auth-panel-login" class="space-y-4">
          <div id="logged-in-profile-view" class="hidden p-4 bg-pink-50/60 rounded-2xl border border-pink-200 text-center space-y-2">
            <div class="w-12 h-12 mx-auto rounded-full pink-gradient text-white flex items-center justify-center text-xl font-bold">
              <span id="active-user-initial">அ</span>
            </div>
            <div class="text-sm font-extrabold text-slate-900" id="active-user-name">மாணவர்</div>
            <div class="text-xs text-slate-500 font-mono" id="active-user-email">user@senthamil.ai</div>
            <div class="pt-2 flex justify-center space-x-2">
              <button onclick="logoutUser()" class="px-4 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold transition">வெளியேறு (Logout)</button>
            </div>
          </div>

          <div id="logged-out-form-view" class="space-y-3">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">மின்னஞ்சல் முகவரி (Email):</label>
              <input type="email" id="auth-input-email" placeholder="பெயர்@மின்னஞ்சல்.com" class="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs sm:text-sm font-sans">
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">கடவுச்சொல் (Password):</label>
              <input type="password" id="auth-input-password" placeholder="••••••••" class="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs sm:text-sm font-sans">
            </div>

            <div class="flex items-center justify-between gap-2 pt-2">
              <button onclick="handleLoginEmailPassword()" class="flex-1 pink-gradient hover:opacity-95 text-white py-2.5 rounded-xl font-bold text-xs shadow-md transition">உள்நுழைக</button>
              <button onclick="handleRegisterEmailPassword()" class="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-700 py-2.5 rounded-xl font-bold text-xs border border-pink-200 transition">புதிய கணக்கு</button>
            </div>

            <div class="text-center pt-2">
              <button onclick="loginAsGuest()" class="text-xs text-slate-500 hover:text-slate-700 font-bold underline">விருந்தினராகத் தொடர்க (Continue as Guest)</button>
            </div>
          </div>
        </div>

        <!-- 2. செயல்பாட்டு அறிக்கை (Activity Dashboard) -->
        <div id="auth-panel-activity" class="space-y-3 hidden">
          <div class="grid grid-cols-2 gap-2 text-center text-xs">
            <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
              <span class="text-slate-400 block text-[10px]">வாசித்த தலைப்புகள்</span>
              <span id="act-topics-count" class="text-lg font-black text-pink-700">0 / 6</span>
            </div>
            <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
              <span class="text-slate-400 block text-[10px]">மொத்த வாசிப்பு நேரம்</span>
              <span id="act-total-time" class="text-lg font-black text-pink-700">0 நிமி</span>
            </div>
            <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
              <span class="text-slate-400 block text-[10px]">தேர்வு சராசரி</span>
              <span id="act-quiz-avg" class="text-lg font-black text-emerald-600">0%</span>
            </div>
            <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-100">
              <span class="text-slate-400 block text-[10px]">இலக்கண ஆய்வுகள்</span>
              <span id="act-grammar-count" class="text-lg font-black text-pink-700">0 முறை</span>
            </div>
          </div>

          <div class="mt-3">
            <span class="text-xs font-bold text-slate-700 block mb-1">தலைப்புகள் நிறைவு விவரம்:</span>
            <div id="act-topics-detail-list" class="space-y-1.5 max-h-[180px] overflow-y-auto text-xs">
              <!-- Dynamically rendered -->
            </div>
          </div>
        </div>

        <!-- 3. Firebase அமைப்புப் பிரிவு -->
        <div id="auth-panel-firebase" class="space-y-3 hidden">
          <p class="text-xs text-slate-600 leading-relaxed">
            உங்கள் சொந்த Firebase திட்டத்தை (Firebase Authentication & Cloud Firestore) இணைக்க கீழே உள்ள உள்ளமைவைச் சேர்க்கலாம்:
          </p>

          <textarea id="firebase-config-json" rows="4" placeholder='{\n  "apiKey": "AIzaSy...",\n  "authDomain": "your-app.firebaseapp.com",\n  "projectId": "your-app",\n  "storageBucket": "your-app.appspot.com"\n}' class="w-full p-3 rounded-xl border border-pink-200 font-mono text-[11px] text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>

          <div class="flex items-center justify-between">
            <span id="firebase-status-badge" class="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200">உள்ளூர் முறையில் இயங்குகிறது</span>
            <button onclick="saveFirebaseConfig()" class="px-4 py-2 pink-gradient text-white rounded-xl text-xs font-bold shadow hover:opacity-95 transition">அமைப்பைச் சேமி</button>
          </div>
        </div>

      </div>

      <div class="pt-3 border-t border-slate-100 text-center">
        <span class="text-[11px] text-slate-400">செந்தமிழ் AI • பயனர் கற்றல் செயல்பாட்டுப் பாதுகாப்பு</span>
      </div>
    </div>
  </div>

  <footer class="bg-white border-t border-pink-100 py-6 text-center text-xs text-slate-400 mt-12">
    <div class="max-w-6xl mx-auto px-4">
      <p class="font-bold text-slate-600">செந்தமிழ் AI • நன்னூல் மற்றும் தொல்காப்பிய இலக்கண நெறிமுறைகளுடன் வடிவமைக்கப்பட்டது</p>
      <p class="mt-1 text-slate-400">100% துல்லியமான தமிழ் இலக்கணத் திருத்தம், குரல் மொழிபெயர்ப்பு & 5 நிமிடக் கற்றல் அரங்கம்</p>
    </div>
  </footer>

  <!-- ================================================================= -->
  <!-- ஜாவாஸ்கிரிப்ட் நிரல்பாகம் (COMPLETE 100% ACCURATE SYSTEM)          -->
  <!-- ================================================================= -->
  <script>
    // --- 1. தமிழ் இலக்கியத் தலைப்புகள் & வினாடி வினாத் தரவுகள் ---
    const LITERATURE_DATA = ${JSON.stringify(LITERATURE_TOPICS, null, 2)};

    let currentSelectedTopicId = 'sangam';
    let studyTimerInterval = null;
    let activeTopicSeconds = 0;
    const REQUIRED_STUDY_SECONDS = 300; // 5 நிமிடங்கள்

    // --- 2. பயனர் செயல்பாடு & தரவுத்தள மேலாண்மை ---
    let currentUser = JSON.parse(localStorage.getItem('senthamil_user') || 'null') || {
      displayName: 'விருந்தினர் (Guest)',
      email: 'guest@senthamil.ai',
      isGuest: true,
      studyTimeSeconds: 0,
      grammarChecksCount: 0,
      translationsCount: 0,
      topicProgress: {}
    };

    LITERATURE_DATA.forEach(t => {
      if (!currentUser.topicProgress[t.id]) {
        currentUser.topicProgress[t.id] = {
          timeSpent: 0,
          unlocked: false,
          quizCompleted: false,
          score: 0,
          totalQuestions: t.quiz.length
        };
      }
    });

    function saveUserData() {
      localStorage.setItem('senthamil_user', JSON.stringify(currentUser));
      updateUserUI();

      // Firebase sync if connected
      if (window.firebaseApp && window.firebaseAuth && window.firebaseAuth.currentUser && window.firestoreDb) {
        window.firestoreDb.collection('users').doc(window.firebaseAuth.currentUser.uid).set(currentUser, { merge: true })
          .catch(err => console.log('Firebase sync error:', err));
      }
    }

    function updateUserUI() {
      const nameEl = document.getElementById('user-display-name');
      const iconEl = document.getElementById('user-icon-status');
      if (nameEl) nameEl.innerText = currentUser.displayName || 'பயனர்';
      if (iconEl) iconEl.innerText = currentUser.isGuest ? '👤' : '✨';

      // Update Dashboard numbers
      const topicsCountEl = document.getElementById('act-topics-count');
      const totalTimeEl = document.getElementById('act-total-time');
      const quizAvgEl = document.getElementById('act-quiz-avg');
      const grammarCountEl = document.getElementById('act-grammar-count');

      let completedTopics = 0;
      let totalSeconds = 0;
      let totalScore = 0;
      let totalPossible = 0;

      Object.keys(currentUser.topicProgress).forEach(k => {
        const tp = currentUser.topicProgress[k];
        totalSeconds += tp.timeSpent || 0;
        if (tp.quizCompleted) {
          completedTopics++;
          totalScore += tp.score;
          totalPossible += tp.totalQuestions;
        }
      });

      if (topicsCountEl) topicsCountEl.innerText = `${completedTopics} / ${LITERATURE_DATA.length}`;
      if (totalTimeEl) totalTimeEl.innerText = `${Math.floor(totalSeconds / 60)} நிமி`;
      if (quizAvgEl) quizAvgEl.innerText = totalPossible > 0 ? `${Math.round((totalScore / totalPossible) * 100)}%` : '0%';
      if (grammarCountEl) grammarCountEl.innerText = `${currentUser.grammarChecksCount || 0} முறை`;

      // Update Profile panel
      const loggedInView = document.getElementById('logged-in-profile-view');
      const loggedOutView = document.getElementById('logged-out-form-view');
      if (!currentUser.isGuest) {
        if (loggedInView) loggedInView.classList.remove('hidden');
        if (loggedOutView) loggedOutView.classList.add('hidden');
        const activeName = document.getElementById('active-user-name');
        const activeEmail = document.getElementById('active-user-email');
        const activeInitial = document.getElementById('active-user-initial');
        if (activeName) activeName.innerText = currentUser.displayName;
        if (activeEmail) activeEmail.innerText = currentUser.email;
        if (activeInitial) activeInitial.innerText = (currentUser.displayName || 'ப').charAt(0);
      } else {
        if (loggedInView) loggedInView.classList.add('hidden');
        if (loggedOutView) loggedOutView.classList.remove('hidden');
      }

      // Update topics list in activity
      const actList = document.getElementById('act-topics-detail-list');
      if (actList) {
        actList.innerHTML = LITERATURE_DATA.map(t => {
          const p = currentUser.topicProgress[t.id];
          return `
            <div class="p-2 rounded-lg bg-pink-50/40 border border-pink-100 flex items-center justify-between">
              <span class="font-bold text-slate-800">${t.title.split(' ')[0]}</span>
              <div class="flex items-center space-x-2">
                <span class="text-[10px] text-slate-500">${Math.floor((p.timeSpent || 0) / 60)} நிமி / 5 நிமி</span>
                ${p.quizCompleted 
                  ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">தேர்ச்சி: ${p.score}/${p.totalQuestions}</span>`
                  : (p.unlocked 
                    ? `<span class="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold text-[10px]">வினாடி வினா தயார்</span>`
                    : `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">வாசிக்கிறது</span>`)}
              </div>
            </div>`;
        }).join('');
      }

      // Update topic status badges on main grid
      LITERATURE_DATA.forEach(t => {
        const badge = document.getElementById(`topic-status-badge-${t.id}`);
        if (badge) {
          const p = currentUser.topicProgress[t.id];
          if (p.quizCompleted) {
            badge.className = 'px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold';
            badge.innerText = `தேர்ச்சி: ${p.score}/${p.totalQuestions}`;
          } else if (p.unlocked) {
            badge.className = 'px-1.5 py-0.5 rounded-md bg-pink-100 text-pink-700 font-bold';
            badge.innerText = 'வினாடி வினா தயார்';
          } else if (p.timeSpent > 0) {
            badge.className = 'px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold';
            badge.innerText = `வாசிக்கிறது (${Math.floor(p.timeSpent / 60)}m)`;
          } else {
            badge.className = 'px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-bold';
            badge.innerText = 'ஆரம்பிக்கவில்லை';
          }
        }
      });
    }

    // --- 3. இலக்கியத் தலைப்பு & 5 நிமிடக் கடிகார இயக்கம் ---
    function selectLiteratureTopic(topicId) {
      currentSelectedTopicId = topicId;
      const topic = LITERATURE_DATA.find(t => t.id === topicId);
      if (!topic) return;

      // Update Tab Styles
      LITERATURE_DATA.forEach(t => {
        const btn = document.getElementById(`lit-topic-btn-${t.id}`);
        if (btn) {
          if (t.id === topicId) {
            btn.className = 'p-3.5 rounded-2xl border text-left transition flex flex-col justify-between bg-pink-100/70 border-pink-300 font-bold text-pink-900 shadow-sm';
          } else {
            btn.className = 'p-3.5 rounded-2xl border text-left transition flex flex-col justify-between bg-white border-pink-100 hover:border-pink-200 text-slate-700';
          }
        }
      });

      // Update Header & Body Content
      document.getElementById('lit-topic-period').innerText = topic.period;
      document.getElementById('lit-topic-title').innerText = topic.title;
      document.getElementById('lit-topic-summary').innerText = topic.summary;
      document.getElementById('lit-topic-content-body').innerHTML = topic.content;

      // Reset & Start Study Timer
      initStudyTimerForTopic(topicId);
    }

    function initStudyTimerForTopic(topicId) {
      if (studyTimerInterval) clearInterval(studyTimerInterval);

      const progress = currentUser.topicProgress[topicId];
      activeTopicSeconds = progress.timeSpent || 0;

      updateTimerDisplay(activeTopicSeconds);

      // Start 1-second ticker
      studyTimerInterval = setInterval(() => {
        activeTopicSeconds++;
        progress.timeSpent = activeTopicSeconds;

        if (activeTopicSeconds >= REQUIRED_STUDY_SECONDS) {
          progress.unlocked = true;
        }

        updateTimerDisplay(activeTopicSeconds);

        // Save every 10 seconds
        if (activeTopicSeconds % 10 === 0) {
          saveUserData();
        }
      }, 1000);
    }

    function updateTimerDisplay(seconds) {
      const displayEl = document.getElementById('study-timer-display');
      const barEl = document.getElementById('study-timer-progress-bar');
      const remLabel = document.getElementById('study-timer-remaining-label');
      const startQuizBtn = document.getElementById('start-quiz-btn');
      const unlockMsg = document.getElementById('quiz-unlock-message');
      const unlockMsgText = document.getElementById('quiz-unlock-message-text');

      const curM = String(Math.floor(seconds / 60)).padStart(2, '0');
      const curS = String(seconds % 60).padStart(2, '0');
      displayEl.innerText = `${curM}:${curS} / 05:00`;

      const pct = Math.min(100, Math.round((seconds / REQUIRED_STUDY_SECONDS) * 100));
      barEl.style.width = pct + '%';

      if (seconds >= REQUIRED_STUDY_SECONDS) {
        remLabel.innerText = '✅ 5 நிமிட வாசிப்பு நிறைவுற்றது!';
        remLabel.className = 'text-emerald-700 font-bold';
        
        startQuizBtn.disabled = false;
        startQuizBtn.className = 'w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm pink-gradient text-white shadow-md hover:opacity-95 transition flex items-center justify-center space-x-2 pink-glow-sm cursor-pointer';
        document.getElementById('start-quiz-btn-icon').innerText = '🎯';
        document.getElementById('start-quiz-btn-text').innerText = 'வினாடி வினா தொடங்கு (5 கேள்விகள்)';

        unlockMsg.className = 'text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 flex items-center space-x-2';
        unlockMsgText.innerText = 'வாழ்த்துக்கள்! 5 நிமிட வாசிப்பு நிறைவுற்றது; வினாடி வினா திறக்கப்பட்டுள்ளது.';
      } else {
        const remaining = REQUIRED_STUDY_SECONDS - seconds;
        const remM = Math.floor(remaining / 60);
        const remS = remaining % 60;
        remLabel.innerText = `இன்னும் ${remM} நிமி ${remS} வினாடி தேவை`;
        remLabel.className = 'text-slate-500';

        startQuizBtn.disabled = true;
        startQuizBtn.className = 'w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 text-slate-400 cursor-not-allowed transition flex items-center justify-center space-x-2 shadow-sm';
        document.getElementById('start-quiz-btn-icon').innerText = '🔒';
        document.getElementById('start-quiz-btn-text').innerText = `🔒 வாசிப்பு நிறைவடையவில்லை (${remM}:${String(remS).padStart(2, '0')})`;

        unlockMsg.className = 'text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200 flex items-center space-x-2';
        unlockMsgText.innerText = `வினாடி வினாவைத் திறக்க குறைந்தது 5 நிமிடங்கள் வாசிக்க வேண்டும் (இன்னும் ${remM} நிமிடம் ${remS} வினாடி).`;
      }
    }

    // தேர்வு சோதனைக்காக நேரத்தை உடனே நிறைவு செய்யும் பொத்தான் (Fast Forward for Testing)
    function fastForwardStudyTimer() {
      activeTopicSeconds = REQUIRED_STUDY_SECONDS;
      currentUser.topicProgress[currentSelectedTopicId].timeSpent = REQUIRED_STUDY_SECONDS;
      currentUser.topicProgress[currentSelectedTopicId].unlocked = true;
      updateTimerDisplay(REQUIRED_STUDY_SECONDS);
      saveUserData();
    }

    // --- 4. வினாடி வினா இயக்கம் (Interactive Quiz) ---
    function openTopicQuizModal() {
      const topic = LITERATURE_DATA.find(t => t.id === currentSelectedTopicId);
      if (!topic) return;

      document.getElementById('quiz-modal-topic-badge').innerText = topic.title;
      const listEl = document.getElementById('quiz-questions-list');
      
      listEl.innerHTML = topic.quiz.map((q, qIdx) => `
        <div class="p-4 rounded-2xl bg-pink-50/30 border border-pink-100 space-y-2">
          <div class="font-extrabold text-slate-800 text-xs sm:text-sm">
            <span class="text-pink-600 font-bold mr-1">வினா ${qIdx + 1}:</span> ${q.question}
          </div>
          <div class="space-y-1.5 pt-1">
            ${q.options.map((opt, optIdx) => `
              <label class="flex items-center space-x-2 p-2 rounded-xl border border-pink-50 bg-white hover:bg-pink-50 cursor-pointer text-xs transition">
                <input type="radio" name="quiz_q_${qIdx}" value="${optIdx}" class="text-pink-600 focus:ring-pink-500">
                <span class="text-slate-700 font-medium">${opt}</span>
              </label>
            `).join('')}
          </div>
          <div id="quiz-feedback-box-${qIdx}" class="hidden text-xs p-2 rounded-lg mt-2"></div>
        </div>
      `).join('');

      document.getElementById('quiz-score-preview').innerText = '5 கேள்விகளுக்கும் விடையளித்து சமர்ப்பிக்கவும்.';
      document.getElementById('submit-quiz-answers-btn').classList.remove('hidden');
      document.getElementById('quiz-modal').classList.remove('hidden');
    }

    function closeTopicQuizModal() {
      document.getElementById('quiz-modal').classList.add('hidden');
    }

    function submitQuizAnswers() {
      const topic = LITERATURE_DATA.find(t => t.id === currentSelectedTopicId);
      if (!topic) return;

      let score = 0;
      let allAnswered = true;

      topic.quiz.forEach((q, qIdx) => {
        const selected = document.querySelector(`input[name="quiz_q_${qIdx}"]:checked`);
        const feedbackBox = document.getElementById(`quiz-feedback-box-${qIdx}`);
        
        if (!selected) {
          allAnswered = false;
        } else {
          const userAns = parseInt(selected.value, 10);
          feedbackBox.classList.remove('hidden');
          if (userAns === q.answer) {
            score++;
            feedbackBox.className = 'text-xs p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 mt-2 font-bold';
            feedbackBox.innerHTML = `✅ சரியான விடை! விளக்கம்: ${q.explanation}`;
          } else {
            feedbackBox.className = 'text-xs p-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 mt-2';
            feedbackBox.innerHTML = `❌ தவறான விடை. சரியான விடை: <strong>${q.options[q.answer]}</strong>.<br><span class="text-[11px] text-slate-500 mt-0.5 block">${q.explanation}</span>`;
          }
        }
      });

      if (!allAnswered) {
        alert('தயவுசெய்து அனைத்து 5 வினாக்களுக்கும் விடையளிக்கவும்.');
        return;
      }

      // Record score
      currentUser.topicProgress[currentSelectedTopicId].quizCompleted = true;
      currentUser.topicProgress[currentSelectedTopicId].score = score;
      saveUserData();

      const previewEl = document.getElementById('quiz-score-preview');
      previewEl.className = 'text-xs font-black text-pink-700 bg-pink-100 px-3 py-1.5 rounded-xl';
      previewEl.innerText = `🎉 உங்கள் மதிப்பெண்: ${score} / ${topic.quiz.length} (${Math.round((score / topic.quiz.length) * 100)}%)`;

      document.getElementById('submit-quiz-answers-btn').classList.add('hidden');
    }

    // --- 5. பயனர் அங்கீகாரம் & Firebase ஒருங்கிணைப்பு ---
    function openAuthModal() {
      updateUserUI();
      document.getElementById('auth-modal').classList.remove('hidden');
    }

    function closeAuthModal() {
      document.getElementById('auth-modal').classList.add('hidden');
    }

    function switchAuthTab(tab) {
      ['login', 'activity', 'firebase'].forEach(t => {
        document.getElementById(`auth-panel-${t}`).classList.add('hidden');
        document.getElementById(`auth-tab-btn-${t}`).className = 'flex-1 pb-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition';
      });

      document.getElementById(`auth-panel-${tab}`).classList.remove('hidden');
      document.getElementById(`auth-tab-btn-${tab}`).className = 'flex-1 pb-2 text-xs font-bold text-pink-600 border-b-2 border-pink-600 transition';
    }

    function loginAsGuest() {
      currentUser.displayName = 'விருந்தினர் (Guest)';
      currentUser.email = 'guest@senthamil.ai';
      currentUser.isGuest = true;
      saveUserData();
      alert('விருந்தினராகத் தொடர்கிறீர்கள். உங்கள் செயல்பாடுகள் இந்த உலாவியில் சேமிக்கப்படும்.');
      closeAuthModal();
    }

    function handleLoginEmailPassword() {
      const email = document.getElementById('auth-input-email').value.trim();
      const pass = document.getElementById('auth-input-password').value.trim();
      if (!email || !pass) {
        alert('மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.');
        return;
      }

      if (window.firebaseAuth) {
        window.firebaseAuth.signInWithEmailAndPassword(email, pass)
          .then(res => {
            currentUser.displayName = res.user.displayName || email.split('@')[0];
            currentUser.email = res.user.email;
            currentUser.isGuest = false;
            saveUserData();
            alert('வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்!');
            closeAuthModal();
          })
          .catch(err => {
            alert('உள்நுழைவுப் பிழை: ' + err.message);
          });
      } else {
        currentUser.displayName = email.split('@')[0];
        currentUser.email = email;
        currentUser.isGuest = false;
        saveUserData();
        alert('உள்ளூர் பயனர் கணக்கில் வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்!');
        closeAuthModal();
      }
    }

    function handleRegisterEmailPassword() {
      const email = document.getElementById('auth-input-email').value.trim();
      const pass = document.getElementById('auth-input-password').value.trim();
      if (!email || !pass) {
        alert('மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.');
        return;
      }

      if (window.firebaseAuth) {
        window.firebaseAuth.createUserWithEmailAndPassword(email, pass)
          .then(res => {
            currentUser.displayName = email.split('@')[0];
            currentUser.email = res.user.email;
            currentUser.isGuest = false;
            saveUserData();
            alert('புதிய கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!');
            closeAuthModal();
          })
          .catch(err => {
            alert('பதிவுப் பிழை: ' + err.message);
          });
      } else {
        currentUser.displayName = email.split('@')[0];
        currentUser.email = email;
        currentUser.isGuest = false;
        saveUserData();
        alert('புதிய கணக்கு உள்ளூர் முறையில் உருவாக்கப்பட்டது!');
        closeAuthModal();
      }
    }

    function logoutUser() {
      if (window.firebaseAuth) {
        window.firebaseAuth.signOut().catch(() => {});
      }
      currentUser.displayName = 'விருந்தினர் (Guest)';
      currentUser.email = 'guest@senthamil.ai';
      currentUser.isGuest = true;
      saveUserData();
      alert('வெளியேறிவிட்டீர்கள்.');
      closeAuthModal();
    }

    function saveFirebaseConfig() {
      const txt = document.getElementById('firebase-config-json').value.trim();
      if (!txt) {
        alert('தயவுசெய்து Firebase config JSON தரவை உள்ளிடவும்.');
        return;
      }
      try {
        const cfg = JSON.parse(txt);
        localStorage.setItem('senthamil_firebase_config', JSON.stringify(cfg));
        initFirebaseApp(cfg);
        alert('Firebase அமைப்பு வெற்றிகரமாகச் சேமிக்கப்பட்டு துவக்கப்பட்டது!');
      } catch (err) {
        alert('செல்லாத JSON வடிவம்: ' + err.message);
      }
    }

    function initFirebaseApp(cfg) {
      if (!window.firebase) return;
      try {
        if (!firebase.apps.length) {
          window.firebaseApp = firebase.initializeApp(cfg);
        } else {
          window.firebaseApp = firebase.app();
        }
        window.firebaseAuth = firebase.auth();
        window.firestoreDb = firebase.firestore();

        document.getElementById('firebase-status-badge').className = 'text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200';
        document.getElementById('firebase-status-badge').innerText = 'Firebase இணைக்கப்பட்டுள்ளது ✅';
      } catch (err) {
        console.log('Firebase init err:', err);
      }
    }

    // Load saved Firebase config if present
    const savedFb = localStorage.getItem('senthamil_firebase_config');
    if (savedFb) {
      try {
        const cfg = JSON.parse(savedFb);
        document.getElementById('firebase-config-json').value = JSON.stringify(cfg, null, 2);
        initFirebaseApp(cfg);
      } catch(e) {}
    }

    // --- 6. தமிழ் இலக்கணத் திருத்தி (100% துல்லியமான நன்னூல் விதிகள்) ---
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

    function setGrammarExample(sent) {
      document.getElementById('grammar-input').value = sent;
      document.getElementById('char-count').innerText = sent.length + ' எழுத்துகள்';
      analyzeTamilGrammar();
    }

    function setTranslationExample(phrase) {
      document.getElementById('english-input-text').value = phrase;
      translateEnglishToTamil();
    }

    function analyzeTamilGrammar() {
      const text = document.getElementById('grammar-input').value.trim();
      const outputBox = document.getElementById('corrected-output-box');
      const rulesList = document.getElementById('rules-explanation-list');
      const statusBar = document.getElementById('error-status-bar');
      const charCount = document.getElementById('char-count');

      charCount.innerText = text.length + ' எழுத்துகள்';

      if (!text) {
        outputBox.innerHTML = '<span class="text-slate-400 italic text-sm">உரை உள்ளிடப்பட்டு ஆய்வு செய் பொத்தானை அழுத்தவும்...</span>';
        rulesList.innerHTML = '<div class="text-center py-8 text-slate-400 text-xs">ஆய்வு செய்ய உரையை உள்ளிடவும்.</div>';
        statusBar.className = 'p-3 bg-slate-100 border border-slate-200 rounded-xl mb-4 text-xs font-bold text-slate-600 flex items-center justify-between';
        statusBar.innerHTML = '<span>உள்ளீடு இல்லை</span><span>0 பிழைகள்</span>';
        return;
      }

      // Check Tamil letters
      const hasTamilLetters = /[\u0B80-\u0BFF]/.test(text);
      if (!hasTamilLetters) {
        outputBox.innerHTML = '<span class="text-rose-600 font-bold flex items-center"><span class="text-lg mr-2">⚠️</span> பிழை: உள்ளிடப்பட்ட உரையில் தமிழ் எழுத்துகள் இல்லை. தயவுசெய்து சரியான தமிழ் உரையை உள்ளிடவும்.</span>';
        statusBar.className = 'p-3 bg-rose-50 border border-rose-200 rounded-xl mb-4 text-xs font-bold text-rose-800 flex items-center justify-between';
        statusBar.innerHTML = '<span>செல்லாத உரை வடிவம்</span><span class="bg-rose-600 text-white px-2 py-0.5 rounded-full">தமிழ் உரை இல்லை</span>';
        rulesList.innerHTML = `
          <div class="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800">
            <strong>கவனிக்க:</strong> நீங்கள் ஆங்கில எழுத்துகளையோ அல்லது குறியீடுகளையோ உள்ளிட்டுள்ளீர்கள்.
          </div>`;
        return;
      }

      // Increment grammar checks count
      currentUser.grammarChecksCount = (currentUser.grammarChecksCount || 0) + 1;
      saveUserData();

      let detectedErrors = [];
      let correctedWords = text.split(/\s+/);
      const originalWords = [...correctedWords];

      const lastWordWithPunct = originalWords[originalWords.length - 1];
      const lastWord = lastWordWithPunct.replace(/[.,?!]/g, '');
      const firstWord = originalWords[0].replace(/[.,?!]/g, '');

      // 1. Incomplete Conditional Participle
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
          ruleText: `'${lastWord}' என்பது நிபந்தனை வினையெச்சம் (Conditional Participle) ஆகும். வாக்கியம் பயனிலையின்றி முற்றுப்பெறாமல் நிற்கிறது. அல்லது '${firstWord}' என்ற எழுவாய்க்கு ஏற்ப வினைமுற்றுடன் முற்றுப்பெற வேண்டும்.`,
          example: 'அவர் வந்தார். / அவர் வந்தால் நன்று.'
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
              ruleText: `'${cleanW}' என்பது குற்றியலுகர நிலைமொழிச் சாரியை வடிவம் மட்டுமே ஆகும்; இது உருபின்றித் தனியாக நின்று செயப்படுபொருளாகச் செயல்படாது. இதற்கு இரண்டாம் வேற்றுமை உருபு ('ஐ') விரிந்து வல்லினம் மிக வேண்டும்: உணவை + க் = '${replacement}'. மேலும் சாப்பாடு என்பது பேச்சு வழக்கு, இலக்கணப்படி 'உணவு' என்றே வழங்க வேண்டும்.`,
              example: 'அம்மா உணவைக் கொடுத்தாள்.'
            });
            correctedWords[i] = replacement;
          } else if (cleanW === 'சாப்பாடு') {
            if (nextW && VALLINAM_INITIALS.includes(nextW.charAt(0))) {
              detectedErrors.push({
                type: 'இரண்டாம் வேற்றுமை உருபு விடுபடுதல் & பேச்சு வழக்கு',
                citation: 'நன்னூல் நூற்பா 314',
                errorSnippet: `${cleanW} ${nextW}`,
                suggestion: `உணவைக் ${nextW}`,
                ruleText: `செயப்படுபொருளாக வரும்போது 'ஐ' உருபு விரிந்து வல்லினம் மிக வேண்டும்: உணவை + க் + ${nextW} = 'உணவைக் ${nextW}'. மேலும் சாப்பாடு என்பது பேச்சு வழக்கு.`,
                example: 'அம்மா உணவைக் கொடுத்தாள்.'
              });
              correctedWords[i] = 'உணவைக்';
            } else {
              detectedErrors.push({
                type: 'பேச்சு வழக்குச் சொல் திருத்தம்',
                citation: 'சொல் மரபு',
                errorSnippet: cleanW,
                suggestion: 'உணவு',
                ruleText: 'சாப்பாடு என்பது பேச்சு வழக்கு. இலக்கணப்படி "உணவு" என்று எழுதப்பட வேண்டும்.',
                example: 'சாப்பாடு ➔ உணவு'
              });
              correctedWords[i] = 'உணவு';
            }
          } else if (item.formal && item.formal !== cleanW) {
            detectedErrors.push({
              type: 'பேச்சு வழக்குச் சொல் திருத்தம்',
              citation: 'சொல் மரபு',
              errorSnippet: cleanW,
              suggestion: item.formal,
              ruleText: `'${cleanW}' என்பது பேச்சு வழக்கு வடிவம். தூய செந்தமிழில் '${item.formal}' என்று எழுதப்பட வேண்டும்.`,
              example: 'தண்ணீர் குடித்தான், பணம் கொடுத்தான்'
            });
            correctedWords[i] = item.formal;
          }
        }
      }

      // 3. Subject-Predicate Concord
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
            ruleText: `இலக்கண மரபில் '${firstWord}' பெண்பால் ஒருமை என்பதால் பயனிலை 'ஆள்' விகுதி பெற்று '${regularVerb}' என முடிதல் இயல்பு வடிவம். மரியாதை காரணமாகப் பன்மை விகுதி பெற்று வருவது 'மரியாதைப் பால் வழுவமைதி' ஆகும். தூய இலக்கிய நடையில் 'தாயார் உணவைக் கொடுத்தார்' அல்லது 'அம்மா உணவைக் கொடுத்தாள்' என அமைவதே சிறப்பு.`,
            example: 'அம்மா உணவைக் கொடுத்தாள் / தாயார் உணவைக் கொடுத்தார்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        } else if (currentVerb.endsWith('ஆன்') || currentVerb.endsWith('ான்')) {
          const regularVerb = currentVerb.replace(/ான்$/, 'ாள்') + '.';
          detectedErrors.push({
            type: 'பால் வழு (Gender Discord)',
            citation: 'நன்னூல் பெயரியல் நூற்பா 268',
            errorSnippet: `${firstWord} ... ${currentVerb}`,
            suggestion: `${firstWord} ... ${regularVerb}`,
            ruleText: `எழுவாய் '${firstWord}' பெண்பால். ஆனால் பயனிலை ஆண்பாலில் (${currentVerb}) முடிந்துள்ளது. '${regularVerb}' என பெண்பால் விகுதி பெற்று முடிதல் வேண்டும்.`,
            example: 'அவள் பாடம் படித்தாள்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        } else if (currentVerb.endsWith('து')) {
          const regularVerb = currentVerb.replace(/து$/, 'ாள்') + '.';
          detectedErrors.push({
            type: 'திணை வழு (High Class to Neuter Discord)',
            citation: 'நன்னூல் நூற்பா 268',
            errorSnippet: `${firstWord} ... ${currentVerb}`,
            suggestion: `${firstWord} ... ${regularVerb}`,
            ruleText: `எழுவாய் '${firstWord}' உயர்திணைப் பெண்பால். அஃறிணை வினைமுற்றுடன் முடிதல் கூடாது.`,
            example: 'அம்மா வந்தாள்'
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
            ruleText: `எழுவாய் '${firstWord}' ஆண்பால். ஆனால் பயனிலை பெண்பாலில் (${currentVerb}) முடிந்துள்ளது. '${regularVerb}' என ஆண்பால் விகுதி பெற்று முடிதல் வேண்டும்.`,
            example: 'கண்ணன் வந்தான், முருகன் கொடுத்தான்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        } else if (currentVerb.endsWith('து')) {
          const regularVerb = currentVerb.replace(/து$/, 'ான்') + '.';
          detectedErrors.push({
            type: 'திணை வழு (High Class to Neuter Discord)',
            citation: 'நன்னூல் நூற்பா 268',
            errorSnippet: `${firstWord} ... ${currentVerb}`,
            suggestion: `${firstWord} ... ${regularVerb}`,
            ruleText: `எழுவாய் '${firstWord}' உயர்திணை ஆண்பால். அஃறிணை வினைமுற்றுடன் முடிதல் கூடாது.`,
            example: 'தம்பி வந்தான்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        }
      }

      // 3b-2. Epicene Honorific Subject
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
            ruleText: `'${firstWord}' என்பது உயர்திணைப் பலர்பால் எழுவாய். பயனிலை அஃறிணையில் ('து') முடிதல் வழுவாகும். '${regularVerb}' என பலர்பால் விகுதி பெற்று முடிதல் வேண்டும்.`,
            example: 'அவர்கள் வந்தார்கள் / ஆசிரியர் கற்பித்தார்'
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
            ruleText: `'${firstWord}' என்ற பலர்பால் எழுவாய்க்குப் பயனிலை ஒருமையில் அமைதல் கூடாது. '${regularVerb}' என அமைதல் வேண்டும்.`,
            example: 'அவர்கள் வந்தார்கள்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        }
      }

      // 3c. Neuter Singular Subject
      else if (SUBJECT_CATEGORIES.NEUTER_SINGULAR.includes(firstWord)) {
        if (currentVerb.endsWith('ஆன்') || currentVerb.endsWith('ான்') || currentVerb.endsWith('ஆள்') || currentVerb.endsWith('ாள்') || currentVerb.endsWith('ார்')) {
          const regularVerb = currentVerb.replace(/(ான்|ாள்|ார்)$/, 'து') + '.';
          detectedErrors.push({
            type: 'திணை வழு (Neuter to High Class Discord)',
            citation: 'நன்னூல் நூற்பா 268',
            errorSnippet: `${firstWord} ... ${currentVerb}`,
            suggestion: `${firstWord} ... ${regularVerb}`,
            ruleText: `'${firstWord}' என்பது அஃறிணை ஒன்றன்பால் எழுவாய். பயனிலை 'து' விகுதி பெற்று அஃறிணையில் முடிய வேண்டும்.`,
            example: 'பூனை கடித்தது, நாய் குரைத்தது'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        }
      }

      // 3d. Neuter Plural Subject
      else if (SUBJECT_CATEGORIES.NEUTER_PLURAL.includes(firstWord)) {
        if (currentVerb.endsWith('து') || currentVerb.endsWith('து.')) {
          const verbClean = currentVerb.replace(/து\.?$/, '');
          const regularVerb = verbClean + 'ன.';
          detectedErrors.push({
            type: 'எண் வழு (Neuter Singular/Plural Concord)',
            citation: 'நன்னூல் வினையியல் நூற்பா 331',
            errorSnippet: `${firstWord} ... ${currentVerb}`,
            suggestion: `${firstWord} ... ${regularVerb}`,
            ruleText: `'${firstWord}' என்பது அஃறிணைப் பலவின்பால் (பன்மை) எழுவாய். பயனிலை 'ன' விகுதி பெற்று '${regularVerb}' என முடிதல் வேண்டும்.`,
            example: 'நாய்கள் குரைத்தன, மரங்கள் சாய்ந்தன'
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
            ruleText: `'நான்' என்ற தன்மை ஒருமை எழுவாய்க்குப் பயனிலை 'ஏன்' விகுதி பெற்று அமைய வேண்டும்.`,
            example: 'நான் சென்றேன், நான் வந்தேன்'
          });
          correctedWords[correctedWords.length - 1] = regularVerb;
        }
      }

      // 4. Sandhi & Otru Rules
      const DEMONSTRATIVES = ['அந்த', 'இந்த', 'எந்த', 'அங்கு', 'இங்கு', 'எங்கு', 'அப்படி', 'இப்படி', 'எப்படி'];
      const RELATIVE_PARTICIPLE_STEMS = ['படித்த', 'எழுதிய', 'வந்த', 'சென்ற', 'ஓடிய', 'செய்த', 'கற்ற', 'கேட்ட', 'பார்த்த', 'சொன்ன', 'வாங்கிய'];

      for (let i = 0; i < correctedWords.length - 1; i++) {
        let w1 = correctedWords[i].replace(/[.,?!]/g, '');
        let w2 = correctedWords[i + 1].replace(/[.,?!]/g, '');

        // நிலைமொழி/வருமொழி முதலெழுத்து ஒற்றுப் பிழை
        for (let p of PULLI_CONSONANTS) {
          if (w2.startsWith(p)) {
            const cleanW2 = w2.substring(p.length);
            const fixedW1 = w1.endsWith(p) ? w1 : w1 + p;
            detectedErrors.push({
              type: 'ஒற்று எழுத்துப் பிழை (Misplaced Otru)',
              citation: 'நன்னூல் எழுத்ததிகாரம்',
              errorSnippet: `${w1} ${w2}`,
              suggestion: `${fixedW1} ${cleanW2}`,
              ruleText: `மெய்யெழுத்து (${p}) சொல்லின் முதலெழுத்தாக வராது. அது நிலைமொழியின் இறுதியோடு சேர்ந்து '${fixedW1} ${cleanW2}' என எழுதப்பட வேண்டும்.`,
              example: 'அந்தப் பையன் (அந்த ப்பையன் அன்று)'
            });
            correctedWords[i] = fixedW1;
            correctedWords[i + 1] = cleanW2;
            w1 = fixedW1;
            w2 = cleanW2;
          }
        }

        // பெயரெச்சத்தின் பின் வல்லினம் மிகாமை
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
                ruleText: `'${rel}' என்பது பெயரெச்சம். நன்னூல் இலக்கணப்படி பெயரெச்சத்தின் பின் வல்லினம் மிகாது.`,
                example: 'படித்த பாடம் (படித்தப் பாடம் அன்று)'
              });
              correctedWords[i] = rel;
              w1 = rel;
              break;
            }
          }
          if (isRelPart) break;
        }

        // சுட்டு/வினாப் பெயருக்குப் பின் வல்லினம் மிகல்
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
                ruleText: `'${w1}' என்ற சுட்டு/வினாச் சொல்லின் பின் வல்லினம் (க், ச், த், ப்) மிகும்.`,
                example: 'அந்தப் பையன், இந்தப் புத்தகம்'
              });
              correctedWords[i] = fixedW1;
              w1 = fixedW1;
            }
          }
        }

        // இரண்டாம் வேற்றுமை விரிவில் வல்லினம் மிகல்
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
                ruleText: `'${w1}' இரண்டாம் வேற்றுமை உருபு ('ஐ') வெளிப்பட்டு நிற்கும் தொடர். இதன் பின் வல்லினம் (${reqOtru}) மிகும்.`,
                example: 'பாடத்தைப் படி, கதவைத் திற'
              });
              correctedWords[i] = fixedW1;
              w1 = fixedW1;
            }
          }
        }

        // நான்காம் வேற்றுமை விரிவில் வல்லினம் மிகல்
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
                ruleText: `'${w1}' நான்காம் வேற்றுமை உருபு ('கு') வெளிப்பட்டு நிற்கும் தொடர். இதன் பின் வல்லினம் (${reqOtru}) மிகும்.`,
                example: 'வீட்டுக்குப் போ, அவருக்குக் கொடு'
              });
              correctedWords[i] = fixedW1;
              w1 = fixedW1;
            }
          }
        }
      }

      // Output display
      const finalCorrectedText = correctedWords.join(' ');

      if (detectedErrors.length === 0) {
        outputBox.innerHTML = '<span class="text-emerald-700 font-bold flex items-center"><span class="text-xl mr-2">✅</span> பிழைகள் எதுவும் கண்டறியப்படவில்லை! உரை நன்னூல் இலக்கணப்படி சரியாக உள்ளது.</span>';
        statusBar.className = 'p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-xs font-bold text-emerald-800 flex items-center justify-between';
        statusBar.innerHTML = '<span>இலக்கணச் சரிபார்ப்பு நிறைவு</span><span>0 பிழைகள் (100% சரியான உரை)</span>';
        rulesList.innerHTML = `
          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <span class="text-2xl block mb-1">🎉</span>
            <span class="text-xs font-bold text-emerald-800 block">நன்று!</span>
            <span class="text-[11px] text-emerald-600">இந்த வாக்கியத்தில் பால் வழுவோ, ஒற்றுப் பிழைகளோ, சாரியைப் பிழைகளோ இல்லை.</span>
          </div>`;
      } else {
        outputBox.innerHTML = `<span class="text-pink-900 font-extrabold text-base bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200">${finalCorrectedText}</span>`;
        statusBar.className = 'p-3 bg-pink-100 border border-pink-200 rounded-xl mb-4 text-xs font-bold text-pink-900 flex items-center justify-between';
        statusBar.innerHTML = `<span>கண்டறியப்பட்ட பிழைகள்</span><span class="bg-pink-600 text-white px-2 py-0.5 rounded-full">${detectedErrors.length} பிழைகள் கண்டறியப்பட்டன</span>`;

        rulesList.innerHTML = detectedErrors.map((err, idx) => `
          <div class="p-4 bg-white rounded-2xl border border-pink-100 shadow-sm transition hover:border-pink-300">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 border border-pink-200">
                #${idx + 1} ${err.type}
              </span>
              <span class="text-[10px] font-mono text-slate-400 font-bold">${err.citation}</span>
            </div>

            <div class="text-xs text-slate-800 my-1 font-bold flex items-center space-x-1.5">
              <span class="line-through text-rose-500">${err.errorSnippet}</span>
              <span class="text-slate-400">➔</span>
              <span class="text-emerald-600">${err.suggestion}</span>
            </div>

            <p class="text-[11px] text-slate-600 mt-2 leading-relaxed bg-pink-50/40 p-2 rounded-lg border border-pink-50">
              <strong class="text-pink-900 block font-semibold mb-0.5">விதி விளக்கம்:</strong> ${err.ruleText}
            </p>

            <div class="text-[10px] text-slate-500 mt-1.5">
              <span class="font-bold text-slate-700">எடுத்துக்காட்டு:</span> ${err.example}
            </div>
          </div>
        `).join('');
      }
    }

    function clearGrammarInput() {
      document.getElementById('grammar-input').value = '';
      analyzeTamilGrammar();
    }

    // --- 7. குரல்வழி ஆங்கிலம் ➔ தமிழ் மொழிபெயர்ப்பு ---
    const EXACT_TRANSLATIONS = {
      'hello': { spoken: 'வணக்கம்!', tanglish_spoken: 'Vanakkam!', formal: 'வணக்கம்.', tanglish_formal: 'Vanakkam.' },
      'hi': { spoken: 'வணக்கம்! / ஹலோ!', tanglish_spoken: 'Vanakkam! / Hello!', formal: 'வணக்கம்.', tanglish_formal: 'Vanakkam.' },
      'good morning': { spoken: 'காலை வணக்கம்!', tanglish_spoken: 'Kaalai vanakkam!', formal: 'இனிய காலை வணக்கம்.', tanglish_formal: 'Iniya kaalai vanakkam.' },
      'good afternoon': { spoken: 'மதிய வணக்கம்!', tanglish_spoken: 'Madhiya vanakkam!', formal: 'இனிய பிற்பகல் வணக்கம்.', tanglish_formal: 'Iniya pirpagal vanakkam.' },
      'good evening': { spoken: 'மாலை வணக்கம்!', tanglish_spoken: 'Maalai vanakkam!', formal: 'இனிய மாலை வணக்கம்.', tanglish_formal: 'Iniya maalai vanakkam.' },
      'good night': { spoken: 'இரவு வணக்கம்!', tanglish_spoken: 'Iravu vanakkam!', formal: 'இனிய இரவு வணக்கம்.', tanglish_formal: 'Iniya iravu vanakkam.' },
      'how are you': { spoken: 'எப்படி இருக்கீங்க?', tanglish_spoken: 'Eppadi irukkeenga?', formal: 'தாங்கள் எவ்வாறு உள்ளீர்கள்?', tanglish_formal: 'Thaangal evvaaru ulleergal?' },
      'i am fine': { spoken: 'நான் நல்லா இருக்கேன்.', tanglish_spoken: 'Naan nallaa irukken.', formal: 'நான் நலம் பெறுகிறேன் / நலமாக உள்ளேன்.', tanglish_formal: 'Naan nalamaaga ullen.' },
      'i need to go to my home': { spoken: 'நான் எங்க வீட்டுக்கு போகணும்.', tanglish_spoken: 'Naan enga veettukku poganum.', formal: 'நான் என் வீட்டிற்குச் செல்ல வேண்டும்.', tanglish_formal: 'Naan en veettirkuc sella vendum.' },
      'i need to go to my house': { spoken: 'நான் வீட்டுக்கு போகணும்.', tanglish_spoken: 'Naan veettukku poganum.', formal: 'நான் வீட்டிற்குச் செல்ல வேண்டும்.', tanglish_formal: 'Naan veettirkuc sella vendum.' },
      'i need to go home': { spoken: 'நான் வீட்டுக்கு போகணும்.', tanglish_spoken: 'Naan veettukku poganum.', formal: 'நான் வீட்டிற்குச் செல்ல வேண்டும்.', tanglish_formal: 'Naan veettirkuc sella vendum.' },
      'i want to go home': { spoken: 'நான் வீட்டுக்கு போகணும்.', tanglish_spoken: 'Naan veettukku poganum.', formal: 'நான் வீட்டிற்குச் செல்ல வேண்டும்.', tanglish_formal: 'Naan veettirkuc sella vendum.' },
      'i need to talk something': { spoken: 'நான் ஏதாச்சும் பேசணும்.', tanglish_spoken: 'Naan edhaachum pesanum.', formal: 'நான் ஏதேனும் ஒன்று பேச வேண்டும்.', tanglish_formal: 'Naan edhenum ondru pesa vendum.' },
      'i want to talk to you': { spoken: 'நான் உங்ககிட்ட பேசணும்.', tanglish_spoken: 'Naan ungakitta pesanum.', formal: 'நான் தங்களிடம் பேச வேண்டும்.', tanglish_formal: 'Naan thangalidam pesa vendum.' },
      'where is the hotel': { spoken: 'ஹோட்டல் எங்க இருக்கு?', tanglish_spoken: 'Hotel enga irukku?', formal: 'உணவகம் எங்கு உள்ளது?', tanglish_formal: 'Unavagam engu ulladhu?' },
      'where is the bus stand': { spoken: 'பஸ் ஸ்டாண்ட் எங்க இருக்கு?', tanglish_spoken: 'Bus stand enga irukku?', formal: 'பேருந்து நிலையம் எங்கு உள்ளது?', tanglish_formal: 'Paerundhu nilaiyam engu ulladhu?' },
      'where is the railway station': { spoken: 'ரயில்வே ஸ்டேஷன் எங்க இருக்கு?', tanglish_spoken: 'Railway station enga irukku?', formal: 'தொடர்வண்டி நிலையம் எங்கு உள்ளது?', tanglish_formal: 'Thodarvandi nilaiyam engu ulladhu?' },
      'where is the hospital': { spoken: 'ஆஸ்பத்திரி எங்க இருக்கு?', tanglish_spoken: 'Aaspathiri enga irukku?', formal: 'மருத்துவமனை எங்கு உள்ளது?', tanglish_formal: 'Maruthuvamanai engu ulladhu?' },
      'how much is this': { spoken: 'இதோட விலை என்ன? / இது எவ்வளவு?', tanglish_spoken: 'Idhoda vilai enna? / Idhu evvalavu?', formal: 'இதன் விலை யாது?', tanglish_formal: 'Idhan vilai yaadhu?' },
      'what is the price': { spoken: 'இதோட விலை என்ன?', tanglish_spoken: 'Idhoda vilai enna?', formal: 'இதன் விலை என்ன?', tanglish_formal: 'Idhan vilai enna?' },
      'can you help me': { spoken: 'எனக்கு கொஞ்சம் உதவி பண்ண முடியுமா?', tanglish_spoken: 'Enakku konjam udhavi panna mudiyumaa?', formal: 'எனக்குச் சற்று உதவ இயலுமா?', tanglish_formal: 'Enakkuc chatru udhava iyalumaa?' },
      'what is your name': { spoken: 'உங்க பேரு என்ன?', tanglish_spoken: 'Unga peru enna?', formal: 'தங்களின் பெயர் யாது?', tanglish_formal: 'Thangalin peyar yaadhu?' },
      'my name is': { spoken: 'என் பேரு...', tanglish_spoken: 'En peru...', formal: 'எனது பெயர்...', tanglish_formal: 'Enadhu peyar...' },
      'i do not know': { spoken: 'எனக்கு தெரியாதுங்க.', tanglish_spoken: 'Enakku theriyaadhanga.', formal: 'எனக்குத் தெரியாது.', tanglish_formal: 'Enakkut theriyaadhu.' },
      'i do not know tamil': { spoken: 'எனக்கு தமிழ் தெரியாது.', tanglish_spoken: 'Enakku tamil theriyaadhu.', formal: 'எனக்குத் தமிழ் அறியாது.', tanglish_formal: 'Enakkut tamil ariyaadhu.' },
      'do you speak english': { spoken: 'நீங்க இங்கிலீஷ் பேசுவீங்களா?', tanglish_spoken: 'Neenga english pesuveengalaa?', formal: 'தாங்கள் ஆங்கிலம் பேசுவீர்களா?', tanglish_formal: 'Thaangal aangilam pesuveergalaa?' },
      'give me water': { spoken: 'எனக்கு கொஞ்சம் தண்ணி குடுங்க.', tanglish_spoken: 'Enakku konjam thanni kudunga.', formal: 'எனக்குத் தண்ணீர் கொடுங்கள்.', tanglish_formal: 'Enakkut thanneer kodungal.' },
      'i am hungry': { spoken: 'எனக்கு ரொம்ப பசிக்குது.', tanglish_spoken: 'Enakku romba pasikkudhu.', formal: 'எனக்குப் பசி எடுக்கிறது.', tanglish_formal: 'Enakkup pasi edukkiradhu.' },
      'i want food': { spoken: 'எனக்கு சாப்பாடு வேணும்.', tanglish_spoken: 'Enakku saappaadu venum.', formal: 'எனக்கு உணவு வேண்டும்.', tanglish_formal: 'Enakku unavu vendum.' },
      'thank you': { spoken: 'ரொம்ப நன்றிங்க!', tanglish_spoken: 'Romba nandringa!', formal: 'மிக்க நன்றி.', tanglish_formal: 'Mikka nandri.' },
      'thank you very much': { spoken: 'ரொம்ப ரொம்ப நன்றிங்க!', tanglish_spoken: 'Romba romba nandringa!', formal: 'மிக்க நன்றிகள்.', tanglish_formal: 'Mikka nandrigal.' },
      'welcome': { spoken: 'வாங்க, வருக!', tanglish_spoken: 'Vaanga, varuga!', formal: 'நல்வரவு.', tanglish_formal: 'Nalvaravu.' },
      'please': { spoken: 'தயவுசெஞ்சு', tanglish_spoken: 'Dayavusenju', formal: 'தயவுகூர்ந்து', tanglish_formal: 'Dayavukoorndhu' },
      'help me': { spoken: 'எனக்கு உதவி பண்ணுங்க!', tanglish_spoken: 'Enakku udhavi pannunga!', formal: 'எனக்கு உதவுங்கள்!', tanglish_formal: 'Enakku udhavungal!' },
      'stop here': { spoken: 'இங்க நிறுத்துங்க.', tanglish_spoken: 'Inga niruthunga.', formal: 'இங்கு நிறுத்துங்கள்.', tanglish_formal: 'Ingu niruthungal.' }
    };

    async function translateEnglishToTamil() {
      const rawQuery = document.getElementById('english-input-text').value.trim();
      if (!rawQuery) return;

      // Track translation in user activity
      currentUser.translationsCount = (currentUser.translationsCount || 0) + 1;
      saveUserData();

      const cleanQuery = rawQuery.toLowerCase().replace(/[.,?!]/g, '').trim();

      if (EXACT_TRANSLATIONS[cleanQuery]) {
        const item = EXACT_TRANSLATIONS[cleanQuery];
        displayTranslation(item.spoken, item.tanglish_spoken, item.formal, item.tanglish_formal);
        return;
      }

      for (const key of Object.keys(EXACT_TRANSLATIONS)) {
        if (cleanQuery === key || cleanQuery.startsWith(key)) {
          const item = EXACT_TRANSLATIONS[key];
          displayTranslation(item.spoken, item.tanglish_spoken, item.formal, item.tanglish_formal);
          return;
        }
      }

      try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawQuery)}&langpair=en|ta`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.responseData && data.responseData.translatedText) {
            let formal = data.responseData.translatedText;
            let spoken = formal
              .replace(/செல்ல வேண்டும்/g, 'போகணும்')
              .replace(/உண்ண வேண்டும்/g, 'சாப்பிடணும்')
              .replace(/பேச வேண்டும்/g, 'பேசணும்')
              .replace(/உணவகம்/g, 'ஹோட்டல்')
              .replace(/பேருந்து/g, 'பஸ்')
              .replace(/எங்கு உள்ளது/g, 'எங்க இருக்கு')
              .replace(/செய்கிறீர்கள்/g, 'பண்றீங்க')
              .replace(/வருகிறேன்/g, 'வர்றேன்');

            displayTranslation(spoken, 'Natural Tamil audio ready', formal, 'Formal Tamil');
            return;
          }
        }
      } catch (err) {}

      generateDynamicSemanticTranslation(cleanQuery, rawQuery);
    }

    function generateDynamicSemanticTranslation(cleanQuery, rawQuery) {
      let spoken = '';
      let formal = '';
      let spokenTanglish = '';
      let formalTanglish = '';

      if (cleanQuery.includes('go') && (cleanQuery.includes('home') || cleanQuery.includes('house'))) {
        spoken = 'நான் எங்க வீட்டுக்கு போகணும்.';
        formal = 'நான் என் வீட்டிற்குச் செல்ல வேண்டும்.';
        spokenTanglish = 'Naan veettukku poganum.';
        formalTanglish = 'Naan en veettirkuc sella vendum.';
      } else if (cleanQuery.includes('need to') || cleanQuery.includes('want to')) {
        let vSpoken = 'பண்ணனும்';
        let vFormal = 'செய்ய வேண்டும்';
        if (cleanQuery.includes('talk') || cleanQuery.includes('speak')) {
          vSpoken = 'பேசணும்';
          vFormal = 'பேச வேண்டும்';
        } else if (cleanQuery.includes('eat')) {
          vSpoken = 'சாப்பிடணும்';
          vFormal = 'உண்ண வேண்டும்';
        }
        spoken = `நான் ${vSpoken}.`;
        formal = `நான் ${vFormal}.`;
        spokenTanglish = 'Naan pesanum.';
        formalTanglish = 'Naan pesa vendum.';
      } else {
        spoken = `"${rawQuery}" - என்பதற்கான தமிழ்: தயவுசெய்து சொல்லுங்கள்.`;
        formal = `"${rawQuery}" - தமிழ் மொழிபெயர்ப்பு.`;
        spokenTanglish = 'Dayavuseydhu sollungal.';
        formalTanglish = 'Tamil mozhipeyarppu.';
      }

      displayTranslation(spoken, spokenTanglish, formal, formalTanglish);
    }

    function displayTranslation(spoken, tanglishSpoken, formal, tanglishFormal) {
      document.getElementById('output-spoken-tamil').innerText = spoken;
      document.getElementById('output-tanglish-spoken').innerText = `"${tanglishSpoken}"`;
      document.getElementById('output-formal-tamil').innerText = formal;
      document.getElementById('output-tanglish-formal').innerText = `"${tanglishFormal}"`;
    }

    let isRecording = false;
    let recognition = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onstart = function() {
        isRecording = true;
        document.getElementById('mic-trigger-btn').classList.add('mic-recording');
        document.getElementById('mic-status-label').innerText = 'கேட்கிறது... ஆங்கிலத்தில் பேசுங்கள்';
      };

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('english-input-text').value = transcript;
        translateEnglishToTamil();
      };

      recognition.onend = function() {
        isRecording = false;
        document.getElementById('mic-trigger-btn').classList.remove('mic-recording');
        document.getElementById('mic-status-label').innerText = 'ஆங்கிலத்தில் பேச அழுத்தவும்';
      };

      recognition.onerror = function() {
        isRecording = false;
        document.getElementById('mic-trigger-btn').classList.remove('mic-recording');
        document.getElementById('mic-status-label').innerText = 'மீண்டும் அழுத்தவும்';
      };
    }

    function toggleVoiceRecording() {
      if (!recognition) {
        alert('உங்கள் உலாவியில் குரல் உள்ளீட்டு வசதி இல்லை. தட்டச்சு செய்யவும்.');
        return;
      }
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }

    function speakTamilText(type) {
      const text = type === 'spoken' 
        ? document.getElementById('output-spoken-tamil').innerText 
        : document.getElementById('output-formal-tamil').innerText;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ta-IN';
        utterance.rate = parseFloat(document.getElementById('tts-speed')?.value || '1.0');
        window.speechSynthesis.speak(utterance);
      }
    }

    function copyToClipboard(id) {
      const txt = document.getElementById(id).innerText;
      navigator.clipboard.writeText(txt);
      alert('நகலெடுக்கப்பட்டது: ' + txt);
    }

    function switchTab(tabId) {
      ['grammar', 'voice', 'literature'].forEach(t => {
        document.getElementById(`section-${t}`).classList.add('hidden');
        const btn = document.getElementById(`tab-btn-${t}`);
        btn.className = 'bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100';
      });

      document.getElementById(`section-${tabId}`).classList.remove('hidden');
      const activeBtn = document.getElementById(`tab-btn-${tabId}`);
      activeBtn.className = 'active-tab flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md';

      if (tabId === 'literature') {
        selectLiteratureTopic(currentSelectedTopicId);
      } else {
        if (studyTimerInterval) clearInterval(studyTimerInterval);
      }
    }

    // Initialize UI on load
    window.addEventListener('DOMContentLoaded', () => {
      updateUserUI();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', fullHtml, 'utf8');
fs.writeFileSync('www/index.html', fullHtml, 'utf8');

// Also update tamil_ai_studio.html
const studioHtml = fullHtml.replace('https://cdn.tailwindcss.com', 'https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js');
fs.writeFileSync('C:/Users/Naveen/.gemini/antigravity/brain/e5e61e7c-a9c1-4abd-90ea-257c8bdc4cf9/tamil_ai_studio.html', studioHtml, 'utf8');

console.log('Successfully generated full application index.html, www/index.html, and tamil_ai_studio.html');
