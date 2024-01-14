// Event listeners
document.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('anchor')) {
        anchorClick(e.target)
    }
    if (e.target.classList.contains('header__burger')) {
        toggleMenu()
    }
})


function anchorClick(e) {
  const activeAnchor = document.querySelector('.menu__link-active')
      activeAnchor.classList.remove('menu__link-active')
      e.classList.add('menu__link-active')
      if (menuBody.classList.contains('active')) {
          toggleMenu() 
      }
      const blockId = e.getAttribute('href')
      document.querySelector(''+ blockId).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
      })
}

