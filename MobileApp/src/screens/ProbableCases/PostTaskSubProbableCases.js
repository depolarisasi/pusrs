/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

export async function addDataProbableCases(tokenArchGIS, generateJson) {
    var submitProbableCases = {
        f: 'json',
        token: `${tokenArchGIS}`,
        adds: `${generateJson}`,
    };

    var formBody = [];
    for (var property in submitProbableCases) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(submitProbableCases[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    let result = await fetch(
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

    return result.addResults[0];
}
