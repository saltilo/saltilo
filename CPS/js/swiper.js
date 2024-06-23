let swiperInstances = [];

function handleSwiper() {
  const breakpoints = {
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
  };

  if (window.innerWidth < 768) {
    if (swiperInstances.length === 0) {
      swiperInstances.push(
        new Swiper(".brands__swiper", {
          pagination: {
            el: ".brands__pagination",
            clickable: true,
          },
          spaceBetween: 20,
          breakpoints: breakpoints,
        }),
        new Swiper(".repair-types__swiper", {
          pagination: {
            el: ".repair-types__pagination",
            clickable: true,
          },
          spaceBetween: 20,
          breakpoints: breakpoints,
        }),
        new Swiper(".prices__swiper", {
          pagination: {
            el: ".prices__pagination",
            clickable: true,
          },
          spaceBetween: 20,
          breakpoints: breakpoints,
        })
      );
    }
  } else {
    if (swiperInstances.length > 0) {
      for (var i = 0; i < swiperInstances.length; i++) {
        swiperInstances[i].destroy(false, true);
      }
      swiperInstances = [];
    }
  }
}

handleSwiper();
window.addEventListener("resize", handleSwiper);
