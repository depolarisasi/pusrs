/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

const urlProbableCases =
    'https://services6.arcgis.com/KKQJ8UH8yQZJCyc5/ArcGIS/rest/services/Probable_Cases/FeatureServer/0/applyEdits';

export async function getDataProbableCases() {
    return await fetch(urlProbableCases).then(response => response.json());
}
