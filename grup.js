const FIREBASE_DB_URL =
  "https://prediksi-wc-2026-default-rtdb.asia-southeast1.firebasedatabase.app";

const matches = [
  { id: 1, group: 'Grup H', teamA: 'Spanyol', flagA: '🇪🇸', teamB: 'Arab Saudi', flagB: '🇸🇦', date: 'Minggu, 21 Juni 2026', time: '23.00 WIB' },
  { id: 2, group: 'Grup G', teamA: 'Belgia', flagA: '🇧🇪', teamB: 'Iran', flagB: '🇮🇷', date: 'Senin, 22 Juni 2026', time: '02.00 WIB' },
  { id: 3, group: 'Grup H', teamA: 'Uruguay', flagA: '🇺🇾', teamB: 'Cape Verde', flagB: '🇨🇻', date: 'Senin, 22 Juni 2026', time: '05.00 WIB' },
  { id: 4, group: 'Grup G', teamA: 'Selandia Baru', flagA: '🇳🇿', teamB: 'Mesir', flagB: '🇪🇬', date: 'Senin, 22 Juni 2026', time: '08.00 WIB' },
  { id: 5, group: 'Grup J', teamA: 'Argentina', flagA: '🇦🇷', teamB: 'Austria', flagB: '🇦🇹', date: 'Selasa, 23 Juni 2026', time: '00.00 WIB' },
  { id: 6, group: 'Grup I', teamA: 'Prancis', flagA: '🇫🇷', teamB: 'Irak', flagB: '🇮🇶', date: 'Selasa, 23 Juni 2026', time: '04.00 WIB' },
  { id: 7, group: 'Grup I', teamA: 'Norwegia', flagA: '🇳🇴', teamB: 'Senegal', flagB: '🇸🇳', date: 'Selasa, 23 Juni 2026', time: '07.00 WIB' },
  { id: 8, group: 'Grup K', teamA: 'Portugal', flagA: '🇵🇹', teamB: 'Uzbekistan', flagB: '🇺🇿', date: 'Rabu, 24 Juni 2026', time: '00.00 WIB' },
  { id: 9, group: 'Grup L', teamA: 'Inggris', flagA: '🏴', teamB: 'Ghana', flagB: '🇬🇭', date: 'Rabu, 24 Juni 2026', time: '03.00 WIB' },
  { id: 10, group: 'Grup K', teamA: 'Kolombia', flagA: '🇨🇴', teamB: 'RD Kongo', flagB: '🇨🇩', date: 'Rabu, 24 Juni 2026', time: '09.00 WIB' }
];

const countries = [
  'Argentina','Brasil','Prancis','Spanyol','Portugal','Inggris','Jerman','Belgia','Uruguay','Belanda','Jepang','Maroko','Amerika Serikat','Meksiko','Kanada','Kolombia','Kroasia','Senegal','Ghana','Swiss'
];

let activeGroupCode = '';
let activeMember = '';
let pollTimer = null;

const $ = id => document.getElementById(id);

function isConfigured(){
  return typeof FIREBASE_DB_URL === 'string' &&
         FIREBASE_DB_URL.startsWith('https://') &&
         !FIREBASE_DB_URL.includes('PASTE_DATABASE_URL_FIREBASE_DISINI');
}

function dbUrl(path){
  return `${FIREBASE_DB_URL.replace(/\/$/,'')}/${path}.json`;
}

async function dbGet(path){
  const res = await fetch(dbUrl(path));
  if(!res.ok) throw new Error('Gagal mengambil data (HTTP ' + res.status + ')');
  return res.json();
}

async function dbSet(path, value){
  const res = await fetch(dbUrl(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value)
  });
  if(!res.ok) throw new Error('Gagal menyimpan data (HTTP ' + res.status + ')');
  return res.json();
}

function toast(message){
  const el = $('groupToast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

function setButtonLoading(button, loading, loadingText, normalText){
  if(!button) return;
  button.disabled = loading;
  button.textContent = loading ? loadingText : normalText;
}

function normalizeCode(code){
  return (code || '').trim().toUpperCase();
}

function makeCode(groupName){
  const clean = (groupName || 'GRUP').replace(/[^a-z0-9]/gi,'').toUpperCase().slice(0,3) || 'GRP';
  return clean + Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g,'').slice(2,6);
}

function toKey(name){
  const cleaned = (name || '').trim().toLowerCase().replace(/[.#$\/\[\]\s]+/g,'_').replace(/[^a-z0-9_-]/g,'');
  return cleaned || ('p' + Date.now());
}

function toList(obj){
  return obj ? Object.values(obj) : [];
}

/* ---------- konfigurasi belum diisi: tampilkan banner & matikan form ---------- */
function showConfigBanner(){
  const banner = $('configBanner');
  if(banner) banner.classList.remove('hidden');
  ['createGroupForm','joinGroupForm'].forEach(id => {
    const form = $(id);
    if(form) form.querySelectorAll('input,button,select').forEach(el => el.disabled = true);
  });
}

function initSelectors(){
  const matchSelect = $('groupMatchSelect');
  matchSelect.innerHTML = matches.map(match => `<option value="${match.id}">${match.flagA} ${match.teamA} vs ${match.flagB} ${match.teamB} — ${match.time}</option>`).join('');
  $('championSelect').innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
  updateSelectedMatch();
}

function updateSelectedMatch(){
  const match = matches.find(item => String(item.id) === String($('groupMatchSelect').value)) || matches[0];
  $('groupFlagA').textContent = match.flagA;
  $('groupFlagB').textContent = match.flagB;
  $('groupTeamA').textContent = match.teamA;
  $('groupTeamB').textContent = match.teamB;
  $('groupLabelA').textContent = `Skor ${match.teamA}`;
  $('groupLabelB').textContent = `Skor ${match.teamB}`;
}

async function enterGroup(code, memberName, { silent } = {}){
  try{
    const group = await dbGet(`groups/${code}`);
    if(!group){
      toast('Kode grup tidak ditemukan');
      return false;
    }

    activeGroupCode = code;
    activeMember = memberName.trim();

    const memberKey = toKey(activeMember);
    const existingMembers = group.members || {};
    if(!existingMembers[memberKey]){
      await dbSet(`groups/${code}/members/${memberKey}`, {
        name: activeMember,
        role: 'Peserta',
        joinedAt: new Date().toLocaleString('id-ID')
      });
    }

    sessionStorage.setItem('fifa2026_active_group', code);
    sessionStorage.setItem('fifa2026_active_member', activeMember);

    $('entrySection').classList.add('hidden');
    $('dashboardSection').classList.remove('hidden');
    await renderDashboard();
    startPolling();
    if(!silent) toast(`Masuk grup ${group.groupName}`);
    return true;
  } catch(err){
    console.error(err);
    toast('Gagal konek ke server. Cek koneksi internet / konfigurasi Firebase.');
    return false;
  }
}

function startPolling(){
  stopPolling();
  pollTimer = setInterval(() => {
    if(activeGroupCode) renderDashboard({ silent: true }).catch(() => {});
  }, 5000);
}

function stopPolling(){
  if(pollTimer){
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

async function renderDashboard(){
  if(!activeGroupCode) return;
  let group;
  try{
    group = await dbGet(`groups/${activeGroupCode}`);
  } catch(err){
    console.error(err);
    return;
  }
  if(!group) return;

  const members = toList(group.members);
  const predictions = toList(group.predictions);
  const champions = toList(group.champions);

  $('dashboardGroupName').textContent = group.groupName || '-';
  $('dashboardCode').textContent = activeGroupCode;
  $('activeMemberText').textContent = `Peserta aktif: ${activeMember}`;
  $('memberCount').textContent = members.length;
  $('predictionCount').textContent = predictions.length;
  $('championCount').textContent = champions.length;

  $('memberList').innerHTML = members.map((member, index) => `
    <div class="member-item">
      <b>${index + 1}. ${escapeHtml(member.name)}</b>
      <span>${escapeHtml(member.role)}</span>
    </div>
  `).join('') || '<div class="empty-box">Belum ada anggota.</div>';

  if(predictions.length === 0 && champions.length === 0){
    $('groupPredictionList').innerHTML = 'Belum ada prediksi grup.';
  } else {
    const predHtml = predictions.slice().reverse().map(item => `
      <div class="prediction-item">
        <div><b>${escapeHtml(item.memberName)}</b><br><span>${escapeHtml(item.match)}</span></div>
        <b>${item.scoreA} - ${item.scoreB}</b>
      </div>
    `).join('');
    const champHtml = champions.slice().reverse().map(item => `
      <div class="prediction-item">
        <div><b>${escapeHtml(item.memberName)}</b><br><span>Tebakan juara dunia</span></div>
        <b>🏆 ${escapeHtml(item.country)}</b>
      </div>
    `).join('');
    $('groupPredictionList').innerHTML = predHtml + champHtml;
  }

  renderLeaderboard(members, predictions, champions);
}

function renderLeaderboard(members, predictions, champions){
  const points = {};
  members.forEach(member => points[member.name] = 0);
  predictions.forEach(item => points[item.memberName] = (points[item.memberName] || 0) + 5);
  champions.forEach(item => points[item.memberName] = (points[item.memberName] || 0) + 10);

  const ranks = Object.entries(points).sort((a,b) => b[1] - a[1]);
  if(ranks.length === 0){
    $('groupLeaderboard').innerHTML = '<div class="empty-box">Belum ada anggota.</div>';
    return;
  }

  const medals = ['🥇','🥈','🥉'];
  $('groupLeaderboard').innerHTML = ranks.map(([name, point], index) => `
    <div class="rank-item">
      <b>${medals[index] || '🏅'} ${escapeHtml(name)}</b>
      <span>${point} poin</span>
    </div>
  `).join('');
}

function escapeHtml(text){
  return String(text ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[ch]));
}

$('createGroupForm').addEventListener('submit', async event => {
  event.preventDefault();
  if(!isConfigured()) return;
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const groupName = $('newGroupName').value.trim();
  const adminName = $('adminName').value.trim();
  if(!groupName || !adminName) return;

  setButtonLoading(submitBtn, true, 'Membuat grup...', 'Buat Grup');
  try{
    let code = makeCode(groupName);
    let tries = 0;
    while(await dbGet(`groups/${code}`)){
      code = makeCode(groupName);
      tries++;
      if(tries > 8) throw new Error('Gagal membuat kode unik, coba lagi.');
    }

    const adminKey = toKey(adminName);
    await dbSet(`groups/${code}`, {
      groupName,
      adminName,
      createdAt: new Date().toLocaleString('id-ID'),
      members: {
        [adminKey]: { name: adminName, role: 'Admin', joinedAt: new Date().toLocaleString('id-ID') }
      },
      predictions: {},
      champions: {}
    });

    $('createdCode').textContent = code;
    $('createdInfo').textContent = `Grup ${groupName} berhasil dibuat. Bagikan kode ini ke teman, lalu mereka bisa join dari HP/laptop masing-masing.`;
    $('createdBox').classList.remove('hidden');
    activeGroupCode = code;
    activeMember = adminName;
    sessionStorage.setItem('fifa2026_active_group', code);
    sessionStorage.setItem('fifa2026_active_member', adminName);
    toast('Grup berhasil dibuat');
  } catch(err){
    console.error(err);
    toast('Gagal membuat grup. Cek koneksi internet / konfigurasi Firebase.');
  } finally {
    setButtonLoading(submitBtn, false, 'Membuat grup...', 'Buat Grup');
  }
});

$('joinGroupForm').addEventListener('submit', async event => {
  event.preventDefault();
  if(!isConfigured()) return;
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const code = normalizeCode($('joinCode').value);
  const name = $('memberName').value.trim();
  if(!code || !name) return;

  setButtonLoading(submitBtn, true, 'Bergabung...', 'Gabung Grup');
  await enterGroup(code, name);
  setButtonLoading(submitBtn, false, 'Bergabung...', 'Gabung Grup');
});

$('copyCodeBtn').addEventListener('click', async () => {
  const code = $('createdCode').textContent.trim();
  try{
    await navigator.clipboard.writeText(code);
    toast('Kode grup disalin');
  } catch {
    toast('Gagal menyalin, salin manual ya: ' + code);
  }
});

$('copyLinkBtn').addEventListener('click', async () => {
  const code = $('createdCode').textContent.trim();
  const link = `${location.origin}${location.pathname}?group=${code}`;
  try{
    await navigator.clipboard.writeText(link);
    toast('Link grup disalin');
  } catch {
    toast('Gagal menyalin, salin manual ya: ' + link);
  }
});

$('shareWaBtn').addEventListener('click', () => {
  const code = $('createdCode').textContent.trim();
  const link = `${location.origin}${location.pathname}?group=${code}`;
  const text = `Gabung grup prediksi FIFA World Cup 2026. Kode grup: ${code}. Link: ${link}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
});

$('groupMatchSelect').addEventListener('change', updateSelectedMatch);

$('groupScoreForm').addEventListener('submit', async event => {
  event.preventDefault();
  if(!activeGroupCode) return toast('Masuk grup dulu');
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const match = matches.find(item => String(item.id) === String($('groupMatchSelect').value));
  const memberKey = toKey(activeMember);

  setButtonLoading(submitBtn, true, 'Menyimpan...', 'Simpan Prediksi Grup');
  try{
    await dbSet(`groups/${activeGroupCode}/predictions/${memberKey}_${match.id}`, {
      memberName: activeMember,
      match: `${match.flagA} ${match.teamA} vs ${match.flagB} ${match.teamB}`,
      teamA: match.teamA,
      teamB: match.teamB,
      scoreA: Number($('groupScoreA').value),
      scoreB: Number($('groupScoreB').value),
      createdAt: new Date().toLocaleString('id-ID')
    });
    await renderDashboard();
    toast('Prediksi skor grup tersimpan');
  } catch(err){
    console.error(err);
    toast('Gagal menyimpan prediksi. Coba lagi.');
  } finally {
    setButtonLoading(submitBtn, false, 'Menyimpan...', 'Simpan Prediksi Grup');
  }
});

$('groupChampionForm').addEventListener('submit', async event => {
  event.preventDefault();
  if(!activeGroupCode) return toast('Masuk grup dulu');
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const memberKey = toKey(activeMember);
  const country = $('championSelect').value;

  setButtonLoading(submitBtn, true, 'Menyimpan...', 'Simpan Tebakan Juara');
  try{
    await dbSet(`groups/${activeGroupCode}/champions/${memberKey}`, {
      memberName: activeMember,
      country,
      createdAt: new Date().toLocaleString('id-ID')
    });
    await renderDashboard();
    toast('Tebakan juara tersimpan');
  } catch(err){
    console.error(err);
    toast('Gagal menyimpan tebakan. Coba lagi.');
  } finally {
    setButtonLoading(submitBtn, false, 'Menyimpan...', 'Simpan Tebakan Juara');
  }
});

function autoFillCodeFromUrl(){
  const params = new URLSearchParams(location.search);
  const code = params.get('group');
  if(code) $('joinCode').value = normalizeCode(code);
}

(async function init(){
  initSelectors();
  autoFillCodeFromUrl();

  if(!isConfigured()){
    showConfigBanner();
    return;
  }

  const savedCode = sessionStorage.getItem('fifa2026_active_group');
  const savedMember = sessionStorage.getItem('fifa2026_active_member');
  if(savedCode && savedMember){
    const ok = await enterGroup(savedCode, savedMember, { silent: true });
    if(!ok){
      sessionStorage.removeItem('fifa2026_active_group');
      sessionStorage.removeItem('fifa2026_active_member');
    }
  }
})();
