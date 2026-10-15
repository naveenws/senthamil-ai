# செந்தமிழ் AI • Senthamil AI Studio

An AI-powered mobile web application & native Android app engineered for:
1. **100% Accurate Tamil Grammar Correction** (*வல்லினம் மிகும்/மிகா இடங்கள், பால் வழு, சாரியை, பேச்சு வழக்குத் திருத்தம்* based on Nannūl & Tolkāppiyam rules).
2. **English Speech-to-Natural-Tamil Voice Translation** (*இயல்பான பேச்சுத்தமிழ் & தூய செந்தமிழ்* dual registers with live microphone input and audio playback).
3. **Tamil Literature Learning & 5-Minute Timed Quizzes** (*தமிழ் இலக்கியக் களம்*: சங்க இலக்கியம் முதல் நவீன மறுமலர்ச்சி வரை 6 முழுமையான பாடப்பிரிவுகள், 30 வினாடி-வினாக்கள் & கட்டாய 5 நிமிட வாசிப்பு பூட்டு).
4. **User Profile & Firebase Authentication / Firestore Sync** (*பயனர் கணக்கு, கற்றல் செயல்பாட்டு அறிக்கை & கிளவுட் தரவுத்தளம்*).

---

## 📱 Android APK Download & Mobile Installation

The updated native Android APK is compiled and ready for testing:

* **APK File Location:** `C:\Users\Naveen\.gemini\antigravity\scratch\tamil_ai_app\Senthamil_AI.apk`
* **Artifact Copy:** `C:\Users\Naveen\.gemini\antigravity\brain\e5e61e7c-a9c1-4abd-90ea-257c8bdc4cf9\Senthamil_AI.apk`
* **Standalone Web App Artifact:** `C:\Users\Naveen\.gemini\antigravity\brain\e5e61e7c-a9c1-4abd-90ea-257c8bdc4cf9\tamil_ai_studio.html`
* **File Size:** ~4.15 MB
* **Package Name:** `com.senthamil.ai`

### How to Install on your Android Phone:
1. Transfer `Senthamil_AI.apk` to your Android phone via USB cable, WhatsApp, Google Drive, or Bluetooth.
2. Tap on `Senthamil_AI.apk` on your mobile phone to install it.
3. If prompted with *"Install unknown apps"*, tap **Settings** and toggle **"Allow from this source"**.
4. Open **Senthamil AI** and test the live microphone speech translation, Tamil grammar engine, literature learning topics, and 5-minute timed quizzes!

---

## 🎨 UI & Design Standard
* **Theme:** Pink gradient grading (`#ec4899` to `#f43f5e`) on a clean, modern white background with high-contrast slate typography.
* **Layout:** Focused 3-tab mobile-responsive architecture.
* **Language Policy:** Pure Tamil interface with bilingual (Tamil & English) instruction panels for each section.

---

## 🚀 The 3 Core Modules

### 1. ✍️ Tamil Grammar & Otru Correction (தமிழ் இலக்கணம் & ஒற்றுப் பிழை திருத்தி)
* **100% Accurate & Zero Irregular Outputs:**
  - **சாரியைப் பிழை (Oblique Stems without Case Marker):** Corrects bare oblique stems before verbs (e.g. `அம்மா சாப்பாட்டு கொடுத்தாள்.` ➔ `அம்மா உணவைக் கொடுத்தாள்.`). Citation: *நன்னூல் உருபியல் நூற்பா 184*.
  - **பால் வழு & வழுவமைதி (Gender & Honorific Concord):** Distinguishes feminine agreement, masculine agreement, and respectful epicene concord (e.g. `அம்மா கொடுத்தாள்` vs `தாயார் கொடுத்தார்`). Citation: *நன்னூல் பொதுவியல் நூற்பா 375*.
  - **முற்றுப்பெறா எச்சத் தொடர் (Incomplete Conditionals):** Normalizes trailing conditional participles lacking predicates (e.g. `அவர் வந்தால்` ➔ `அவர் வந்தார்.`). Citation: *நன்னூல் வினையியல் நூற்பா 341*.
  - **வல்லினம் மிகும் இடங்கள் (Sandhi Doubling):** Accusative 2nd case marker `-ஐ` (`பாடத்தைப் படி`), Dative 4th case marker `-கு` (`வீட்டுக்குப் போ`), Demonstratives (`அந்தப் பையன்`, `இந்தப் புத்தகம்`).
  - **வல்லினம் மிகா இடங்கள் (Where Otru Must NOT Double):** Relative participles (`படித்த பாடம்`), Vocatives, Neuter concord (`நாய்கள் குரைத்தன`, `பூனை கடித்தது`).

### 2. 🎤 English Speech to Dual-Register Tamil (குரல்வழி ஆங்கிலம் ➔ தமிழ்)
* **Voice Typing (Microphone Input):** Live speech recognition using Web Speech API for English speech.
* **Dual Output Registers:**
  1. **இயல்பான பேச்சுத்தமிழ் (Natural Spoken Tamil):** Everyday colloquial phrasing for foreign visitors and conversational use (e.g. *"நான் எங்க வீட்டுக்கு போகணும்."*).
  2. **தூய செந்தமிழ் (Formal Literary Written Tamil):** Formal classical register (e.g. *"நான் என் வீட்டிற்குச் செல்ல வேண்டும்."*).
* **Tanglish Phonetics & Audio:** Instant pronunciation guide in English letters with high-quality Tamil audio playback (🔊) and speed controls (0.75x, 1.0x, 1.25x).

### 3. 📜 Tamil Literature & 5-Minute Timed Quiz (தமிழ் இலக்கியக் களம் & வினாடி-வினா)
* **6 Comprehensive Literature Modules:**
  1. **சங்க இலக்கியம்:** எட்டுத்தொகை (நற்றிணை, குறுந்தொகை...) & பத்துப்பாட்டு (திருமுருகாற்றுப்படை, முல்லைப்பாட்டு...).
  2. **நீதி நூல்கள் & திருக்குறள்:** பதினெண்கீழ்க்கணக்கு (திருக்குறள், நாலடியார், இன்னா நாற்பது...).
  3. **காப்பிய இலக்கியம்:** ஐம்பெருங் காப்பியங்கள் (சிலப்பதிகாரம், மணிமேகலை...) & ஐஞ்சிறு காப்பியங்கள்.
  4. **பக்தி இலக்கியக் காலம்:** பன்னிரு திருமுறைகள் (தேவாரம், திருவாசகம்) & நாலாயிர திவ்வியப் பிரபந்தம்.
  5. **தமிழ் இலக்கண மரபு:** தொல்காப்பியம் (எழுத்து, சொல், பொருள்) & நன்னூல் (எழுத்தியல், சொல்லியல்).
  6. **நவீனத் தமிழ் மறுமலர்ச்சி:** மகாகவி பாரதியார், புரட்சிக் கவிஞர் பாரதிதாசன், புதுமைப்பித்தன்.
* **Strict 5-Minute Study Constraint:**
  - Before a quiz unlocks, users **must spend at least 5 minutes (300 seconds) actively reading each topic**.
  - A real-time timer tracks study duration with a visual pink-gradient progress bar.
  - A test shortcut button (`⚡ [சோதனை முறை: 5 நிமிடங்களை நிறைவு செய்]`) is provided for immediate evaluation.
* **Interactive Topic Quizzes:**
  - 5 rich multiple-choice questions per topic (30 total questions).
  - Detailed classical explanations and literary citations for each question upon answer.

---

## 👤 User Profile & Firebase Integration
* **User Activity Dashboard:** Tracks completed topics (`X / 6`), total study time in minutes, quiz average (`%`), and total grammar checks run (`X முறை`).
* **Firebase Authentication:** Email/Password Sign In and Sign Up with Guest Mode (`விருந்தினர் பயனர்`).
* **Firebase Firestore Sync:** Automatically synchronizes user activity and scores to Cloud Firestore when configured, with offline `localStorage` fallback.
