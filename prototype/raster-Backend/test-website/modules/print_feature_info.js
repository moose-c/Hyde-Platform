export async function printFeatureInfo(pixel){
    pixel = [117.77521, 28.2917 ]
    const url = `http://localhost:8080/ncWMS2/wms?REQUEST=GetFeatureInfo&
    VERSION=1.3.0&
    CRS=CRS:84&
    QUERY_LAYERS=${window.layerName}&
    TIME=${window.year}-05-01&
    LAYERS=${window.layerName}&
    INFO_FORMAT=text/plain&
    I=1&
    J=1&
    BBOX=${pixel[0]-0.001},${pixel[1]-0.001},${pixel[0]+0.001},${pixel[1]+0.001}&
    WIDTH=400&HEIGHT=600
    `
    const request = await fetch(url)
    const featureInfo = await request.text()
    console.log(featureInfo)
    console.log(url)
    console.log(pixel)

}
