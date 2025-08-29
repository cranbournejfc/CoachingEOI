// ===== Cranbourne Eagles JFC – Coaching EOI (2026) =====
// Replace this with your deployed Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbzxg_YArQJtGDg5813RZOGAhkX-flIpc7SqY0ZUkupwyohvbcP2sZkGGC9U1wvl6ZJa/exec";

const form = document.getElementById('eoi-form');
const statusBox = document.getElementById('status');

function showStatus(type, msg){
  statusBox.classList.remove('hidden');
  statusBox.style.borderColor = type==='success' ? '#18a865' : '#c22';
  statusBox.style.background = '#fff';
  statusBox.textContent = msg;
  statusBox.scrollIntoView({behavior:'smooth', block:'center'});
}

function validateForm(){
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    const field = el.closest('.field, fieldset');
    const err = field ? field.querySelector('.error') : null;
    let ok = true;
    if(el.type === 'radio'){
      // group validation
      const group = form.querySelectorAll(`input[name="${el.name}"]`);
      ok = Array.from(group).some(i => i.checked);
    }else{
      ok = !!el.value.trim();
      if(el.type === 'email'){
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      }
    }
    if(!ok){ valid = false; if(err) err.textContent = 'This field is required.'; }
    else if(err){ err.textContent = ''; }
  });
  return valid;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validateForm()){
    showStatus('error','Please complete all required fields.');
    return;
  }
  const fd = new FormData(form);
  // Add a timestamp field for convenience
  fd.append('submitted_at', new Date().toISOString());
  showStatus('info','Submitting your EOI…');

  try{
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: fd,
      headers: { /* CORS handled by Apps Script */ }
    });
    // Best-effort parse; fall back to generic success if opaque
    let ok = res.ok;
    let data = {};
    try { data = await res.json(); } catch { /* ignore */ }
    if(ok || data?.status === 'success'){
      showStatus('success','Thanks! Your EOI has been submitted successfully. We’ll be in touch after the closing date.');
      form.reset();
    }else{
      throw new Error(data?.message || `Submission failed (HTTP ${res.status}).`);
    }
  }catch(err){
    console.error(err);
    showStatus('error','Submission failed. Please try again later or email the club if the problem persists.');
  }
});

// Clear status on input
form.addEventListener('input', () => {
  statusBox.classList.add('hidden');
});
