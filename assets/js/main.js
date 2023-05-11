/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

window.onload = function(){
    updateContent();
    i18next
    .use(i18nextHttpBackend)
    .init({
        lng: 'pt',
        fallbackLng: 'pt',
        debug: true,
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
            loadPath: 'locales/lang-{{lng}}.json',
        },
    }, updateContent);
    i18next.on('languageChanged', () => {
        updateContent();
    });
    i18next.on('initialized', () => {
        updateContent();
    });
}

function translateElementsByClass(className, translationKey) {
  [...document.querySelectorAll('.' + className)].forEach(element => {
    element.innerHTML = i18next.t(translationKey);
  });
}

function updateContent() {
    if (i18next.isInitialized) {
        translateElementsByClass('name-i18', 'name');
        translateElementsByClass('designation-i18', 'designation');
        translateElementsByClass('home-i18', 'home');
        translateElementsByClass('about-i18', 'about');
        translateElementsByClass('resume-i18', 'resume');
        translateElementsByClass('contact-i18', 'contact');
        translateElementsByClass('about-p10-i18', 'about-p10');
        translateElementsByClass('about-p11-i18', 'about-p11');
        translateElementsByClass('sinal-sorte-i18', 'sinal-sorte');
        translateElementsByClass('mql5-com-i18', 'mql5-com');
        translateElementsByClass('about-p20-i18', 'about-p20');
        translateElementsByClass('about-p21-i18', 'about-p21');
        translateElementsByClass('region-i18', 'region');
        translateElementsByClass('short-description-i18', 'short-description');
        translateElementsByClass('note-i18', 'note');
        translateElementsByClass('degree-i18', 'degree');
        translateElementsByClass('degree-title-i18', 'degree-title');
        translateElementsByClass('available-i18', 'available');
        translateElementsByClass('skills-i18', 'skills');
        translateElementsByClass('skills-summary-i18', 'skills-summary');
        translateElementsByClass('summary-i18', 'summary');
        translateElementsByClass('education-i18', 'education');
        translateElementsByClass('telecon-degree-course-i18', 'telecon-degree-course');
        translateElementsByClass('management-degree-course-i18', 'management-degree-course');
        translateElementsByClass('incomplete-i18', 'incomplete');
        translateElementsByClass('improvement-courses-i18', 'improvement-courses');
        translateElementsByClass('in-progress-i18', 'in-progress');
        translateElementsByClass('completed-in-i18', 'completed-in');
        translateElementsByClass('hours-i18', 'hours');
        translateElementsByClass('jan-i18', 'jan');
        translateElementsByClass('may-i18', 'may');
        translateElementsByClass('jun-i18', 'jun');
        translateElementsByClass('jul-i18', 'jul');
        translateElementsByClass('oct-i18', 'oct');
        translateElementsByClass('nov-i18', 'nov');
        translateElementsByClass('pt-i18', 'pt');
        translateElementsByClass('en-i18', 'en');
        translateElementsByClass('native-i18', 'native');
        translateElementsByClass('a2-i18', 'a2');
        translateElementsByClass('pro-xp-i18', 'pro-xp');
        translateElementsByClass('full-stack-developer-i18', 'full-stack-developer');
        translateElementsByClass('software-developer-i18', 'software-developer');
        translateElementsByClass('java-web-programmer-i18', 'java-web-programmer');
        translateElementsByClass('java-implementer-analyst-i18', 'java-implementer-analyst');
        translateElementsByClass('trainee-i18', 'trainee');
        translateElementsByClass('alarm-maintenance-tech-i18', 'alarm-maintenance-tech');
        translateElementsByClass('various-positions-i18', 'various-positions');
        translateElementsByClass('present-i18', 'present');
        translateElementsByClass('act-role-p1-i18', 'act-role-p1');
        translateElementsByClass('act-role-p2-i18', 'act-role-p2');
        translateElementsByClass('act-role-p3-i18', 'act-role-p3');
        translateElementsByClass('skills-involved-i18', 'skills-involved');
        translateElementsByClass('g4f-role-p1-i18', 'g4f-role-p1');
        translateElementsByClass('g4f-role-p2-i18', 'g4f-role-p2');
        translateElementsByClass('g4f-role-p3-i18', 'g4f-role-p3');
        translateElementsByClass('celk-role-p1-i18', 'celk-role-p1');
        translateElementsByClass('celk-role-p2-i18', 'celk-role-p2');
        translateElementsByClass('celk-role-p3-i18', 'celk-role-p3');
        translateElementsByClass('omd-role-p1-i18', 'omd-role-p1');
        translateElementsByClass('omd-role-p2-i18', 'omd-role-p2');
        translateElementsByClass('omd-role-p3-i18', 'omd-role-p3');
        translateElementsByClass('softplan-role-p1-i18', 'softplan-role-p1');
        translateElementsByClass('softplan-role-p2-i18', 'softplan-role-p2');
        translateElementsByClass('softplan-role-p3-i18', 'softplan-role-p3');
        translateElementsByClass('wavetech-role-p1-i18', 'wavetech-role-p1');
        translateElementsByClass('wavetech-role-p2-i18', 'wavetech-role-p2');
        translateElementsByClass('wavetech-role-p3-i18', 'wavetech-role-p3');
        translateElementsByClass('ifsc-role-p1-i18', 'ifsc-role-p1');
        translateElementsByClass('khronos-role-p1-i18', 'khronos-role-p1');
        translateElementsByClass('angeloni-role-p1-i18', 'angeloni-role-p1');
        translateElementsByClass('birthday-i18', 'birthday');
        translateElementsByClass('age-i18', 'age');
        translateElementsByClass('phone-i18', 'phone');
        translateElementsByClass('i-have-xp-in-i18', 'i-have-xp-in');
    } else {
        console.warn('i18next not initialized yet');
    }
}

function changeLanguageToEnglish() {
    i18next.changeLanguage('en');
}

function changeLanguageToPortuguese() {
    i18next.changeLanguage('pt');
}