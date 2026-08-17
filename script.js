/**
 * مؤسسة أعمال الساندوتش بانل بالرياض - المحرك البرمجي الموحد
 * تحسين التحويلات + تتبع إعلانات جوجل + حقن أزرار الاتصال والواتساب
 */

// ==========================================
// 1. الإعدادات المركزية وإعلانات Google Ads
// ==========================================
const CONFIG = {
  CLIENT_PHONE: "0534234287",
  CLIENT_WHATSAPP: "966534234287",
  DEV_PHONE_EXCLUDED: "966578539687",
  GOOGLE_ADS_ID: "AW-123456789", // استبدل بمعرف إعلاناتك
  CONVERSION_LABEL_CALL: "AbCdEfGhIjK_CALL",
  CONVERSION_LABEL_WHATSAPP: "AbCdEfGhIjK_WHATS",
  CONVERSION_LABEL_FORM: "AbCdEfGhIjK_FORM"
};

// دالة تتبع التحويلات الرسمية
function trackConversion(type, redirectUrl) {
  if (typeof gtag === 'function' && CONFIG.GOOGLE_ADS_ID !== 'AW-123456789') {
    let label = CONFIG.CONVERSION_LABEL_CALL;
    if (type === 'whatsapp') label = CONFIG.CONVERSION_LABEL_WHATSAPP;
    if (type === 'form') label = CONFIG.CONVERSION_LABEL_FORM;

    gtag('event', 'conversion', {
      'send_to': `${CONFIG.GOOGLE_ADS_ID}/${label}`,
      'event_callback': function () {
        if (redirectUrl) window.location.href = redirectUrl;
      }
    });
  } else {
    if (redirectUrl) window.location.href = redirectUrl;
  }
}

// ==========================================
// 2. حقن الأزرار العائمة تلقائياً لكافة الصفحات
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // حقن الأزرار العائمة
  const floatingHtml = `
    <div class="floating-actions-container" aria-label="أزرار التواصل السريع">
      <a href="https://wa.me/${CONFIG.CLIENT_WHATSAPP}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن تفاصيل وأسعار تركيب الساندوتش بانل بالرياض')}" 
         class="floating-btn floating-whatsapp" 
         id="btnFloatWhatsapp" 
         target="_blank" 
         rel="noopener noreferrer" 
         aria-label="تواصل عبر الواتساب">
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.705 1.498zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
      <a href="tel:${CONFIG.CLIENT_PHONE}" 
         class="floating-btn floating-call" 
         id="btnFloatCall" 
         aria-label="اتصال هاتفي مباشر">
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/></svg>
      </a>
      <button class="floating-btn floating-scrolltop" id="btnScrollTop" aria-label="العودة لأعلى الصفحة">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
      </button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', floatingHtml);

  // ربط أحداث الأزرار العائمة
  document.getElementById('btnFloatWhatsapp')?.addEventListener('click', () => {
    trackConversion('whatsapp');
  });

  document.getElementById('btnFloatCall')?.addEventListener('click', () => {
    trackConversion('call');
  });

  // التمرير لأعلى
  const btnScrollTop = document.getElementById('btnScrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btnScrollTop?.classList.add('visible');
    } else {
      btnScrollTop?.classList.remove('visible');
    }
  });
  btnScrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // تتبع جميع روابط الاتصال والواتساب بالموقع تلقائياً (باستثناء رقم المطور)
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    if (!link.href.includes(CONFIG.DEV_PHONE_EXCLUDED)) {
      link.addEventListener('click', () => trackConversion('call'));
    }
  });

  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(link => {
    if (!link.href.includes(CONFIG.DEV_PHONE_EXCLUDED)) {
      link.addEventListener('click', () => trackConversion('whatsapp'));
    }
  });

  // ==========================================
  // 3. إدارة القائمة الجانبية المباشرة للجوال
  // ==========================================
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.mobile-sidebar');
  const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
  const submenuToggle = document.querySelector('.mobile-nav-toggle');
  const submenu = document.querySelector('.mobile-submenu');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
    });
  }

  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  if (submenuToggle && submenu) {
    submenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      submenu.classList.toggle('active');
    });
  }

  // ==========================================
  // 4. معالجة نموذج طلب المعاينة والتحويل للواتساب
  // ==========================================
  const quoteForm = document.getElementById('leadQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName')?.value || 'غير محدد';
      const phone = document.getElementById('formPhone')?.value || 'غير محدد';
      const service = document.getElementById('formService')?.value || 'طلب عام';
      const district = document.getElementById('formDistrict')?.value || 'الرياض';
      const details = document.getElementById('formDetails')?.value || 'لا توجد ملاحظات إضافية';

      const msg = `*طلب معاينة وتسعير جديد (ساندوتش بانل)*\n\n` +
                  `👤 *الاسم:* ${name}\n` +
                  `📞 *الجوال:* ${phone}\n` +
                  `📍 *الحي/المنطقة:* ${district}\n` +
                  `🏗️ *نوع الخدمة:* ${service}\n` +
                  `📝 *التفاصيل:* ${details}\n\n` +
                  `_تم الإرسال من موقع مؤسسة الساندوتش بانل بالرياض_`;

      const targetUrl = `https://wa.me/${CONFIG.CLIENT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
      trackConversion('form', targetUrl);
    });
  }
});
