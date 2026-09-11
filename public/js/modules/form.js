// Contact form enhancement: inline validation on blur/submit, character counter, submit state.
// Server-side validation remains authoritative; this only improves feedback.
export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const messages = JSON.parse(form.dataset.messages || '{}');
  const fields = form.querySelectorAll('[data-validate]');
  const submit = form.querySelector('[type="submit"]');
  const summary = form.querySelector('[data-form-summary]');

  function ruleFor(el) {
    const name = el.name;
    const value = el.type === 'checkbox' ? (el.checked ? 'on' : '') : el.value.trim();
    switch (name) {
      case 'name':
        return value.length >= 2 && value.length <= 100;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
      case 'projectType':
        return value !== '';
      case 'message':
        return value.length >= 20 && value.length <= 3000;
      case 'consent':
        return value === 'on';
      case 'company':
        return value.length <= 150;
      case 'deadline':
        return value.length <= 100;
      case 'website':
        return value === '' || /^(https?:\/\/)?[^\s]+\.[^\s]{2,}$/i.test(value);
      default:
        return true;
    }
  }

  function setError(el, show) {
    const wrapper = el.closest('.field');
    const errorEl = wrapper ? wrapper.querySelector('.field__error') : null;
    if (!wrapper || !errorEl) return;
    wrapper.classList.toggle('is-invalid', show);
    el.setAttribute('aria-invalid', String(show));
    errorEl.textContent = show ? messages[el.name] || '' : '';
  }

  fields.forEach((el) => {
    el.addEventListener('blur', () => setError(el, !ruleFor(el)));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true' && ruleFor(el)) setError(el, false);
    });
  });

  // Character counter for the message
  const message = form.querySelector('textarea[name="message"]');
  const counter = form.querySelector('[data-char-count]');
  if (message && counter) {
    const tpl = counter.dataset.template || '{count}';
    const max = Number.parseInt(message.getAttribute('maxlength') || '3000', 10);
    const update = () => {
      counter.textContent = tpl.replace('{count}', String(Math.max(0, max - message.value.length)));
    };
    message.addEventListener('input', update);
    update();
  }

  form.addEventListener('submit', (e) => {
    let firstInvalid = null;
    fields.forEach((el) => {
      const ok = ruleFor(el);
      setError(el, !ok);
      if (!ok && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      e.preventDefault();
      if (summary) {
        summary.hidden = false;
        summary.focus();
      }
      firstInvalid.focus();
      return;
    }
    if (summary) summary.hidden = true;
    if (submit) {
      submit.setAttribute('aria-disabled', 'true');
      submit.textContent = submit.dataset.submitting || submit.textContent;
    }
  });
}
