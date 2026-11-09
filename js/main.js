document.querySelectorAll('.menu').forEach(b=>b.addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open')));

// Keep both halves of each scrolling banner wider than the viewport.
// Duplicate full phrase sequences to prevent gaps on wide screens.
document.querySelectorAll('.home-ticker').forEach(ticker => {
  const sets = [...ticker.querySelectorAll('.home-ticker-set')];
  if (sets.length !== 2) return;
  const originalItems = sets[0].innerHTML;
  const fillTicker = () => {
    ticker.classList.remove('is-ready');
    sets.forEach(set => { set.innerHTML = originalItems; });
    const targetWidth = ticker.clientWidth + 80;
    while (sets[0].getBoundingClientRect().width < targetWidth) {
      sets.forEach(set => set.insertAdjacentHTML('beforeend', originalItems));
    }
    ticker.classList.add('is-ready');
  };
  fillTicker();
  let lastWidth = ticker.clientWidth;
  window.addEventListener('resize', () => {
    const width = ticker.clientWidth;
    if (width !== lastWidth) {
      lastWidth = width;
      fillTicker();
    }
  });
});

// Preselect the relevant contact topic for platform-development inquiries.
const contactInterest = document.querySelector('form[name="contact"] select[name="interest"]');
if (contactInterest && new URLSearchParams(window.location.search).get('interest') === 'platform') {
  contactInterest.value = 'Creating My Own Platform';
}
