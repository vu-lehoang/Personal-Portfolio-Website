// about section tabs
(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    // nếu sự kiện có class tabitem và không có class active
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      // lấy dữ liệu từ data target(skills,education,experince)
      const dataTarget = event.target.getAttribute("data-target");
      // hủy tab-item
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // tạo tab-item mới
      event.target.classList.add("active", "outer-shadow");
      // hủy tab-content
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // tạo tab-content mới
      aboutSection.querySelector(dataTarget).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

/*-----------------------navigation menu---------------- */
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");
  const closeBtn = navMenu.querySelector(".close-nav-menu");
  const fadeOut = document.querySelector(".fade-out-effect");

  hamburgerBtn.addEventListener("click", showNav);
  closeBtn.addEventListener("click", hideNavMenu);
  function showNav() {
    // navMenu.classList.toggle("open");
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    fadeOut.classList.add("active");
    setTimeout(() => {
      fadeOut.classList.remove("active");
    }, 300);
  }
  // attach an element handler to document
  // lắng nghe khi click vào bất kì phần tử nào trong trang web
  document.addEventListener("click", (event) => {
    // console.log(event.target);
    // nếu có class link item
    if (event.target.classList.contains("link-item")) {
      // nếu link rỗng
      if (event.target.hash !== "") {
        // huy su kien
        event.preventDefault();
        const hash = event.target.hash;
        // console.log(hash);

        //deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        // activate new 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        // deactivate existing active navigation menu 'link-item'
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        // if clicked 'link-item' is contained within the nav
        if (navMenu.classList.contains("open")) {
          // activate new navigation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hide navigation menu
          hideNavMenu();
        } else {
          // lấy ra tất cả các link-item
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            // nếu tên link = link item hiện tại tiến hành sơn màu
            if (hash === item.hash) {
              // activate new navgation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // thêm link (#) to url
        window.location.hash = hash;
      }
    }
  });

  // document.addEventListener("click", (event) =>{
  //     if(event.target.classList.contains('link-item')){
  //         if(event.target.hash !== ""){
  //             // event.preventDefault();
  //             const hash = event.target.hash;
  //             document.querySelector(".section.active").classList.add("hide");
  //             document.querySelector(".section.active").classList.remove("active");
  //             document.querySelector(hash).classList.add("active");
  //             document.querySelector(hash).classList.remove("hide");
  //             navMenu.querySelector(".active").classList.add("outer-shadow", "inner-shadow");
  //             navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
  //             if(navMenu.classList.contains("open")){
  //                 event.target.classList.add("active","inner-shadow");
  //                 event.target.classList.remove("outer-shadow","hover-in-shadow");
  //                 hideNavMenu();
  //             }else{
  //                 let navItems = navMenu.querySelectorAll(".link-item");
  //                 navItems.forEach((item) =>{
  //                     if(hash === item.hash){
  //                         item.target.classList.add("active","inner-shadow");
  //                         item.target.classList.remove("outer-shadow","hover-in-shadow");
  //                     }
  //                 })
  //                 fadeOutEffect();
  //             }
  //         }
  //     }
  // })
})();

/*-----------------------hide all section except active---------------- */
(() => {
  const section = document.querySelectorAll(".section");
  section.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

// loader
window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600);
});
