document.querySelector('button[type="arrow"]').addEventListener('click', function () {
    const target = document.querySelector('.anchor');

    target.scrollIntoView({
        behavior: 'smooth'
    });
});
