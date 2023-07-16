gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

/*******************************************************************
 * Nav Menu / desktop dropdown
 ********************************************************************/

let body = $("body");

// Full screen nav
let hamburger = $(".button_hamburger");
let menu = $("[show-menu]");
let menuItems = $(".layout_main-nav-menu_scroll-wrap");
let mainNav = $("[main-nav-state]");

let hamburgerLine = $(".button_hamburger_line");
let hamburgerLineTop = $(".button_hamburger_line.is-first");
let hamburgerLineMiddle = $(".button_hamburger_line.is-second");
let hamburgerLineBottom = $(".button_hamburger_line.is-third");

let navTL = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: {
    duration: 0.3,
    ease: "power1.inOut"
  },
  onStart: () => {
    body.addClass("no-scroll");
  },
  onReverseComplete: () => {
    body.removeClass("no-scroll");
  }
});

let hamburgerTl = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: {
    duration: 0.2
  },
  onStart: () => {
    body.addClass("no-scroll");
  },
  onReverseComplete: () => {
    body.removeClass("no-scroll");
  }
});

hamburgerTl
  .to(hamburgerLineTop, { y: 10 }, 0)
  .to(hamburgerLineBottom, { y: -10 }, 0)
  .to(hamburgerLineMiddle, { autoAlpha: 0 }, ">")
  .addLabel("rotate")
  .to(hamburgerLine, { backgroundColor: "white" }, "rotate")
  .to(hamburgerLineTop, { rotate: -45 }, "rotate")
  .to(hamburgerLineBottom, { rotate: 45 }, "rotate");

let menuHeight = $(".main-nav_links-wrap");

navTL
  .set(menu, { display: "flex" })
  .add(hamburgerTl.play(), 0)
  .to(menu, { opacity: 1 }, 0)
  .to(".main-nav_logo", { color: "white" }, 0)
  .to(
    ".main-nav_link",
    {
      opacity: 1,
      stagger: 0.05
    },
    ">"
  )
  .to(".main-nav_footer_logo", { opacity: 1 }, ">");

// DESKTOP NAV
mm.add("(max-width: 991px)", () => {
  hamburger.click(function () {
    const menuAttr = menu.attr("show-menu");

    if (menuAttr === "false") {
      navTL.play();
      menu.attr("show-menu", "true");
      mainNav.attr("main-nav-state", "open");
    } else {
      navTL.reverse();
      menu.attr("show-menu", "false");
      mainNav.attr("main-nav-state", "closed");
    }
  });
});

/* Team read more mobile */
$(".team-member_read-more-button").on("click", function (e) {
  $(this).parent(".team-member_bio-wrap").toggleClass("is-visible");
});

gsap.utils.toArray("[ahoia]").forEach((el) => {
  gsap.fromTo(
    el,
    {
      autoAlpha: 0
    },
    {
      scrollTrigger: {
        trigger: el,
        once: true
      },
      duration: 1,
      delay: 0.2,
      autoAlpha: 1
    }
  );
});

gsap.utils.toArray(".section_full-image_wrap").forEach(function (container) {
  let image = container.querySelector("img");

  gsap.to(image, {
    y: () => image.offsetHeight - container.offsetHeight,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      scrub: true,
      pin: false,
      invalidateOnRefresh: true
    }
  });
});

// Update date year in footer
document.getElementsByClassName(
  "current-year"
).innerHTML = new Date().getFullYear();
