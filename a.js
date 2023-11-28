function smooth_scroll(selector) {
    const target = document.querySelector(selector);

    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        console.error('Element with selector', selector, 'not found.');
    }
}

document.querySelector('button[type="arrow"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('button[type="about"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('button[type="catalog"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});

document.querySelector('button[type="advantages"]').addEventListener('click', function () {
    smooth_scroll('.advantages');
});

document.querySelector('button[type="contacts"]').addEventListener('click', function () {
    smooth_scroll('.basement');
});

document.querySelector('button[type="buy_duck"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});
