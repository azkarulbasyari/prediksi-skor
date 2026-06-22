// Jadwal pertandingan yang ditampilkan di dashboard.
// Data bisa diperbarui manual sesuai informasi terbaru dari Google/FIFA.
const liveScheduleUrl =
  "https://www.google.com/search?q=semua+jadwal+fifa+series+2026&oq=semua+jadwal+&gs_lcrp=EgZjaHJvbWUqBwgBEAAYgAQyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIGCAMQABgDMg0IBBAAGIMBGLEDGIAEMgcIBRAAGIAEMgYIBhAAGAMyBwgHEAAYgAQyBwgIEAAYgAQyBwgJEAAYgATSAQg0MTM5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#sie=lg;/m/0r4xs1m;2;/m/030q7;mt;fp;1;;;;-1";

const matches = [
  {
    id: 1,
    group: "Grup H",
    teamA: "Spanyol",
    flagA: "🇪🇸",
    teamB: "Arab Saudi",
    flagB: "🇸🇦",
    date: "Minggu, 21 Juni 2026",
    time: "23.00 WIB",
    venue: "Mercedes-Benz Stadium, Atlanta",
    status: "Terjadwal",
  },
  {
    id: 2,
    group: "Grup G",
    teamA: "Belgia",
    flagA: "🇧🇪",
    teamB: "Iran",
    flagB: "🇮🇷",
    date: "Senin, 22 Juni 2026",
    time: "02.00 WIB",
    venue: "Los Angeles Stadium",
    status: "Terjadwal",
  },
  {
    id: 3,
    group: "Grup H",
    teamA: "Uruguay",
    flagA: "🇺🇾",
    teamB: "Cape Verde",
    flagB: "🇨🇻",
    date: "Senin, 22 Juni 2026",
    time: "05.00 WIB",
    venue: "Miami Stadium",
    status: "Terjadwal",
  },
  {
    id: 4,
    group: "Grup G",
    teamA: "Selandia Baru",
    flagA: "🇳🇿",
    teamB: "Mesir",
    flagB: "🇪🇬",
    date: "Senin, 22 Juni 2026",
    time: "08.00 WIB",
    venue: "Kansas City Stadium",
    status: "Terjadwal",
  },
  {
    id: 5,
    group: "Grup J",
    teamA: "Argentina",
    flagA: "🇦🇷",
    teamB: "Austria",
    flagB: "🇦🇹",
    date: "Selasa, 23 Juni 2026",
    time: "00.00 WIB",
    venue: "Dallas Stadium",
    status: "Terjadwal",
  },
  {
    id: 6,
    group: "Grup I",
    teamA: "Prancis",
    flagA: "🇫🇷",
    teamB: "Irak",
    flagB: "🇮🇶",
    date: "Selasa, 23 Juni 2026",
    time: "04.00 WIB",
    venue: "MetLife Stadium, New York/New Jersey",
    status: "Terjadwal",
  },
  {
    id: 7,
    group: "Grup I",
    teamA: "Norwegia",
    flagA: "🇳🇴",
    teamB: "Senegal",
    flagB: "🇸🇳",
    date: "Selasa, 23 Juni 2026",
    time: "07.00 WIB",
    venue: "Levi's Stadium, San Francisco Bay Area",
    status: "Terjadwal",
  },
  {
    id: 8,
    group: "Grup K",
    teamA: "Portugal",
    flagA: "🇵🇹",
    teamB: "Uzbekistan",
    flagB: "🇺🇿",
    date: "Rabu, 24 Juni 2026",
    time: "00.00 WIB",
    venue: "Boston Stadium",
    status: "Terjadwal",
  },
  {
    id: 9,
    group: "Grup L",
    teamA: "Inggris",
    flagA: "🏴",
    teamB: "Ghana",
    flagB: "🇬🇭",
    date: "Rabu, 24 Juni 2026",
    time: "03.00 WIB",
    venue: "Philadelphia Stadium",
    status: "Terjadwal",
  },
  {
    id: 10,
    group: "Grup K",
    teamA: "Kolombia",
    flagA: "🇨🇴",
    teamB: "RD Kongo",
    flagB: "🇨🇩",
    date: "Rabu, 24 Juni 2026",
    time: "09.00 WIB",
    venue: "Houston Stadium",
    status: "Terjadwal",
  },
];

// Jalur babak 16 besar - venue dan jam sudah resmi, lawan masih menunggu hasil babak 32 besar (selesai 3 Juli 2026)
const round16 = [
  {
    id: 1,
    date: "Sabtu, 4 Juli 2026",
    time: "13.00 ET",
    venue: "Houston Stadium (NRG), Houston",
  },
  {
    id: 2,
    date: "Sabtu, 4 Juli 2026",
    time: "17.00 ET",
    venue: "Philadelphia Stadium, Philadelphia",
  },
  {
    id: 3,
    date: "Minggu, 5 Juli 2026",
    time: "16.00 ET",
    venue: "New York New Jersey Stadium",
  },
  {
    id: 4,
    date: "Minggu, 5 Juli 2026",
    time: "20.00 ET",
    venue: "Mexico City Stadium (Azteca)",
  },
  {
    id: 5,
    date: "Senin, 6 Juli 2026",
    time: "15.00 ET",
    venue: "Dallas Stadium (AT&T), Arlington",
  },
  {
    id: 6,
    date: "Senin, 6 Juli 2026",
    time: "17.00 ET",
    venue: "Seattle Stadium (Lumen Field)",
  },
  {
    id: 7,
    date: "Selasa, 7 Juli 2026",
    time: "12.00 ET",
    venue: "Atlanta Stadium (Mercedes-Benz)",
  },
  {
    id: 8,
    date: "Selasa, 7 Juli 2026",
    time: "16.00 ET",
    venue: "BC Place, Vancouver",
  },
];

// Data pencetak gol untuk tampilan statistik tambahan.
const topScorers = [
  { rank: 1, name: "Lionel Messi", country: "Argentina", flag: "🇦🇷", goals: 3 },
  { rank: 1, name: "Jonathan David", country: "Kanada", flag: "🇨🇦", goals: 3 },
  { rank: 3, name: "Deniz Undav", country: "Jerman", flag: "🇩🇪", goals: 3 },
  { rank: 4, name: "Kylian Mbappé", country: "Prancis", flag: "🇫🇷", goals: 2 },
  {
    rank: 4,
    name: "Erling Haaland",
    country: "Norwegia",
    flag: "🇳🇴",
    goals: 2,
  },
  { rank: 4, name: "Harry Kane", country: "Inggris", flag: "🏴", goals: 2 },
];

// Informasi singkat tentang format turnamen.
const facts = [
  {
    icon: "🌎",
    title: "48 Tim, Terbesar Sepanjang Sejarah",
    text: "Edisi 2026 pertama kali diikuti 48 negara, naik dari 32 tim di edisi-edisi sebelumnya.",
  },
  {
    icon: "🏟️",
    title: "Tuan Rumah 3 Negara",
    text: "Amerika Serikat, Kanada, dan Meksiko menjadi tuan rumah bersama untuk pertama kalinya.",
  },
  {
    icon: "🆕",
    title: "Babak 32 Besar Baru",
    text: "Format baru menambahkan babak 32 besar sebelum babak 16 besar, sehingga total ada 104 pertandingan.",
  },
  {
    icon: "🥅",
    title: "Partai Final di MetLife",
    text: "Final akan digelar 19 Juli 2026 di New York New Jersey Stadium (MetLife Stadium), berkapasitas lebih dari 82.000 penonton.",
  },
];

// Soal kuis Piala Dunia
const quizQuestions = [
  {
    question: "Piala Dunia 2026 diselenggarakan di berapa negara sekaligus?",
    options: ["1 negara", "2 negara", "3 negara", "4 negara"],
    answer: 2,
  },
  {
    question: "Berapa total tim yang berpartisipasi di Piala Dunia 2026?",
    options: ["32 tim", "40 tim", "48 tim", "56 tim"],
    answer: 2,
  },
  {
    question: "Di stadion mana partai final Piala Dunia 2026 akan digelar?",
    options: [
      "Estadio Azteca",
      "MetLife Stadium (New York/New Jersey)",
      "AT&T Stadium",
      "SoFi Stadium",
    ],
    answer: 1,
  },
  {
    question:
      "Siapa pemain yang mencetak hattrick pertama di Piala Dunia 2026?",
    options: ["Kylian Mbappé", "Lionel Messi", "Erling Haaland", "Harry Kane"],
    answer: 1,
  },
  {
    question: "Babak baru apa yang pertama kali diperkenalkan di edisi 2026?",
    options: [
      "Babak 64 Besar",
      "Babak 32 Besar",
      "Babak 8 Besar",
      "Babak Play-off",
    ],
    answer: 1,
  },
];

// Bendera negara peserta untuk mini-game tebak bendera
const flagBank = [
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇧🇷", name: "Brasil" },
  { flag: "🇫🇷", name: "Prancis" },
  { flag: "🇩🇪", name: "Jerman" },
  { flag: "🇪🇸", name: "Spanyol" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇳🇱", name: "Belanda" },
  { flag: "🇧🇪", name: "Belgia" },
  { flag: "🇭🇷", name: "Kroasia" },
  { flag: "🇲🇦", name: "Maroko" },
  { flag: "🇯🇵", name: "Jepang" },
  { flag: "🇰🇷", name: "Korea Selatan" },
  { flag: "🇲🇽", name: "Meksiko" },
  { flag: "🇺🇸", name: "Amerika Serikat" },
  { flag: "🇨🇦", name: "Kanada" },
  { flag: "🇬🇭", name: "Ghana" },
  { flag: "🇸🇳", name: "Senegal" },
  { flag: "🇳🇴", name: "Norwegia" },
  { flag: "🇺🇾", name: "Uruguay" },
  { flag: "🇨🇴", name: "Kolombia" },
];

const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const scheduleGrid = document.getElementById("scheduleGrid");
const matchSelect = document.getElementById("matchSelect");
const matchSearch = document.getElementById("matchSearch");
const groupFilter = document.getElementById("groupFilter");
const predictionList = document.getElementById("predictionList");
const championList = document.getElementById("championList");
const leaderboardBody = document.getElementById("leaderboardBody");
const totalPrediksi = document.getElementById("totalPrediksi");
const totalJuara = document.getElementById("totalJuara");
const totalBracket = document.getElementById("totalBracket");
const podium = document.getElementById("podium");

/* ===================== JADWAL & SCHEDULE ===================== */
function renderGroupFilter() {
  if (!groupFilter) return;
  const groups = [...new Set(matches.map((match) => match.group))];
  groupFilter.innerHTML = '<option value="all">Semua Grup</option>';
  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = group;
    groupFilter.appendChild(option);
  });
}

function renderSchedule() {
  const keyword = matchSearch ? matchSearch.value.toLowerCase().trim() : "";
  const selectedGroup = groupFilter ? groupFilter.value : "all";

  scheduleGrid.innerHTML = "";
  matchSelect.innerHTML = '<option value="">-- Pilih pertandingan --</option>';

  const filteredMatches = matches.filter((match) => {
    const text =
      `${match.group} ${match.teamA} ${match.teamB} ${match.date} ${match.time} ${match.venue}`.toLowerCase();
    const matchKeyword = !keyword || text.includes(keyword);
    const matchGroup = selectedGroup === "all" || match.group === selectedGroup;
    return matchKeyword && matchGroup;
  });

  if (filteredMatches.length === 0) {
    scheduleGrid.innerHTML =
      '<div class="empty-box wide-empty">Pertandingan tidak ditemukan. Coba kata kunci lain.</div>';
  }

  filteredMatches.forEach((match) => {
    scheduleGrid.innerHTML += `
      <article class="match-card">
        <div class="match-topline">
          <div class="match-no">${match.group}</div>
          <span class="status-pill">${match.status}</span>
        </div>
        <div class="teams live-teams">
          <span>${match.flagA || "🏳️"} ${match.teamA}</span>
          <span class="vs-text">vs</span>
          <span>${match.flagB || "🏳️"} ${match.teamB}</span>
        </div>
        <div class="meta">${match.date}<br>${match.time} &middot; ${match.venue}</div>
        <a class="live-link" href="${liveScheduleUrl}" target="_blank">Lihat jadwal terbaru →</a>
      </article>
    `;

    const option = document.createElement("option");
    option.value = match.id;
    option.textContent = `${match.teamA} vs ${match.teamB} (${match.group})`;
    matchSelect.appendChild(option);
  });

  updateScoreLabels();
}

function updateScoreLabels() {
  if (!matchSelect) return;

  const teamALabel = document.getElementById("teamALabel");
  const teamBLabel = document.getElementById("teamBLabel");
  const teamAFlag = document.getElementById("teamAFlag");
  const teamBFlag = document.getElementById("teamBFlag");
  const teamAName = document.getElementById("teamAName");
  const teamBName = document.getElementById("teamBName");

  const selectedMatch = matches.find(
    (match) => String(match.id) === String(matchSelect.value),
  );

  if (!selectedMatch) {
    if (teamALabel) teamALabel.textContent = "Skor Tim A";
    if (teamBLabel) teamBLabel.textContent = "Skor Tim B";
    if (teamAFlag) teamAFlag.textContent = "🏳️";
    if (teamBFlag) teamBFlag.textContent = "🏳️";
    if (teamAName) teamAName.textContent = "Pilih Tim A";
    if (teamBName) teamBName.textContent = "Pilih Tim B";
    return;
  }

  if (teamALabel) teamALabel.textContent = `Skor ${selectedMatch.teamA}`;
  if (teamBLabel) teamBLabel.textContent = `Skor ${selectedMatch.teamB}`;
  if (teamAFlag) teamAFlag.textContent = selectedMatch.flagA || "🏳️";
  if (teamBFlag) teamBFlag.textContent = selectedMatch.flagB || "🏳️";
  if (teamAName) teamAName.textContent = selectedMatch.teamA;
  if (teamBName) teamBName.textContent = selectedMatch.teamB;
}

function renderRound16() {
  const wrap = document.getElementById("round16Grid");
  if (!wrap) return;
  wrap.innerHTML = "";

  round16.forEach((match) => {
    wrap.innerHTML += `
      <article class="match-card round16-card">
        <div class="match-no">16 Besar &middot; Laga ${match.id}</div>
        <div class="teams teams-pending">Pemenang Babak 32 Besar</div>
        <div class="meta">${match.date}<br>${match.time} &middot; ${match.venue}</div>
      </article>
    `;
  });
}

if (matchSearch) {
  matchSearch.addEventListener("input", renderSchedule);
}
if (groupFilter) {
  groupFilter.addEventListener("change", renderSchedule);
}
if (matchSelect) {
  matchSelect.addEventListener("change", updateScoreLabels);
}

/* ===================== STATISTIK ===================== */
function renderStatistik() {
  const scorerList = document.getElementById("scorerList");
  const factGrid = document.getElementById("factGrid");
  if (!scorerList || !factGrid) return;

  scorerList.innerHTML = topScorers
    .map(
      (p) => `
    <div class="scorer-row">
      <span class="scorer-rank">#${p.rank}</span>
      <span class="scorer-flag">${p.flag}</span>
      <div class="scorer-info">
        <b>${p.name}</b>
        <small>${p.country}</small>
      </div>
      <span class="scorer-goals">${p.goals} <small>gol</small></span>
    </div>
  `,
    )
    .join("");

  factGrid.innerHTML = facts
    .map(
      (f) => `
    <div class="fact-card">
      <span class="fact-icon">${f.icon}</span>
      <h4>${f.title}</h4>
      <p>${f.text}</p>
    </div>
  `,
    )
    .join("");
}

/* ===================== KUIS ===================== */
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizFeedbackEl = document.getElementById("quizFeedback");
const quizProgressText = document.getElementById("quizProgressText");
const quizProgressFill = document.getElementById("quizProgressFill");
const quizCard = document.getElementById("quizCard");
const quizResult = document.getElementById("quizResult");

function renderQuizQuestion() {
  if (!quizQuestionEl) return;
  quizAnswered = false;
  quizFeedbackEl.textContent = "";
  quizFeedbackEl.className = "quiz-feedback";

  const q = quizQuestions[quizIndex];
  quizQuestionEl.textContent = q.question;
  quizProgressText.textContent = `Soal ${quizIndex + 1} dari ${quizQuestions.length}`;
  quizProgressFill.style.width = (quizIndex / quizQuestions.length) * 100 + "%";

  quizOptionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleQuizAnswer(i, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIndex, btnEl) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIndex];
  const buttons = quizOptionsEl.querySelectorAll(".quiz-option-btn");

  if (selectedIndex === q.answer) {
    quizScore++;
    btnEl.classList.add("correct");
    quizFeedbackEl.textContent = "✅ Benar!";
    quizFeedbackEl.className = "quiz-feedback correct";
  } else {
    btnEl.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    quizFeedbackEl.textContent =
      "❌ Kurang tepat, jawaban benar disorot hijau.";
    quizFeedbackEl.className = "quiz-feedback wrong";
  }

  buttons.forEach((b) => (b.disabled = true));

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizQuestions.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }, 1200);
}

function finishQuiz() {
  quizProgressFill.style.width = "100%";
  quizCard.classList.add("hidden");
  quizResult.classList.remove("hidden");

  const resultEmoji = document.getElementById("quizResultEmoji");
  const resultTitle = document.getElementById("quizResultTitle");
  const resultText = document.getElementById("quizResultText");

  const percent = quizScore / quizQuestions.length;
  if (percent === 1) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Sempurna!";
  } else if (percent >= 0.6) {
    resultEmoji.textContent = "🎉";
    resultTitle.textContent = "Bagus!";
  } else {
    resultEmoji.textContent = "📚";
    resultTitle.textContent = "Coba Lagi";
  }
  resultText.textContent = `Skormu: ${quizScore} dari ${quizQuestions.length} benar.`;

  // simpan skor kuis ke nama terakhir yang dipakai, fallback "Tamu"
  const lastName = storage.get("lastPlayerName", "Tamu");
  const quizResults = storage.get("quizResults", []);
  quizResults.push({
    name: lastName,
    correct: quizScore,
    total: quizQuestions.length,
    createdAt: new Date().toLocaleString("id-ID"),
  });
  storage.set("quizResults", quizResults);
  refreshAll();
}

function resetQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizCard.classList.remove("hidden");
  quizResult.classList.add("hidden");
  renderQuizQuestion();
}

const quizRestartBtn = document.getElementById("quizRestartBtn");
if (quizRestartBtn) {
  quizRestartBtn.addEventListener("click", resetQuiz);
}

/* ===================== TEBAK BENDERA (MINI GAME) ===================== */
let flagPool = [];
let flagCurrent = null;
let flagScoreVal = 0;
let flagStreakVal = 0;
let flagTimeLeft = 30;
let flagTimerInterval = null;
let flagPlaying = false;

const flagDisplay = document.getElementById("flagDisplay");
const flagOptionsEl = document.getElementById("flagOptions");
const flagScoreEl = document.getElementById("flagScore");
const flagStreakEl = document.getElementById("flagStreak");
const flagTimerEl = document.getElementById("flagTimer");
const flagStartBtn = document.getElementById("flagStartBtn");

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function nextFlagRound() {
  if (flagPool.length === 0) {
    flagPool = shuffleArray(flagBank);
  }
  flagCurrent = flagPool.pop();

  flagDisplay.textContent = flagCurrent.flag;

  const wrongOptions = shuffleArray(
    flagBank.filter((f) => f.name !== flagCurrent.name),
  ).slice(0, 3);
  const allOptions = shuffleArray([flagCurrent, ...wrongOptions]);

  flagOptionsEl.innerHTML = "";
  allOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "flag-option-btn";
    btn.textContent = opt.name;
    btn.addEventListener("click", () =>
      handleFlagAnswer(opt.name === flagCurrent.name, btn),
    );
    flagOptionsEl.appendChild(btn);
  });
}

function handleFlagAnswer(isCorrect, btnEl) {
  if (!flagPlaying) return;
  const buttons = flagOptionsEl.querySelectorAll(".flag-option-btn");
  buttons.forEach((b) => (b.disabled = true));

  if (isCorrect) {
    flagScoreVal += 3;
    flagStreakVal++;
    btnEl.classList.add("correct");
  } else {
    flagStreakVal = 0;
    btnEl.classList.add("wrong");
  }

  flagScoreEl.textContent = flagScoreVal;
  flagStreakEl.textContent = flagStreakVal;

  setTimeout(() => {
    if (flagPlaying) nextFlagRound();
  }, 500);
}

function startFlagGame() {
  flagPlaying = true;
  flagPool = shuffleArray(flagBank);
  flagScoreVal = 0;
  flagStreakVal = 0;
  flagTimeLeft = 30;
  flagScoreEl.textContent = "0";
  flagStreakEl.textContent = "0";
  flagTimerEl.textContent = "30";
  flagStartBtn.textContent = "Sedang Bermain...";
  flagStartBtn.disabled = true;

  nextFlagRound();

  flagTimerInterval = setInterval(() => {
    flagTimeLeft--;
    flagTimerEl.textContent = flagTimeLeft;
    if (flagTimeLeft <= 0) {
      endFlagGame();
    }
  }, 1000);
}

function endFlagGame() {
  flagPlaying = false;
  clearInterval(flagTimerInterval);
  flagOptionsEl.innerHTML = "";
  flagDisplay.textContent = "🏁";
  flagStartBtn.textContent = "Main Lagi";
  flagStartBtn.disabled = false;

  const lastName = storage.get("lastPlayerName", "Tamu");
  const flagResults = storage.get("flagResults", []);
  flagResults.push({
    name: lastName,
    score: flagScoreVal,
    createdAt: new Date().toLocaleString("id-ID"),
  });
  storage.set("flagResults", flagResults);
  refreshAll();
}

if (flagStartBtn) {
  flagStartBtn.addEventListener("click", startFlagGame);
}

/* ===================== PREDIKSI SKOR & JUARA ===================== */
function renderPredictions() {
  const predictions = storage.get("scorePredictions", []);
  totalPrediksi.textContent = predictions.length;

  if (predictions.length === 0) {
    predictionList.className = "list-box empty-box";
    predictionList.textContent =
      "Belum ada prediksi skor. Isi form di samping untuk mulai menebak.";
    return;
  }

  predictionList.className = "list-box";
  predictionList.innerHTML = predictions
    .map(
      (item) => `
    <div class="item">
      <b>${item.name}</b> menebak <b>${item.scoreA} - ${item.scoreB}</b>
      <small>${item.matchText}</small>
    </div>
  `,
    )
    .join("");
}

function renderChampions() {
  const champions = storage.get("championPredictions", []);
  totalJuara.textContent = champions.length;

  if (champions.length === 0) {
    championList.className = "list-box empty-box";
    championList.textContent =
      "Belum ada tebakan juara. Isi form di samping untuk mulai menebak.";
    return;
  }

  championList.className = "list-box";
  championList.innerHTML = champions
    .map(
      (item) => `
    <div class="item">
      <b>${item.name}</b>
      <small>Menebak juara dunia: <b>${item.country}</b></small>
    </div>
  `,
    )
    .join("");
}

/* ===================== LEADERBOARD + BADGE + CONFETTI ===================== */
function getBadge(point, totalActivities) {
  if (point >= 80) return { label: "Peramal Jitu", emoji: "🔮" };
  if (point >= 50) return { label: "Raja Tebakan", emoji: "👑" };
  if (point >= 25) return { label: "Penantang", emoji: "⚡" };
  if (totalActivities > 0) return { label: "Pemula", emoji: "🌱" };
  return null;
}

function renderLeaderboard() {
  const predictions = storage.get("scorePredictions", []);
  const champions = storage.get("championPredictions", []);
  const quizResults = storage.get("quizResults", []);
  const flagResults = storage.get("flagResults", []);

  const points = {};
  const counts = {};

  predictions.forEach((item) => {
    points[item.name] = (points[item.name] || 0) + 10;
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  champions.forEach((item) => {
    points[item.name] = (points[item.name] || 0) + 30;
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  quizResults.forEach((item) => {
    points[item.name] = (points[item.name] || 0) + item.correct * 5;
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  flagResults.forEach((item) => {
    points[item.name] = (points[item.name] || 0) + item.score;
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  const rows = Object.keys(points)
    .map((name) => ({ name, point: points[name], total: counts[name] }))
    .sort((a, b) => b.point - a.point);

  if (rows.length === 0) {
    leaderboardBody.innerHTML =
      '<tr><td colspan="5">Belum ada data leaderboard. Mulai tebak skor, kuis, atau tebak bendera untuk muncul di sini.</td></tr>';
    if (podium) podium.innerHTML = "";
    return;
  }

  // cek apakah top 3 berubah sejak render terakhir, untuk trigger confetti
  const prevTop3 = storage.get("prevTop3Names", []);
  const currentTop3 = rows.slice(0, 3).map((r) => r.name);
  const top3Changed = JSON.stringify(prevTop3) !== JSON.stringify(currentTop3);

  leaderboardBody.innerHTML = rows
    .map((row, index) => {
      const badge = getBadge(row.point, row.total);
      const rankDisplay =
        index === 0
          ? "👑"
          : index === 1
            ? "🥈"
            : index === 2
              ? "🥉"
              : `#${index + 1}`;
      return `
    <tr class="${index < 3 ? "rank-podium-row" : ""}">
      <td class="rank ${index === 0 ? "rank-1" : ""}">${rankDisplay}</td>
      <td>${row.name}</td>
      <td>${row.total} tebakan</td>
      <td><b>${row.point}</b></td>
      <td>${badge ? badge.emoji + " " + badge.label : '<span class="no-badge">-</span>'}</td>
    </tr>
  `;
    })
    .join("");

  renderPodium(rows.slice(0, 3));

  if (top3Changed && rows.length > 0) {
    triggerConfetti();
  }
  storage.set("prevTop3Names", currentTop3);
}

function renderPodium(top3) {
  if (!podium) return;
  if (top3.length === 0) {
    podium.innerHTML = "";
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  const order = [1, 0, 2]; // tampilkan #2, #1, #3 biar #1 di tengah lebih tinggi

  podium.innerHTML = order
    .filter((i) => top3[i])
    .map(
      (i) => `
      <div class="podium-spot podium-${i + 1}">
        <span class="podium-medal">${medals[i]}</span>
        <div class="podium-bar">
          <b>${top3[i].name}</b>
          <small>${top3[i].point} poin</small>
        </div>
      </div>
    `,
    )
    .join("");
}

function triggerConfetti() {
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;
  layer.innerHTML = "";

  const colors = ["#ffd166", "#22c55e", "#38bdf8", "#fb7185"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2 + Math.random() * 2 + "s";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    layer.appendChild(piece);
  }

  setTimeout(() => {
    layer.innerHTML = "";
  }, 4500);
}

/* ===================== BRACKET ===================== */
function saveBracket() {
  const bracketData = {};
  let filled = 0;
  document.querySelectorAll(".bracket-input").forEach((input) => {
    bracketData[input.dataset.key] = input.value;
    if (input.value.trim() !== "") filled++;
  });
  storage.set("bracketData", bracketData);
  if (totalBracket) totalBracket.textContent = filled;
}

function loadBracket() {
  const bracketData = storage.get("bracketData", {});
  let filled = 0;
  document.querySelectorAll(".bracket-input").forEach((input) => {
    input.value = bracketData[input.dataset.key] || "";
    if (input.value.trim() !== "") filled++;
    input.addEventListener("input", saveBracket);
  });
  if (totalBracket) totalBracket.textContent = filled;
}

function refreshAll() {
  renderPredictions();
  renderChampions();
  renderLeaderboard();
}

document
  .getElementById("scoreForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const matchId = matchSelect.value;
    const selected = matchSelect.options[matchSelect.selectedIndex].textContent;
    const predictions = storage.get("scorePredictions", []);
    const playerName = document.getElementById("playerName").value.trim();

    predictions.push({
      name: playerName,
      matchId,
      matchText: selected,
      scoreA: document.getElementById("scoreA").value,
      scoreB: document.getElementById("scoreB").value,
      createdAt: new Date().toLocaleString("id-ID"),
    });

    storage.set("scorePredictions", predictions);
    storage.set("lastPlayerName", playerName);
    this.reset();
    document.getElementById("scoreA").value = 0;
    document.getElementById("scoreB").value = 0;
    refreshAll();
  });

document
  .getElementById("championForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const champions = storage.get("championPredictions", []);
    const championName = document.getElementById("championName").value.trim();

    champions.push({
      name: championName,
      country: document.getElementById("championCountry").value.trim(),
      createdAt: new Date().toLocaleString("id-ID"),
    });

    storage.set("championPredictions", champions);
    storage.set("lastPlayerName", championName);
    this.reset();
    refreshAll();
  });

document.getElementById("resetBtn").addEventListener("click", function () {
  const yakin = confirm(
    "Yakin ingin menghapus semua data prediksi? Tindakan ini tidak bisa dibatalkan.",
  );
  if (!yakin) return;
  localStorage.removeItem("scorePredictions");
  localStorage.removeItem("championPredictions");
  localStorage.removeItem("bracketData");
  localStorage.removeItem("quizResults");
  localStorage.removeItem("flagResults");
  localStorage.removeItem("prevTop3Names");
  loadBracket();
  refreshAll();
});

/* =========== PROGRESS RAIL =========== */
const railDots = document.querySelectorAll(".rail-dot");
const railSectionIds = [
  "jadwal",
  "tebakskor",
  "bracket",
  "statistik",
  "kuis",
  "tebakbendera",
  "leaderboard",
];
const railSections = railSectionIds.map((id) => document.getElementById(id));

function updateRail() {
  let activeId = null;
  railSections.forEach((section) => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight * 0.4 &&
      rect.bottom >= window.innerHeight * 0.2
    ) {
      activeId = section.id;
    }
  });
  railDots.forEach((dot) => {
    dot.classList.toggle(
      "is-active",
      dot.getAttribute("href") === "#" + activeId,
    );
  });
}

/* =========== SCROLL TO TOP =========== */
const scrollTopBtn = document.getElementById("scrollTopBtn");
function updateScrollTop() {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  updateRail();
  updateScrollTop();
});

/* =========== INIT =========== */
renderGroupFilter();
renderSchedule();
renderRound16();
renderStatistik();
renderQuizQuestion();
loadBracket();
refreshAll();
updateRail();
updateScrollTop();
