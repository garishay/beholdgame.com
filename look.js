((words) => {
  const { spots, prompt, found, count, named, done, slip } = words
  const art = document.querySelector('.hero .art')
  if (!(art instanceof HTMLElement)) return
  const [line, caption, row, find, tally] = ['div', 'p', 'div', 'span', 'span'].map((tag) =>
    document.createElement(tag),
  )
  line.className = 'finds'
  line.setAttribute('aria-live', 'polite')
  row.append(find, tally)
  line.append(caption, row)
  caption.textContent = prompt
  tally.textContent = count.replace('{n}', '0')
  const buttons = spots.map(({ label, at: [x, y] }) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'spot'
    button.setAttribute('aria-label', label)
    button.style.setProperty('--x', `${x}`)
    button.style.setProperty('--y', `${y}`)
    return button
  })
  art.classList.add('look')
  art.append(...buttons, line)
  art.addEventListener('click', ({ target, clientX, clientY }) => {
    if (target instanceof Node && line.contains(target)) return
    // The spot tapped, a keyboard's press included, or the nearest whose edge is within the slip.
    let i = -1
    let near = slip
    buttons.forEach((button, j) => {
      const { x, y, width } = button.getBoundingClientRect()
      const r = width / 2
      const d = button === target ? -Infinity : Math.hypot(clientX - x - r, clientY - y - r) - r
      if (d <= near) [i, near] = [j, d]
    })
    if (i < 0) {
      const box = art.getBoundingClientRect()
      const ring = document.createElement('span')
      ring.className = 'miss'
      ring.style.left = `${clientX - box.x}px`
      ring.style.top = `${clientY - box.y}px`
      art.append(ring)
      setTimeout(() => ring.remove(), 500)
      return
    }
    const { label, caption: said, word } = spots[i]
    buttons[i].classList.add('found')
    buttons[i].setAttribute('aria-label', named.replace('{label}', label))
    const n = buttons.filter((button) => button.classList.contains('found')).length
    caption.textContent = said
    find.textContent = n < spots.length ? found.replace('{word}', word) : done
    tally.textContent = n < spots.length ? count.replace('{n}', `${n}`) : ''
  })
})({"spots":[{"label":"The smoke on the far hill","caption":"Smoke rises from an altar on a far hill.","word":"altar","at":[47,83]},{"label":"The vines along the wall","caption":"Vines heavy with grapes grow along the top of the town wall.","word":"vineyard","at":[309,150]},{"label":"The boy at the brook","caption":"A boy kneels at the brook, choosing smooth stones.","word":"stones","at":[95,317]},{"label":"The chariot on the road","caption":"A chariot climbs the road toward the town gate.","word":"chariot","at":[267,245]}],"found":"Found: {word}","count":"{n} of 4 found","named":"{label}, found","done":"All four found. That’s how Behold is played.","prompt":"Tap anything that looks like it matters.","slip":16})
