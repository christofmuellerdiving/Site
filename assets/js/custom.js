function next() {
  var x = document.getElementById("image1");
  console.log("next", x.style.display);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function goTo(base, section, folder, locale) {
  console.log("goTo", base, section, folder, locale);
  const baseFile = window.location.pathname.split("/").pop().split("_")[0];
  if (baseFile === base) {
    console.log("anchor change");
    // window.location.href = `#${section}`;
    const target = document.getElementById(section);
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  } else {
    const newbase = `${folder}/${base}_${locale}.html#${section}`;
    console.log("basefile", baseFile, "base", base, "newbase", newbase);
    window.location = newbase;
  }
  // alert(baseFile);
}

const navEl = document.getElementById("mainNav");
const hideWithScroll =
  navEl.dataset.hidewithscroll === "hideScroll" ? false : true;

// console.log("*** hideWithScroll ***", hideWithScroll);
// console.log(" dataset: ", navEl.dataset);
// console.log("hideWithScroll dataset: ", navEl.dataset.hidewithscroll);

if (navEl && hideWithScroll) {
  // console.log("will hide with scroll");
  window.addEventListener("scroll", () => {
    // console.log("scroll", window.scrollY);
    if (window.scrollY > 54) {
      navEl.classList.add("navbar-shrink");
    } else {
      navEl.classList.remove("navbar-shrink");
    }
  });
} else {
  console.log("Always showing");
  navEl.classList.add("navbar-shrink");
}


var videos = document.getElementsByTagName("video");

// window.addEventListener("focus", function() {
//   console.log("focus");
//     for (var i = 0; i < videos.length; ++i) {
//         var video = videos[i];
//         video.play();
//     }
// });

// window.addEventListener("blur", function() {
//   console.log("blur");
//     for (var i = 0; i < videos.length; ++i) {
//         var video = videos[i];
//         video.pause();
//     }
// });
// Dezente Einblendung beim Scrollen (abgeschaltet bei "Bewegung reduzieren")
document.addEventListener("DOMContentLoaded", function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var targets = document.querySelectorAll(
    ".page-section .section-heading, .section-intro, .path-step, .portfolio-item, .post-card, .quote-card, .fact-row, .team-member, #xdeep .row > div"
  );
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });
});
