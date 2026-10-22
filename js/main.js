document.querySelectorAll('.menu').forEach(b=>b.addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open')));

// Keep both halves of the scrolling banner wider than the viewport.
// This prevents an empty stretch after the final phrase on wide screens.
const homeTicker = document.querySelector('.home-ticker');
if (homeTicker) {
  const sets = [...homeTicker.querySelectorAll('.home-ticker-set')];
  if (sets.length === 2) {
    const originalItems = sets[0].innerHTML;
    const fillTicker = () => {
      homeTicker.classList.remove('is-ready');
      sets.forEach(set => { set.innerHTML = originalItems; });
      const targetWidth = homeTicker.clientWidth + 80;
      // Add whole phrase sequences so both halves remain identical.
      while (sets[0].getBoundingClientRect().width < targetWidth) {
        sets.forEach(set => set.insertAdjacentHTML('beforeend', originalItems));
      }
      homeTicker.classList.add('is-ready');
    };
    fillTicker();
    let lastWidth = homeTicker.clientWidth;
    window.addEventListener('resize', () => {
      const width = homeTicker.clientWidth;
      if (width !== lastWidth) {
        lastWidth = width;
        fillTicker();
      }
    });
  }
}
