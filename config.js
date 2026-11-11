/* ============================================================
 * ตั้งค่าแอประบบเบิก OT
 * ใส่ URL ของเว็บแอป Apps Script (ลงท้ายด้วย /exec)
 * หาได้ที่ Apps Script → Deploy → Manage deployments → Web app URL
 * ============================================================ */
window.OT_APP_CONFIG = {
  GAS_URL: 'https://script.google.com/a/macros/mahidol.ac.th/s/AKfycbwYEblccq0Us0KwCairDZbWvZbN9ZPMiL-gYYgAR3fB8M-1pGafzU0xnlXQTVmtJn0SWA/exec',

  // ถ้าภายใน X วินาทีระบบยังเปิดในแอปไม่ได้ จะแสดงปุ่ม "เปิดระบบแบบเต็มหน้าจอ" ให้แทน
  LOAD_TIMEOUT_SEC: 15
};
