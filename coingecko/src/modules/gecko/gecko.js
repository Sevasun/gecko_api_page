export default class GeckoApi {
    _baseUrl = 'https://api.coingecko.com/api/v3/';

    transformUrl = (url, options) => {
        let fullUrl = `${this._baseUrl}${url}`;
        let optionsUrl = '?';
        if (options) {
            Object.entries(options).map(([key, value]) => optionsUrl = `${optionsUrl}${key}=${value}&`);
            optionsUrl = optionsUrl.substring(0, optionsUrl.length - 1);
            fullUrl += optionsUrl;
        }

        return fullUrl;
    }

    ping = () => {
        const url = this.transformUrl('ping');
        const request = fetch(url).then((response) => {
            if (!response.ok) {
                console.log('Error', response);
            }
            return response.json();
        }).then((json) => console.log(json));
    }

    coinsList = () => {
        const options = {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: '50',
            page: '1',
            sparkline: 'false',
            price_change_percentage: '24h'
        }

        const url = this.transformUrl('coins/markets', options);

        const request = fetch(url).then((resp) => resp.json());

        return request;
    }
}