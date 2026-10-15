const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Firebase scripts to <head>
const firebaseScripts = `  <!-- Firebase Compat Libraries -->
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
`;
html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>\n' + firebaseScripts);

// 2. Add User Profile Button to Header
const userHeaderBtn = `
      <div class="flex items-center space-x-2">
        <button onclick="openUserModal()" class="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition shadow-sm">
          <span id="user-avatar-badge" class="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">ப</span>
          <span id="user-display-name">விருந்தினர் பயனர்</span>
        </button>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span class="w-2 h-2 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          இலக்கண ஆய்வு தயார்
        </span>
      </div>`;

html = html.replace(/<div class="flex items-center space-x-2">\s*<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">[\s\S]*?<\/div>/, userHeaderBtn);

// 3. Update Nav Buttons to 3 Tabs
const threeTabsNav = `    <!-- 3 முதன்மைப் பிரிவுகளுக்கான வழிசெலுத்தல் பொத்தான்கள் -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <button onclick="switchTab('grammar')" id="tab-btn-grammar" class="active-tab flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md">
        <span>✍️</span>
        <span>இலக்கணம் & ஒற்றுப் பிழை திருத்தி</span>
      </button>

      <button onclick="switchTab('voice')" id="tab-btn-voice" class="bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100">
        <span>🎤</span>
        <span>குரல்வழி ஆங்கிலம் ➔ தமிழ்</span>
      </button>

      <button onclick="switchTab('literature')" id="tab-btn-literature" class="bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100">
        <span>📜</span>
        <span>தமிழ் இலக்கியக் களம் & வினாடி-வினா</span>
      </button>
    </div>`;

html = html.replace(/<!-- 2 முதன்மைப் பிரிவுகளுக்கான வழிசெலுத்தல் பொத்தான்கள் -->[\s\S]*?<\/div>\s*<\/div>/, threeTabsNav);

// 4. Literature Section HTML to insert after </section> of section-voice
const literatureSection = `

    <!-- ========================================================= -->
    <!-- பிரிவு 3: தமிழ் இலக்கியக் களம் & வினாடி-வினா (LITERATURE)      -->
    <!-- ========================================================= -->
    <section id="section-literature" class="space-y-6 hidden">

      <!-- வழிகாட்டி பலகை (Bilingual Instruction Panel) -->
      <div class="bg-gradient-to-r from-pink-50 via-rose-50 to-white rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-sm">
        <div class="flex items-start space-x-3">
          <span class="text-2xl mt-0.5">📜</span>
          <div class="space-y-1.5 flex-1">
            <h3 class="text-sm font-extrabold text-pink-900 flex items-center justify-between">
              <span>தமிழ் இலக்கியப் படிப்பு & வினாடி-வினா வழிகாட்டி / Literature & Quiz Guide</span>
              <span class="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">பிரிவு 3</span>
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed">
              <strong class="text-pink-800">தமிழ்:</strong> சங்க இலக்கியம், நீதி நூல்கள், காப்பியங்கள், பக்தி இலக்கியம், இலக்கண மரபு, நவீன மறுமலர்ச்சி ஆகிய தலைப்புகளில் ஏதேனும் ஒன்றைத் தேர்ந்தெடுத்துப் பயிலலாம். 
              <strong>கட்டாய விதி: வினாடி-வினாவில் பங்கேற்க ஒவ்வொரு தலைப்பிலும் குறைந்தபட்சம் 5 நிமிடங்கள் (300 நொடிகள்) நேரம் செலவழித்துப் படிக்க வேண்டும்.</strong> 
              5 நிமிடங்கள் நிறைவடைந்தவுடன் வினாடி-வினா பூட்டு தானாகத் திறக்கும். உங்கள் படிப்பு நேரம் மற்றும் வினாடி-வினா மதிப்பெண்கள் பயனர் கணக்கில் தானாகச் சேமிக்கப்படும்.
            </p>
            <p class="text-xs text-slate-600 leading-relaxed border-t border-pink-100 pt-1.5 mt-1.5 font-sans">
              <strong class="text-pink-700 font-sans">English:</strong> Study 6 core Tamil literature modules. <strong>Strict Requirement: You must spend at least 5 minutes (300 seconds) actively reading each topic before its quiz unlocks.</strong> Progress and quiz scores are saved to your profile and Firebase cloud database.
            </p>
          </div>
        </div>
      </div>

      <!-- இலக்கிய தலைப்புகள் பட்டியல் அட்டை -->
      <div>
        <h4 class="text-sm font-extrabold text-slate-800 mb-3 flex items-center space-x-2">
          <span>📚 இலக்கியப் பாடத் தலைப்புகள் (6 பிரிவுகள்)</span>
        </h4>
        <div id="lit-topic-cards-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <!-- Dynamically populated by app_literature.js -->
        </div>
      </div>

      <!-- தேர்ந்தெடுக்கப்பட்ட தலைப்பின் விரிவான படிப்புப் பகுதி -->
      <div class="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
        
        <!-- தலைப்பு & காலக் குறிப்பு -->
        <div class="p-6 pink-gradient-subtle rounded-2xl border border-pink-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span id="lit-topic-period" class="inline-block text-xs font-bold text-pink-700 bg-pink-100 px-3 py-1 rounded-full mb-2">
              காலம்
            </span>
            <h3 id="lit-topic-title" class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              தலைப்பு
            </h3>
            <p id="lit-topic-summary" class="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              சுருக்கம்
            </p>
          </div>

          <!-- 5 நிமிட வாசிப்பு டைமர் அட்டை -->
          <div class="bg-white p-4 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center justify-center min-w-[240px]">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              ⏳ வாசிப்பு நேரம் (குறைந்தது 5 நிமி)
            </span>
            <span id="timer-time-display" class="text-2xl font-black text-pink-700 font-mono my-0.5">
              0:00 / 05:00
            </span>
            
            <!-- முன்னேற்றப் பட்டை -->
            <div class="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden my-2">
              <div id="timer-progress-bar" class="pink-gradient h-full w-0 transition-all duration-300"></div>
            </div>

            <div id="timer-lock-status" class="text-center text-xs mb-2">
              <!-- Dynamically set -->
            </div>

            <!-- விரைவு சோதனை பொத்தான் -->
            <button onclick="fastForward5Min()" class="text-[10px] text-pink-600 hover:text-pink-800 font-bold underline mb-2 transition">
              ⚡ [சோதனை முறை: 5 நிமிடங்களை நிறைவு செய்]
            </button>

            <!-- வினாடி-வினா தொடங்கும் பொத்தான் -->
            <button id="start-quiz-btn" onclick="openQuizModal()" disabled class="w-full bg-slate-200 text-slate-400 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 cursor-not-allowed transition">
              <span>🔒</span>
              <span>வினாடி-வினா பூட்டப்பட்டுள்ளது</span>
            </button>
          </div>
        </div>

        <!-- தலைப்பின் விரிவான இலக்கிய உள்ளடக்கம் -->
        <div id="lit-topic-content" class="pt-2 leading-relaxed text-slate-700">
          <!-- Content dynamically loaded from literature_data.js -->
        </div>

      </div>

    </section>
`;

html = html.replace('</section>\n\n  </main>', '</section>' + literatureSection + '\n  </main>');

// 5. Add Modals: Quiz Modal & User Profile Modal
const modalsHtml = `
  <!-- ========================================================= -->
  <!-- வினாடி-வினா மாதிரிச் சாளரம் (INTERACTIVE QUIZ MODAL)         -->
  <!-- ========================================================= -->
  <div id="quiz-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-pink-100 flex flex-col max-h-[90vh] overflow-y-auto">
      
      <div class="flex items-center justify-between pb-4 border-b border-pink-100 mb-4">
        <div>
          <span id="quiz-topic-title" class="text-xs font-bold text-pink-600 block mb-0.5">தலைப்பு</span>
          <h4 id="quiz-progress-text" class="text-lg font-extrabold text-slate-800">வினா 1 / 5</h4>
        </div>
        <button onclick="closeQuizModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-500 hover:text-pink-700 flex items-center justify-center font-bold text-sm transition">
          ✕
        </button>
      </div>

      <div class="mb-5">
        <p id="quiz-question-text" class="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed mb-4">
          கேள்வி இங்கே தோன்றும்...
        </p>

        <div id="quiz-options-list" class="space-y-2.5">
          <!-- Options rendered dynamically -->
        </div>
      </div>

      <!-- இலக்கண & வரலாற்று விளக்கம் -->
      <div id="quiz-explanation-box" class="p-4 bg-pink-50/70 rounded-2xl border border-pink-100 mb-4 hidden">
        <span class="text-[11px] font-bold text-pink-800 block mb-1">📖 இலக்கண/வரலாற்று விளக்கம்:</span>
        <p id="quiz-expl-text" class="text-xs text-slate-700 leading-relaxed"></p>
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-100">
        <button id="quiz-next-btn" onclick="nextQuizQuestion()" class="hidden pink-gradient text-white font-bold py-2.5 px-6 rounded-xl shadow-md text-xs sm:text-sm hover:opacity-95 transition pink-glow-sm">
          அடுத்த வினா ➔
        </button>
      </div>

    </div>
  </div>

  <!-- ========================================================= -->
  <!-- பயனர் கணக்கு & FIREBASE மாதிரிக் கூடம் (USER & FIREBASE MODAL) -->
  <!-- ========================================================= -->
  <div id="user-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-pink-100 flex flex-col max-h-[92vh] overflow-y-auto">
      
      <div class="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-2xl pink-gradient text-white flex items-center justify-center font-bold text-lg shadow-sm">
            👤
          </div>
          <div>
            <h3 class="text-base font-extrabold text-slate-800">பயனர் கணக்கு & கற்றல் தரவுத்தளம்</h3>
            <span id="firebase-status-badge" class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 border border-slate-200">
              உள்ளூர் பயன்முறை (Local Storage)
            </span>
          </div>
        </div>
        <button onclick="closeUserModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-500 hover:text-pink-700 flex items-center justify-center font-bold text-sm transition">
          ✕
        </button>
      </div>

      <!-- உள்ளக தாவல்கள் (Modal Tabs) -->
      <div class="flex items-center space-x-2 mb-4 bg-slate-50 p-1 rounded-2xl border border-slate-200">
        <button onclick="switchUserModalTab('activity')" id="user-modal-btn-activity" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl text-white pink-gradient shadow-sm transition">
          📊 கற்றல் அறிக்கை
        </button>
        <button onclick="switchUserModalTab('auth')" id="user-modal-btn-auth" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 transition">
          🔐 உள்நுழைவு / பதிவு
        </button>
        <button onclick="switchUserModalTab('config')" id="user-modal-btn-config" class="flex-1 py-2 px-3 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 transition">
          ⚙️ Firebase அமைப்பு
        </button>
      </div>

      <!-- தாவல் 1: கற்றல் அறிக்கை (Activity Dashboard) -->
      <div id="user-tab-activity" class="space-y-4">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
            <span class="text-[10px] font-bold text-pink-600 block uppercase">பயின்ற தலைப்புகள்</span>
            <span id="act-topics-count" class="text-lg font-black text-pink-700">0 / 6</span>
          </div>
          <div class="p-3 bg-rose-50/60 rounded-2xl border border-rose-100 text-center">
            <span class="text-[10px] font-bold text-rose-600 block uppercase">மொத்த படிப்பு நேரம்</span>
            <span id="act-total-time" class="text-lg font-black text-rose-700">0 நிமி</span>
          </div>
          <div class="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-center">
            <span class="text-[10px] font-bold text-pink-600 block uppercase">வினாடி-வினா சராசரி</span>
            <span id="act-quiz-avg" class="text-lg font-black text-pink-700">0%</span>
          </div>
          <div class="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-center">
            <span class="text-[10px] font-bold text-emerald-600 block uppercase">இலக்கண ஆய்வுகள்</span>
            <span id="act-grammar-count" class="text-lg font-black text-emerald-700">0 முறை</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm">
          <div class="px-4 py-2.5 bg-pink-50/60 border-b border-pink-100 font-extrabold text-xs text-pink-900">
            இலக்கியப் பாடவாரியான கற்றல் முன்னேற்றம்
          </div>
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-[11px] text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th class="py-2 px-3">பாடம்</th>
                <th class="py-2 px-3">படிப்பு நேரம்</th>
                <th class="py-2 px-3">வினாடி-வினா நிலை</th>
              </tr>
            </thead>
            <tbody id="act-topics-detail-list">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between pt-2">
          <span class="text-[11px] text-slate-500">தரவுகள் தானாகவே உள்ளூர் மற்றும் மேகக்கணியில் சேமிக்கப்படுகின்றன.</span>
          <button onclick="syncToFirebaseNow()" class="text-xs px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold border border-pink-200 transition">
            ☁️ மேகக்கணிக்கு ஒத்திசைக்க
          </button>
        </div>
      </div>

      <!-- தாவல் 2: உள்நுழைவு & பதிவு (Firebase Auth) -->
      <div id="user-tab-auth" class="space-y-4 hidden">
        <!-- Logged-in profile view -->
        <div id="logged-in-profile-view" class="hidden p-5 bg-pink-50/50 rounded-2xl border border-pink-100 space-y-3">
          <div class="flex items-center space-x-3">
            <div id="active-user-initial" class="w-12 h-12 rounded-full pink-gradient text-white font-extrabold text-xl flex items-center justify-center">
              ப
            </div>
            <div>
              <h4 id="active-user-name" class="font-extrabold text-slate-800 text-base">பயனர்</h4>
              <p id="active-user-email" class="text-xs text-slate-500">user@example.com</p>
            </div>
          </div>
          <button onclick="firebaseSignOut()" class="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition">
            கணக்கிலிருந்து வெளியேறு (Sign Out)
          </button>
        </div>

        <!-- Logged-out form view -->
        <div id="logged-out-form-view" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">மின்னஞ்சல் முகவரி (Email):</label>
            <input id="auth-email-input" type="email" placeholder="name@example.com" class="w-full p-2.5 rounded-xl border border-pink-100 text-xs focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 bg-pink-50/20">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">கடவுச்சொல் (Password):</label>
            <input id="auth-pass-input" type="password" placeholder="••••••••" class="w-full p-2.5 rounded-xl border border-pink-100 text-xs focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 bg-pink-50/20">
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2">
            <button onclick="firebaseSignIn()" class="py-2.5 px-4 rounded-xl pink-gradient text-white font-bold text-xs shadow-sm hover:opacity-95 transition">
              உள்நுழைக (Sign In)
            </button>
            <button onclick="firebaseSignUp()" class="py-2.5 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition">
              புதிய பயனர் பதிவு (Sign Up)
            </button>
          </div>
          <div class="pt-2 border-t border-slate-100 text-center">
            <button onclick="continueAsGuest()" class="text-xs font-semibold text-slate-500 hover:text-slate-800">
              பதிவின்றி விருந்தினராகத் தொடர்க (Continue as Guest) ➔
            </button>
          </div>
        </div>
      </div>

      <!-- தாவல் 3: Firebase அமைப்பு (Firebase Config) -->
      <div id="user-tab-config" class="space-y-3 hidden">
        <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-100 text-xs text-slate-600 leading-relaxed">
          <strong>குறிப்பு:</strong> உங்கள் சொந்த Google Firebase Console திட்டத்தை இணைக்க, Project Settings பக்கத்தில் உள்ள Web App Config மதிப்புகளை இங்கே உள்ளிட்டுச் சேமிக்கவும்.
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-0.5">API Key:</label>
          <input id="cfg-api-key" type="text" placeholder="AIzaSy..." class="w-full p-2 rounded-lg border border-slate-200 text-xs font-mono">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-0.5">Auth Domain:</label>
          <input id="cfg-auth-domain" type="text" placeholder="my-app.firebaseapp.com" class="w-full p-2 rounded-lg border border-slate-200 text-xs font-mono">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-0.5">Project ID:</label>
          <input id="cfg-project-id" type="text" placeholder="my-tamil-project" class="w-full p-2 rounded-lg border border-slate-200 text-xs font-mono">
        </div>
        <div>
          <label class="block text-[11px] font-bold text-slate-700 mb-0.5">App ID:</label>
          <input id="cfg-app-id" type="text" placeholder="1:123456789:web:abcdef" class="w-full p-2 rounded-lg border border-slate-200 text-xs font-mono">
        </div>
        <div class="pt-2">
          <button onclick="saveFirebaseConfig()" class="w-full py-2.5 rounded-xl pink-gradient text-white font-bold text-xs shadow-sm hover:opacity-95 transition">
            Firebase அமைப்புகளைச் சேமித்து இணை ➔
          </button>
        </div>
      </div>

    </div>
  </div>
`;

html = html.replace('</footer>', '</footer>\n' + modalsHtml);

// 6. Update switchTab function to support 'literature'
const newSwitchTab = `    function switchTab(tabId) {
      ['grammar', 'voice', 'literature'].forEach(t => {
        const sec = document.getElementById(\`section-\${t}\`);
        if (sec) sec.classList.add('hidden');
        const btn = document.getElementById(\`tab-btn-\${t}\`);
        if (btn) btn.className = 'bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border border-pink-100';
      });

      const activeSec = document.getElementById(\`section-\${tabId}\`);
      if (activeSec) activeSec.classList.remove('hidden');
      const activeBtn = document.getElementById(\`tab-btn-\${tabId}\`);
      if (activeBtn) activeBtn.className = 'active-tab flex items-center justify-center space-x-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md';

      if (tabId === 'literature') {
        if (typeof selectLiteratureTopic === 'function') {
          selectLiteratureTopic(currentSelectedTopicId);
        }
      } else {
        if (typeof studyTimerInterval !== 'undefined' && studyTimerInterval) {
          clearInterval(studyTimerInterval);
          studyTimerInterval = null;
        }
      }
    }`;

html = html.replace(/function switchTab\(tabId\) {[\s\S]*?activeBtn\.className = 'active-tab[^']*?';\s*}/, newSwitchTab);

// 7. Track grammar checks in analyzeTamilGrammar
const grammarCountIncrement = `
      // பயனர் செயல்பாட்டுக் கண்காணிப்பு (Activity Tracking)
      if (typeof currentUser !== 'undefined') {
        currentUser.grammarChecksCount = (currentUser.grammarChecksCount || 0) + 1;
        if (typeof saveUserData === 'function') saveUserData();
      }
`;
html = html.replace("const finalCorrectedText = correctedWords.join(' ');", grammarCountIncrement + "\n      const finalCorrectedText = correctedWords.join(' ');");

// 8. Add script tags for literature_data.js and app_literature.js before </body>
const extraScripts = `  <script src="literature_data.js"></script>\n  <script src="app_literature.js"></script>\n`;
html = html.replace('</body>', extraScripts + '</body>');

// Write out to index.html and www/index.html
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('www/index.html', html, 'utf8');
fs.copyFileSync('literature_data.js', 'www/literature_data.js');
fs.copyFileSync('app_literature.js', 'www/app_literature.js');

// Also update artifact directory
const brainDir = 'C:/Users/Naveen/.gemini/antigravity/brain/e5e61e7c-a9c1-4abd-90ea-257c8bdc4cf9';
fs.writeFileSync(brainDir + '/tamil_ai_studio.html', html, 'utf8');
fs.copyFileSync('literature_data.js', brainDir + '/literature_data.js');
fs.copyFileSync('app_literature.js', brainDir + '/app_literature.js');

console.log('Successfully integrated full application with 3 modules, 5-minute study timer, quizzes, and Firebase auth/activity tracking!');
