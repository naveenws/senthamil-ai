// ===============================================================
// செந்தமிழ் AI • தமிழ் இலக்கியக் களம், 5 நிமிட வாசிப்பு நேரம்,
// வினாடி-வினா தேர்வு & Firebase பயனர் கணக்கு மேலாண்மை
// ===============================================================

const STORAGE_KEY = 'senthamil_user_state';
const FIREBASE_CONFIG_KEY = 'senthamil_firebase_config';

// பயனர் தரவுக் கட்டமைப்பு (User Activity State)
let currentUser = {
  uid: 'guest_' + Math.random().toString(36).substring(2, 9),
  email: '',
  displayName: 'விருந்தினர் பயனர்',
  isGuest: true,
  grammarChecksCount: 0,
  topicProgress: {}
};

let studyTimerInterval = null;
let currentSelectedTopicId = 'sangam';
let activeTopicSeconds = 0;

let currentQuizState = {
  topicId: null,
  currentIndex: 0,
  selectedAnswers: {},
  score: 0,
  submitted: false
};

// Firebase References
let firebaseApp = null;
let firebaseAuth = null;
let firestoreDb = null;

// -------------------------------------------------------------
// 1. இலக்கிய தலைப்பு தேர்வு & 5 நிமிட வாசிப்பு நேரக் கண்காணிப்பு
// -------------------------------------------------------------
function selectLiteratureTopic(topicId) {
  if (studyTimerInterval) {
    clearInterval(studyTimerInterval);
    studyTimerInterval = null;
  }

  currentSelectedTopicId = topicId;
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === topicId) || topics[0];
  if (!topic) return;

  if (!currentUser.topicProgress[topicId]) {
    currentUser.topicProgress[topicId] = {
      timeSpent: 0,
      quizCompleted: false,
      score: 0,
      totalQuestions: topic.quiz ? topic.quiz.length : 5
    };
  }

  activeTopicSeconds = currentUser.topicProgress[topicId].timeSpent || 0;

  renderTopicDetail(topic);
  updateTopicListCards();
  updateTimerUI();

  // 1-விநாடி தொடர் டைமர் (Active Study Timer)
  studyTimerInterval = setInterval(() => {
    activeTopicSeconds++;
    currentUser.topicProgress[topicId].timeSpent = activeTopicSeconds;
    updateTimerUI();

    // ஒவ்வொரு 5 விநாடிக்கும் உள்ளூர் நினைவகத்தில் சேமி
    if (activeTopicSeconds % 5 === 0) {
      saveUserData();
    }
  }, 1000);
}

function renderTopicDetail(topic) {
  const container = document.getElementById('lit-topic-content');
  const titleEl = document.getElementById('lit-topic-title');
  const periodEl = document.getElementById('lit-topic-period');
  const summaryEl = document.getElementById('lit-topic-summary');

  if (titleEl) titleEl.innerText = topic.title;
  if (periodEl) periodEl.innerText = topic.period;
  if (summaryEl) summaryEl.innerText = topic.summary;
  if (container) container.innerHTML = topic.content;
}

function updateTopicListCards() {
  const cardsContainer = document.getElementById('lit-topic-cards-container');
  if (!cardsContainer || !window.LITERATURE_DATA) return;

  cardsContainer.innerHTML = window.LITERATURE_DATA.map((t, idx) => {
    const p = currentUser.topicProgress[t.id] || { timeSpent: 0, quizCompleted: false, score: 0 };
    const isSelected = t.id === currentSelectedTopicId;
    const isUnlocked = p.timeSpent >= 300;
    const mins = Math.floor((p.timeSpent || 0) / 60);

    let statusBadge = '';
    if (p.quizCompleted) {
      statusBadge = `<span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">✅ தேர்ச்சி: ${p.score}/${t.quiz.length}</span>`;
    } else if (isUnlocked) {
      statusBadge = `<span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-pink-100 text-pink-700 border border-pink-200">✨ வினாடி-வினா தயார்</span>`;
    } else {
      statusBadge = `<span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 border border-slate-200">🔒 5 நிமி தேவை (${mins}/5 நிமி)</span>`;
    }

    return `
      <div onclick="selectLiteratureTopic('${t.id}')" 
           class="cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
             isSelected 
               ? 'border-pink-500 bg-pink-50/40 shadow-md ring-2 ring-pink-500/10' 
               : 'border-pink-100 hover:border-pink-300 bg-white hover:bg-pink-50/20'
           }">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full">பிரிவு ${idx + 1}</span>
            ${statusBadge}
          </div>
          <h4 class="font-extrabold text-sm text-slate-800 mb-1 leading-snug">${t.title}</h4>
          <p class="text-[11px] text-pink-600 font-semibold mb-2">${t.period}</p>
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${t.summary}</p>
        </div>
        <div class="mt-3 pt-2.5 border-t border-pink-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>⏳ படிப்பு: ${mins} நிமி</span>
          <span class="font-bold text-pink-700">${isSelected ? 'பயில்கிறது ➔' : 'தொடங்கு ➔'}</span>
        </div>
      </div>
    `;
  }).join('');
}

function updateTimerUI() {
  const reqSeconds = 300; // 5 நிமிடங்கள் (300 நொடிகள்)
  const pct = Math.min(100, Math.round((activeTopicSeconds / reqSeconds) * 100));
  const mins = Math.floor(activeTopicSeconds / 60);
  const secs = activeTopicSeconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const timerBadge = document.getElementById('timer-time-display');
  const timerBar = document.getElementById('timer-progress-bar');
  const lockStatusEl = document.getElementById('timer-lock-status');
  const startQuizBtn = document.getElementById('start-quiz-btn');

  if (timerBadge) timerBadge.innerText = `${timeFormatted} / 05:00`;
  if (timerBar) timerBar.style.width = `${pct}%`;

  const topic = (window.LITERATURE_DATA || []).find(t => t.id === currentSelectedTopicId);
  const qCount = topic && topic.quiz ? topic.quiz.length : 5;

  if (activeTopicSeconds >= reqSeconds) {
    if (lockStatusEl) {
      lockStatusEl.innerHTML = `<span class="text-emerald-700 font-extrabold flex items-center space-x-1"><span>✨</span><span>5 நிமிடங்கள் வாசிப்பு நிறைவுற்றது! வினாடி-வினா பூட்டு திறக்கப்பட்டது.</span></span>`;
    }
    if (startQuizBtn) {
      startQuizBtn.disabled = false;
      startQuizBtn.className = 'pink-gradient text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:opacity-95 transition flex items-center space-x-2 pink-glow-sm cursor-pointer';
      startQuizBtn.innerHTML = `<span>🎯</span><span>வினாடி-வினா தொடங்கு (${qCount} வினாக்கள்) ➔</span>`;
    }
  } else {
    const remainSecs = reqSeconds - activeTopicSeconds;
    const rM = Math.floor(remainSecs / 60);
    const rS = remainSecs % 60;
    if (lockStatusEl) {
      lockStatusEl.innerHTML = `<span class="text-pink-700 font-bold flex items-center space-x-1"><span>🔒</span><span>வினாடி-வினாவைத் திறக்க இன்னும் ${rM} நிமி ${rS < 10 ? '0' : ''}${rS} நொடி பயில வேண்டும்</span></span>`;
    }
    if (startQuizBtn) {
      startQuizBtn.disabled = true;
      startQuizBtn.className = 'bg-slate-200 text-slate-400 font-bold py-3 px-6 rounded-2xl shadow-none cursor-not-allowed flex items-center space-x-2';
      startQuizBtn.innerHTML = `<span>🔒</span><span>வினாடி-வினா பூட்டப்பட்டுள்ளது (5 நிமி வாசிப்பு தேவை)</span>`;
    }
  }
}

// விரைவு சோதனை பொத்தான் (சோதனை செய்வோருக்கான வசதி)
function fastForward5Min() {
  activeTopicSeconds = 300;
  if (!currentUser.topicProgress[currentSelectedTopicId]) {
    currentUser.topicProgress[currentSelectedTopicId] = { timeSpent: 300, quizCompleted: false, score: 0 };
  } else {
    currentUser.topicProgress[currentSelectedTopicId].timeSpent = 300;
  }
  updateTimerUI();
  updateTopicListCards();
  saveUserData();
}

// -------------------------------------------------------------
// 2. வினாடி-வினா தேர்வு & மதிப்பெண் இயந்திரம் (Interactive Quiz Engine)
// -------------------------------------------------------------
function openQuizModal() {
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === currentSelectedTopicId);
  if (!topic || !topic.quiz) return;

  currentQuizState = {
    topicId: currentSelectedTopicId,
    currentIndex: 0,
    selectedAnswers: {},
    score: 0,
    submitted: false
  };

  renderCurrentQuizQuestion();
  document.getElementById('quiz-modal').classList.remove('hidden');
}

function closeQuizModal() {
  document.getElementById('quiz-modal').classList.add('hidden');
}

function renderCurrentQuizQuestion() {
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === currentQuizState.topicId);
  const q = topic.quiz[currentQuizState.currentIndex];
  const total = topic.quiz.length;

  document.getElementById('quiz-topic-title').innerText = topic.title;
  document.getElementById('quiz-progress-text').innerText = `வினா ${currentQuizState.currentIndex + 1} / ${total}`;
  document.getElementById('quiz-question-text').innerText = q.question;

  const optionsContainer = document.getElementById('quiz-options-list');
  optionsContainer.innerHTML = '';

  const hasAnswered = currentQuizState.selectedAnswers[currentQuizState.currentIndex] !== undefined;
  const userAns = currentQuizState.selectedAnswers[currentQuizState.currentIndex];

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-3.5 rounded-2xl border-2 transition font-medium text-xs sm:text-sm flex items-center justify-between ';

    if (!hasAnswered) {
      btn.className += 'border-pink-100 hover:border-pink-300 hover:bg-pink-50/50 bg-white text-slate-800';
      btn.onclick = () => selectQuizAnswer(idx);
    } else {
      if (idx === q.answer) {
        btn.className += 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
      } else if (idx === userAns) {
        btn.className += 'border-rose-400 bg-rose-50 text-rose-800';
      } else {
        btn.className += 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
      }
    }

    const markLetter = ['அ', 'ஆ', 'இ', 'ஈ'][idx];
    btn.innerHTML = `
      <div class="flex items-center space-x-3">
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          hasAnswered && idx === q.answer ? 'bg-emerald-500 text-white' : (hasAnswered && idx === userAns ? 'bg-rose-500 text-white' : 'bg-pink-100 text-pink-700')
        }">${markLetter}</span>
        <span>${opt}</span>
      </div>
      ${hasAnswered && idx === q.answer ? '<span class="text-emerald-700 font-bold text-xs">✓ சரியான விடை</span>' : ''}
      ${hasAnswered && idx === userAns && idx !== q.answer ? '<span class="text-rose-600 font-bold text-xs">✗ தவறு</span>' : ''}
    `;
    optionsContainer.appendChild(btn);
  });

  const explBox = document.getElementById('quiz-explanation-box');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (hasAnswered) {
    explBox.classList.remove('hidden');
    document.getElementById('quiz-expl-text').innerText = q.explanation;
    nextBtn.classList.remove('hidden');
    nextBtn.innerText = currentQuizState.currentIndex === total - 1 ? 'மதிப்பெண்களைக் காண்க ➔' : 'அடுத்த வினா ➔';
  } else {
    explBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
  }
}

function selectQuizAnswer(idx) {
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === currentQuizState.topicId);
  const q = topic.quiz[currentQuizState.currentIndex];
  currentQuizState.selectedAnswers[currentQuizState.currentIndex] = idx;
  if (idx === q.answer) {
    currentQuizState.score++;
  }
  renderCurrentQuizQuestion();
}

function nextQuizQuestion() {
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === currentQuizState.topicId);
  if (currentQuizState.currentIndex < topic.quiz.length - 1) {
    currentQuizState.currentIndex++;
    renderCurrentQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const topics = window.LITERATURE_DATA || [];
  const topic = topics.find(t => t.id === currentQuizState.topicId);
  const total = topic.quiz.length;
  const score = currentQuizState.score;

  if (!currentUser.topicProgress[currentQuizState.topicId]) {
    currentUser.topicProgress[currentQuizState.topicId] = {};
  }
  currentUser.topicProgress[currentQuizState.topicId].quizCompleted = true;
  currentUser.topicProgress[currentQuizState.topicId].score = Math.max(
    currentUser.topicProgress[currentQuizState.topicId].score || 0,
    score
  );
  currentUser.topicProgress[currentQuizState.topicId].totalQuestions = total;

  saveUserData();
  updateTopicListCards();

  const optionsContainer = document.getElementById('quiz-options-list');
  optionsContainer.innerHTML = `
    <div class="text-center py-6 space-y-4">
      <div class="w-16 h-16 mx-auto rounded-3xl pink-gradient flex items-center justify-center text-white text-3xl shadow-lg pink-glow">
        ${score >= 4 ? '🏆' : '🎯'}
      </div>
      <div>
        <h4 class="text-xl font-extrabold text-slate-800">வினாடி-வினா நிறைவுற்றது!</h4>
        <p class="text-xs text-slate-500 mt-1">${topic.title}</p>
      </div>
      <div class="inline-block p-4 bg-pink-50 rounded-2xl border border-pink-200">
        <span class="text-xs font-bold text-pink-600 block uppercase">உங்கள் மதிப்பெண்</span>
        <span class="text-3xl font-extrabold text-pink-700">${score} / ${total}</span>
        <span class="block text-xs font-semibold text-slate-600 mt-1">(${Math.round((score / total) * 100)}% தேர்ச்சி)</span>
      </div>
      <p class="text-xs text-slate-600 max-w-sm mx-auto">
        உங்கள் வினாடி-வினா முடிவுகள் மற்றும் படிப்பு நேரம் பயனர் சுயவிவரத்தில் வெற்றிகரமாகப் பதியப்பட்டது.
      </p>
      <div class="pt-2">
        <button onclick="closeQuizModal(); selectLiteratureTopic('${currentQuizState.topicId}');" class="pink-gradient text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition pink-glow-sm">
          முடிந்தது ➔
        </button>
      </div>
    </div>
  `;
  document.getElementById('quiz-explanation-box').classList.add('hidden');
  document.getElementById('quiz-next-btn').classList.add('hidden');
}

// -------------------------------------------------------------
// 3. பயனர் கணக்கு, Firebase Auth & Firestore மேலாண்மை
// -------------------------------------------------------------
function openUserModal() {
  updateUserUI();
  const savedCfg = localStorage.getItem(FIREBASE_CONFIG_KEY);
  if (savedCfg) {
    try {
      const cfg = JSON.parse(savedCfg);
      if (document.getElementById('cfg-api-key')) document.getElementById('cfg-api-key').value = cfg.apiKey || '';
      if (document.getElementById('cfg-auth-domain')) document.getElementById('cfg-auth-domain').value = cfg.authDomain || '';
      if (document.getElementById('cfg-project-id')) document.getElementById('cfg-project-id').value = cfg.projectId || '';
      if (document.getElementById('cfg-app-id')) document.getElementById('cfg-app-id').value = cfg.appId || '';
    } catch(e) {}
  }
  document.getElementById('user-modal').classList.remove('hidden');
}

function closeUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
}

function switchUserModalTab(tab) {
  ['activity', 'auth', 'config'].forEach(t => {
    const el = document.getElementById(`user-tab-${t}`);
    const btn = document.getElementById(`user-modal-btn-${t}`);
    if (el) el.classList.add('hidden');
    if (btn) btn.className = 'py-2 px-3 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 transition';
  });

  const activeEl = document.getElementById(`user-tab-${tab}`);
  const activeBtn = document.getElementById(`user-modal-btn-${tab}`);
  if (activeEl) activeEl.classList.remove('hidden');
  if (activeBtn) activeBtn.className = 'py-2 px-3 text-xs font-bold rounded-xl text-white pink-gradient shadow-sm';
}

function initFirebaseIfAvailable() {
  const savedCfg = localStorage.getItem(FIREBASE_CONFIG_KEY);
  if (!savedCfg) {
    loadLocalUserData();
    return;
  }

  try {
    const config = JSON.parse(savedCfg);
    if (config.apiKey && typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(config);
      } else {
        firebaseApp = firebase.app();
      }
      firebaseAuth = firebase.auth();
      firestoreDb = firebase.firestore();

      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          currentUser.uid = user.uid;
          currentUser.email = user.email || '';
          currentUser.displayName = user.displayName || user.email.split('@')[0];
          currentUser.isGuest = false;
          loadFirebaseUserData(user.uid);
        } else {
          loadLocalUserData();
        }
        updateUserUI();
      });

      const statusBadge = document.getElementById('firebase-status-badge');
      if (statusBadge) {
        statusBadge.innerText = '🟢 Firebase இணைக்கப்பட்டுள்ளது';
        statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200';
      }
    } else {
      loadLocalUserData();
    }
  } catch (err) {
    console.warn('Firebase init error:', err);
    loadLocalUserData();
  }
}

function loadLocalUserData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      currentUser = { ...currentUser, ...data };
    } catch (e) {}
  }
  updateUserUI();
}

function saveUserData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
  updateUserUI();

  if (firestoreDb && currentUser.uid && !currentUser.isGuest) {
    firestoreDb.collection('users').doc(currentUser.uid).set({
      ...currentUser,
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(e => console.warn('Firestore sync error:', e));
  }
}

async function loadFirebaseUserData(uid) {
  if (!firestoreDb) return;
  try {
    const doc = await firestoreDb.collection('users').doc(uid).get();
    if (doc.exists) {
      const data = doc.data();
      currentUser = { ...currentUser, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      updateUserUI();
    }
  } catch (err) {
    console.warn('Error loading firestore doc:', err);
  }
}

function updateUserUI() {
  // Update header badge
  const headerName = document.getElementById('user-display-name');
  const avatarBadge = document.getElementById('user-avatar-badge');
  if (headerName) {
    headerName.innerText = currentUser.isGuest ? 'விருந்தினர் பயனர்' : currentUser.displayName;
  }
  if (avatarBadge) {
    avatarBadge.innerText = (currentUser.displayName || 'ப').charAt(0).toUpperCase();
  }

  // Update Activity Metrics
  const topicsCountEl = document.getElementById('act-topics-count');
  const totalTimeEl = document.getElementById('act-total-time');
  const quizAvgEl = document.getElementById('act-quiz-avg');
  const grammarCountEl = document.getElementById('act-grammar-count');

  const topics = window.LITERATURE_DATA || [];
  let completedTopics = 0;
  let totalSeconds = 0;
  let totalScore = 0;
  let totalPossible = 0;

  Object.keys(currentUser.topicProgress || {}).forEach(k => {
    const tp = currentUser.topicProgress[k];
    totalSeconds += tp.timeSpent || 0;
    if (tp.quizCompleted) {
      completedTopics++;
      totalScore += tp.score || 0;
      totalPossible += tp.totalQuestions || 5;
    }
  });

  if (topicsCountEl) topicsCountEl.innerText = `${completedTopics} / ${topics.length}`;
  if (totalTimeEl) totalTimeEl.innerText = `${Math.floor(totalSeconds / 60)} நிமி`;
  if (quizAvgEl) quizAvgEl.innerText = totalPossible > 0 ? `${Math.round((totalScore / totalPossible) * 100)}%` : '0%';
  if (grammarCountEl) grammarCountEl.innerText = `${currentUser.grammarChecksCount || 0} முறை`;

  // Profile view states
  const loggedInView = document.getElementById('logged-in-profile-view');
  const loggedOutView = document.getElementById('logged-out-form-view');

  if (!currentUser.isGuest) {
    if (loggedInView) loggedInView.classList.remove('hidden');
    if (loggedOutView) loggedOutView.classList.add('hidden');
    const nameEl = document.getElementById('active-user-name');
    const emailEl = document.getElementById('active-user-email');
    const initialEl = document.getElementById('active-user-initial');
    if (nameEl) nameEl.innerText = currentUser.displayName;
    if (emailEl) emailEl.innerText = currentUser.email;
    if (initialEl) initialEl.innerText = (currentUser.displayName || 'ப').charAt(0).toUpperCase();
  } else {
    if (loggedInView) loggedInView.classList.add('hidden');
    if (loggedOutView) loggedOutView.classList.remove('hidden');
  }

  // Detail table of topics
  const actList = document.getElementById('act-topics-detail-list');
  if (actList && topics.length > 0) {
    actList.innerHTML = topics.map(t => {
      const p = currentUser.topicProgress[t.id] || { timeSpent: 0, quizCompleted: false, score: 0 };
      const mins = Math.floor(p.timeSpent / 60);
      const secs = p.timeSpent % 60;
      const qStatus = p.quizCompleted 
        ? `<span class="text-emerald-700 font-bold">✅ ${p.score}/${t.quiz.length} (${Math.round((p.score/t.quiz.length)*100)}%)</span>`
        : (p.timeSpent >= 300 
            ? `<span class="text-pink-600 font-bold">✨ வினாடி-வினா தயார்</span>` 
            : `<span class="text-slate-400">🔒 பூட்டப்பட்டுள்ளது</span>`);

      return `
        <tr class="border-b border-pink-50 text-xs text-slate-700">
          <td class="py-2.5 px-3 font-semibold text-slate-800">${t.title}</td>
          <td class="py-2.5 px-3 text-pink-700 font-medium">${mins} நிமி ${secs} நொடி</td>
          <td class="py-2.5 px-3">${qStatus}</td>
        </tr>
      `;
    }).join('');
  }
}

// Firebase Auth Actions
async function firebaseSignIn() {
  const email = document.getElementById('auth-email-input').value.trim();
  const pass = document.getElementById('auth-pass-input').value;
  if (!email || !pass) {
    alert('தயவுசெய்து மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.');
    return;
  }
  if (!firebaseAuth) {
    alert('Firebase இன்னும் இணைக்கப்படவில்லை. தயவுசெய்து முதலில் "Firebase அமைப்பு" தாவலில் விவரங்களைச் சேமிக்கவும் அல்லது உள்ளூர் கணக்கைப் பயன்படுத்தவும்.');
    return;
  }
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, pass);
    alert('வெற்றிகரமாக உள்நுழைந்துவிட்டது!');
  } catch (err) {
    alert('உள்நுழைவு தோல்வியடைந்தது: ' + err.message);
  }
}

async function firebaseSignUp() {
  const email = document.getElementById('auth-email-input').value.trim();
  const pass = document.getElementById('auth-pass-input').value;
  if (!email || !pass) {
    alert('தயவுசெய்து மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.');
    return;
  }
  if (!firebaseAuth) {
    alert('Firebase இன்னும் இணைக்கப்படவில்லை. தயவுசெய்து முதலில் "Firebase அமைப்பு" தாவலில் விவரங்களைச் சேமிக்கவும்.');
    return;
  }
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, pass);
    alert('புதிய பயனர் கணக்கு உருவாக்கப்பட்டது!');
  } catch (err) {
    alert('பதிவு தோல்வியடைந்தது: ' + err.message);
  }
}

async function firebaseSignOut() {
  if (firebaseAuth) {
    await firebaseAuth.signOut();
  }
  currentUser = {
    uid: 'guest_' + Math.random().toString(36).substring(2, 9),
    email: '',
    displayName: 'விருந்தினர் பயனர்',
    isGuest: true,
    grammarChecksCount: 0,
    topicProgress: {}
  };
  saveUserData();
  alert('கணக்கிலிருந்து வெளியேறிவிட்டது. விருந்தினர் பயன்முறை இயக்கப்பட்டது.');
}

function continueAsGuest() {
  currentUser.isGuest = true;
  currentUser.displayName = 'விருந்தினர் பயனர்';
  saveUserData();
  closeUserModal();
}

function saveFirebaseConfig() {
  let apiKey = document.getElementById('cfg-api-key').value.trim();
  let authDomain = document.getElementById('cfg-auth-domain').value.trim();
  let projectId = document.getElementById('cfg-project-id').value.trim();
  let appId = document.getElementById('cfg-app-id').value.trim();

  // Smart snippet extraction if full config snippet or JSON was pasted
  if (apiKey.includes('{') || apiKey.includes('apiKey')) {
    const raw = apiKey;
    const extract = (key) => {
      const m = raw.match(new RegExp(`${key}['"\\s]*:['"\\s]*([^'"\\s,]+)`));
      return m ? m[1] : '';
    };
    apiKey = extract('apiKey') || apiKey;
    authDomain = extract('authDomain') || authDomain;
    projectId = extract('projectId') || projectId;
    appId = extract('appId') || appId;
  }

  if (!apiKey || !projectId) {
    alert('குறைந்தபட்சம் API Key மற்றும் Project ID ஆகியவற்றை உள்ளிடவும்.');
    return;
  }

  const cfg = { apiKey, authDomain, projectId, appId };
  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
  alert('Firebase அமைப்பு வெற்றிகரமாகச் சேமிக்கப்பட்டது! ஆப் மறுதொடக்கம் செய்யப்படுகிறது.');
  location.reload();
}

function syncToFirebaseNow() {
  if (!firestoreDb || currentUser.isGuest) {
    alert('Firebase உடன் இணைக்கப்பட்டு உள்நுழைந்த பயனர்களுக்கு மட்டுமே நேரடி மேகக்கணி ஒத்திசைவு இயங்கும்.');
    return;
  }
  saveUserData();
  alert('அனைத்து தரவுகளும் மேகக்கணி Firebase தரவுத்தளத்தில் வெற்றிகரமாக ஒத்திசைக்கப்பட்டது!');
}

// -------------------------------------------------------------
// 4. துவக்க அழைப்பு (Initialization)
// -------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  initFirebaseIfAvailable();
  if (window.LITERATURE_DATA && window.LITERATURE_DATA.length > 0) {
    selectLiteratureTopic('sangam');
  }
});
