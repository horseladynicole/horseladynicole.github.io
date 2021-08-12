import slideUp from '/js/transitions/slideUp.js'
import once from '/js/transitions/once.js'
import filters from '/js/transitions/filters.js'

const { barba, barbaRouter: router} = window

/*
 * App Class
 */
class App {
  static start() {
    return new App()
  }

  constructor() {
    Promise
      .all([
        App.domReady(),
      ])
      .then(this.init.bind(this))
  }

  static domReady() {
    return new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve)
    })
  }

  static showPage() {
    document.documentElement.classList.add('ready')
  }

  init() {
    console.info('🚀App:init')

    // Avoid "blank page" on JS error
    try {
      const duration = 1200
      barba.hooks.before(() => {
        barba.wrapper.classList.add('is-animating');
      })
      barba.hooks.after(() => {
        barba.wrapper.classList.remove('is-animating');
      })
      barba.init({
        debug: true,
        transitions: [
          {
            sync: true,
            leave({ current, next, trigger }) {
              const anim = anime({
                autoplay: false,
                targets: current.container,
                opacity: {
                  value: [1, 0],
                  duration: 0.25,
                },
                easing: 'easeOutQuart',
                delay: anime.stagger(10),
              });
              var toggler = document.getElementsByClassName("navbar-toggler")[0];
              if (toggler.getAttribute('aria-expanded') == "true" ) {
                toggler.click();    
              }
              setTimeout(anim.play, 10);
            },
            enter({ current, next, trigger }) {

              const targets = next.container.querySelectorAll('.animated');
              const duration = 500;
              const anim = anime({
                autoplay: false,
                targets,
                translateY: {
                  value: [100, 0],
                  duration,
                },
                opacity: {
                  duration: duration * 0.5,
                  value: [0, 1],
                },
                easing: 'easeOutQuart',
                delay: anime.stagger(100),
              });
              const anim2 = anime({
                autoplay: false,
                targets: next.container,
                opacity: {
                  value: [0, 1],
                  duration: 0.25,
                  easing: 'easeOutQuart',
                  delay: anime.stagger(10),
                }, 
              });
              
              document.body.scrollTop = 0;
              
              filters(next.container);
              setTimeout(anim.play, 500);
              setTimeout(anim2.play, 10);
              setTimeout(function(){
                var mainarea = document.querySelector('.main-content-wrapper');
                var header = document.querySelector('.header-wrapper');
                if ( mainarea.classList.contains('color-set') == true ) {
                  header.classList.add('nav-color-set');
                } else {
                  header.classList.remove('nav-color-set');
                }
                var $ = jQuery;
              }, 501);
            }
          },
          {
            sync: true,
            once: ({ next }) => once(next.container),
          }
        ],
      })
      console.log(barba.transitions)
      console.log(window.location.href)
    } catch (err) {
      console.error(err)
    }

    App.showPage()
  }
}

App.start()