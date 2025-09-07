// ===== Cranbourne Eagles JFC – Coaching EOI (2026) =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGu__gK5_fdu2y70Up7hspzDOpaYHvCholADKUi1jdEC_ElPtR_yRqkonOFzumxPOP/exec";

const form = document.getElementById('eoi-form');
const statusBox = document.getElementById('status');
const thanks = document.getElementById('thanks');
const newResponse = document.getElementById('new-response');

let isProgrammaticReset = false;

function showStatus(type, msg){
  statusBox.classList.remove('hidden');
  statusBox.dataset.persistent = (type === 'success') ? 'true' : 'false';
  statusBox.style.borderColor = type==='success' ? '#18a865' : (type==='error' ? '#c22' : '#e1e6f0');
  statusBox.textContent = msg;
  statusBox.scrollIntoView({behavior:'smooth', block:'center'});
}

function validateForm(){
  let valid = true;
  form.querySelectorAll('[required], fieldset').forEach(el => {
    const field = el.closest('.field, fieldset');
    const err = field ? field.querySelector('.error') : null;
    let ok = true;

    if (el.tagName === 'FIELDSET') return;

    if (el.type === 'radio' || el.type === 'checkbox') {
      const group = form.querySelectorAll(`input[name="${el.name}"]`);
      const anyRequired = Array.from(group).some(i => i.required);
      ok = anyRequired ? Array.from(group).some(i => i.checked) : true;
    } else {
      ok = !!el.value.trim();
      if (el.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    }
    if(!ok){ valid = false; if(err) err.textContent = 'This field is required.'; }
    else if(err){ err.textContent = ''; }
  });

  // Manual requirement: at least one role
  const roleGroup = form.querySelectorAll('input[name="role"]');
  const roleField = roleGroup[0]?.closest('fieldset');
  const roleErr = roleField ? roleField.querySelector('.error') : null;
  const hasRole = Array.from(roleGroup).some(i => i.checked);
  if (!hasRole){ valid = false; if(roleErr) roleErr.textContent = 'Select at least one role.'; }
  else if (roleErr){ roleErr.textContent = ''; }

  return valid;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    if(!validateForm()){
      showStatus('error','Please complete all required fields.');
      return;
    }

    const fd = new FormData(form);
    fd.append('submitted_at', new Date().toISOString());

    showStatus('info','Submitting your EOI…');
    const res = await fetch(SCRIPT_URL, { method: 'POST', body: fd });
    let data = {};
    try { data = await res.json(); } catch {}

    if(res.ok || data?.status === 'success'){
      if (thanks) {
        isProgrammaticReset = true; form.reset(); isProgrammaticReset = false;
        form.classList.add('hidden');
        thanks.classList.remove('hidden');
        statusBox.classList.add('hidden');
      } else {
        showStatus('success','Thanks! Your EOI has been submitted successfully.');
        isProgrammaticReset = true; form.reset(); isProgrammaticReset = false;
      }
    } else {
      throw new Error(data?.message || `Submission failed (HTTP ${res.status}).`);
    }
  } catch (err){
    console.error('Submit error:', err);
    showStatus('error','Submission failed. Please try again later or email the club if the problem persists.');
  }
});

form.addEventListener('input', () => {
  if (isProgrammaticReset) return;
  if (statusBox.dataset.persistent === 'true') return;
  statusBox.classList.add('hidden');
});

if (newResponse) {
  newResponse.addEventListener('click', (e) => {
    e.preventDefault();
    thanks.classList.add('hidden');
    form.classList.remove('hidden');
    statusBox.classList.add('hidden');
    form.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

