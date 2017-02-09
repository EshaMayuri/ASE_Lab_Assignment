/**
 * Created by Esha Mayuri on 2/5/2017.
 */
function OnLoadFunction() {
    gapi.client.setApiKey('AIzaSyAq1kQaW-35UEs7rfPFYKcx4DFXxbjNJhw');
    gapi.client.load('plus','v1',function (){});
}