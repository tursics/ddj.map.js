(function() {  
    var mapPreview = document.getElementsByClassName('map-preview')[0];
    var cardBody = mapPreview.getElementsByClassName('card-body')[0];
    var html = cardBody.innerHTML;

    html = html.trim();
    html = html.replaceAll('<','&lt;');
    html = html.replaceAll('>','&gt;');

    var code = document.querySelector('code');
    code.innerHTML = html;
    console.log();
})();