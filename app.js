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
    initScrollAnimations();
    initCounters();
    initSkillBars();
    init3DCards();
    initTypingEffect();
    loadData();
});

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

// ===== 編輯模式 =====
function initEditMode() {
    const editBtn = document.getElementById('editModeBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    const printPdfBtn = document.getElementById('printPdfBtn');

    let isEditMode = false;

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
                showToast('資料已匯入！');
            } catch (err) {
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
}

function initAddButtons() {
    // 新增工作經歷
    document.getElementById('addExperienceBtn')?.addEventListener('click', () => {
        const list = document.getElementById('experienceList');
        const index = list.children.length;
        const html = createTimelineItem('exp', index, {
            title: '職位名稱',
            date: '開始 - 結束',
            company: '公司名稱',
            desc: '工作描述...'
        });
        list.insertAdjacentHTML('beforeend', html);
        saveData();
    });

    // 新增教育背景
    document.getElementById('addEducationBtn')?.addEventListener('click', () => {
        const list = document.getElementById('educationList');
        const index = list.children.length;
        const html = createTimelineItem('edu', index, {
            title: '學位',
            date: '開始 - 結束',
            company: '學校名稱',
            desc: '描述...'
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
        const html = `
            <div class="project-card card-3d" data-index="${index}">
                <div class="project-image">
                    <div class="project-placeholder">🖼️</div>
                </div>
                <div class="project-info">
                    <h3 class="editable" data-field="proj-name-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">專案名稱</h3>
                    <p class="editable" data-field="proj-desc-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">專案描述...</p>
                    <div class="project-tags">
                        <span class="tag">標籤</span>
                    </div>
                    <a href="#" class="project-link editable" data-field="proj-link-${index}" contenteditable="${document.body.classList.contains('edit-mode')}">查看專案 →</a>
                </div>
                <button class="delete-btn" title="刪除此項目">✕</button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
        init3DCards();
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
    ['experienceList', 'educationList', 'skillsList', 'projectsList', 'socialLinks'].forEach(listId => {
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

// ===== 資料持久化 =====
function collectData() {
    const data = {
        version: 1,
        avatar: document.getElementById('avatar')?.src || '',
        fields: {},
        stats: []
    };

    document.querySelectorAll('.editable').forEach(el => {
        const field = el.dataset.field;
        if (field) {
            data.fields[field] = el.textContent.trim();
        }
    });

    document.querySelectorAll('.counter').forEach(el => {
        data.stats.push(parseInt(el.dataset.target) || 0);
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
        applyData(data);
    } catch (e) {
        console.error('Failed to load data:', e);
    }
}

function applyData(data) {
    if (data.avatar) {
        const avatar = document.getElementById('avatar');
        if (avatar) avatar.src = data.avatar;
    }

    if (data.fields) {
        Object.entries(data.fields).forEach(([field, value]) => {
            const el = document.querySelector(`[data-field="${field}"]`);
            if (el) el.textContent = value;
        });
    }

    if (data.stats) {
        document.querySelectorAll('.counter').forEach((el, i) => {
            if (data.stats[i] !== undefined) {
                el.dataset.target = data.stats[i];
            }
        });
    }

    // 更新技能條
    setTimeout(() => {
        document.querySelectorAll('.skill-item').forEach(item => {
            const levelEl = item.querySelector('.skill-level');
            const progressEl = item.querySelector('.skill-progress');
            if (levelEl && progressEl) {
                const level = parseInt(levelEl.textContent) || 0;
                progressEl.style.setProperty('--progress', `${level}%`);
            }
        });
    }, 100);
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

// ===== 3D 卡片效果 =====
function init3DCards() {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
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
