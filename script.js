gsap.registerPlugin(ScrollTrigger);
// const cover = document.getElementById("cover");
const openBookBtn = document.getElementById("openBook");
const bookControls = document.querySelector(".bookControls");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const pages = document.querySelectorAll(".page");
const cover = document.getElementById("cover");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const indicator = document.getElementById("pageIndicator");
const bookCover = document.querySelector('.book-cover');
const gotoTimelineBtn = document.getElementById("gotoTimeline");
const timelineSection = document.getElementById("timelineSection");
const goNextBtn = document.getElementById('goNext');

const navbar = document.getElementById('navbar');
const firstContent = document.getElementById('introPage');
const pageIndicator = document.getElementById("pageIndicator");


gsap.to(".bookWrapper", {
  scrollTrigger: {
    trigger: "#bookSection",
    start: "top 90%",   // when bookSection top reaches 80% of viewport
    toggleActions: "play none none none"
  },
  y: 0,       // move to natural position
  opacity: 1, // fade in
  duration: 1,
  ease: "power2.out"
});

gsap.to("#bookSection", {
  opacity:1,
  y:0,
  duration:0.2,
  ease:"power2.out",
  scrollTrigger: {
    trigger:"#bookWrapper",
    start:"top 90%", // when top of book section reaches 80% of viewport
  }
});

openBookBtn.addEventListener("click", () => {
  gsap.to(cover, {
    rotateY: -120,
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      cover.style.display = "none";
      showPage(0); // show About page
    }
  });
});

gsap.to(".bookControls", {
  scrollTrigger: {
    trigger: "#bookSection",
    start: "top 80%",
  },
  opacity: 1,
  duration: 0.8,
  delay: 2, // small delay after book appears
  ease: "power2.out"
});




document.addEventListener("DOMContentLoaded", () => {

  let currentPage = -1;
  // OPEN BOOK
  openBookBtn.addEventListener("click", () => {
    gsap.to(bookControls, {
    opacity: 1,
    visibility: "visible",
    y: 0,
    duration: 1,
    ease: "power2.out"
  });

  // Animate and hide the cover
  gsap.to(cover, {
    rotateY: -120,
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      cover.style.display = "none";
      showPage(0); // show first page
    }
  });
});


// s.toArray(".timelineItem").forEach(item => {




const coverObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // triggers slow fade-in
      coverObserver.unobserve(entry.target); // only once
    }
  });
}, {
  threshold: 0.3
});

coverObserver.observe(bookCover);

// Select all prize cards
const prizeCards = document.querySelectorAll('.prizeCard');

const prizeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      prizeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

// Apply observer to each card with staggered delay
prizeCards.forEach((card, index) => {
  prizeObserver.observe(card);
  card.style.transitionDelay = `${index * 0.15}s`; // stagger effect
});


document.querySelectorAll(".timelineItem").forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    delay: i * 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
    }
  });
});

const faqItems = document.querySelectorAll('.faqItem');

faqItems.forEach(item => {
  // Click to toggle answer
  item.querySelector('.question').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

const items = document.querySelectorAll('.timelineItem');

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('active');
//     }
//   });
// }, { threshold: 0.3 });

document.querySelectorAll(".faqItem").forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

// Scroll animation: questions appear
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faqItems.forEach(item => observer.observe(item));


  function showPage(index) {
  pages.forEach((p, i) => {
    if (index === 4) {
  gsap.to("#registerBtn", {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.3
  });
}
if (index !== 4) {
  gsap.set("#registerBtn", { scale: 0.8, opacity: 0 });
}

    if(index === 1){  // Domains page
  const domainItems = document.querySelectorAll("#domainList li");
  gsap.to(domainItems, {
    opacity: 1,
    y: 0,
    duration: 4,
    stagger: 0.3,  // appear one by one
    ease: "power2.out"
  });
}
if(i==2) {
  const domainItems = document.querySelectorAll("#domainList1 li");
  gsap.to(domainItems, {
    opacity: 1,
    y: 0,
    duration: 4,
    stagger: 0.3,  // appear one by one
    ease: "power2.out"
  });
}
    if (i < index) {
      gsap.to(p, { rotateY: -180, opacity: 0, duration: 0.8 });
    } 
    else if (i === index) {
      p.classList.add("active");
      gsap.fromTo(
        p,
        { rotateY: -90, opacity: 0 },
        { rotateY: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      );
    }
    else {
      p.classList.remove("active");
      gsap.set(p, { rotateY: 0, opacity: 0 });
    }
  });

  currentPage = index;
  indicator.textContent = `${index + 1} / ${pages.length}`;
}






gotoTimelineBtn.addEventListener("click", () => {
  const timelineSection = document.getElementById("timelineSection");
  timelineSection.scrollIntoView({ behavior: "smooth" });
});


  nextBtn.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {

      showPage(currentPage - 1);
    }
  });

});



function goToIntro() {
  document.getElementById("introPage").scrollIntoView({
    behavior: "smooth"
  });
}

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu after clicking a link (mobile)
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Animate timeline items on scroll


// Animate prize cards on scroll
document.querySelectorAll(".prizeCard").forEach(card => {
  gsap.to(card, {
    opacity:1,
    y:0,
    // duration:0.2,
    ease:"power2.out",
    scrollTrigger: {
      trigger: card,
      start:"top 100%",
    }
  });
});

// FAQ Accordion
document.querySelectorAll(".faqItem").forEach(item => {
  const answer = item.querySelector(".answer");
  item.addEventListener("click", () => {
    const isOpen = answer.style.height && answer.style.height !== "0px";
    
    if (isOpen) {
      // Close
      gsap.to(answer, {height:0, opacity:0, duration:0.5, ease:"power2.out"});
    } else {
      // Open
      gsap.set(answer, {height:"auto"});
      gsap.from(answer, {height:0, opacity:0, duration:0.5, ease:"power2.out"});
      gsap.to(answer, {height:answer.scrollHeight, opacity:1, duration:0.5, ease:"power2.out"});
    }
  });
});

// Animate contact cards and form on scroll
document.querySelectorAll("#contactSection .contactCard, #contactSection .contactForm").forEach(item => {
  gsap.from(item, {
    opacity:0,
    y:50,
    duration:0.8,
    ease:"power2.out",
    scrollTrigger: {
      trigger:item,
      start:"top 85%",
    }
  });
});


// Book Page

let currentPage = 0;

// Show page functio

// Next / Previous buttons
nextBtn.addEventListener("click", ()=>{ if(currentPage<pages.length-1) showPage(currentPage+1); });
prevBtn.addEventListener("click", ()=>{ if(currentPage>0) showPage(currentPage-1); });

gsap.to("#introName", {opacity:1, duration:30, ease:"power2.out"});
