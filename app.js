/**
 * 個人簡歷網頁 - 核心邏輯
 * 功能：編輯模式、主題切換、資料持久化、動態效果
 */

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initTheme();
    initEditMode();
    initSectionManager();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    init3DCards();
    initTypingEffect();
    initProjectEvents();
    initSettingsAccordion();
    loadData();
});

// ===== 多語言資料 =====
const translations = {
    'zh-TW': {
        // 設定面板
        'settings.title': '📄 履歷生產器',
        'settings.language': '🌐 語言 Language',
        'settings.theme': '🎨 主題設定',
        'settings.edit': '✏️ 編輯管理',
        'settings.export': '📄 輸出選項',
        'theme.neonDark': '🌙 深色霓虹',
        'theme.lightMinimal': '☀️ 淺色簡約',
        'theme.bluePro': '💼 藍色專業',
        'theme.purpleDream': '🔮 紫色夢幻',
        'theme.custom': '🎛️ 自訂顏色',
        'edit.mode': '📝 編輯模式',
        'edit.export': '📤 匯出資料',
        'edit.import': '📥 匯入資料',
        'edit.reset': '🔄 初始化',
        'export.pdf': '🖨️ 輸出 PDF',
        'export.html': '🌐 輸出網頁',
        'changelog.title': '📋 更新日誌',
        // 板塊標題
        'section.about': '關於我',
        'section.experience': '工作經歷',
        'section.education': '學歷',
        'section.skills': '技能專長',
        'section.projects': '專案作品',
        'section.stats': '統計數據',
        // 按鈕
        'btn.addExperience': '+ 新增工作經歷',
        'btn.addEducation': '+ 新增學歷',
        'btn.addSkill': '+ 新增技能',
        'btn.addProject': '+ 新增專案',
        'btn.addSocial': '+ 新增社群連結',
        'btn.addStat': '+ 新增統計',
        'btn.addSection': '+ 新增板塊',
        // 提示訊息
        'toast.saved': '資料已儲存',
        'toast.exported': '資料已匯出',
        'toast.imported': '資料已匯入！',
        'toast.reset': '資料已初始化，正在重新載入...',
        'toast.langChanged': '語言已切換'
    },
    'zh-CN': {
        'settings.title': '📄 简历生成器',
        'settings.language': '🌐 语言 Language',
        'settings.theme': '🎨 主题设定',
        'settings.edit': '✏️ 编辑管理',
        'settings.export': '📄 输出选项',
        'theme.neonDark': '🌙 深色霓虹',
        'theme.lightMinimal': '☀️ 浅色简约',
        'theme.bluePro': '💼 蓝色专业',
        'theme.purpleDream': '🔮 紫色梦幻',
        'theme.custom': '🎛️ 自定颜色',
        'edit.mode': '📝 编辑模式',
        'edit.export': '📤 导出数据',
        'edit.import': '📥 导入数据',
        'edit.reset': '🔄 初始化',
        'export.pdf': '🖨️ 输出 PDF',
        'export.html': '🌐 输出网页',
        'changelog.title': '📋 更新日志',
        'section.about': '关于我',
        'section.experience': '工作经历',
        'section.education': '学历',
        'section.skills': '技能专长',
        'section.projects': '项目作品',
        'section.stats': '统计数据',
        'btn.addExperience': '+ 新增工作经历',
        'btn.addEducation': '+ 新增学历',
        'btn.addSkill': '+ 新增技能',
        'btn.addProject': '+ 新增项目',
        'btn.addSocial': '+ 新增社交链接',
        'btn.addStat': '+ 新增统计',
        'btn.addSection': '+ 新增板块',
        'toast.saved': '数据已保存',
        'toast.exported': '数据已导出',
        'toast.imported': '数据已导入！',
        'toast.reset': '数据已初始化，正在重新加载...',
        'toast.langChanged': '语言已切换'
    },
    'en': {
        'settings.title': '📄 Resume Builder',
        'settings.language': '🌐 Language',
        'settings.theme': '🎨 Theme Settings',
        'settings.edit': '✏️ Edit',
        'settings.export': '📄 Export Options',
        'theme.neonDark': '🌙 Neon Dark',
        'theme.lightMinimal': '☀️ Light Minimal',
        'theme.bluePro': '💼 Blue Professional',
        'theme.purpleDream': '🔮 Purple Dream',
        'theme.custom': '🎛️ Custom Colors',
        'edit.mode': '📝 Edit Mode',
        'edit.export': '📤 Export Data',
        'edit.import': '📥 Import Data',
        'edit.reset': '🔄 Reset',
        'export.pdf': '🖨️ Export PDF',
        'export.html': '🌐 Export HTML',
        'changelog.title': '📋 Changelog',
        'section.about': 'About Me',
        'section.experience': 'Experience',
        'section.education': 'Education',
        'section.skills': 'Skills',
        'section.projects': 'Projects',
        'section.stats': 'Statistics',
        'btn.addExperience': '+ Add Experience',
        'btn.addEducation': '+ Add Education',
        'btn.addSkill': '+ Add Skill',
        'btn.addProject': '+ Add Project',
        'btn.addSocial': '+ Add Social Link',
        'btn.addStat': '+ Add Stat',
        'btn.addSection': '+ Add Section',
        'toast.saved': 'Data saved',
        'toast.exported': 'Data exported',
        'toast.imported': 'Data imported!',
        'toast.reset': 'Data reset, reloading...',
        'toast.langChanged': 'Language changed'
    }
};

let currentLang = 'zh-TW';

function t(key) {
    return translations[currentLang]?.[key] || translations['zh-TW'][key] || key;
}

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-TW' : lang === 'zh-CN' ? 'zh-CN' : 'en';

    // 設定面板
    const settingsHeader = document.querySelector('.settings-header span:first-child');
    if (settingsHeader) settingsHeader.textContent = t('settings.title');

    // 設定區塊標題
    const sectionTitles = document.querySelectorAll('.settings-section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = t('settings.language');
    if (sectionTitles[1]) sectionTitles[1].textContent = t('settings.theme');
    if (sectionTitles[2]) sectionTitles[2].textContent = t('settings.edit');
    if (sectionTitles[3]) sectionTitles[3].textContent = t('settings.export');

    // 主題選項
    document.querySelectorAll('.theme-option').forEach(btn => {
        const theme = btn.dataset.theme;
        if (theme === 'neon-dark') btn.textContent = t('theme.neonDark');
        else if (theme === 'light-minimal') btn.textContent = t('theme.lightMinimal');
        else if (theme === 'blue-professional') btn.textContent = t('theme.bluePro');
        else if (theme === 'purple-dream') btn.textContent = t('theme.purpleDream');
        else if (btn.classList.contains('custom-theme-btn')) btn.textContent = t('theme.custom');
    });

    // 編輯按鈕
    const editModeBtn = document.getElementById('editModeBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const resetBtn = document.getElementById('resetBtn');
    const printPdfBtn = document.getElementById('printPdfBtn');
    const exportHtmlBtn = document.getElementById('exportHtmlBtn');
    const showChangelogBtn = document.getElementById('showChangelogBtn');

    if (editModeBtn) editModeBtn.innerHTML = `<span>📝</span> ${t('edit.mode').replace('📝 ', '')}`;
    if (exportBtn) exportBtn.innerHTML = `<span>📤</span> ${t('edit.export').replace('📤 ', '')}`;
    if (importBtn) importBtn.innerHTML = `<span>📥</span> ${t('edit.import').replace('📥 ', '')}`;
    if (resetBtn) resetBtn.innerHTML = `<span>🔄</span> ${t('edit.reset').replace('🔄 ', '')}`;
    if (printPdfBtn) printPdfBtn.innerHTML = `<span>🖨️</span> ${t('export.pdf').replace('🖨️ ', '')}`;
    if (exportHtmlBtn) exportHtmlBtn.innerHTML = `<span>🌐</span> ${t('export.html').replace('🌐 ', '')}`;
    if (showChangelogBtn) showChangelogBtn.innerHTML = `<span>📋</span> ${t('changelog.title').replace('📋 ', '')}`;

    // 更新日誌 Modal 標題
    const changelogTitle = document.querySelector('#changelogModal .modal-header h3');
    if (changelogTitle) changelogTitle.textContent = t('changelog.title');

    // 板塊標題
    document.querySelectorAll('.section').forEach(section => {
        const type = section.dataset.sectionType;
        const titleEl = section.querySelector('.section-title');
        if (!titleEl) return;

        const iconSpan = titleEl.querySelector('.icon');
        const icon = iconSpan ? iconSpan.textContent : '';

        if (type === 'about') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.about')}`;
        else if (type === 'experience') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.experience')}`;
        else if (type === 'education') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.education')}`;
        else if (type === 'skills') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.skills')}`;
        else if (type === 'projects') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.projects')}`;
        else if (type === 'stats') titleEl.innerHTML = `<span class="icon">${icon}</span> ${t('section.stats')}`;
    });

    // 新增按鈕
    document.getElementById('addExperienceBtn')?.childNodes.forEach(n => {
        if (n.nodeType === 3) n.textContent = t('btn.addExperience');
    });
    const addExpBtn = document.getElementById('addExperienceBtn');
    if (addExpBtn) addExpBtn.textContent = t('btn.addExperience');

    const addEduBtn = document.getElementById('addEducationBtn');
    if (addEduBtn) addEduBtn.textContent = t('btn.addEducation');

    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) addSkillBtn.textContent = t('btn.addSkill');

    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) addProjectBtn.textContent = t('btn.addProject');

    const addSocialBtn = document.getElementById('addSocialBtn');
    if (addSocialBtn) addSocialBtn.textContent = t('btn.addSocial');

    const addStatBtn = document.getElementById('addStatBtn');
    if (addStatBtn) addStatBtn.textContent = t('btn.addStat');

    const addSectionBtn = document.getElementById('addSectionBtn');
    if (addSectionBtn) addSectionBtn.textContent = t('btn.addSection');
}

// ===== 設定面板事件 =====
function initSettingsAccordion() {
    // 更新日誌 Modal
    const showChangelogBtn = document.getElementById('showChangelogBtn');
    const changelogModal = document.getElementById('changelogModal');
    const closeChangelog = document.getElementById('closeChangelog');

    showChangelogBtn?.addEventListener('click', () => {
        changelogModal.classList.add('active');
    });

    closeChangelog?.addEventListener('click', () => {
        changelogModal.classList.remove('active');
    });

    changelogModal?.addEventListener('click', e => {
        if (e.target === changelogModal) {
            changelogModal.classList.remove('active');
        }
    });

    // 語言選擇
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.dataset.lang;
            localStorage.setItem('resume-language', lang);
            applyLanguage(lang);
            showToast(t('toast.langChanged'));
        });
    });

    // 載入已儲存的語言設定
    const savedLang = localStorage.getItem('resume-language') || 'zh-TW';
    currentLang = savedLang;
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLang);
    });
    applyLanguage(savedLang);
}

// ===== 粒子背景 =====
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim() || '#66fcf1';

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

// ===== 光標跟隨效果 =====
function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ===== 主題系統 =====
function initTheme() {
    const savedTheme = localStorage.getItem('resume-theme');
    const savedCustom = localStorage.getItem('resume-custom-theme');

    if (savedCustom) {
        applyCustomTheme(JSON.parse(savedCustom));
    } else if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // 主題選項點擊
    document.querySelectorAll('.theme-option[data-theme]').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('resume-theme', theme);
            localStorage.removeItem('resume-custom-theme');
            showToast('主題已切換！');
        });
    });

    // 自訂主題
    const customBtn = document.querySelector('.custom-theme-btn');
    const modal = document.getElementById('customThemeModal');
    const applyBtn = document.getElementById('applyTheme');
    const cancelBtn = document.getElementById('cancelTheme');

    customBtn?.addEventListener('click', () => {
        modal.classList.add('active');
    });

    cancelBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal?.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });

    applyBtn?.addEventListener('click', () => {
        const customTheme = {
            bg: document.getElementById('bgColor').value,
            primary: document.getElementById('primaryColor').value,
            accent: document.getElementById('accentColor').value,
            text: document.getElementById('textColor').value
        };
        applyCustomTheme(customTheme);
        localStorage.setItem('resume-custom-theme', JSON.stringify(customTheme));
        modal.classList.remove('active');
        showToast('自訂主題已套用！');
    });
}

function applyCustomTheme(theme) {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    root.style.setProperty('--bg-primary', theme.bg);
    root.style.setProperty('--bg-secondary', adjustColor(theme.bg, 10));
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-rgb', hexToRgb(theme.primary));
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-rgb', hexToRgb(theme.accent));
    root.style.setProperty('--text-primary', theme.text);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '255, 255, 255';
}

function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// ===== 板塊管理 =====
function initSectionManager() {
    const addSectionBtn = document.getElementById('addSectionBtn');
    const modal = document.getElementById('addSectionModal');
    const cancelBtn = document.getElementById('cancelAddSection');
    const mainContent = document.querySelector('.main-content');

    // 開啟新增板塊 Modal
    addSectionBtn?.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // 關閉 Modal
    cancelBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal?.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // 選擇板塊類型
    document.querySelectorAll('.section-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionType = btn.dataset.section;
            addNewSection(sectionType);
            modal.classList.remove('active');
            showToast('已新增板塊！');
            saveData();
        });
    });

    // 刪除板塊
    document.addEventListener('click', e => {
        if (e.target.classList.contains('section-delete-btn')) {
            const section = e.target.closest('.section');
            if (section && confirm('確定要刪除此板塊嗎？')) {
                section.remove();
                saveData();
                showToast('板塊已刪除');
            }
        }
    });
}

// 板塊模板
const sectionTemplates = {
    about: () => `
        <section class="section animate-on-scroll" data-section-type="about">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">👤</span> 關於我
            </h2>
            <div class="section-content">
                <p class="about-text editable" data-field="about-${Date.now()}">在此輸入關於自己的描述...</p>
            </div>
        </section>
    `,
    experience: () => `
        <section class="section animate-on-scroll" data-section-type="experience">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">💼</span> 工作經歷
            </h2>
            <div class="section-content">
                <div class="timeline" id="experienceList-${Date.now()}">
                    <div class="timeline-item" data-index="0">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content card-3d">
                            <div class="timeline-header">
                                <h3 class="editable">職位名稱</h3>
                                <span class="timeline-date editable">開始 - 結束</span>
                            </div>
                            <h4 class="company editable">公司名稱</h4>
                            <p class="description editable">工作描述...</p>
                            <button class="delete-btn" title="刪除此項目">✕</button>
                        </div>
                    </div>
                </div>
                <button class="add-btn">+ 新增工作經歷</button>
            </div>
        </section>
    `,
    education: () => `
        <section class="section animate-on-scroll" data-section-type="education">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">🎓</span> 教育背景
            </h2>
            <div class="section-content">
                <div class="timeline" id="educationList-${Date.now()}">
                    <div class="timeline-item" data-index="0">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content card-3d">
                            <div class="timeline-header">
                                <h3 class="editable">學位</h3>
                                <span class="timeline-date editable">開始 - 結束</span>
                            </div>
                            <h4 class="company editable">學校名稱</h4>
                            <p class="description editable">描述...</p>
                            <button class="delete-btn" title="刪除此項目">✕</button>
                        </div>
                    </div>
                </div>
                <button class="add-btn">+ 新增教育背景</button>
            </div>
        </section>
    `,
    skills: () => `
        <section class="section animate-on-scroll" data-section-type="skills">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">⚡</span> 技能專長
            </h2>
            <div class="section-content">
                <div class="skills-grid" id="skillsList-${Date.now()}">
                    <div class="skill-item" data-index="0">
                        <div class="skill-header">
                            <span class="skill-name editable">技能名稱</span>
                            <span class="skill-level editable">80</span>%
                            <button class="delete-btn small" title="刪除">✕</button>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="--progress: 80%"></div>
                        </div>
                    </div>
                </div>
                <button class="add-btn">+ 新增技能</button>
            </div>
        </section>
    `,
    projects: () => `
        <section class="section animate-on-scroll" data-section-type="projects">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">🚀</span> 專案作品
            </h2>
            <div class="section-content">
                <div class="projects-grid" id="projectsList-${Date.now()}">
                    <div class="project-card card-3d" data-index="0">
                        <div class="project-image">
                            <div class="project-placeholder">🖼️</div>
                        </div>
                        <div class="project-info">
                            <h3 class="editable">專案名稱</h3>
                            <p class="editable">使用現代化技術堆疊開發的網頁應用程式，解決了...</p>
                            <div class="project-tags">
                                <span class="tag">React</span>
                            </div>
                            <a href="#" class="project-link editable">查看專案 →</a>
                        </div>
                        <button class="delete-btn" title="刪除此項目">✕</button>
                    </div>
                </div>
                <button class="add-btn">+ 新增專案</button>
            </div>
        </section>
    `,
    stats: () => `
        <section class="section animate-on-scroll" data-section-type="stats">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number counter" data-target="5">0</span>
                    <span class="stat-label editable">年開發經驗</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number counter" data-target="50">0</span>
                    <span class="stat-label editable">專案完成</span>
                </div>
            </div>
        </section>
    `,
    custom: () => `
        <section class="section animate-on-scroll" data-section-type="custom">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title editable">
                <span class="icon">📝</span> 自訂標題
            </h2>
            <div class="section-content">
                <p class="editable">在此輸入自訂內容...</p>
            </div>
        </section>
    `,
    certifications: () => `
        <section class="section animate-on-scroll" data-section-type="certifications">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">🏆</span> 證書認證
            </h2>
            <div class="section-content">
                <ul class="cert-list">
                    <li class="cert-item editable">證書名稱 - 發證機構 (年份)</li>
                </ul>
            </div>
        </section>
    `,
    languages: () => `
        <section class="section animate-on-scroll" data-section-type="languages">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">🌍</span> 語言能力
            </h2>
            <div class="section-content">
                <ul class="lang-list">
                    <li class="lang-item"><span class="editable">中文</span> - <span class="editable">母語</span></li>
                    <li class="lang-item"><span class="editable">英文</span> - <span class="editable">流利</span></li>
                </ul>
            </div>
        </section>
    `,
    interests: () => `
        <section class="section animate-on-scroll" data-section-type="interests">
            <button class="section-delete-btn" title="刪除此板塊">✕</button>
            <h2 class="section-title">
                <span class="icon">💡</span> 興趣愛好
            </h2>
            <div class="section-content">
                <div class="interests-tags">
                    <span class="tag editable">閱讀</span>
                    <span class="tag editable">旅遊</span>
                    <span class="tag editable">攝影</span>
                </div>
            </div>
        </section>
    `
};

function addNewSection(type) {
    const mainContent = document.querySelector('.main-content');
    const addBtn = document.getElementById('addSectionBtn');
    const template = sectionTemplates[type];

    if (template && mainContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template();
        const newSection = tempDiv.firstElementChild;

        // 插入到新增按鈕之前
        mainContent.insertBefore(newSection, addBtn);

        // 重新初始化動畫效果
        initScrollAnimations();
        init3DCards();
        initSkillBars();
        initCounters();

        // 如果在編輯模式，設定 contenteditable
        if (document.body.classList.contains('edit-mode')) {
            newSection.querySelectorAll('.editable').forEach(el => {
                el.contentEditable = true;
            });
        }
    }
}

// ===== 編輯模式 =====
function initEditMode() {
    const editBtn = document.getElementById('editModeBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    const printPdfBtn = document.getElementById('printPdfBtn');
    const resetBtn = document.getElementById('resetBtn');

    let isEditMode = false;

    // 初始化按鈕
    resetBtn?.addEventListener('click', () => {
        if (confirm('確定要初始化嗎？這將清除所有已儲存的資料並重新載入頁面。')) {
            localStorage.removeItem('resume-data');
            localStorage.removeItem('resume-theme');
            localStorage.removeItem('resume-custom-theme');
            showToast('資料已初始化，正在重新載入...');
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    });

    editBtn?.addEventListener('click', () => {
        isEditMode = !isEditMode;
        document.body.classList.toggle('edit-mode', isEditMode);
        editBtn.classList.toggle('active', isEditMode);

        // 設定所有可編輯元素
        document.querySelectorAll('.editable').forEach(el => {
            el.contentEditable = isEditMode;
        });

        showToast(isEditMode ? '編輯模式已開啟' : '編輯模式已關閉');

        if (!isEditMode) {
            saveData();
        }
    });

    // 自動儲存 (失去焦點時)
    document.addEventListener('focusout', e => {
        if (e.target.classList.contains('editable')) {
            saveData();
        }
    });

    // 匯出
    exportBtn?.addEventListener('click', () => {
        const data = collectData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('資料已匯出！');
    });

    // 匯入
    importBtn?.addEventListener('click', () => {
        importFile.click();
    });

    importFile?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                applyData(data);
                saveData();

                // 重新設定編輯模式的 contenteditable
                const isEditMode = document.body.classList.contains('edit-mode');
                document.querySelectorAll('.editable').forEach(el => {
                    if (el.tagName !== 'INPUT') {
                        el.contentEditable = isEditMode;
                    }
                });

                showToast('資料已匯入！');
            } catch (err) {
                console.error('Import error:', err);
                showToast('匯入失敗：檔案格式錯誤');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    // 頭像上傳
    const avatarInput = document.getElementById('avatarInput');
    const avatarEdit = document.querySelector('.avatar-edit');
    const avatar = document.getElementById('avatar');

    avatarEdit?.addEventListener('click', () => {
        avatarInput.click();
    });

    avatarInput?.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            avatar.src = event.target.result;
            saveData();
            showToast('頭像已更新！');
        };
        reader.readAsDataURL(file);
    });

    // 新增項目按鈕
    initAddButtons();

    // 刪除按鈕
    document.addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) {
            const item = e.target.closest('[data-index]');
            if (item && confirm('確定要刪除此項目嗎？')) {
                item.remove();
                reindexItems();
                saveData();
                showToast('項目已刪除');
            }
        }
    });

    // PDF 輸出
    printPdfBtn?.addEventListener('click', () => {
        // 暫時關閉編輯模式以獲得乾淨的列印效果
        const wasEditMode = document.body.classList.contains('edit-mode');
        if (wasEditMode) {
            document.body.classList.remove('edit-mode');
            document.querySelectorAll('.editable').forEach(el => {
                el.contentEditable = false;
            });
        }

        showToast('正在準備 PDF...');

        // 延遲一下讓頁面更新
        setTimeout(() => {
            window.print();

            // 恢復編輯模式
            if (wasEditMode) {
                document.body.classList.add('edit-mode');
                document.querySelectorAll('.editable').forEach(el => {
                    el.contentEditable = true;
                });
            }
        }, 300);
    });

    // 輸出完整網頁
    const exportHtmlBtn = document.getElementById('exportHtmlBtn');
    exportHtmlBtn?.addEventListener('click', () => {
        showToast('正在產生網頁...');

        // 暫時關閉編輯模式
        const wasEditMode = document.body.classList.contains('edit-mode');
        if (wasEditMode) {
            document.body.classList.remove('edit-mode');
            document.querySelectorAll('.editable').forEach(el => {
                el.contentEditable = false;
            });
        }

        setTimeout(() => {
            exportAsHtml();

            // 恢復編輯模式
            if (wasEditMode) {
                document.body.classList.add('edit-mode');
                document.querySelectorAll('.editable').forEach(el => {
                    el.contentEditable = true;
                });
            }
        }, 100);
    });
}

function initAddButtons() {
    // 新增工作經歷
    document.getElementById('addExperienceBtn')?.addEventListener('click', () => {
        const list = document.getElementById('experienceList');
        const index = list.children.length;
        const html = createTimelineItem('exp', index, {
            title: '資深前端工程師',
            date: '2023 - 現在',
            company: '公司名稱',
            desc: '負責前端架構設計與開發，優化效能並提升使用者體驗。'
        });
        list.insertAdjacentHTML('beforeend', html);
        saveData();
    });

    // 新增教育背景
    document.getElementById('addEducationBtn')?.addEventListener('click', () => {
        const list = document.getElementById('educationList');
        const index = list.children.length;
        const html = createTimelineItem('edu', index, {
            title: '資訊工程學士',
            date: '2015 - 2019',
            company: '國立台灣大學',
            desc: '主修演算法與軟體工程，畢業專題獲得系上首獎。'
        }, true);
        list.insertAdjacentHTML('beforeend', html);
        saveData();
    });

    // 新增技能
    document.getElementById('addSkillBtn')?.addEventListener('click', () => {
        const list = document.getElementById('skillsList');
        const index = list.children.length;
        const html = `
            <div class="skill-item" data-index="${index}">
                <div class="skill-header">
                    <span class="skill-name editable" data-field="skill-name-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">新技能</span>
                    <span class="skill-level editable" data-field="skill-level-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">50</span>%
                    <button class="delete-btn small" title="刪除">✕</button>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="--progress: 50%"></div>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
        initSkillBars();
        saveData();
    });

    // 新增專案
    document.getElementById('addProjectBtn')?.addEventListener('click', () => {
        const list = document.getElementById('projectsList');
        const index = list.children.length;
        const isEdit = document.body.classList.contains('edit-mode');
        const html = `
            <div class="project-card card-3d" data-index="${index}">
                <div class="project-image">
                    <img class="project-img" id="projectImg-${index}" src="" alt="專案圖片" style="display: none;">
                    <div class="project-placeholder" id="projectPlaceholder-${index}">🖼️</div>
                    <input type="file" class="project-img-input" id="projectImgInput-${index}" accept="image/*" hidden>
                    <button class="project-img-edit" title="更換圖片">📷</button>
                </div>
                <div class="project-info">
                    <h3 class="editable" data-field="proj-name-${index}" contenteditable="${isEdit}">專案名稱</h3>
                    <p class="editable" data-field="proj-desc-${index}" contenteditable="${isEdit}">專案描述...</p>
                    <div class="project-tags" data-index="${index}">
                        <span class="tag editable" data-field="proj-tag-${index}-0" contenteditable="${isEdit}">標籤</span>
                        <button class="add-tag-btn" title="新增標籤">+</button>
                    </div>
                    <div class="project-link-wrapper">
                        <span class="link-label">🔗</span>
                        <input type="url" class="project-url editable" data-field="proj-url-${index}" placeholder="輸入專案連結" value="">
                    </div>
                </div>
                <button class="delete-btn" title="刪除此項目">✕</button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
        initProjectEvents();
        saveData();
    });

    // 新增社群連結
    document.getElementById('addSocialBtn')?.addEventListener('click', () => {
        const list = document.getElementById('socialLinks');
        const index = list.children.length;
        const isEdit = document.body.classList.contains('edit-mode');
        const icons = ['🌐', '📧', '🐦', '📸', '📺', '💬'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const html = `
            <li class="social-item" data-index="${index}">
                <span class="social-icon">${randomIcon}</span>
                <div class="social-info">
                    <span class="social-name editable" data-field="social-name-${index}" contenteditable="${isEdit}">社群名稱</span>
                    <span class="social-url editable" data-field="social-url-${index}" contenteditable="${isEdit}">網址</span>
                </div>
                <button class="delete-btn small" title="刪除">✕</button>
            </li>
        `;
        list.insertAdjacentHTML('beforeend', html);
        saveData();
    });

    // 新增統計項目
    document.getElementById('addStatBtn')?.addEventListener('click', () => {
        const list = document.getElementById('statsList');
        const index = list.children.length;
        const isEdit = document.body.classList.contains('edit-mode');
        const html = `
            <div class="stat-item" data-index="${index}">
                <span class="stat-number editable" data-field="stat-number-${index}" data-target="0" contenteditable="${isEdit}">0</span>
                <span class="stat-label editable" data-field="stat-label-${index}" contenteditable="${isEdit}">標籤</span>
                <button class="delete-btn small stat-delete" title="刪除">✕</button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
        saveData();
        showToast('已新增統計項目');
    });
}

function createTimelineItem(prefix, index, defaults, isEdu = false) {
    const isEdit = document.body.classList.contains('edit-mode');
    const fieldPrefix = prefix;
    const titleField = isEdu ? 'degree' : 'title';
    const companyField = isEdu ? 'school' : 'company';

    return `
        <div class="timeline-item" data-index="${index}">
            <div class="timeline-marker"></div>
            <div class="timeline-content card-3d">
                <div class="timeline-header">
                    <h3 class="editable" data-field="${fieldPrefix}-${titleField}-${index}" contenteditable="${isEdit}">${defaults.title}</h3>
                    <span class="timeline-date editable" data-field="${fieldPrefix}-date-${index}" contenteditable="${isEdit}">${defaults.date}</span>
                </div>
                <h4 class="company editable" data-field="${fieldPrefix}-${companyField}-${index}" contenteditable="${isEdit}">${defaults.company}</h4>
                <p class="description editable" data-field="${fieldPrefix}-desc-${index}" contenteditable="${isEdit}">${defaults.desc}</p>
                <button class="delete-btn" title="刪除此項目">✕</button>
            </div>
        </div>
    `;
}

function reindexItems() {
    ['experienceList', 'educationList', 'skillsList', 'projectsList', 'socialLinks', 'statsList'].forEach(listId => {
        const list = document.getElementById(listId);
        if (!list) return;

        list.querySelectorAll('[data-index]').forEach((item, i) => {
            item.dataset.index = i;
            item.querySelectorAll('[data-field]').forEach(field => {
                const parts = field.dataset.field.split('-');
                parts[parts.length - 1] = i;
                field.dataset.field = parts.join('-');
            });
        });
    });
}

// ===== 輸出完整網頁 =====
async function exportAsHtml() {
    try {
        // 獲取 CSS 內容 - 嘗試從已載入的樣式表獲取
        let cssContent = '';

        // 嘗試多種方式獲取 CSS
        try {
            // 方式 1: 從樣式表規則中獲取
            for (const sheet of document.styleSheets) {
                try {
                    if (sheet.href && sheet.href.includes('style.css')) {
                        const rules = Array.from(sheet.cssRules || []);
                        cssContent = rules.map(rule => rule.cssText).join('\n');
                        break;
                    }
                } catch (e) {
                    // 跨域樣式表會拋出錯誤，繼續嘗試其他方式
                }
            }
        } catch (e) {
            console.log('無法從樣式表獲取 CSS');
        }

        // 方式 2: 如果上面失敗，使用 fetch（僅在 http/https 下有效）
        if (!cssContent && !location.protocol.startsWith('file')) {
            try {
                const response = await fetch('style.css');
                cssContent = await response.text();
            } catch (e) {
                console.log('Fetch CSS 失敗');
            }
        }

        // 方式 3: 如果還是沒有，使用預設的基本樣式
        if (!cssContent) {
            cssContent = getEmbeddedCss();
        }

        // 複製當前 HTML 結構
        const clone = document.documentElement.cloneNode(true);

        // 移除不需要的元素
        const removeSelectors = [
            '#particles',
            '.settings-panel',
            '.cursor-glow',
            '.add-btn',
            '.delete-btn',
            '.section-delete-btn',
            '.add-section-btn',
            '.avatar-edit',
            '.settings-toggle',
            'script',
            '#customThemeModal',
            '#addSectionModal',
            '#importFile',
            '#avatarInput',
            '.toast'
        ];

        removeSelectors.forEach(selector => {
            clone.querySelectorAll(selector).forEach(el => el.remove());
        });

        // 移除所有 contenteditable 屬性
        clone.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
        });

        // 移除 edit-mode class
        clone.querySelector('body')?.classList.remove('edit-mode');

        // 將計數器更新為目標數字
        clone.querySelectorAll('.counter').forEach(counter => {
            const target = counter.dataset.target;
            if (target) {
                counter.textContent = target;
            }
        });

        // 移除 data-theme 以外的 data 屬性保持主題
        // 獲取主題
        const theme = document.documentElement.dataset.theme || '';

        // 獲取當前主題的計算樣式
        const computedStyle = getComputedStyle(document.documentElement);
        const cssVars = `
:root {
    --bg-primary: ${computedStyle.getPropertyValue('--bg-primary').trim() || '#0a0a0f'};
    --bg-secondary: ${computedStyle.getPropertyValue('--bg-secondary').trim() || '#12121a'};
    --bg-card: ${computedStyle.getPropertyValue('--bg-card').trim() || 'rgba(255, 255, 255, 0.03)'};
    --bg-card-hover: ${computedStyle.getPropertyValue('--bg-card-hover').trim() || 'rgba(255, 255, 255, 0.06)'};
    --text-primary: ${computedStyle.getPropertyValue('--text-primary').trim() || '#ffffff'};
    --text-secondary: ${computedStyle.getPropertyValue('--text-secondary').trim() || '#b0b0b0'};
    --text-muted: ${computedStyle.getPropertyValue('--text-muted').trim() || '#888888'};
    --primary: ${computedStyle.getPropertyValue('--primary').trim() || '#66fcf1'};
    --primary-rgb: ${computedStyle.getPropertyValue('--primary-rgb').trim() || '102, 252, 241'};
    --accent: ${computedStyle.getPropertyValue('--accent').trim() || '#ff6b9d'};
    --accent-rgb: ${computedStyle.getPropertyValue('--accent-rgb').trim() || '255, 107, 157'};
    --gradient-1: ${computedStyle.getPropertyValue('--gradient-1').trim() || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    --gradient-2: ${computedStyle.getPropertyValue('--gradient-2').trim() || 'linear-gradient(135deg, #66fcf1 0%, #45a29e 100%)'};
    --border-color: ${computedStyle.getPropertyValue('--border-color').trim() || 'rgba(255, 255, 255, 0.1)'};
    --shadow-color: ${computedStyle.getPropertyValue('--shadow-color').trim() || 'rgba(0, 0, 0, 0.5)'};
    --glass-bg: ${computedStyle.getPropertyValue('--glass-bg').trim() || 'rgba(255, 255, 255, 0.05)'};
    --glass-border: ${computedStyle.getPropertyValue('--glass-border').trim() || 'rgba(255, 255, 255, 0.1)'};
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-full: 50%;
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
`;

        // 建構獨立 HTML
        const standalonHtml = `<!DOCTYPE html>
<html lang="zh-TW"${theme ? ` data-theme="${theme}"` : ''}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${document.querySelector('.name')?.textContent || '個人簡歷'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
${cssVars}
/* 強制顯示統計數據顏色 (避免背景裁切導致透明) */
.stat-number {
    color: var(--primary) !important;
    background: none !important;
    -webkit-text-fill-color: initial !important;
}
${cssContent}
    </style>
</head>
<body>
    ${clone.querySelector('body')?.innerHTML || ''}
    
    <script>
    // 粒子背景
    (function() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles';
        canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;pointer-events:none';
        document.body.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(102, 252, 241, ' + p.opacity + ')';
                ctx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });
            requestAnimationFrame(animate);
        }
        
        resize();
        for (let i = 0; i < 50; i++) particles.push(new Particle());
        animate();
        window.addEventListener('resize', resize);
    })();
    
    // 滾動動畫
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // 計數器動畫
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 30);
    });
    
    // 技能條動畫
    document.querySelectorAll('.skill-progress').forEach(bar => {
        setTimeout(() => bar.style.width = bar.style.getPropertyValue('--progress'), 500);
    });
    </script>
</body>
</html>`;

        // 下載檔案
        const blob = new Blob([standalonHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('網頁已輸出！');
    } catch (error) {
        console.error('輸出失敗:', error);
        showToast('輸出失敗，請稍後再試');
    }
}

// 備用內嵌 CSS（當無法獲取外部 CSS 時使用）
function getEmbeddedCss() {
    // 獲取當前主題的計算樣式
    const style = getComputedStyle(document.documentElement);
    const bgPrimary = style.getPropertyValue('--bg-primary').trim() || '#0a0a0f';
    const bgSecondary = style.getPropertyValue('--bg-secondary').trim() || '#12121a';
    const textPrimary = style.getPropertyValue('--text-primary').trim() || '#ffffff';
    const textSecondary = style.getPropertyValue('--text-secondary').trim() || '#b0b0b0';
    const primary = style.getPropertyValue('--primary').trim() || '#66fcf1';

    return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
    font-family: 'Inter', 'Noto Sans TC', sans-serif; 
    background: ${bgPrimary}; 
    color: ${textPrimary}; 
    line-height: 1.6;
}
.container { display: grid; grid-template-columns: 300px 1fr; gap: 2rem; max-width: 1400px; margin: 0 auto; padding: 2rem; }
.sidebar { position: sticky; top: 2rem; height: fit-content; }
.profile-section, .contact-section, .social-section, .section {
    background: ${bgSecondary};
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(255,255,255,0.1);
}
.avatar-wrapper { width: 120px; height: 120px; margin: 0 auto 1rem; border-radius: 50%; overflow: hidden; }
.avatar { width: 100%; height: 100%; object-fit: cover; }
.name { font-size: 1.5rem; font-weight: 700; text-align: center; color: ${primary}; }
.title { font-size: 0.9rem; color: ${textSecondary}; text-align: center; }
.section-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.timeline { padding-left: 1.5rem; border-left: 2px solid ${primary}; }
.timeline-item { margin-bottom: 1.5rem; }
.timeline-content { background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; }
.timeline-content h3 { font-size: 1rem; }
.timeline-date { font-size: 0.8rem; background: ${primary}; color: #000; padding: 0.25rem 0.5rem; border-radius: 4px; }
.company { font-size: 0.9rem; color: ${primary}; margin: 0.5rem 0; }
.description { font-size: 0.85rem; color: ${textSecondary}; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.skill-item { background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; }
.skill-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.skill-progress { height: 100%; background: ${primary}; transition: width 1s ease; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.project-card { background: rgba(255,255,255,0.03); border-radius: 16px; overflow: hidden; }
.project-image { height: 150px; background: linear-gradient(135deg, ${primary}22, ${primary}44); }
.project-info { padding: 1rem; }
.tag { display: inline-block; padding: 0.25rem 0.5rem; background: ${primary}22; color: ${primary}; border-radius: 4px; font-size: 0.75rem; margin-right: 0.25rem; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.stat-item { text-align: center; padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 16px; }
.stat-number { font-size: 2rem; font-weight: 700; color: ${primary}; }
.stat-label { font-size: 0.85rem; color: ${textSecondary}; }
.contact-list { list-style: none; }
.contact-list li { padding: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; }
.social-list { list-style: none; }
.social-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 0.5rem; }
.animate-on-scroll { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
.animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 900px) { .container { grid-template-columns: 1fr; } .sidebar { position: static; } }
    `;
}

// ===== 資料持久化 =====
function collectData() {
    const data = {
        version: 2,
        avatar: document.getElementById('avatar')?.src || '',
        fields: {},
        stats: [],
        lists: {}  // 儲存動態列表的 HTML
    };

    // 動態列表 ID（這些列表會整體儲存 HTML，不需要單獨儲存 fields）
    const dynamicListIds = ['experienceList', 'educationList', 'skillsList', 'projectsList', 'socialLinks', 'statsList'];

    // 收集動態列表內的元素，儲存時跳過它們
    const dynamicListElements = new Set();
    dynamicListIds.forEach(listId => {
        const list = document.getElementById(listId);
        if (list) {
            list.querySelectorAll('[data-field]').forEach(el => {
                dynamicListElements.add(el);
            });
        }
    });

    // 儲存可編輯欄位（排除動態列表內的）
    document.querySelectorAll('.editable').forEach(el => {
        const field = el.dataset.field;
        if (field && !dynamicListElements.has(el)) {
            // 對於 input 元素，使用 value
            if (el.tagName === 'INPUT') {
                data.fields[field] = el.value;
            } else {
                data.fields[field] = el.innerHTML;
            }
        }
    });

    // 儲存統計數據
    document.querySelectorAll('.counter').forEach(el => {
        data.stats.push(parseInt(el.dataset.target) || 0);
    });

    // 儲存動態列表的 HTML（清理編輯模式相關元素）
    const dynamicLists = ['experienceList', 'educationList', 'skillsList', 'projectsList', 'socialLinks', 'statsList'];
    dynamicLists.forEach(listId => {
        const list = document.getElementById(listId);
        if (list) {
            // 複製節點以便清理
            const clone = list.cloneNode(true);

            // 移除刪除按鈕
            clone.querySelectorAll('.delete-btn').forEach(btn => btn.remove());

            // 移除 contenteditable 屬性
            clone.querySelectorAll('[contenteditable]').forEach(el => {
                el.removeAttribute('contenteditable');
            });

            data.lists[listId] = clone.innerHTML;
        }
    });

    // 儲存專案圖片
    data.projectImages = {};
    document.querySelectorAll('.project-img').forEach(img => {
        if (img.src && !img.src.endsWith('undefined') && img.style.display !== 'none') {
            const card = img.closest('.project-card');
            if (card) {
                data.projectImages[card.dataset.index] = img.src;
            }
        }
    });

    return data;
}

function saveData() {
    const data = collectData();
    localStorage.setItem('resume-data', JSON.stringify(data));

    // 更新技能條
    document.querySelectorAll('.skill-item').forEach(item => {
        const levelEl = item.querySelector('.skill-level');
        const progressEl = item.querySelector('.skill-progress');
        if (levelEl && progressEl) {
            const level = parseInt(levelEl.textContent) || 0;
            progressEl.style.setProperty('--progress', `${Math.min(100, Math.max(0, level))}%`);
        }
    });
}

function loadData() {
    const saved = localStorage.getItem('resume-data');
    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        // 檢查是否為舊版資料格式
        if (data.version < 2) {
            console.log('檢測到舊版資料格式，將在下次儲存時更新');
        }

        applyData(data);
    } catch (e) {
        console.error('Failed to load data:', e);
    }
}

function applyData(data) {
    // 恢復動態列表（需要先恢復，才能正確恢復欄位內容）
    if (data.lists) {
        Object.entries(data.lists).forEach(([listId, html]) => {
            const list = document.getElementById(listId);
            if (list && html) {
                list.innerHTML = html;
            }
        });
    }

    if (data.avatar) {
        const avatar = document.getElementById('avatar');
        if (avatar) avatar.src = data.avatar;
    }


    // 收集動態列表內的元素，避免重複設值
    const dynamicListIds = ['experienceList', 'educationList', 'skillsList', 'projectsList', 'socialLinks', 'statsList'];
    const dynamicListElements = new Set();
    dynamicListIds.forEach(listId => {
        const list = document.getElementById(listId);
        if (list && data.lists && data.lists[listId]) {
            // 標記這個列表內的所有 data-field 元素
            list.querySelectorAll('[data-field]').forEach(el => {
                dynamicListElements.add(el);
            });
        }
    });

    if (data.fields) {
        Object.entries(data.fields).forEach(([field, value]) => {
            const el = document.querySelector(`[data-field="${field}"]`);
            if (el && !dynamicListElements.has(el)) {
                // 只處理不在動態列表內的元素
                if (el.tagName === 'INPUT') {
                    el.value = value;
                } else {
                    el.innerHTML = value;
                }
            }
        });
    }

    if (data.stats) {
        document.querySelectorAll('.counter').forEach((el, i) => {
            if (data.stats[i] !== undefined) {
                el.dataset.target = data.stats[i];
            }
        });
    }

    // 恢復專案圖片
    if (data.projectImages) {
        Object.entries(data.projectImages).forEach(([index, src]) => {
            const img = document.querySelector(`.project-card[data-index="${index}"] .project-img`);
            const placeholder = document.querySelector(`.project-card[data-index="${index}"] .project-placeholder`);
            if (img && src) {
                img.src = src;
                img.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            }
        });
    }

    // 更新技能條並重新初始化動畫
    setTimeout(() => {
        // 為恢復的項目重新加入刪除按鈕
        restoreDeleteButtons();

        document.querySelectorAll('.skill-item').forEach(item => {
            const levelEl = item.querySelector('.skill-level');
            const progressEl = item.querySelector('.skill-progress');
            if (levelEl && progressEl) {
                // 取得純數字（去掉刪除按鈕等內容）
                const levelText = levelEl.textContent || levelEl.innerText || '0';
                const level = parseInt(levelText.replace(/[^0-9]/g, '')) || 0;
                progressEl.style.setProperty('--progress', `${level}%`);
            }
            // 移除 animated 類別以便重新觸發動畫
            item.classList.remove('animated');
        });

        // 重新初始化動態事件和動畫
        initProjectEvents();
        initSkillBars();
    }, 100);
}

// 為恢復的列表項目重新加入刪除按鈕
function restoreDeleteButtons() {
    // 為時間軸項目加入刪除按鈕
    document.querySelectorAll('.timeline-item').forEach(item => {
        if (!item.querySelector('.delete-btn')) {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.insertAdjacentHTML('beforeend', '<button class="delete-btn" title="刪除此項目">✕</button>');
            }
        }
    });

    // 為技能項目加入刪除按鈕
    document.querySelectorAll('.skill-item').forEach(item => {
        if (!item.querySelector('.delete-btn')) {
            item.insertAdjacentHTML('beforeend', '<button class="delete-btn small" title="刪除">✕</button>');
        }
    });

    // 為專案卡片加入刪除按鈕
    document.querySelectorAll('.project-card').forEach(card => {
        if (!card.querySelector('.delete-btn')) {
            card.insertAdjacentHTML('afterbegin', '<button class="delete-btn" title="刪除">✕</button>');
        }
    });

    // 為社群連結加入刪除按鈕
    document.querySelectorAll('#socialLinks .social-item').forEach(item => {
        if (!item.querySelector('.delete-btn')) {
            item.insertAdjacentHTML('beforeend', '<button class="delete-btn small" title="刪除">✕</button>');
        }
    });

    // 為統計項目加入刪除按鈕
    document.querySelectorAll('.stat-item').forEach(item => {
        if (!item.querySelector('.delete-btn')) {
            item.insertAdjacentHTML('beforeend', '<button class="delete-btn small stat-delete" title="刪除">✕</button>');
        }
    });
}

// ===== 滾動動畫 =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== 數字計數器動畫 =====
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target) || 0;
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(el, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };

    requestAnimationFrame(update);
}

// ===== 技能條動畫 =====
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== 卡片 Hover 效果 (純 CSS，不需要 JS) =====
function init3DCards() {
    // 現在使用純 CSS 實現簡單的上浮效果，不需要 JS
}

// ===== 專案卡片事件 =====
function initProjectEvents() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    // 使用事件委派，支援動態新增的元素
    projectsList.addEventListener('click', (e) => {
        // 圖片編輯按鈕
        if (e.target.classList.contains('project-img-edit')) {
            const card = e.target.closest('.project-card');
            const input = card.querySelector('.project-img-input');
            input?.click();
        }

        // 新增標籤按鈕
        if (e.target.classList.contains('add-tag-btn')) {
            const tagsContainer = e.target.closest('.project-tags');
            const projectIndex = tagsContainer.dataset.index;
            const tagCount = tagsContainer.querySelectorAll('.tag').length;
            const isEdit = document.body.classList.contains('edit-mode');

            const newTag = document.createElement('span');
            newTag.className = 'tag editable';
            newTag.dataset.field = `proj-tag-${projectIndex}-${tagCount}`;
            newTag.contentEditable = isEdit;
            newTag.textContent = '標籤';

            // 創建刪除按鈕
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'tag-delete-btn';
            deleteBtn.title = '刪除標籤';
            deleteBtn.textContent = '×';
            newTag.appendChild(deleteBtn);

            tagsContainer.insertBefore(newTag, e.target);

            // 聚焦並選中
            if (isEdit) {
                newTag.focus();
                const range = document.createRange();
                range.selectNodeContents(newTag);
                range.setEndBefore(deleteBtn);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }

            saveData();
        }

        // 標籤刪除按鈕
        if (e.target.classList.contains('tag-delete-btn')) {
            e.stopPropagation();
            const tag = e.target.closest('.tag');
            if (tag && confirm('確定要刪除此標籤嗎？')) {
                tag.remove();
                saveData();
                showToast('標籤已刪除');
            }
        }
    });

    // 圖片上傳變更事件
    projectsList.addEventListener('change', (e) => {
        if (e.target.classList.contains('project-img-input')) {
            const file = e.target.files[0];
            if (!file) return;

            const card = e.target.closest('.project-card');
            const img = card.querySelector('.project-img');
            const placeholder = card.querySelector('.project-placeholder');

            const reader = new FileReader();
            reader.onload = (event) => {
                img.src = event.target.result;
                img.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
                saveData();
                showToast('專案圖片已更新！');
            };
            reader.readAsDataURL(file);
        }

        // URL 輸入框變更
        if (e.target.classList.contains('project-url')) {
            saveData();
        }
    });

    // URL 輸入框 blur 事件
    projectsList.addEventListener('blur', (e) => {
        if (e.target.classList.contains('project-url')) {
            saveData();
        }
    }, true);
}

// ===== 打字機效果 =====
function initTypingEffect() {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    const originalText = typingEl.textContent;
    const titles = [originalText, '全端開發者', 'UI/UX 愛好者', '技術探索者'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentTitle.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            delay = 500;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1000);
}

// ===== Toast 通知 =====
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
