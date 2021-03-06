export default class GeckoApi {
  _baseUrl = "https://api.coingecko.com/api/v3/";

  transformUrl = (url, options) => {
    let fullUrl = `${this._baseUrl}${url}`;
    let optionsUrl = "?";
    if (options) {
      Object.entries(options).map(([key, value]) => {
        if (key === "ids" && !value) {
          return optionsUrl;
        }
        if (key === "ids" && value) {
          value = value.replace(", ", "%2C%20");
        }
        optionsUrl = `${optionsUrl}${key}=${value}&`;
        return optionsUrl;
      });
      optionsUrl = optionsUrl.substring(0, optionsUrl.length - 1);
      fullUrl += optionsUrl;
    }

    return fullUrl;
  };

  ping = async () => {
    const url = this.transformUrl("ping");
    const request = await fetch(url).then((response) => {
        if (!response.ok) {
          return false;
        }
        return true;
      });

    return request;
  };

  coinsList = async (options) => {
    const defaults = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
      sparkline: "false",
      price_change_percentage: "24h"
    };
    let clearOptions = {...options};

    const optionsObject = { ...defaults, ...clearOptions };

    const url = this.transformUrl("coins/markets", optionsObject);

    const request = await fetch(url).then((resp) => resp.json());

    return request;
  };

  getCoinInfo = async (id) => {
    const options = {
      community_data: "false",
      developer_data: "false"
    }
    const url = this.transformUrl(`coins/${id}`, options);

    const request = await fetch(url).then((resp) => resp.json());

    return request;
  }

  searchCoin = async (searchText) => {
    const url = this.transformUrl(`search?query=${searchText}`, null);

    const request = await fetch(url).then((resp) => resp.json());

    return request;
  }
}
