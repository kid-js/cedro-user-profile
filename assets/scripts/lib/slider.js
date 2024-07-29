class Slider {
    #slider = null;

    #isMouseDown = false;
    #startX = 0;
    #scrollLeft = 0;

    static #instance = null;

    constructor() {
        if (Slider.#instance) {
            return Slider.#instance;
        }

        this.#slider = document.querySelector('.trends__slider');

        Slider.#instance = this;
    }

    init() {
        const startScrolling = (e) => {
            this.#isMouseDown = true;
            let pageX = e.pageX || e.changedTouches?.[0].pageX;

            this.#startX = pageX - this.#slider.offsetLeft;
            this.#scrollLeft = this.#slider.scrollLeft;
        };

        const stopScrolling = () => {
            this.#isMouseDown = false;

            this.#slider.classList.remove('trends__slider_scrolling');
        };

        const keepScrolling = (e) => {
            e.preventDefault();

            if (!this.#isMouseDown) { return; };

            this.#slider.classList.add('trends__slider_scrolling');
            let pageX = e.pageX || e.changedTouches?.[0].pageX;

            const x = pageX - this.#slider.offsetLeft;
            const distance = (x - this.#startX) * 2;

            this.#slider.scrollLeft = this.#scrollLeft - distance;
        };

        this.#slider.addEventListener('touchstart', startScrolling);
        this.#slider.addEventListener('mousedown', (e) => {
            e.preventDefault(); // prevents incorrect behaviour in Firefox
            startScrolling(e);
        });

        this.#slider.addEventListener('mouseup', stopScrolling);
        this.#slider.addEventListener('mouseleave', stopScrolling);
        this.#slider.addEventListener('touchend', stopScrolling);

        this.#slider.addEventListener('mousemove', keepScrolling);
        this.#slider.addEventListener('touchmove', keepScrolling);
    }
}

const slider = new Slider();

export { slider };