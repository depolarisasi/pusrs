/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

export async function UpdateProbableCases(tokenArchGIS, generateJson) {
    const updateProbableCases = {
        key: 'ANxDjSZTKASRyOVa',
        f: 'json',
        token: tokenArchGIS,
        updates: generateJson,
    };

    var formBody = [];
    for (var property in updateProbableCases) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(updateProbableCases[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    return await fetch(
        'https://services6.arcgis.com/KKQJ8UH8yQZJCyc5/ArcGIS/rest/services/Probable_Cases/FeatureServer/0/applyEdits',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        },
    )
        .then(res => res.json())
        .catch(error => error);
}
