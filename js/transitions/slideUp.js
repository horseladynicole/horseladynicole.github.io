export default (targets, duration, from, to) => {
  targets.style.transform = `translateY(${from}%)`;

  const translateY = `${to}%`;
  const anim = anime.timeline({
    easing: 'easeInOutSine',
    duration,
  });
  const targets2 = targets.querySelectorAll('.animated');
  const anim2 = anime({
    autoplay: false,
    targets2,
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
  setTimeout(anim2.play, 500);
  anim.add({
    targets,
    translateY,
  });

  return anim.finished;
}