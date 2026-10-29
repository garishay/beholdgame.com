(function fall() {
  const season = document.querySelector('.season')
  const bible = season?.querySelector('.bible')
  const timeline = season?.querySelector('.timeline')
  const next = timeline?.querySelector('.next')
  if (!(season instanceof HTMLElement) || !bible || !timeline || !(next instanceof HTMLElement))
    return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const stops = [...timeline.children].filter((stop) => stop instanceof HTMLElement)
  const help = season.querySelector('.help')
  // The frame a scroll has asked for.
  let frame = 0
  const draw = () => {
    frame = 0
    const foot = document.documentElement.scrollHeight - scrollY
    const line = foot - innerHeight <= 1 ? foot : innerHeight * 0.6
    const { top, height } = bible.getBoundingClientRect()
    // Each stop where it sits, not where it is rising or falling to: its place in the timeline.
    const at = timeline.getBoundingClientRect().top
    season.style.setProperty('--fall', `${line - top}px`)
    season.style.setProperty('--rest', `${at + next.offsetTop - top - height * 0.0965}px`)
    for (const stop of stops) stop.classList.toggle('here', at + stop.offsetTop < line)
    help?.classList.toggle('here', next.classList.contains('here'))
  }
  const ask = () => {
    frame ||= requestAnimationFrame(draw)
  }
  // The first draw comes before the season is hidden, so what the line has passed as the page
  // opens never hides, and shows without arriving; what it hasn't passed hides at once, and only
  // then does a stop's coming and going move.
  draw()
  season.classList.add('falls')
  void season.offsetWidth
  season.classList.add('rolls')
  addEventListener('scroll', ask, { passive: true })
  addEventListener('resize', ask)
})()
