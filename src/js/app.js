$(document).ready(function () {
  const $body = $('body');
  const $mobileMenu = $('#mobile-menu');
  const $menuIcon = $('.icon-menu');
  const $closeIcon = $('.icon-close');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  $('#mobile-menu-btn').click(function () {
    $mobileMenu.slideToggle(300);
    $body.toggleClass('overflow-hidden menu-open');
    $menuIcon.toggleClass('hidden');
    $closeIcon.toggleClass('hidden');
  });


  $('.mobile-submenu-toggle').click(function (e) {
    e.preventDefault();

    $(this).next('.mobile-submenu').slideToggle(300);


    $(this).find('.chevron-icon').toggleClass('rotate-180');
  });


  $(window).resize(function () {
    if ($(window).width() >= 1024) {
      $mobileMenu.hide();
      $body.removeClass('overflow-hidden menu-open');
      $menuIcon.removeClass('hidden');
      $closeIcon.addClass('hidden');

      // Reset mobile submenus khi về desktop
      $('.mobile-submenu').hide();
      $('.chevron-icon').removeClass('rotate-180');
    }
  });
});
lucide.createIcons();

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
