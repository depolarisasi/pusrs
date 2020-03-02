/**
 * Created by Handika Dwiputra on 01/03/2020.
 * handikadwiputradev@gmail.com
 */

const urlMoquitoCases =
    'https://services6.arcgis.com/KKQJ8UH8yQZJCyc5/ArcGIS/rest/services/Mosquito_Bites/FeatureServer/0/query?where=1=1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json';

export async function getDataMoquitoCases() {
    return await fetch(urlMoquitoCases).then(response => response.json());
}
