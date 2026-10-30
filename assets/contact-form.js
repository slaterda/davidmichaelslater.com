(() => {
  const form = document.getElementById('author-contact-form');
  if (!form) return;
  const status = document.getElementById('contact-status');
  const thanks = document.getElementById('contact-thanks');
  const submit = form.querySelector('[type="submit"]');
  const buttonText = submit.innerHTML;
  let sending = false;
  const inquirySubject = new URL(window.location.href).searchParams.get('subject');
  if (inquirySubject === 'Picture Book Critique') {
    form.elements.namedItem('subject').value = inquirySubject;
  }

  if (new URL(window.location.href).searchParams.get('message') === 'sent') {
    form.reset();
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  }

  form.addEventListener('submit', event => {
    if (sending) {
      event.preventDefault();
      return;
    }
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const message = String(fields.get('message') || '').trim();
    if (!name || !email || !message || !form.reportValidity()) {
      event.preventDefault();
      status.textContent = 'Please enter your name, email, and message.';
      status.dataset.error = 'true';
      status.hidden = false;
      return;
    }
    if (String(fields.get('_honey') || '').trim()) {
      event.preventDefault();
      return;
    }

    const subject = String(fields.get('subject') || '').trim();
    form.elements.namedItem('name').value = name;
    form.elements.namedItem('email').value = email;
    form.elements.namedItem('message').value = message;
    form.elements.namedItem('_replyto').value = email;
    form.elements.namedItem('_subject').value = 'Author website contact' +
      (subject ? ' — ' + subject.replace(/[\r\n]+/g, ' ') : '');
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message. This may take a moment.';
    delete status.dataset.error;
    status.hidden = false;
    // Submit normally; the service returns to _next after acceptance.
  });

  window.addEventListener('pageshow', () => {
    sending = false;
    submit.disabled = false;
    submit.innerHTML = buttonText;
    form.removeAttribute('aria-busy');
    status.hidden = true;
  });

  document.getElementById('contact-another').addEventListener('click', () => {
    thanks.hidden = true;
    form.hidden = false;
    form.reset();
    status.hidden = true;
    const url = new URL(window.location.href);
    url.searchParams.delete('message');
    window.history.replaceState(null, '', url);
    document.getElementById('contact-name').focus();
  });
})();
