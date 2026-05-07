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
    // initKeyboardShortcuts(); // 已停用，避免與瀏覽器衝突
    initUndoRedo();
    initAutoBackup();
    initDragAndDrop();
    initChangelog();
    loadData();
    checkStorageUsage();
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
        'theme.purpleDream': '🔮 紫色夢幻',
        'theme.custom': '🎛️ 自訂顏色',
        'theme.cute': '🌸 可愛風格',
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
        'toast.langChanged': '語言已切換',
        // 側邊欄標題
        'sidebar.contact': '📬 聯絡方式',
        'sidebar.social': '🔗 社群連結',
        // 預設範本文字
        'default.name': '您的姓名',
        'default.title': '您的職稱',
        'default.about': '在這裡寫一段簡短的自我介紹，讓招聘方更了解您的專業背景、技能和職涯目標。',
        'default.jobTitle': '職位名稱',
        'default.company': '公司名稱',
        'default.period': '2020 - 至今',
        'default.jobDesc': '描述您在這個職位上的主要職責、成就和貢獻。',
        'default.degree': '學位名稱',
        'default.school': '學校名稱',
        'default.eduPeriod': '2016 - 2020',
        'default.eduDesc': '描述您的學習成就、相關課程或課外活動。',
        'default.skillName': '技能名稱',
        'default.projectName': '專案名稱',
        'default.projectDesc': '描述這個專案的目標、使用的技術、您的貢獻等。',
        'default.tag': '標籤',
        'default.email': 'email@example.com',
        'default.phone': '+886 912 345 678',
        'default.location': '台北市, 台灣',
        'default.website': 'yourwebsite.com',
        'default.statNumber': '0',
        'default.statLabel': '標籤',
        'default.socialName': '社群名稱',
        'default.contact': '新增資訊',
        'default.urlPlaceholder': '輸入網址',
        'default.urlPlaceholder': '輸入網址',
        'default.linkPlaceholder': '輸入專案連結',
        // 新增板塊選項
        'addSection.title': '➕ 新增板塊',
        'sidebar.add': '+ 新增側邊欄區塊',
        'sidebar.skills': '💡 技能標籤',
        'sidebar.languages': '🌍 語言能力',
        'sidebar.interests': '❤️ 興趣愛好',
        'section.custom': '自訂區塊',
        'section.certifications': '證書認證',
        'section.languages': '語言能力',
        'section.interests': '興趣愛好',
        'btn.cancel': '取消',
        'btn.apply': '套用'
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
        'theme.purpleDream': '🔮 紫色梦幻',
        'theme.custom': '🎛️ 自定颜色',
        'theme.cute': '🌸 可爱风格',
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
        'toast.langChanged': '语言已切换',
        'sidebar.contact': '📬 联系方式',
        'sidebar.social': '🔗 社交链接',
        'default.name': '您的姓名',
        'default.title': '您的职称',
        'default.about': '在这里写一段简短的自我介绍，让招聘方更了解您的专业背景、技能和职业目标。',
        'default.jobTitle': '职位名称',
        'default.company': '公司名称',
        'default.period': '2020 - 至今',
        'default.jobDesc': '描述您在这个职位上的主要职责、成就和贡献。',
        'default.degree': '学位名称',
        'default.school': '学校名称',
        'default.eduPeriod': '2016 - 2020',
        'default.eduDesc': '描述您的学习成就、相关课程或课外活动。',
        'default.skillName': '技能名称',
        'default.projectName': '项目名称',
        'default.projectDesc': '描述这个项目的目标、使用的技术、您的贡献等。',
        'default.tag': '标签',
        'default.email': 'email@example.com',
        'default.phone': '+86 123 4567 8900',
        'default.location': '北京市',
        'default.website': 'yourwebsite.com',
        'default.statNumber': '0',
        'default.statLabel': '标签',
        'default.socialName': '社群名称',
        'default.contact': '新增资讯',
        'default.urlPlaceholder': '输入网址',
        'default.urlPlaceholder': '输入网址',
        'default.linkPlaceholder': '输入项目链接',
        // 新增板块选项
        'addSection.title': '➕ 新增板块',
        'sidebar.add': '+ 新增侧边栏区块',
        'sidebar.skills': '💡 技能标签',
        'sidebar.languages': '🌍 语言能力',
        'sidebar.interests': '❤️ 兴趣爱好',
        'section.custom': '自定区块',
        'section.certifications': '证书认证',
        'section.languages': '语言能力',
        'section.interests': '兴趣爱好',
        'btn.cancel': '取消',
        'btn.apply': '应用'
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
        'theme.purpleDream': '🔮 Purple Dream',
        'theme.custom': '🎛️ Custom Colors',
        'theme.cute': '🌸 Cute Style',
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
        'toast.langChanged': 'Language changed',
        'sidebar.contact': '📬 Contact',
        'sidebar.social': '🔗 Social Links',
        'default.name': 'Your Name',
        'default.title': 'Your Title',
        'default.about': 'Write a brief introduction about yourself here, including your professional background, skills, and career goals.',
        'default.jobTitle': 'Job Title',
        'default.company': 'Company Name',
        'default.period': '2020 - Present',
        'default.jobDesc': 'Describe your main responsibilities, achievements, and contributions in this role.',
        'default.degree': 'Degree Name',
        'default.school': 'School Name',
        'default.eduPeriod': '2016 - 2020',
        'default.eduDesc': 'Describe your academic achievements, relevant courses, or extracurricular activities.',
        'default.skillName': 'Skill Name',
        'default.projectName': 'Project Name',
        'default.projectDesc': 'Describe this project\'s goals, technologies used, and your contributions.',
        'default.tag': 'Tag',
        'default.email': 'email@example.com',
        'default.phone': '+1 234 567 8900',
        'default.location': 'City, Country',
        'default.website': 'yourwebsite.com',
        'default.statNumber': '0',
        'default.statLabel': 'Label',
        'default.socialName': 'Social Name',
        'default.contact': 'New Info',
        'default.urlPlaceholder': 'Enter URL',
        'default.linkPlaceholder': 'Enter Project Link',
        // 新增板塊選項
        'addSection.title': '➕ Add Section',
        'sidebar.add': '+ Add Sidebar Section',
        'sidebar.skills': '💡 Skill Tags',
        'sidebar.languages': '🌍 Languages',
        'sidebar.interests': '❤️ Interests',
        'section.custom': 'Custom Section',
        'section.certifications': 'Certifications',
        'section.languages': 'Languages',
        'section.interests': 'Interests',
        'btn.cancel': 'Cancel',
        'btn.apply': 'Apply'
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
        else if (theme === 'blue-professional') btn.textContent = t('theme.bluePro');
        else if (theme === 'purple-dream') btn.textContent = t('theme.purpleDream');
        else if (theme === 'cute-style') btn.textContent = t('theme.cute');
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
    const addSectionBtn = document.getElementById('addSectionBtn');

    // 編輯按鈕已獨立，只保留 icon，不更新文字
    if (editModeBtn) editModeBtn.innerHTML = `<span class="edit-icon">✏️</span>`;
    if (exportBtn) exportBtn.innerHTML = `<span>📤</span> ${t('edit.export').replace('📤 ', '')}`;
    if (importBtn) importBtn.innerHTML = `<span>📥</span> ${t('edit.import').replace('📥 ', '')}`;
    if (resetBtn) resetBtn.innerHTML = `<span>🔄</span> ${t('edit.reset').replace('🔄 ', '')}`;
    if (printPdfBtn) printPdfBtn.innerHTML = `<span>🖨️</span> ${t('export.pdf').replace('🖨️ ', '')}`;
    if (exportHtmlBtn) exportHtmlBtn.innerHTML = `<span>🌐</span> ${t('export.html').replace('🌐 ', '')}`;
    if (showChangelogBtn) showChangelogBtn.innerHTML = `<span>📋</span> ${t('changelog.title').replace('📋 ', '')}`;
    if (addSectionBtn) addSectionBtn.textContent = t('btn.addSection');

    // 新增板塊 Modal
    const addSectionModalTitle = document.querySelector('#addSectionModal h3');
    if (addSectionModalTitle) addSectionModalTitle.textContent = t('addSection.title');

    document.querySelectorAll('.section-option-btn').forEach(btn => {
        const type = btn.dataset.section;
        const textSpan = btn.querySelector('.option-text');
        if (!textSpan) return;

        if (type === 'about') textSpan.textContent = t('section.about');
        else if (type === 'experience') textSpan.textContent = t('section.experience');
        else if (type === 'education') textSpan.textContent = t('section.education');
        else if (type === 'skills') textSpan.textContent = t('section.skills');
        else if (type === 'projects') textSpan.textContent = t('section.projects');
        else if (type === 'stats') textSpan.textContent = t('section.stats');
        else if (type === 'custom') textSpan.textContent = t('section.custom');
        else if (type === 'certifications') textSpan.textContent = t('section.certifications');
        else if (type === 'languages') textSpan.textContent = t('section.languages');
        else if (type === 'interests') textSpan.textContent = t('section.interests');
    });

    // 取消/套用按鈕
    const cancelAddSection = document.getElementById('cancelAddSection');
    const cancelTheme = document.getElementById('cancelTheme');
    const applyTheme = document.getElementById('applyTheme');
    if (cancelAddSection) cancelAddSection.textContent = t('btn.cancel');
    if (cancelTheme) cancelTheme.textContent = t('btn.cancel');
    if (applyTheme) applyTheme.textContent = t('btn.apply');

    // 側邊欄新增按鈕與選項
    const addSidebarSectionBtn = document.getElementById('addSidebarSectionBtn');
    if (addSidebarSectionBtn) addSidebarSectionBtn.textContent = t('sidebar.add');

    document.querySelectorAll('#sidebarSectionOptions button').forEach(btn => {
        const type = btn.dataset.type;
        if (type === 'contact') btn.innerHTML = `📬 ${t('sidebar.contact').replace('📬 ', '')}`;
        else if (type === 'social') btn.innerHTML = `🔗 ${t('sidebar.social').replace('🔗 ', '')}`;
        else if (type === 'skills-sidebar') btn.innerHTML = `💡 ${t('sidebar.skills')}`;
        else if (type === 'languages') btn.innerHTML = `🌍 ${t('sidebar.languages')}`;
        else if (type === 'interests') btn.innerHTML = `❤️ ${t('sidebar.interests')}`;
    });

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

    // 側邊欄標題
    const contactTitle = document.querySelector('.contact-section h3');
    if (contactTitle) contactTitle.textContent = t('sidebar.contact');

    const socialTitle = document.querySelector('.social-section h3');
    if (socialTitle) socialTitle.textContent = t('sidebar.social');

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

    if (addSectionBtn) addSectionBtn.textContent = t('btn.addSection');

    // 更新預設範本文字（只更新未被用戶修改過的內容）
    updateDefaultTemplates(lang);
}

// 預設範本的原始值映射（用於判斷是否被用戶修改）
// 包含所有語言的預設值
const defaultValueMap = {
    'name': ['您的姓名', 'Your Name'],
    'title': ['您的職稱', '您的职称', 'Your Title'],
    'about-text': [
        '在這裡寫一段簡短的自我介紹，讓招聘方更了解您的專業背景、技能和職涯目標。',
        '在这里写一段简短的自我介绍，让招聘方更了解您的专业背景、技能和职业目标。',
        'Write a brief introduction about yourself here, including your professional background, skills, and career goals.',
        '在此輸入您的自我介紹，包含專業背景、核心能力、工作理念等。例如：擁有多年相關領域經驗，專精於某某技術，熱衷於解決問題並創造價值。',
        '在此输入您的自我介绍，包含专业背景、核心能力、工作理念等。',
        'Enter your self-introduction here, including your professional background, core competencies, and work philosophy.'
    ],
    'jobTitle': ['職位名稱', '职位名称', 'Job Title'],
    'company': ['公司名稱', '公司名称', 'Company Name'],
    'period': [
        '2020 - 至今', '2020 - Present',
        '開始年份 - 結束年份', '开始年份 - 结束年份', 'Start Year - End Year',
        '2016 - 2020'
    ],
    'jobDesc': [
        '描述您在這個職位上的主要職責、成就和貢獻。',
        '描述您在这个职位上的主要职责、成就和贡献。',
        'Describe your main responsibilities, achievements, and contributions in this role.',
        '描述您在此職位的主要職責、達成的成就、使用的技術等。',
        '描述您在此职位的主要职责、达成的成就、使用的技术等。',
        'Describe your key responsibilities, achievements, and technologies used in this position.'
    ],
    'degree': ['學位名稱', '学位名称', 'Degree Name'],
    'school': ['學校名稱', '学校名称', 'School Name'],
    'eduDesc': [
        '描述您的學習成就、相關課程或課外活動。',
        '描述您的学习成就、相关课程或课外活动。',
        'Describe your academic achievements, relevant courses, or extracurricular activities.',
        '描述您的主修、研究方向、獲得的榮譽等。',
        '描述您的主修、研究方向、获得的荣誉等。',
        'Describe your major, research focus, and honors received.'
    ],
    'skillName': ['技能名稱', '技能名称', 'Skill Name', '技能 1', '技能 2', '技能 3'],
    'projectName': ['專案名稱', '项目名称', 'Project Name'],
    'projectDesc': [
        '描述這個專案的目標、使用的技術、您的貢獻等。',
        '描述这个项目的目标、使用的技术、您的贡献等。',
        "Describe this project's goals, technologies used, and your contributions."
    ],
    'tag': ['標籤', '标签', 'Tag', '標籤1', '標籤2', '標籤3'],
    'contact': ['email@example.com', '+886 912 345 678', '+86 123 4567 8900', '+1 234 567 8900', '台北市, 台灣', '北京市', 'City, Country', 'yourwebsite.com'],
    'statLabel': ['標籤', '标签', 'Label', '年經驗', '完成專案', '滿意客戶', '其他數據'],
    'socialName': ['社群名稱', '社群名称', 'Social Name'],
    'contactText': ['新增資訊', '新增资讯', 'New Info'],
    'urlPlaceholder': ['輸入網址', '输入网址', 'Enter URL', '輸入專案連結', '输入项目链接', 'Enter Project Link']
};

function updateDefaultTemplates(lang) {
    // 更新姓名
    const nameEl = document.querySelector('[data-field="name"]');
    if (nameEl && isDefaultValue(nameEl.textContent, 'name')) {
        nameEl.textContent = t('default.name');
    }

    // 更新職稱
    const titleEl = document.querySelector('.title');
    if (titleEl && isDefaultValue(titleEl.textContent, 'title')) {
        titleEl.textContent = t('default.title');
    }

    // 更新關於我
    const aboutEl = document.querySelector('.about-text');
    if (aboutEl && isDefaultValue(aboutEl.textContent, 'about-text')) {
        aboutEl.textContent = t('default.about');
    }

    // 更新工作經歷和學歷
    document.querySelectorAll('.timeline-item').forEach(item => {
        const isEducation = item.closest('[data-section-type="education"]') !== null;
        const titleEl = item.querySelector('[data-field*="-title-"], [data-field*="-degree-"]');
        const companyEl = item.querySelector('[data-field*="-company-"], [data-field*="-school-"]');
        const periodEl = item.querySelector('[data-field*="-date-"]');
        const descEl = item.querySelector('[data-field*="-desc-"]');

        // 標題（職位/學位）
        if (titleEl) {
            const titleKey = isEducation ? 'degree' : 'jobTitle';
            if (isDefaultValue(titleEl.textContent, titleKey) || isDefaultValue(titleEl.textContent, 'jobTitle') || isDefaultValue(titleEl.textContent, 'degree')) {
                titleEl.textContent = isEducation ? t('default.degree') : t('default.jobTitle');
            }
        }

        // 公司/學校
        if (companyEl) {
            const companyKey = isEducation ? 'school' : 'company';
            if (isDefaultValue(companyEl.textContent, companyKey) || isDefaultValue(companyEl.textContent, 'company') || isDefaultValue(companyEl.textContent, 'school')) {
                companyEl.textContent = isEducation ? t('default.school') : t('default.company');
            }
        }

        // 日期
        if (periodEl && isDefaultValue(periodEl.textContent, 'period')) {
            periodEl.textContent = isEducation ? t('default.eduPeriod') : t('default.period');
        }

        // 描述
        if (descEl) {
            const descKey = isEducation ? 'eduDesc' : 'jobDesc';
            if (isDefaultValue(descEl.textContent, descKey) || isDefaultValue(descEl.textContent, 'jobDesc') || isDefaultValue(descEl.textContent, 'eduDesc')) {
                descEl.textContent = isEducation ? t('default.eduDesc') : t('default.jobDesc');
            }
        }
    });

    // 更新專案
    document.querySelectorAll('.project-card').forEach(card => {
        const nameEl = card.querySelector('[data-field*="proj-name-"]');
        const descEl = card.querySelector('[data-field*="proj-desc-"]');
        const urlInput = card.querySelector('.project-url');

        if (nameEl && isDefaultValue(nameEl.textContent, 'projectName')) {
            nameEl.textContent = t('default.projectName');
        }
        if (descEl && isDefaultValue(descEl.textContent, 'projectDesc')) {
            descEl.textContent = t('default.projectDesc');
        }
        if (urlInput && isDefaultValue(urlInput.placeholder, 'urlPlaceholder')) {
            urlInput.placeholder = t('default.linkPlaceholder');
        }
    });

    // 更新技能
    document.querySelectorAll('.skill-name').forEach(el => {
        if (isDefaultValue(el.textContent, 'skillName')) {
            el.textContent = t('default.skillName');
        }
    });

    // 更新標籤
    document.querySelectorAll('.tag, .sidebar-tag').forEach(el => {
        const text = el.textContent.replace('×', '').trim();
        if (isDefaultValue(text, 'tag')) {
            // 保留刪除按鈕
            const hasDeleteBtn = el.querySelector('.tag-delete-btn') || el.closest('.sidebar-tags'); // sidebar tags don't have btn inside usually?
            // Actually sidebar tags don't have delete btn inside span in current implementation
            el.textContent = t('default.tag');
            if (el.querySelector('.tag-delete-btn')) {
                el.innerHTML = t('default.tag') + '<button class="tag-delete-btn" title="刪除標籤">×</button>';
            }
        }
    });

    // 更新統計標籤
    document.querySelectorAll('.stat-label').forEach(el => {
        if (isDefaultValue(el.textContent, 'statLabel')) {
            el.textContent = t('default.statLabel');
        }
    });

    // 更新社群連結
    document.querySelectorAll('.social-item').forEach(item => {
        const nameEl = item.querySelector('.social-name');
        const urlEl = item.querySelector('.social-url');

        if (nameEl && isDefaultValue(nameEl.textContent, 'socialName')) {
            nameEl.textContent = t('default.socialName');
        }
        if (urlEl && isDefaultValue(urlEl.textContent, 'urlPlaceholder')) {
            urlEl.textContent = t('default.urlPlaceholder');
        }
    });

    // 更新聯絡資訊（僅限新增的項目）
    document.querySelectorAll('.contact-item .contact-text').forEach(el => {
        if (isDefaultValue(el.textContent, 'contactText')) {
            el.textContent = t('default.contact');
        }
        // Also check for email default
        if (isDefaultValue(el.textContent, 'contact')) {
            // If matches email default, maybe update to new email default?
            // But 'contact' key has many defaults. 'default.email' is one specific one.
            // Let's just check if it matches specific default.email
            if (el.textContent === translations['zh-TW']['default.email'] || el.textContent === translations['zh-CN']['default.email'] || el.textContent === translations['en']['default.email']) {
                el.textContent = t('default.email');
            }
        }
    });
}

function isDefaultValue(value, key) {
    const defaults = defaultValueMap[key];
    if (!defaults) return false;
    const trimmed = value.trim();
    return defaults.some(d => trimmed === d || trimmed.includes(d));
}

// ===== 設定面板事件 =====
function initSettingsAccordion() {
    // 設定按鈕點擊切換展開/縮起
    const settingsToggle = document.querySelector('.settings-toggle');
    const settingsDropdown = document.querySelector('.settings-dropdown');

    settingsToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown?.classList.toggle('active');
    });

    // 點擊外部關閉設定選單
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-panel')) {
            settingsDropdown?.classList.remove('active');
        }
    });

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
    if (!canvas) return;

    // 檢測用戶是否偏好減少動畫（僅提示，不強制禁用）
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('提示：用戶偏好減少動畫，但粒子背景仍會顯示');
    }

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let isAnimating = true;

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
        if (!isAnimating) return;

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
        animationId = requestAnimationFrame(animate);
    }

    function pauseAnimation() {
        isAnimating = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    function resumeAnimation() {
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }
    }

    // 視窗可見性 API - 離開分頁時暫停動畫
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAnimation();
        } else {
            resumeAnimation();
        }
    });

    // 監聽動畫偏好設定變更
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
        if (e.matches) {
            pauseAnimation();
            canvas.style.display = 'none';
        } else {
            canvas.style.display = 'block';
            resumeAnimation();
        }
    });

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

    // 匯出 (含圖片壓縮)
    exportBtn?.addEventListener('click', async () => {
        showToast('正在壓縮圖片...');
        const data = collectData();
        const compressedData = await compressExportData(data);
        const blob = new Blob([JSON.stringify(compressedData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('資料已匯出！（圖片已壓縮）');
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
            title: t('default.jobTitle'),
            date: t('default.period'),
            company: t('default.company'),
            desc: t('default.jobDesc')
        });
        list.insertAdjacentHTML('beforeend', html);
        saveData();
    });

    // 新增教育背景
    document.getElementById('addEducationBtn')?.addEventListener('click', () => {
        const list = document.getElementById('educationList');
        const index = list.children.length;
        const html = createTimelineItem('edu', index, {
            title: t('default.degree'),
            date: t('default.eduPeriod'),
            company: t('default.school'),
            desc: t('default.eduDesc')
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
                    <span class="skill-name editable" data-field="skill-name-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">${t('default.skillName')}</span>
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
                    <h3 class="editable" data-field="proj-name-${index}" contenteditable="${isEdit}">${t('default.projectName')}</h3>
                    <p class="editable" data-field="proj-desc-${index}" contenteditable="${isEdit}">${t('default.projectDesc')}</p>
                    <div class="project-tags" data-index="${index}">
                        <span class="tag editable" data-field="proj-tag-${index}-0" contenteditable="${isEdit}">${t('default.tag')}</span>
                        <button class="add-tag-btn" title="新增標籤">+</button>
                    </div>
                    <div class="project-link-wrapper">
                        <span class="link-label">🔗</span>
                        <input type="url" class="project-url editable" data-field="proj-url-${index}" placeholder="${t('default.linkPlaceholder')}" value="">
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
                    <span class="social-name editable" data-field="social-name-${index}" contenteditable="${isEdit}">${t('default.socialName')}</span>
                    <a class="social-url" href="#" target="_blank" data-field="social-url-${index}" contenteditable="${isEdit}">${t('default.urlPlaceholder')}</a>
                </div>
                <button class="delete-btn small" title="刪除">✕</button>
            </li>
        `;
        list.insertAdjacentHTML('beforeend', html);
        initSocialLinkEvents();
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
                <span class="stat-label editable" data-field="stat-label-${index}" contenteditable="${isEdit}">${t('default.statLabel')}</span>
                <button class="delete-btn small stat-delete" title="刪除">✕</button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
        saveData();
        showToast('已新增統計項目');
    });

    // 新增聯絡方式
    document.getElementById('addContactBtn')?.addEventListener('click', () => {
        const list = document.getElementById('contactList');
        const index = list.children.length;
        const isEdit = document.body.classList.contains('edit-mode');
        const icons = ['✉️', '📱', '📍', '🌐', '💼', '🏠'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const html = `
            <li class="contact-item" data-index="${index}">
                <span class="icon">${randomIcon}</span>
                <span class="contact-text editable" data-field="contact-${index}" contenteditable="${isEdit}">${t('default.contact')}</span>
                <button class="delete-btn small" title="刪除">✕</button>
            </li>
        `;
        list.insertAdjacentHTML('beforeend', html);
        saveData();
        showToast('已新增聯絡方式');
    });

    // 側邊欄新增區塊按鈕
    const addSidebarBtn = document.getElementById('addSidebarSectionBtn');
    const sidebarOptions = document.getElementById('sidebarSectionOptions');

    addSidebarBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarOptions?.classList.toggle('active');
    });

    // 點擊外部關閉選單
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidebar-add-section')) {
            sidebarOptions?.classList.remove('active');
        }
    });

    // 新增側邊欄區塊
    sidebarOptions?.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const type = btn.dataset.type;
        addSidebarSection(type);
        sidebarOptions.classList.remove('active');
    });

    // 刪除側邊欄區塊
    document.querySelector('.sidebar')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('section-delete-btn')) {
            const section = e.target.closest('.sidebar-section');
            if (section && confirm('確定要刪除此區塊嗎？')) {
                section.remove();
                saveData();
                showToast('區塊已刪除');
            }
        }

        // 刪除聯絡方式項目
        if (e.target.closest('.contact-item .delete-btn')) {
            const item = e.target.closest('.contact-item');
            if (item && confirm('確定要刪除此項目嗎？')) {
                item.remove();
                saveData();
                showToast('項目已刪除');
            }
        }
    });
}

// 新增側邊欄區塊
function addSidebarSection(type) {
    const sidebar = document.querySelector('.sidebar');
    const addSection = document.querySelector('.sidebar-add-section');
    const isEdit = document.body.classList.contains('edit-mode');

    const templates = {
        'contact': `
            <div class="sidebar-section contact-section" data-section-type="contact">
                <button class="section-delete-btn" title="刪除此區塊">✕</button>
                <h3>${t('sidebar.contact')}</h3>
                <ul class="contact-list" id="contactList${Date.now()}">
                    <li class="contact-item" data-index="0">
                        <span class="icon">✉️</span>
                        <span class="contact-text editable" data-field="contact-new-0" contenteditable="${isEdit}">${t('default.email')}</span>
                        <button class="delete-btn small" title="刪除">✕</button>
                    </li>
                </ul>
                <button class="add-btn" onclick="addContactItem(this)">+ 新增聯絡</button>
            </div>
        `,
        'social': `
            <div class="sidebar-section social-section" data-section-type="social">
                <button class="section-delete-btn" title="刪除此區塊">✕</button>
                <h3>${t('sidebar.social')}</h3>
                <ul class="social-list" id="socialLinks${Date.now()}">
                    <li class="social-item" data-index="0">
                        <span class="social-icon">🌐</span>
                        <div class="social-info">
                            <span class="social-name editable" data-field="social-new-0" contenteditable="${isEdit}">${t('default.socialName')}</span>
                            <a class="social-url" href="#" target="_blank" contenteditable="${isEdit}">${t('default.urlPlaceholder')}</a>
                        </div>
                        <button class="delete-btn small" title="刪除">✕</button>
                    </li>
                </ul>
                <button class="add-btn" onclick="addSocialItem(this)">+ 新增社群</button>
            </div>
        `,
        'skills-sidebar': `
            <div class="sidebar-section" data-section-type="skills-sidebar">
                <button class="section-delete-btn" title="刪除此區塊">✕</button>
                <h3>💡 技能標籤</h3>
                <div class="sidebar-tags">
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">技能 1</span>
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">技能 2</span>
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">技能 3</span>
                    <button class="add-tag-inline" onclick="addSidebarTag(this)">+</button>
                </div>
            </div>
        `,
        'languages': `
            <div class="sidebar-section" data-section-type="languages">
                <button class="section-delete-btn" title="刪除此區塊">✕</button>
                <h3>🌍 語言能力</h3>
                <ul class="language-list">
                    <li class="language-item">
                        <span class="language-name editable" contenteditable="${isEdit}">中文</span>
                        <span class="language-level editable" contenteditable="${isEdit}">母語</span>
                    </li>
                    <li class="language-item">
                        <span class="language-name editable" contenteditable="${isEdit}">英文</span>
                        <span class="language-level editable" contenteditable="${isEdit}">流利</span>
                    </li>
                </ul>
            </div>
        `,
        'interests': `
            <div class="sidebar-section" data-section-type="interests">
                <button class="section-delete-btn" title="刪除此區塊">✕</button>
                <h3>❤️ 興趣愛好</h3>
                <div class="sidebar-tags">
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">閱讀</span>
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">旅行</span>
                    <span class="sidebar-tag editable" contenteditable="${isEdit}">音樂</span>
                    <button class="add-tag-inline" onclick="addSidebarTag(this)">+</button>
                </div>
            </div>
        `
    };

    if (templates[type]) {
        addSection.insertAdjacentHTML('beforebegin', templates[type]);
        saveData();
        showToast('已新增區塊');
    }
}

// 新增側邊欄標籤
function addSidebarTag(btn) {
    const tag = document.createElement('span');
    tag.className = 'sidebar-tag editable';
    tag.contentEditable = document.body.classList.contains('edit-mode');
    tag.textContent = t('default.tag');
    btn.parentElement.insertBefore(tag, btn);
    tag.focus();
    saveData();
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

        // 清除匯出前可能殘留的編輯焦點樣式
        clone.querySelectorAll('.editable').forEach(el => {
            el.removeAttribute('style');
            el.removeAttribute('tabindex');
            el.blur?.();
        });

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

    // 儲存側邊欄區塊
    data.sidebarSections = [];
    document.querySelectorAll('.sidebar .sidebar-section').forEach(section => {
        const sectionType = section.dataset.sectionType;
        const clone = section.cloneNode(true);

        // 清理編輯相關元素
        clone.querySelectorAll('.delete-btn, .section-delete-btn, .add-btn, .add-tag-inline').forEach(el => el.remove());
        clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

        data.sidebarSections.push({
            type: sectionType,
            html: clone.outerHTML
        });
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

    // 恢復側邊欄區塊
    if (data.sidebarSections && data.sidebarSections.length > 0) {
        const sidebar = document.querySelector('.sidebar');
        const addSectionBtn = document.querySelector('.sidebar-add-section');
        const profileSection = document.querySelector('.profile-section');

        if (sidebar && addSectionBtn) {
            // 移除現有的側邊欄區塊（除了 profile-section 和 sidebar-add-section）
            sidebar.querySelectorAll('.sidebar-section').forEach(section => {
                section.remove();
            });

            // 恢復儲存的區塊
            data.sidebarSections.forEach(sectionData => {
                addSectionBtn.insertAdjacentHTML('beforebegin', sectionData.html);
            });

            // 重新加入按鈕和其他 UI 元素
            restoreSidebarButtons();
        }
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

// 恢復側邊欄區塊的按鈕
function restoreSidebarButtons() {
    // 為每個側邊欄區塊加入刪除按鈕
    document.querySelectorAll('.sidebar-section').forEach(section => {
        if (!section.querySelector('.section-delete-btn')) {
            section.insertAdjacentHTML('afterbegin', '<button class="section-delete-btn" title="刪除此區塊">✕</button>');
        }
    });

    // 為聯絡區塊加入按鈕
    document.querySelectorAll('.contact-section').forEach(section => {
        const list = section.querySelector('.contact-list');
        if (list && !section.querySelector('.add-btn')) {
            list.insertAdjacentHTML('afterend', '<button class="add-btn" id="addContactBtn">+ 新增聯絡</button>');
        }
        // 為每個聯絡項目加入刪除按鈕
        section.querySelectorAll('.contact-item').forEach(item => {
            if (!item.querySelector('.delete-btn')) {
                item.insertAdjacentHTML('beforeend', '<button class="delete-btn small" title="刪除">✕</button>');
            }
        });
    });

    // 為社群區塊加入按鈕
    document.querySelectorAll('.social-section').forEach(section => {
        const list = section.querySelector('.social-list');
        if (list && !section.querySelector('.add-btn')) {
            list.insertAdjacentHTML('afterend', '<button class="add-btn" id="addSocialBtn">+ 新增社群</button>');
        }
        // 為每個社群項目加入刪除按鈕
        section.querySelectorAll('.social-item').forEach(item => {
            if (!item.querySelector('.delete-btn')) {
                item.insertAdjacentHTML('beforeend', '<button class="delete-btn small" title="刪除">✕</button>');
            }
        });
    });

    // 為標籤區塊加入新增按鈕
    document.querySelectorAll('.sidebar-tags').forEach(container => {
        if (!container.querySelector('.add-tag-inline')) {
            container.insertAdjacentHTML('beforeend', '<button class="add-tag-inline" onclick="addSidebarTag(this)">+</button>');
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
            const input = e.target;
            const wrapper = input.closest('.project-link-wrapper');
            const link = wrapper?.querySelector('.project-link-view');
            if (link) {
                let url = input.value.trim();
                if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                link.href = url || '#';
            }
            saveData();
        }
    });

    // URL 輸入框 blur 事件
    projectsList.addEventListener('blur', (e) => {
        if (e.target.classList.contains('project-url')) {
            const input = e.target;
            const wrapper = input.closest('.project-link-wrapper');
            const link = wrapper?.querySelector('.project-link-view');
            if (link) {
                let url = input.value.trim();
                if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                link.href = url || '#';
            }
            saveData();
        }
    }, true);

    // 初始化時同步所有專案連結
    syncProjectLinks();
}

// 同步專案連結：將輸入框的值同步到可點擊連結
function syncProjectLinks() {
    document.querySelectorAll('.project-link-wrapper').forEach(wrapper => {
        const input = wrapper.querySelector('.project-url');
        const link = wrapper.querySelector('.project-link-view');
        if (input && link) {
            let url = input.value.trim();
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            link.href = url || '#';
            // 如果沒有連結，隱藏連結顯示
            if (!url || url === '#') {
                link.style.opacity = '0.5';
                link.textContent = '尚無連結';
            } else {
                link.style.opacity = '1';
                link.textContent = '查看專案 →';
            }
        }
    });
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

// ===== 社群連結事件 =====
function initSocialLinkEvents() {
    const socialLinks = document.getElementById('socialLinks');
    if (!socialLinks) return;

    // 處理社群連結的編輯和 href 同步
    socialLinks.addEventListener('blur', (e) => {
        if (e.target.classList.contains('social-url')) {
            const link = e.target;
            let url = link.textContent.trim();

            // 自動加上 https:// 如果沒有協議
            if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            link.href = url || '#';
            saveData();
        }
    }, true);

    // 編輯模式下阻止連結跳轉
    socialLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('social-url') && document.body.classList.contains('edit-mode')) {
            e.preventDefault();
        }
    });
}

// 初始化時呼叫
document.addEventListener('DOMContentLoaded', () => {
    initSocialLinkEvents();
});

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

// ===== 鍵盤快捷鍵（已停用，避免與瀏覽器衝突）=====
// function initKeyboardShortcuts() { ... }

// ===== Undo/Redo 功能 =====
const undoStack = [];
const redoStack = [];
const MAX_UNDO_STACK = 50;
let isUndoRedoAction = false;

function initUndoRedo() {
    // 每次內容變更時記錄狀態
    document.addEventListener('input', e => {
        if (e.target.classList.contains('editable') && !isUndoRedoAction) {
            pushUndoState();
        }
    });

    // 初始狀態
    setTimeout(() => {
        pushUndoState();
    }, 500);
}

function pushUndoState() {
    const state = collectData();
    undoStack.push(JSON.stringify(state));

    // 限制堆疊大小
    if (undoStack.length > MAX_UNDO_STACK) {
        undoStack.shift();
    }

    // 清空重做堆疊
    redoStack.length = 0;
}

function undo() {
    if (undoStack.length <= 1) {
        showToast('⚠️ 沒有可撤銷的操作');
        return;
    }

    isUndoRedoAction = true;

    // 將當前狀態推入重做堆疊
    const currentState = undoStack.pop();
    redoStack.push(currentState);

    // 恢復上一個狀態
    const previousState = undoStack[undoStack.length - 1];
    if (previousState) {
        applyData(JSON.parse(previousState));
        showToast('↩️ 已撤銷');
    }

    setTimeout(() => {
        isUndoRedoAction = false;
    }, 100);
}

function redo() {
    if (redoStack.length === 0) {
        showToast('⚠️ 沒有可重做的操作');
        return;
    }

    isUndoRedoAction = true;

    // 從重做堆疊取出狀態
    const nextState = redoStack.pop();
    undoStack.push(nextState);

    applyData(JSON.parse(nextState));
    showToast('↪️ 已重做');

    setTimeout(() => {
        isUndoRedoAction = false;
    }, 100);
}

// ===== 自動備份 =====
function initAutoBackup() {
    // 每分鐘自動備份
    setInterval(() => {
        const backup = {
            timestamp: Date.now(),
            data: collectData()
        };
        localStorage.setItem('resume-backup', JSON.stringify(backup));
        console.log('自動備份完成:', new Date().toLocaleTimeString());
    }, 60000);

    // 檢查是否有備份可恢復
    const backup = localStorage.getItem('resume-backup');
    if (backup) {
        try {
            const { timestamp, data } = JSON.parse(backup);
            const backupTime = new Date(timestamp).toLocaleString();
            console.log(`找到備份 (${backupTime})`);
        } catch (e) {
            console.error('備份資料損壞');
        }
    }
}

// ===== 拖曳排序 =====
function initDragAndDrop() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    let draggedSection = null;

    // 只在編輯模式下啟用拖曳
    function updateDraggable() {
        const isEditMode = document.body.classList.contains('edit-mode');
        document.querySelectorAll('.section').forEach(section => {
            section.draggable = isEditMode;
        });
    }

    // 監聽編輯模式變化
    const observer = new MutationObserver(() => {
        updateDraggable();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Drag 事件
    mainContent.addEventListener('dragstart', e => {
        if (!e.target.classList.contains('section')) return;
        draggedSection = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    mainContent.addEventListener('dragend', e => {
        if (!e.target.classList.contains('section')) return;
        e.target.classList.remove('dragging');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('drag-over'));
        draggedSection = null;
        saveData();
        showToast('📦 板塊順序已更新');
    });

    mainContent.addEventListener('dragover', e => {
        e.preventDefault();
        const section = e.target.closest('.section');
        if (!section || section === draggedSection) return;

        document.querySelectorAll('.section').forEach(s => s.classList.remove('drag-over'));
        section.classList.add('drag-over');
    });

    mainContent.addEventListener('drop', e => {
        e.preventDefault();
        const targetSection = e.target.closest('.section');
        if (!targetSection || !draggedSection || targetSection === draggedSection) return;

        const allSections = [...mainContent.querySelectorAll('.section')];
        const draggedIndex = allSections.indexOf(draggedSection);
        const targetIndex = allSections.indexOf(targetSection);

        if (draggedIndex < targetIndex) {
            targetSection.after(draggedSection);
        } else {
            targetSection.before(draggedSection);
        }

        targetSection.classList.remove('drag-over');
    });
}

// ===== localStorage 容量警告 =====
function checkStorageUsage() {
    try {
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length * 2; // UTF-16 每字元 2 bytes
            }
        }

        const totalMB = totalSize / (1024 * 1024);
        const maxMB = 5; // localStorage 限制約 5MB
        const usagePercent = (totalMB / maxMB) * 100;

        if (usagePercent > 80) {
            showToast(`⚠️ 儲存空間使用 ${usagePercent.toFixed(1)}%，接近上限！`);
        }

        console.log(`localStorage 使用量: ${totalMB.toFixed(2)} MB (${usagePercent.toFixed(1)}%)`);
    } catch (e) {
        console.error('無法檢查儲存空間:', e);
    }
}

// ===== 圖片壓縮（匯出時使用）=====
function compressImage(base64, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // 等比縮放
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            if (height > maxWidth) {
                width = (width * maxWidth) / height;
                height = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(base64); // 失敗時回傳原始圖片
        img.src = base64;
    });
}

// ===== 更新日誌折疊功能 =====
function initChangelog() {
    document.querySelectorAll('.changelog-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;

            // 如果要實現手風琴效果（一次只展開一個），請取消註解以下幾行
            /*
            document.querySelectorAll('.changelog-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            */

            item.classList.toggle('active');
        });
    });
}



// 壓縮匯出資料中的圖片
async function compressExportData(data) {
    const compressedData = { ...data };

    // 壓縮頭像
    if (compressedData.avatar && compressedData.avatar.startsWith('data:image')) {
        compressedData.avatar = await compressImage(compressedData.avatar);
    }

    // 壓縮專案圖片
    if (compressedData.projectImages) {
        for (const [key, src] of Object.entries(compressedData.projectImages)) {
            if (src && src.startsWith('data:image')) {
                compressedData.projectImages[key] = await compressImage(src);
            }
        }
    }

    return compressedData;
}
