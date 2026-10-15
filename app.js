// SafeWebGuard Landing Page JavaScript - Light/Dark Mode & Robust FAQ & Toggles

// Theme Management - Defaults to LIGHT Mode on first visit
function initTheme() {
    const savedTheme = localStorage.getItem('safeweb_theme');
    const html = document.documentElement;
    
    // Default is LIGHT mode unless the user explicitly saved 'dark'
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('safeweb_theme', 'light');
        showToast('☀️ تم تفعيل الوضع الفاتح');
    } else {
        html.classList.add('dark');
        localStorage.setItem('safeweb_theme', 'dark');
        showToast('🌙 تم تفعيل الوضع الليلي');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme (Light by default)
    initTheme();

    // Theme toggle buttons (desktop + mobile)
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Mockup Interactive Toggles (Fixed & Polished)
    const mockupSwitches = document.querySelectorAll('.mockup-switch');
    mockupSwitches.forEach(sw => {
        sw.addEventListener('click', () => {
            const isActive = sw.classList.toggle('active');
            const statusLabel = sw.parentElement.querySelector('.switch-status');
            
            if (statusLabel) {
                if (isActive) {
                    statusLabel.textContent = 'مفعل';
                    statusLabel.className = 'switch-status text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded';
                } else {
                    statusLabel.textContent = 'معطل';
                    statusLabel.className = 'switch-status text-[10px] text-gray-400 font-bold bg-gray-700/30 px-1.5 py-0.5 rounded';
                }
            }
        });
    });

    // 4. FAQ Accordion - Completely Fixed & Leak-free Show/Hide
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        
        // Ensure closed state by default
        content.classList.add('hidden');
        item.classList.remove('active');
        if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }

        header.addEventListener('click', () => {
            const isCurrentlyOpen = !content.classList.contains('hidden');
            
            // Close all items first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherContent) otherContent.classList.add('hidden');
                if (otherIcon) {
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // If it wasn't open, open it cleanly
            if (!isCurrentlyOpen) {
                item.classList.add('active');
                content.classList.remove('hidden');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    });

    // 5. Copy Website Link
    window.copyWebsiteLink = function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showToast('✅ تم نسخ رابط الموقع بنجاح، شاركه لحماية البيوت');
        }).catch(() => {
            showToast('تم نسخ الرابط');
        });
    };

    // 6. Toast Notification System
    window.showToast = function(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = message;
        toast.className = 'show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3500);
    };

    // 7. Download Modal & Feedback
    const downloadBtns = document.querySelectorAll('.btn-download-apk');
    const downloadModal = document.getElementById('download-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (downloadBtns.length > 0 && downloadModal) {
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(() => {
                    downloadModal.classList.remove('hidden');
                    downloadModal.classList.add('flex');
                }, 500);
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                downloadModal.classList.add('hidden');
                downloadModal.classList.remove('flex');
            });
        }

        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) {
                downloadModal.classList.add('hidden');
                downloadModal.classList.remove('flex');
            }
        });
    }
});
