/**
 * Created by Handika Dwiputra on 29/02/2020.
 * handikadwiputradev@gmail.com
 */

export async function getGenerateTokenArchGIS() {
    const details = {
        client_id: 'ANxDjSZTKASRyOVa',
        client_secret: '83a6df9c845b4cec921eb261aa471cb2',
        grant_type: 'client_credentials',
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    return await fetch('https://www.arcgis.com/sharing/rest/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    })
        .then(res => res.json())
        .catch(error => error);
}
