// hero-parallax.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroParallax() {
  const heroSection = document.getElementById('hero');
  const firstName = document.querySelector('.hero-title-first');
  const lastName = document.querySelector('.hero-title-last');
  const portrait = document.querySelector('.hero-portrait-img');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  if (!heroSection || !firstName || !lastName || !portrait) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  const isMobile = window.innerWidth < 768;

  // Fade out scroll indicator on scroll
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      opacity: 0,
      y: 14,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
    });
  }

  // Smooth multi-layer parallax timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: isMobile ? 0.3 : 0.6,
      invalidateOnRefresh: true,
    },
  });

  // Layer 1: White "MAHESH" text moves upward
  tl.to(
    firstName,
    {
      yPercent: isMobile ? -10 : -16,
      ease: 'none',
    },
    0
  );

  // Layer 2: Black "GADAKH" text moves upward at slightly faster rate
  tl.to(
    lastName,
    {
      yPercent: isMobile ? -18 : -28,
      ease: 'none',
    },
    0
  );

  // Layer 3: Portrait moves subtly with pure Y translation (preserving auto centering)
  tl.to(
    portrait,
    {
      y: isMobile ? -15 : -35,
      ease: 'none',
    },
    0
  );

  // Layer 4: Transition into dark About section
  tl.to(
    heroSection,
    {
      opacity: 0.92,
      ease: 'power2.in',
    },
    0.4
  );
}
