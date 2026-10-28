(function fall() {
  const season = document.querySelector('.season')
  const bible = season?.querySelector('.bible')
  const timeline = season?.querySelector('.timeline')
  if (!(season instanceof HTMLElement) || !bible || !timeline) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const stops = [...timeline.children]
  const help = season.querySelector('.help')
  // How far the line has come below the Bible's top and the thread's, and the frame a scroll has
  // asked for.
  let fell = -Infinity
  let drawn = -Infinity
  let frame = 0
  const draw = () => {
    frame = 0
    const foot = document.documentElement.scrollHeight - scrollY
    const line = foot - innerHeight <= 1 ? foot : innerHeight * 0.7
    const thread =
      timeline.getBoundingClientRect().top + parseFloat(getComputedStyle(timeline, '::before').top)
    fell = Math.max(fell, line - bible.getBoundingClientRect().top)
    drawn = Math.max(drawn, line - thread)
    const passed = stops.filter((stop) => stop.getBoundingClientRect().top < line)
    season.style.setProperty('--fall', `${fell}px`)
    season.style.setProperty('--drawn', `${drawn}px`)
    for (const stop of passed) stop.classList.add('here')
    if (stops[stops.length - 1].classList.contains('here')) help?.classList.add('here')
  }
  const ask = () => {
    frame ||= requestAnimationFrame(draw)
  }
  // The first draw comes before the season is hidden, so what the line has passed as the page
  // opens never hides, and shows without arriving.
  draw()
  season.classList.add('falls')
  addEventListener('scroll', ask, { passive: true })
  addEventListener('resize', ask)
})()
