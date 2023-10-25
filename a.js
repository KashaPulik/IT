document.querySelector('.header__arrow').addEventListener('click', function () {
    const target = document.querySelector('.anchor');

    target.scrollIntoView({
        behavior: 'smooth'
    });
});
