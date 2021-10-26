// about section tabs
(() =>{
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click",(event) =>{
        // nếu sự kiện có class tabitem và không có class active
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            // lấy dữ liệu từ data target(skills,education,experince)
            const dataTarget = event.target.getAttribute("data-target");
            // hủy tab-item
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // tạo tab-item mới
            event.target.classList.add("active", "outer-shadow");
            // hủy tab-content
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // tạo tab-content mới
            aboutSection.querySelector(dataTarget).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}

/* ------------- portfolio filter and popup --------------------- */
(
    () => {
        const filterContainer = document.querySelector(".portfolio-filter");
        const portfolioItemsContainer = document.querySelector(".portfolio-items");
        const portfolioItems = document.querySelectorAll(".portfolio-item");
        const popup = document.querySelector(".portfolio-popup");
        const prevBtn = document.querySelector(".pp-prev");
        const nextBtn = document.querySelector(".pp-next");
        const closeBtn = document.querySelector(".pp-close");
        // popup
        const projectDetailsContainer = popup.querySelector(".pp-details");
        const projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
        let itemIndex, slideIndex, screenshots;

        // filter portfolio items
        // lắng nghe sự kiện click vào thẻ filterContainer
        filterContainer.addEventListener("click", (event)=>{
            // console.log(event.target)
            if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
                // vô hiệu hóa acitve của filter-item
                filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
                // thêm active mới cho filter-item
                event.target.classList.add("active", "outer-shadow");

                const target = event.target.getAttribute("data-target");
                // console.log(target);
                portfolioItems.forEach((item) =>{
                    // console.log(item);
                    // console.log(item.getAttribute("data-category"));
                    if(target === item.getAttribute("data-category") || target === 'all'){
                        item.classList.remove("hide");
                        item.classList.add("show");
                    }
                    else{
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                })
            }
           
        })
        portfolioItemsContainer.addEventListener("click", (event) =>{
            // console.log(event.target.closest(".portfolio-item-inner"));
            if(event.target.closest(".portfolio-item-inner")){
                const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
                // console.log(portfolioItem);
                // get portfolioItem index
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
                // console.log(itemIndex);
                screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
                // console.log(screenshots);
                // convert screenshots into array
                screenshots = screenshots.split(",");
                // console.log(screenshots);
                if(screenshots.length === 1){
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }else{
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                }
                slideIndex = 0;
                popupToggle();
                popupSlideShow();
                popupDetails();
            }
        })

        closeBtn.addEventListener("click", () =>{
            popupToggle();
            if(projectDetailsContainer.classList.contains("active")){
                popupDetailsToggle();
            }
        })

        function popupToggle(){
            popup.classList.toggle("open");
            bodyScrollingToggle();
        }

        function popupSlideShow(){
            const imgSrc = screenshots[slideIndex];
            // console.log(imgSrc)
            const popupImg = popup.querySelector(".pp-img");
            // active loader until the popupImg loaded
            popup.querySelector(".pp-loader").classList.add("active");
            popupImg.src = imgSrc;
            popupImg.onload = () => {
                popup.querySelector(".pp-loader").classList.remove("active");
            }
            popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
        }
        // next slide
        nextBtn.addEventListener("click", () =>{
            // nếu vị trí của slide = tổng slide - 1
            // index: 0 nên -1
            if(slideIndex === screenshots.length-1){
                slideIndex = 0;  
            }else{
                slideIndex++;
            }
            // console.log(slideIndex);
            // console.log(screenshots.length);
            popupSlideShow();
        });

        // prev slide
        prevBtn.onclick = ()=>{
            // nếu vị trí slide là 0 
            if(slideIndex === 0){
                // gan vị trí slide bằng tổng slide - 1 (slide bắt đầu từ 0 nên trừ 1)
                slideIndex = screenshots.length - 1;
            }else{
                slideIndex--;
            }
            console.log(screenshots.length - 1);
            popupSlideShow();
        };

        // popupdetails
        function popupDetails(){
            if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
                projectDetailsBtn.style.display = "none";
            } projectDetailsBtn.style.display = "block";

            const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
            popup.querySelector(".pp-project-details").innerHTML = details;
            const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
            popup.querySelector(".pp-title h2").innerHTML = title;
            const category = portfolioItems[itemIndex].getAttribute("data-category");
            popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");

        }

        projectDetailsBtn.addEventListener("click", () =>{
            popupDetailsToggle();
        });
        function popupDetailsToggle(){
            if(projectDetailsContainer.classList.contains("active")){
                projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
                projectDetailsBtn.querySelector("i").classList.add("fa-plus");
                projectDetailsContainer.classList.remove("active");
                projectDetailsContainer.style.maxHeight = 0 + "px";
            }else{
                projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
                projectDetailsBtn.querySelector("i").classList.add("fa-minus");
                projectDetailsContainer.classList.add("active");
                projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
                popup.scrollTo(0,projectDetailsContainer.offsetTop);
            }
        }
    }
)();

/* ------------- testimonial slider --------------------- */
(() => {

    const sliderContainer = document.querySelector(".testi-slider-container");
    const slides = sliderContainer.querySelectorAll(".testi-item")
    const slideWidth = sliderContainer.offsetWidth;
    const nextBtn = document.querySelector(".testi-slider-nav .next");
    const prevBtn = document.querySelector(".testi-slider-nav .prev");
    const activeSlide = sliderContainer.querySelector(".testi-item.active");
    // let slideIndex = 0;
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // console.log(slideIndex);

    // set width of all slide
    slides.forEach((slide) =>{
        slide.style.width = slideWidth + "px";
    })
    // set width of slidercontainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        slider();
    });
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }else{
            slideIndex--;
        }
        slider();
    });

    function slider(){
        // deactive existing active slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // active new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();


})();
/*-----------------------navigation menu---------------- */
(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");
    const closeBtn = navMenu.querySelector(".close-nav-menu");
    const fadeOut = document.querySelector(".fade-out-effect");

    hamburgerBtn.addEventListener("click", showNav);
    closeBtn.addEventListener("click", hideNavMenu);
    function showNav(){
        // navMenu.classList.toggle("open");
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        fadeOut.classList.add("active");
        setTimeout( () =>{
            fadeOut.classList.remove("active");
        },300)
    }
    // attach an element handler to document
    // lắng nghe khi click vào bất kì phần tử nào trong trang web
    document.addEventListener("click", (event) =>{
        // console.log(event.target);
        // nếu có class link item
        if(event.target.classList.contains('link-item')){
            // nếu link rỗng
            if(event.target.hash !== ""){
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
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                // if clicked 'link-item' is contained within the nav
                if(navMenu.classList.contains("open")){
                    // activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation menu
                    hideNavMenu(); 
                   
                }else{
                    // lấy ra tất cả các link-item
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        // nếu tên link = link item hiện tại tiến hành sơn màu
                        if(hash === item.hash){
                            // activate new navgation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // thêm link (#) to url
                window.location.hash = hash;
            }
        }
    })

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

    const section =  document.querySelectorAll('.section');
    section.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

})();

// loader
window.addEventListener("load", () =>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display = "none";
    },600)
})