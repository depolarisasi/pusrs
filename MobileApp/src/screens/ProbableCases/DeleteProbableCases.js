/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

export async function DeleteProbableCases(tokenArchGIS, generateJson) {
    const deleteProbableCases = {
        key: 'ANxDjSZTKASRyOVa',
        f: 'json',
        token: `${tokenArchGIS}`,
        deletes: `${generateJson}`,
    };
    var formBody = [];
    for (var property in deleteProbableCases) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(deleteProbableCases[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    let responseBody = await fetch(
        'https://services6.arcgis.com/KKQJ8UH8yQZJCyc5/ArcGIS/rest/services/Probable_Cases/FeatureServer/0/applyEdits',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        },
    ).then(res => res.json());

    return responseBody.deleteResults[0];
}
