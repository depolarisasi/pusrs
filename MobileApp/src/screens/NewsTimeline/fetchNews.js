/**
 * Created by Handika Dwiputra on 29/01/2020.
 * handikadwiputradev@gmail.com
 */

const url = `https://newsapi.org/v2/everything?q=mosquito%20AND%20(dengue%20OR%20denguefever)&language=en&apiKey=a00dd5783aa14cdc8c12add506fae426`;

export async function getUSANews() {
    let result = await fetch(url).then(response => response.json());

    return result.articles;
}
