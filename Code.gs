/** Borang Hakim Kajian Tindakan - Google Apps Script. */
const CONFIG = Object.freeze({
  spreadsheetId: '1oCcIJ_-k98pn5RByJMuTBahFKtlVQWepcLEni-M6x_8',
  participantSheet: 'SENARAIPESERTA',
  scoreSheet: 'DATAPENGISIANHAKIM',
  competition: 'Borang Hakim Kajian Tindakan',
  judges: [
    'Dr Anuar bin Md Amin',
    'Dr Helme Heli',
    'Rosalina binti Basar'
  ],
  publishResults: true
});

const RUBRIC = [
  rubric_('A', 'kelancaran_berbahasa', 'Kelancaran Berbahasa', 10, [
    'Penggunaan bahasa',
    'Penyampaian teratur dan selari dengan slaid pembentangan',
    'Menyampaikan maklumat',
    'Mengamalkan nilai kesantunan bahasa'
  ]),
  rubric_('A', 'kefasihan', 'Kefasihan', 10, [
    'Menyampaikan maklumat selari dengan bahan paparan',
    'Maklumat inovasi dibentangkan',
    'Berkeyakinan menyampaikan maklumat',
    'Menjawab soalan juri'
  ]),
  rubric_('A', 'menarik', 'Menarik', 5, [
    'Menyampaikan maklumat secara ilmiah',
    'Penyampaian yang dapat menarik perhatian (keindahan, puisi)',
    'Pengurusan masa'
  ]),
  rubric_('A', 'berinformasi', 'Berinformasi', 5, [
    'Menjurus kepada penyelesaian masalah',
    'Menyampaikan kandungan pembentangan secara tersusun'
  ]),
  rubric_('B', 'refleksi_fokus_kajian', 'Refleksi dan Fokus Kajian', 5, [
    'Penceritaan pengalaman atau pengajaran lalu',
    'Tinjauan masalah',
    'Mengenal pasti fokus kajian'
  ]),
  rubric_('B', 'objektif_hala_tuju_kpi', 'Objektif / Hala Tuju / KPI', 5, [
    'Spesifik',
    'Boleh diukur',
    'Berkaitan pernyataan masalah'
  ]),
  rubric_('B', 'pelaksanaan_kajian', 'Pelaksanaan Kajian', 10, [
    'Perancangan pelaksanaan tindakan',
    'Pelan dan alat intervensi',
    'Kaedah kajian yang diamalkan'
  ]),
  rubric_('C', 'keakuran_format', 'Keakuran Format', 10, [
    'Mematuhi format penyelidikan / pembentangan: refleksi dan fokus kajian, objektif dan sasaran, perancangan dan pelaksanaan tindakan, analisis data, refleksi dan perbincangan, cadangan kajian seterusnya serta rumusan'
  ]),
  rubric_('C', 'penghuraian_data', 'Penghuraian Data', 5, [
    'Menghurai data',
    'Menjelaskan fakta berasaskan data',
    'Menunjukkan kaedah memperoleh data',
    'Mengemukakan eviden bagi menyokong fakta',
    'Menyampaikan fakta yang menjurus kepada objektif'
  ]),
  rubric_('C', 'keseluruhan', 'Keseluruhan', 5, [
    'Mencapai objektif',
    'Menunjukkan impak positif',
    'Signifikan'
  ]),
  rubric_('D', 'idea_kreatif', 'Idea Kreatif', 5, [
    'Produk inovasi berupaya mewujudkan kesedaran baharu',
    'Melakukan penambahbaikan dari masa ke semasa'
  ]),
  rubric_('D', 'fokus_objektif', 'Fokus Objektif', 5, [
    'Menyelesaikan isu atau masalah pembelajaran',
    'Meningkatkan kualiti',
    'Membuat keputusan',
    'Penambahbaikan atau pengubahsuaian'
  ]),
  rubric_('D', 'fokus_data', 'Fokus Data', 5, [
    'Berasaskan data yang diperoleh',
    'Menunjukkan perubahan tingkah laku (P1)',
    'Menunjukkan penguasaan kemahiran (P2)',
    'Menunjukkan peningkatan prestasi (P3)'
  ]),
  rubric_('D', 'impak', 'Impak', 5, [
    'Menjelaskan data pencapaian atau keberhasilan',
    'Maklum balas yang diterima daripada kajian atau inovasi',
    'Mengesan penambahbaikan'
  ]),
  rubric_('E', 'penyebarluasan', 'Penyebarluasan', 5, [
    'Penyebarluasan',
    'Dapatan kajian disebar luas kepada skala yang luas'
  ]),
  rubric_('E', 'perancangan_masa_depan', 'Perancangan Masa Depan', 5, [
    'Inisiatif mengembangkan atau menambah baik kajian / inovasi',
    'Berkeyakinan berkongsi dapatan atau idea kepada skala yang lebih luas'
  ])
];

const SECTION_INFO = Object.freeze({
  A: section_('JUSTIFIKASI (PENYAMPAIAN)', 30, {
    5: 'Sangat tepat dan jelas', 4: 'Sangat tepat atau jelas', 3: 'Kejelasan yang baik',
    2: 'Kejelasan yang minimum', 1: 'Kurang jelas'
  }),
  B: section_('JUSTIFIKASI (KETEPATAN FAKTA)', 20, {
    5: 'Penceritaan sangat tepat dan jelas; data, objektif dan pelan intervensi sangat jelas',
    4: 'Penceritaan tepat atau jelas; data jelas; objektif sangat tepat; pelan tersusun',
    3: 'Penceritaan, data, objektif dan pelan intervensi yang baik',
    2: 'Penceritaan, data, objektif dan pelan intervensi pada tahap minimum',
    1: 'Penceritaan kurang baik; tiada sokongan data; objektif dan pelan kurang baik'
  }),
  C: section_('JUSTIFIKASI (PERSEMBAHAN KANDUNGAN)', 20, {
    5: 'Sangat tepat, jelas, konsisten dan tersusun; objektif tercapai; sangat signifikan',
    4: 'Sangat tepat atau jelas; konsisten atau tersusun; objektif tercapai; signifikan baik',
    3: 'Jelas dan tepat; konsistensi terhad; objektif tercapai; signifikan minimum',
    2: 'Kejelasan dan ketepatan minimum; objektif minimum; kurang kaitan',
    1: 'Kurang jelas, tepat, konsisten dan tersusun; objektif mengelirukan; tiada kaitan'
  }),
  D: section_('JUSTIFIKASI (KEBERKESANAN)', 20, {
    5: 'Sangat tepat, jelas, konsisten dan tersusun; data P1, P2 dan P3 sangat positif',
    4: 'Sangat tepat atau jelas; konsisten atau tersusun; data P1, P2 dan P3 positif',
    3: 'Jelas dan tepat; konsistensi terhad; data menunjukkan P1, P2 dan P3',
    2: 'Kejelasan dan ketepatan minimum; data P1, P2 dan P3 minimum',
    1: 'Kurang jelas, tepat, konsisten dan tersusun; data menunjukkan P1, P2 dan P3'
  }),
  E: section_('JUSTIFIKASI (POTENSI)', 10, {
    5: 'Pelbagai medium; kebangsaan atau antarabangsa; jelas, tepat dan bernilai komersial',
    4: 'Pelbagai medium; peringkat negeri atau daerah',
    3: 'Pelbagai medium; peringkat institusi',
    2: 'Bercadang diperluas atau dicuba pada masa akan datang',
    1: 'Menunggu peluang; setakat ini sahaja'
  })
});

function rubric_(section, key, label, weight, criteria) {
  return { section: section, key: key, label: label, weight: weight, maxScore: 5, criteria: criteria };
}

function section_(label, max, descriptions) {
  return { label: label, max: max, descriptions: descriptions };
}

function doGet(e) {
  const action = normal_(e && e.parameter && e.parameter.action || 'bootstrap').toLowerCase();
  try {
    return json_(action === 'winners' || action === 'results' ? winners_() : bootstrap_());
  } catch (err) {
    console.error(err && err.stack || err);
    return json_({ success: false, code: 'SERVER_ERROR', message: 'Sistem belum dapat memuatkan data. Sila cuba lagi.' });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e && e.postData && e.postData.contents || '{}');
    if (payload.action !== 'submitScore') {
      return json_({ success: false, code: 'INVALID_ACTION', message: 'Permintaan tidak sah.' });
    }
    return json_(saveScore_(payload));
  } catch (err) {
    console.error(err && err.stack || err);
    return json_({ success: false, code: 'SERVER_ERROR', message: 'Markah tidak dapat disimpan. Sila cuba lagi.' });
  }
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function ss_() {
  return SpreadsheetApp.openById(CONFIG.spreadsheetId);
}

function normal_(value) {
  return String(value == null ? '' : value).trim().replace(/\s+/g, ' ');
}

function key_(value) {
  return normal_(value).toUpperCase();
}

function headerMap_(row) {
  const map = {};
  row.forEach(function (value, index) { map[key_(value)] = index; });
  return map;
}

function pick_(row, map, names) {
  for (let i = 0; i < names.length; i++) {
    const index = map[key_(names[i])];
    if (index !== undefined) return normal_(row[index]);
  }
  return '';
}

function participants_() {
  const sheet = ss_().getSheetByName(CONFIG.participantSheet);
  if (!sheet) throw new Error('Tab peserta belum diwujudkan.');
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const map = headerMap_(values[0]);
  const seen = {};
  return values.slice(1).map(function (row) {
    return {
      bil: pick_(row, map, ['BIL', 'ID', 'ID PESERTA']),
      namaPeserta: pick_(row, map, ['NAMA PESERTA', 'NAMA PEMBENTANG', 'NAMA AHLI']),
      sekolah: pick_(row, map, ['SEKOLAH', 'SEKOLAH/ORGANISASI', 'ORGANISASI']),
      bidang: pick_(row, map, ['BIDANG']),
      tajuk: pick_(row, map, ['TAJUK PROJEK', 'TAJUK KAJIAN TINDAKAN', 'TAJUK'])
    };
  }).filter(function (item) {
    if (!item.bil || !item.namaPeserta || !item.tajuk || seen[item.bil]) return false;
    seen[item.bil] = true;
    return true;
  });
}

function rubricHeader_(item) {
  return item.section + ' ' + item.label.toUpperCase() + ' (1-5)';
}

function requiredScoreHeaders_() {
  return [
    'TIMESTAMP', 'ID REKOD', 'BIL', 'NAMA PESERTA', 'SEKOLAH/ORGANISASI',
    'KATEGORI', 'BIDANG', 'TAJUK PROJEK', 'NAMA HAKIM'
  ].concat(RUBRIC.map(rubricHeader_), [
    'JUMLAH A', 'JUMLAH B', 'JUMLAH C', 'JUMLAH D', 'JUMLAH E',
    'JUMLAH KESELURUHAN', 'CATATAN HAKIM'
  ]);
}

function scoreSheet_() {
  const spreadsheet = ss_();
  let sheet = spreadsheet.getSheetByName(CONFIG.scoreSheet);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.scoreSheet);
  const required = requiredScoreHeaders_();
  const current = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0] : [];
  const existing = {};
  current.forEach(function (header) { if (normal_(header)) existing[key_(header)] = true; });
  const missing = required.filter(function (header) { return !existing[key_(header)]; });
  if (missing.length) {
    sheet.getRange(1, current.length + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
  }
  sheet.setFrozenRows(1);
  return sheet;
}

function scores_() {
  const sheet = scoreSheet_();
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return [];
  const map = headerMap_(values[0]);
  return values.slice(1).filter(function (row) { return row.some(Boolean); }).map(function (row) {
    return {
      id: pick_(row, map, ['ID REKOD']),
      bil: pick_(row, map, ['BIL']),
      hakim: pick_(row, map, ['NAMA HAKIM']),
      total: Number(pick_(row, map, ['JUMLAH KESELURUHAN'])) || 0,
      sections: {
        A: Number(pick_(row, map, ['JUMLAH A'])) || 0,
        B: Number(pick_(row, map, ['JUMLAH B'])) || 0,
        C: Number(pick_(row, map, ['JUMLAH C'])) || 0,
        D: Number(pick_(row, map, ['JUMLAH D'])) || 0,
        E: Number(pick_(row, map, ['JUMLAH E'])) || 0
      }
    };
  });
}

function bootstrap_() {
  return {
    success: true,
    competition: CONFIG.competition,
    judges: CONFIG.judges,
    rubric: RUBRIC,
    sections: SECTION_INFO,
    participants: participants_(),
    scores: scores_().map(function (item) {
      return { bil: item.bil, hakim: item.hakim, total: item.total };
    })
  };
}

function validate_(payload, participant) {
  const judge = normal_(payload.judge);
  if (CONFIG.judges.indexOf(judge) < 0) throw new Error('Nama hakim tidak sah.');
  if (!participant) throw new Error('Peserta tidak ditemui.');
  const incoming = payload.scores || {};
  const clean = {};
  const sections = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  RUBRIC.forEach(function (item) {
    const score = Number(incoming[item.key]);
    if (!Number.isInteger(score) || score < 1 || score > item.maxScore) throw new Error('Markah tidak sah.');
    clean[item.key] = score;
    sections[item.section] += score / item.maxScore * item.weight;
  });
  const total = Object.keys(sections).reduce(function (sum, section) { return sum + sections[section]; }, 0);
  if (total < 20 || total > 100) throw new Error('Jumlah markah tidak sah.');
  return { judge: judge, scores: clean, sections: sections, total: total };
}

function saveScore_(payload) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return { success: false, code: 'BUSY', message: 'Sistem sedang menerima markah lain. Sila cuba semula.' };
  }
  try {
    const participants = participants_();
    const participant = participants.find(function (item) { return String(item.bil) === String(payload.participantBil); });
    const valid = validate_(payload, participant);
    const duplicate = scores_().some(function (item) {
      return String(item.bil) === String(participant.bil) && key_(item.hakim) === key_(valid.judge);
    });
    if (duplicate) {
      return { success: false, code: 'DUPLICATE', message: 'Hakim ini telah menilai peserta tersebut.' };
    }

    const sheet = scoreSheet_();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
    const record = {
      'TIMESTAMP': new Date(),
      'ID REKOD': Utilities.getUuid(),
      'BIL': participant.bil,
      'NAMA PESERTA': participant.namaPeserta,
      'SEKOLAH/ORGANISASI': participant.sekolah,
      'KATEGORI': '',
      'BIDANG': participant.bidang,
      'TAJUK PROJEK': participant.tajuk,
      'NAMA HAKIM': valid.judge,
      'JUMLAH A': valid.sections.A,
      'JUMLAH B': valid.sections.B,
      'JUMLAH C': valid.sections.C,
      'JUMLAH D': valid.sections.D,
      'JUMLAH E': valid.sections.E,
      'JUMLAH KESELURUHAN': valid.total,
      'CATATAN HAKIM': normal_(payload.comment)
    };
    RUBRIC.forEach(function (item) { record[rubricHeader_(item)] = valid.scores[item.key]; });
    const normalizedRecord = {};
    Object.keys(record).forEach(function (name) { normalizedRecord[key_(name)] = record[name]; });
    const outputRow = headers.map(function (header) { return normalizedRecord[key_(header)] !== undefined ? normalizedRecord[key_(header)] : ''; });
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, outputRow.length).setValues([outputRow]);
    SpreadsheetApp.flush();
    return {
      success: true,
      code: 'SAVED',
      recordId: record['ID REKOD'],
      timestamp: record['TIMESTAMP'].toISOString(),
      sections: valid.sections,
      total: valid.total
    };
  } finally {
    lock.releaseLock();
  }
}

function winners_() {
  if (!CONFIG.publishResults) {
    return { success: true, published: false, message: 'Keputusan belum diterbitkan.' };
  }
  const participants = participants_();
  const scores = scores_();
  const byParticipant = {};
  participants.forEach(function (item) {
    byParticipant[String(item.bil)] = {
      bil: item.bil,
      namaPeserta: item.namaPeserta,
      sekolah: item.sekolah,
      bidang: item.bidang,
      tajuk: item.tajuk,
      total: 0,
      judgesReceived: 0,
      complete: false
    };
  });
  scores.forEach(function (score) {
    const item = byParticipant[String(score.bil)];
    if (!item) return;
    item.total += score.total;
    item.judgesReceived += 1;
  });
  const ranked = Object.keys(byParticipant).map(function (key) {
    const item = byParticipant[key];
    item.complete = item.judgesReceived === CONFIG.judges.length;
    return item;
  }).sort(function (a, b) {
    return b.total - a.total || Number(a.bil) - Number(b.bil);
  });
  let previousTotal = null;
  let previousRank = 0;
  ranked.forEach(function (item, index) {
    if (previousTotal !== null && item.total === previousTotal) item.rank = previousRank;
    else item.rank = index + 1;
    previousTotal = item.total;
    previousRank = item.rank;
  });
  return {
    success: true,
    published: true,
    rankingMethod: 'JUMLAH',
    ranked: ranked,
    progress: {
      received: scores.length,
      expected: participants.length * CONFIG.judges.length,
      complete: scores.length === participants.length * CONFIG.judges.length
    }
  };
}
