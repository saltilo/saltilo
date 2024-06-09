let swiperInstance;

function handleSwiper() {
  if (window.innerWidth < 768) {
    if (!swiperInstance) {
      swiperInstance = new Swiper(".swiper", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        spaceBetween: 20,
        breakpoints: {
          220: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },

          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          450: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    }
  } else if (swiperInstance) {
    swiperInstance.destroy(false, true);
    swiperInstance = null;
  }
}

handleSwiper();
window.addEventListener("resize", handleSwiper);
