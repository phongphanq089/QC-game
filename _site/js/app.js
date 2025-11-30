

$(document).ready(function () {

  const $desktopMenuItems = $('header .relative.group')
  const $mobileSidebar = $('#drawer-navigation')

  if ($desktopMenuItems.length > 0 || $mobileSidebar.length > 0) {
    function setupMenuBehavior() {
      // ... (Phần mã xử lý menu của bạn) ...
      // Hủy các sự kiện cũ để tránh bị lặp
      $desktopMenuItems.off('mouseenter mouseleave')
      $mobileSidebar.find('.relative > a').off('click')

      // --- Behavior cho Desktop ---
      if ($(window).width() >= 1280) {
        $desktopMenuItems
          .on('mouseenter', function () {
            const $this = $(this);
            const $submenu = $this.children('.submenu');

            // Xóa timer đóng (nếu có) để nếu chuột quay lại nhanh thì không đóng
            clearTimeout($this.data('closeTimer'));

            // Tạo timer mở: Chỉ mở nếu chuột giữ ở đó quá 150ms
            const openTimer = setTimeout(function () {
              $submenu.stop(true, true).slideDown(200);
            }, 150); // <--- Tinh chỉnh số này (100-200ms)

            // Lưu ID của timer vào element để có thể hủy nếu chuột rời đi sớm
            $this.data('openTimer', openTimer);
          })
          .on('mouseleave', function () {
            const $this = $(this);
            const $submenu = $this.children('.submenu');

            // Quan trọng: Hủy lệnh mở nếu chuột rời đi trước khi hết 150ms
            // (Nghĩa là người dùng chỉ lướt qua -> Menu sẽ KHÔNG bao giờ mở)
            clearTimeout($this.data('openTimer'));

            // Tạo timer đóng (giúp mượt hơn nếu lỡ tay rê chuột ra ngoài một chút xíu)
            const closeTimer = setTimeout(function () {
              $submenu.stop(true, true).slideUp(200);
            }, 100); // Delay đóng nhẹ

            $this.data('closeTimer', closeTimer);
          });
      }

      $mobileSidebar.find('.relative > a').on('click', function (e) {
        const $submenu = $(this).siblings('.submenu')
        if ($submenu.length > 0) {
          e.preventDefault()
          $submenu.slideToggle(300)

          $(this).find('svg').toggleClass('rotate-180')
        }
      })
    }

    // Chạy lần đầu
    setupMenuBehavior()

    $(window).on('resize', function () {
      clearTimeout(window.resizedFinished)
      window.resizedFinished = setTimeout(setupMenuBehavior, 250)
    })
  }

  // ------------------------------------------
  // --- ⭐ MÃ STICKY HEADER MỚI BẮT ĐẦU TỪ ĐÂY ⭐ ---
  // ------------------------------------------
  const $header = $('.menu-header');
  // const $body = $('body');
  // let headerHeight = $header.outerHeight();
  $(window).on('resize', function () {

    if (!$header.hasClass('fixed-header')) {
      headerHeight = $header.outerHeight();
    }
  });

  function handleScroll() {
    const scrollY = $(window).scrollTop();

    if (scrollY > 600) {
      if (!$header.hasClass('fixed-header')) {
        $header.addClass('fixed-header');
        // $body.css('padding-top', headerHeight + 'px');
      }
    } else {
      if ($header.hasClass('fixed-header')) {
        $header.removeClass('fixed-header');
        // $body.css('padding-top', 0);
      }
    }
  }
  $(window).on('scroll', handleScroll);

  handleScroll();

});


$(document).on('click', '.disable-link', function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});


// FAB Menu Toggle
const fabToggle = document.getElementById('fabToggle');
const fabMenu = document.getElementById('fabMenu');
const fabIcon = document.getElementById('fabIcon');
const backToTopButton = document.getElementById('backToTopBtn');
let isMenuOpen = false;

// Toggle menu khi click vào nút chính
if (fabToggle && fabMenu) {
  fabToggle.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Mở menu
      fabMenu.classList.remove('opacity-0', 'pointer-events-none');
      fabMenu.classList.add('opacity-100', 'pointer-events-auto');

      // Xoay icon thành dấu X
      fabIcon.style.transform = 'rotate(45deg)';

      // Animation cho từng button
      const buttons = fabMenu.querySelectorAll('button');
      buttons.forEach((btn, index) => {
        setTimeout(() => {
          btn.style.transform = 'translateY(0)';
          btn.style.opacity = '1';
        }, index * 50);
      });
    } else {
      // Đóng menu
      fabMenu.classList.add('opacity-0', 'pointer-events-none');
      fabMenu.classList.remove('opacity-100', 'pointer-events-auto');

      // Xoay icon về dấu +
      fabIcon.style.transform = 'rotate(0deg)';

      // Reset animation
      const buttons = fabMenu.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.style.transform = 'translateY(8px)';
      });
    }
  });
}

// Scroll to top functionality
if (backToTopButton) {
  // Hiển thị/ẩn nút scroll khi cuộn trang > 400px
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopButton.classList.remove('hidden', 'pointer-events-none');
      backToTopButton.classList.add('flex', 'pointer-events-auto');
    } else {
      backToTopButton.classList.add('hidden', 'pointer-events-none');
      backToTopButton.classList.remove('flex', 'pointer-events-auto');
    }
  });

  // Click để scroll lên top
  backToTopButton.addEventListener('click', function (e) {
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Đóng menu khi click ra ngoài
document.addEventListener('click', function (e) {
  if (isMenuOpen && !fabToggle.contains(e.target) && !fabMenu.contains(e.target)) {
    fabToggle.click();
  }
});



$(function () {
  const $langBtn = $('#langBtn');
  const $langMenu = $('#langMenu');
  $langBtn.on('click', function (e) {
    e.stopPropagation();
    $langMenu.toggleClass('hidden');
  });

  $langMenu.find('button').on('click', function () {
    const lang = $(this).data('lang');
    const imgSrc = $(this).find('img').attr('src');

    $langBtn.find('img').attr('src', imgSrc);

    $langMenu.addClass('hidden');
    console.log('Selected language:', lang);
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#langDropdown').length) {
      $langMenu.addClass('hidden');
    }
  });
});




$(document).ready(function () {
  function openModal() {
    $('body').css('overflow', 'hidden');

    $('#searchModal')
      .removeClass('opacity-0 invisible')
      .addClass('opacity-100 visible');

    $('#searchModal .modal-content')
      .removeClass('scale-95 opacity-0')
      .addClass('scale-100 opacity-100');

    setTimeout(function () {
      $('#searchInput').focus();
    }, 300);
  }

  function closeModal() {

    $('body').css('overflow', 'auto');

    $('#searchModal .modal-content')
      .removeClass('scale-100 opacity-100')
      .addClass('scale-95 opacity-0');

    $('#searchModal')
      .removeClass('opacity-100 visible')
      .addClass('opacity-0 invisible');


    $('#searchInput').val('');
    $('#searchResults').addClass('hidden');
  }

  $('#openSearchBtn').on('click', function () {
    openModal();
  });

  $('.close-modal').on('click', function () {
    closeModal();
  });

  $('#searchModal').on('click', function (e) {

    if ($(e.target).is('#searchModal')) {
      closeModal();
    }
  });

  $('#searchInput').on('input', function () {

    var query = $(this).val();

    if (query.length > 0) {

      $('#searchResults').removeClass('hidden');
    } else {

      $('#searchResults').addClass('hidden');
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

});
