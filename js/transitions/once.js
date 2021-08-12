const { anime } = window;

export default (el) => {
  const targets = el.querySelectorAll('.animated');
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
    targets: el,
    opacity: {
      value: [0, 1],
      duration: 0.25,
      easing: 'easeOutQuart',
      delay: anime.stagger(10),
    },
  })
  document.body.scrollTop = 0;
  setTimeout(anim.play, 500);
  setTimeout(anim2.play, 10);
  var $ = jQuery;
  if ($('.inner-form-section').length) {
    /**
     * Evaluate HubSpot elements containing hbspt.forms.create
     * @param {Element} el
     */
    function dynLoadHubSpotForms (el) {
      if (el) {
        const widgetScript = el.querySelector('script') // the second script element contains the init method
        if (!widgetScript) return
        const widgetContent = widgetScript.textContent
        // eslint-disable-next-line no-eval
        eval(widgetContent)
      }
    }

    Array.from(document.querySelectorAll('.inner-form-section')).forEach(el => dynLoadHubSpotForms(el))
  }
  
  return anim.finished;
}