// Small educational ALLOW / MODIFY / BLOCK / UNKNOWN visualisation. Nothing is executed.
export function initAuthorityLabDemo() {
  const root = document.querySelector('[data-al-demo]');
  if (!root) return;
  const buttons = root.querySelectorAll('[data-al-case]');
  const result = root.querySelector('[data-al-result]');
  const decisionEl = root.querySelector('[data-al-decision]');
  const reasonEl = root.querySelector('[data-al-reason]');
  if (!buttons.length || !result) return;

  function select(button) {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    result.dataset.decision = button.dataset.alDecision;
    if (decisionEl) decisionEl.textContent = `${button.dataset.alDecision} · ${button.dataset.alLabel}`;
    if (reasonEl) reasonEl.textContent = button.dataset.alReason;
  }

  buttons.forEach((b) => b.addEventListener('click', () => select(b)));
  select(buttons[0]);
}
