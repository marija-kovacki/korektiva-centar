import { reviews } from './reviews.js'

//Mobile sidebar
const hamburger = document.getElementById('hamburgerToggle')
const sidebar = document.getElementById('mobileSidebar')
const overlay = document.getElementById('overlay')
const sidebarLinks = sidebar.querySelectorAll('a')

function openSidebar() {
  sidebar.classList.add('open')
  overlay.classList.add('show')
  document.body.classList.add('noscroll')
}

function closeSidebar() {
  sidebar.classList.remove('open')
  overlay.classList.remove('show')
  document.body.classList.remove('noscroll')
}

hamburger.addEventListener('click', openSidebar)
overlay.addEventListener('click', closeSidebar)

sidebarLinks.forEach((link) => {
  link.addEventListener('click', closeSidebar)
})

//Gallery animation
function animateCount(el) {
  const target = +el.dataset.target
  const duration = 1500
  const increment = target / (duration / 30)

  let current = 0

  const update = () => {
    current += increment
    if (current < target) {
      el.textContent = Math.floor(current)
      requestAnimationFrame(update)
    } else {
      el.textContent = target
    }
  }

  update()
}

//Gallery carousel
$(document).ready(function () {
  $('#gallery').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
  })
})

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.count')
        counters.forEach((counter) => animateCount(counter))
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.5,
  }
)

const statsSection = document.getElementById('stats')
observer.observe(statsSection)

const reviewsContainer = document.getElementById('reviews-carousel')

//Reviews elements
reviews.forEach(({ name, rating, comment }) => {
  const reviewEl = document.createElement('div')
  reviewEl.classList.add('review-card')

  reviewEl.innerHTML = `
    <div class="review">
      <h5>${name}</h5>
      <p>${'⭐'.repeat(rating)}</p>
      <p class='comment'>${comment}</p>
    </div>
  `

  reviewsContainer.appendChild(reviewEl)
})

//Reviews carousel
$(document).ready(function () {
  $('#reviews-carousel').owlCarousel({
    items: 3,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  })
})

//FAQ accordion
const faqItems = document.querySelectorAll('.faq-item')

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question')

  question.addEventListener('click', () => {
    faqItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove('active')
      }
    })

    item.classList.toggle('active')
  })
})

//Url correction
document.addEventListener('DOMContentLoaded', function () {
  const targetIds = ['about', 'service', 'Gallery', 'team', 'faq', 'contact']

  const targets = targetIds.map((id) => document.getElementById(id)).filter((el) => el !== null)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          history.replaceState(null, null, `#${id}`)
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
  )

  targets.forEach((section) => observer.observe(section))
})
