let controller;
let slideScene;
let pageScene;
let detailScene;
let mountainScene;

function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide

  sliders.forEach((slide, index, blei) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    // gsap.to(revealImg, 1, { x: "100%" });
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    // Scene kreiren
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      //   .addIndicators({
      //     colorStart: "white",
      //     colorTrigger: "white",
      //     name: "slide",
      //   })
      .addTo(controller);
    // neue Animation

    const pageTl = gsap.timeline();
    let nextSlide = blei.length - 1 === index ? "end" : blei[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.75");
    //neue Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      //   .addIndicators({
      //     colorStart: "white",
      //     colorTrigger: "white",
      //     name: "page",
      //     indent: 200,
      //   })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("mountain-exp")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Mountain";
  } else if (item.classList.contains("hike-exp")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Hike";
  } else if (item.classList.contains("fashion-exp")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "fashion";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = " ";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "#fff" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "#fff" });
    gsap.to("#logo", 1, { color: "#fff" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//Barba Page Transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "/index.html";
        detailAnimation();
      },
      beforeLeave() {
        detailScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "mountain",
      beforeEnter() {
        logo.href = "/index.html";
        animationMountain();
      },
      beforeLeave() {
        mountainTl.destroy();
        controller.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        // Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top

        window.scrollTo(0, 0);
        // Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});
function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, blei) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = blei.length - 1 === index ? "end" : blei[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "20%" }, { x: "0%" });

    //scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene",
      // })
      .addTo(controller);
  });
}
// scene Mountain-Site

function animationMountain() {
  controller = new ScrollMagic.Controller();

  const mountainTl = gsap.timeline();

  mountainTl
    .to("#sixth", 6, {
      y: -700,
    })
    .to(
      "#fifth",
      6,
      {
        y: -500,
      },
      "-=6"
    )
    .to(
      "#forth",
      6,
      {
        y: -400,
      },
      "-=6"
    )
    .to(
      "#third",
      6,
      {
        y: -300,
      },
      "-=6"
    )
    .to(
      "#second",
      6,
      {
        y: -200,
      },
      "-=6"
    )
    .to(
      "#first",
      6,
      {
        y: -100,
      },
      "-=6"
    )
    .to(
      ".mountain-content,.blur",

      6,
      {
        top: "0%",
      },
      "-=6"
    )
    .to(
      ".montain-title",
      6,
      {
        y: -600,
      },
      "-=6"
    )
    .from(
      ".one",
      3,
      {
        top: "40px",
        autoAlpha: 0,
      },
      "-=4"
    )
    .from(
      ".two",
      3,
      {
        top: "40px",
        autoAlpha: 0,
      },
      "-=3.5"
    )
    .from(
      ".three",
      3,
      {
        top: "40px",
        autoAlpha: 0,
      },
      "-=3.5"
    )
    .from(
      ".four",
      3,
      {
        top: "40px",
        autoAlpha: 0,
      },
      "-=3.2"
    )
    .from(
      ".mountain-text",
      3,
      {
        y: 60,
        autoAlpha: 0,
      },
      "-=4"
    );

  mountainScene = new ScrollMagic.Scene({
    triggerElement: "section",
    duration: "200%",
    triggerHook: 0,
  })
    .setTween(mountainTl)
    .setPin("section")
    .addTo(controller);
}

//Event Listners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
