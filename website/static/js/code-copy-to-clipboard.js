// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
document.addEventListener('DOMContentLoaded', function() {
  function button(label, ariaLabel, icon) {
    const btn = document.createElement('button');
    btn.classList.add('cpBtn');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', ariaLabel);
    btn.innerHTML = `${icon}<span class="cpBtnLabel">${label}</span>`
    return btn;
  }

  function addButtons(codeBlockSelector, btn) {
    document.querySelectorAll(codeBlockSelector).forEach(function(code) {
      code.parentNode.appendChild(btn.cloneNode(true));
    });
  }

  const copyIcon =
    '<svg width="12" height="12" viewBox="340 364 14 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M342 376h4v1h-4v-1zm5-6h-5v1h5v-1zm2 3v-2l-3 3 3 3v-2h5v-2h-5zm-4.5-1H342v1h2.5v-1zm-2.5 3h2.5v-1H342v1zm9 1h1v2c0 .3-.1.5-.3.7a1 1 0 0 1-.7.3h-10a1 1 0 0 1-1-1v-11c0-.6.5-1 1-1h3c0-1.1.9-2 2-2a2 2 0 0 1 2 2h3c.5 0 1 .4 1 1v5h-1v-3h-10v9h10v-2zm-9-8h8c0-.6-.5-1-1-1h-1a1 1 0 0 1-1-1c0-.5-.5-1-1-1a1 1 0 0 0-1 1c0 .5-.5 1-1 1h-1a1 1 0 0 0-1 1z" fill-rule="evenodd"/></svg>';

  addButtons(
    '.hljs',
    button('Copy', 'Copy code to clipboard', copyIcon),
  );

  const clipboard = new ClipboardJS('.cpBtn', {
    target: function(trigger) {
      return trigger.parentNode.querySelector('code');
    },
  });

  clipboard.on('success', function(event) {
    event.clearSelection();
    const textEl = event.trigger.querySelector('.cpBtnLabel');
    textEl.textContent = 'Copied';
    setTimeout(function() {
      textEl.textContent = 'Copy';
    }, 2000);
  });
});