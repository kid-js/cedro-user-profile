import { demoData } from './demo-data';

class Storage {
    #wishList = [];
    #products = [];

    static #instance = null;

    constructor() {
        if (Storage.#instance) {
            return Storage.#instance;
        }

        this.#wishList = this.getParsedWishList() || [];
        this.#products = demoData || [];

        Storage.#instance = this;
    }

    get wishList() {
        return this.#wishList;
    }

    get products() {
        return this.#products;
    }

    getParsedWishList() {
        return JSON.parse(localStorage.getItem('wishList'));
    }

    saveNewItemToWishList(id) {
        this.#wishList.push(id);
        this.updateWishList();
    }

    removeItemFromWishList(id) {
        this.#wishList = this.#wishList.filter(elemID => elemID !== id);
        this.updateWishList();
    }

    updateWishList() {
        localStorage.setItem('wishList', JSON.stringify(this.wishList));
    }
}

const storage = new Storage();

export { storage };