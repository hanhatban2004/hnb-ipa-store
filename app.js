(() => {
 const cfg = window.HNB_CONFIG || {};
 const appsEl = document.getElementById('apps');
 const searchEl = document.getElementById('search');
 const apps = Array.isArray(cfg.apps) ? cfg.apps : [];
 const owner = cfg.owner || '';
 const repo = cfg.repo || '';
 const validRepo = owner && owner !== 'YOUR_GITHUB_USERNAME' && repo;
 const releaseBase = validRepo ? `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/download/` : '';
 document.getElementById('repoLink').href = validRepo ? `https://github.com/${owner}/${repo}` : 'https://github.com';
 document.getElementById('year').textContent = new Date().getFullYear();
 const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render() {
   const q = (searchEl.value || '').trim().toLowerCase();
   const shown = apps.filter(a => [a.name,a.subtitle,a.category].join(' ').toLowerCase().includes(q));
   document.getElementById('appCount').textContent = shown.length;
   if (!shown.length) { appsEl.innerHTML = '<div class="empty">Không tìm thấy ứng dụng phù hợp.</div>'; return; }
   appsEl.innerHTML = shown.map(a => {
     const manifestUrl = validRepo ? `https://${owner}.github.io/${repo}/${a.manifest}` : '#';
     const installUrl = `itms-services://?action=download-manifest&url=${encodeURIComponent(manifestUrl)}`;
     const downloadUrl = releaseBase + encodeURIComponent(a.tag) + '/' + encodeURIComponent(a.ipa);
     const canInstall = validRepo && a.manifest && !String(a.manifest).includes('ten-ung-dung');
     return `<article class="app-card ${a.featured ? 'featured' : ''}">
       <div class="card-top"><img class="app-icon" src="${esc(a.icon)}" alt="" onerror="this.src='https://placehold.co/160x160/171a2c/ffffff?text=IPA'"><span class="category">${esc(a.category || 'Ứng dụng')}</span></div>
       <h3>${esc(a.name)}</h3><p class="subtitle">${esc(a.subtitle)}</p>
       <div class="meta"><span>VERSION <b>${esc(a.version || '—')}</b></span><span>BUILD <b>${esc(a.build || '—')}</b></span></div>
       <div class="meta second"><span>${esc(a.size || 'Dung lượng chưa rõ')}</span><span>${esc(a.updated || '')}</span></div>
       <div class="actions">
         ${canInstall ? `<a class="install" href="${installUrl}">Cài đặt ngay <span>↗</span></a>` : `<span class="install disabled">Chưa cấu hình OTA</span>`}
         <a class="download" href="${validRepo ? downloadUrl : '#'}" ${validRepo ? 'target="_blank" rel="noopener"' : ''}>Tải IPA ↓</a>
       </div>
     </article>`;
   }).join('');
 }
 searchEl.addEventListener('input', render);
 if (!validRepo) appsEl.innerHTML = '<div class="setup-warning"><b>Chưa kết nối GitHub</b><p>Mở <code>config.js</code>, thay <code>YOUR_GITHUB_USERNAME</code> bằng tên tài khoản GitHub của bạn, sau đó cập nhật tên repository.</p></div>';
 else render();
})();