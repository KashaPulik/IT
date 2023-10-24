document.querySelector('.header__arrow').addEventListener('click', function () {
    const target = document.querySelector('.catalog');

    target.scrollIntoView({
        behavior: 'smooth'
    });
});
