import { slider } from '../lib/slider.js';
import { storage } from '../storage/storage.js';

class App {
    #totalWishedSpan = null;
    #submitButton = null;
    #menuButton = null;
    #sliderDiv = null;
    #dialog = null;
    #closeButton = null;

    #totalWished = 0;

    static #instance = null;

    constructor() {
        if (App.#instance) {
            return App.#instance;
        }

        App.#instance = this;
    }

    getProductCardTemplate(item) {
        const {
            id,
            slug,
            imgURL,
            title,
            description,
            volume,
            oldPrice,
            newPrice,
            promo,
            color,
        } = item;

        const isFavorite = storage.wishList.includes(id);
        const wishIconCSS = `
            --wish-icon-color: ${isFavorite ? '#d0bc7a' : '#e4e4e4'}"
        `;

        return `
            <a
                href=${slug}
                class="trends__card"
                style="--border-image: 12px solid ${color}; ${wishIconCSS}"
                data-product-id=${id}
            >
                <header class="trends__card-header">
                    <img class="trends__card-image" src=${imgURL} alt=${title}>
                    <span class="trends__card-label"> ${promo} </span>

                    <svg
                        class="favorite-icon"
                        data-id="fav-icon"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <use href="/icons/icons-set.svg#favorite"></use>
                    </svg>
                </header>

                <div class="trends__card-body">
                    <h4 class="trends__card-title"> ${title} </h4>

                    <p class="trends__card-detail"> ${description} </p>
                    <p class="trends__card-volume"> ${volume} </p>
                    <p class="trends__card-price">
                        ${oldPrice} ₽

                        <span class="trends__card-price trends__card-price_old">
                            ${newPrice} ₽
                        </span>
                    </p>
                </div>
            </a>
        `;
    }

    init() {
        this.#totalWishedSpan = document.querySelector('[data-id="total-fav"]');
        this.#submitButton = document.querySelector('[data-id="form-button"]');
        this.#menuButton = document.querySelector('[data-id="menu-button"]');
        this.#sliderDiv = document.querySelector('[data-id="slider-div"]');
        this.#dialog = document.querySelector('[data-id="menu-modal"]');
        this.#closeButton = document.querySelector('[data-id="close-button"]');

        this.#totalWished = storage.wishList.length;

        this.renderTotalWishedNumber();
        this.renderProducts();

        this.#sliderDiv.addEventListener('click', (e) => {
            if (e.target.parentElement.dataset.id !== 'fav-icon') {
                return;
            }

            e.preventDefault();

            const targetCard = e.target.closest('.trends__card');
            const productID = +targetCard.dataset.productId;
            let wasWished = false;

            if (storage.wishList.includes(productID)) {
                wasWished = true;
                storage.removeItemFromWishList(productID);
            }
            else {
                storage.saveNewItemToWishList(productID);
            }

            this.renderTotalWishedNumber();
            this.updateWishIconColor(targetCard, wasWished);
        });

        this.#menuButton.addEventListener('click', (e) => {
            e.preventDefault();

            this.#dialog.show();
            document.body.style.overflow = 'hidden';

            this.#closeButton.addEventListener('click', () => {
                this.#dialog.close();
                document.body.removeAttribute('style');
            }, { once: true });
        });
        
        this.#submitButton.addEventListener('click', (e) => {
            e.preventDefault();
        });

        slider.init();
    }

    renderProducts() {
        storage.products.forEach(item => {
            this.#sliderDiv.insertAdjacentHTML(
                'beforeend', this.getProductCardTemplate(item)
            );
        });
    }

    renderTotalWishedNumber() {
        this.#totalWished = storage.wishList.length;
        this.#totalWishedSpan.textContent = this.#totalWished;

        this.#totalWishedSpan.hidden = this.#totalWished === 0 ? true : false;
    }

    updateWishIconColor(targetCard, wasWished) {
        const color = wasWished ? '#e4e4e4' : '#d0bc7a';

        targetCard.setAttribute('style', `--wish-icon-color: ${color}`);
    }
}

const app = new App();

export { app };