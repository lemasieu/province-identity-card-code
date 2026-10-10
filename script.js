// ===== Biến toàn cục =====
let provinceData = [];
let tableBody, searchInput, searchBtn, resultSection, resultCard;

// ===== Khởi tạo =====
document.addEventListener('DOMContentLoaded', async () => {
  tableBody = document.getElementById('tableBody');
  searchInput = document.getElementById('searchInput');
  searchBtn = document.getElementById('searchBtn');
  resultSection = document.getElementById('resultSection');
  resultCard = document.getElementById('resultCard');

  await loadData();
  renderTable();

  // Sự kiện tìm kiếm
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Tìm kiếm real-time (debounce)
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (searchInput.value.trim().length >= 2) {
        handleSearch();
      } else {
        resultSection.classList.add('hidden');
      }
    }, 300);
  });
});

// ===== Tải dữ liệu =====
async function loadData() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    provinceData = data.provinces;
  } catch (err) {
    console.error('Lỗi tải dữ liệu:', err);
    provinceData = [];
  }
}

// ===== Xử lý tìm kiếm =====
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    resultSection.classList.add('hidden');
    return;
  }

  const results = provinceData.filter((p) => {
    const codeMatch = p.cccd_code === query;
    const oldNameMatch = removeDiacritics(p.old_name).includes(removeDiacritics(query));
    const newNameMatch = removeDiacritics(p.new_name).includes(removeDiacritics(query));
    return codeMatch || oldNameMatch || newNameMatch;
  });

  if (results.length === 0) {
    showResult(`
      <div class="no-result">❌ Không tìm thấy kết quả cho "<strong>${escapeHtml(query)}</strong>"</div>
    `);
  } else if (results.length === 1) {
    showResult(renderResultCard(results[0]));
  } else {
    // Nếu nhiều kết quả, hiển thị dạng danh sách
    const html = results.map((r) => renderResultCard(r)).join('');
    showResult(html);
  }
}

// ===== Hiển thị kết quả =====
function showResult(html) {
  resultCard.innerHTML = html;
  resultSection.classList.remove('hidden');
}

// ===== Render card kết quả =====
function renderResultCard(p) {
  const isMerged = p.merged_from && p.old_name !== p.new_name;
  const mergeInfo = isMerged
    ? `<span class="value warning">${p.old_name} → ${p.new_name}</span>`
    : `<span class="value success">Giữ nguyên</span>`;

  return `
    <div style="margin-bottom: ${isMerged ? '20px' : '0'};">
      <div class="result-title">
        ${isMerged ? '🔄' : '✅'} ${p.old_name}
      </div>
      <div class="result-grid">
        <div class="result-item">
          <div class="label">Mã CCCD (3 số)</div>
          <div class="value accent">${p.cccd_code}</div>
        </div>
        <div class="result-item">
          <div class="label">Tỉnh mới sau sáp nhập</div>
          <div class="value">${p.new_name}</div>
        </div>
        <div class="result-item">
          <div class="label">Mã hành chính</div>
          <div class="value accent">${p.new_code}</div>
        </div>
        <div class="result-item">
          <div class="label">Trạng thái</div>
          <div>${mergeInfo}</div>
        </div>
      </div>
      ${p.merged_from ? `
        <div class="result-item" style="margin-top: 16px; grid-column: 1 / -1;">
          <div class="label">Sáp nhập từ</div>
          <div class="value">${p.merged_from}</div>
        </div>
      ` : ''}
    </div>
  `;
}

// ===== Render bảng =====
function renderTable() {
  if (!tableBody) return;
  tableBody.innerHTML = provinceData
    .map(
      (p) => `
      <tr>
        <td>${p.cccd_code}</td>
        <td>${p.old_name}</td>
        <td>${p.new_name}</td>
        <td>${p.new_code}</td>
        <td>${p.merged_from || '—'}</td>
      </tr>
    `
    )
    .join('');
}

// ===== Tiện ích =====
function removeDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}