import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 40;
  #params = {
    params: {
      key: '30416408-c6842ca729ef5a51b1af270dd',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#perPage,
    },
  };

  async getPhotos() {
    const { data } = await axios.get(`?q=${this.#query}&page=${this.#page}`, this.#params);
    // console.log(data);
    return data;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get query() {
    return this.#query;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}