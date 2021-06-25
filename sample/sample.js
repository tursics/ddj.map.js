(function() {  
    var code = document.querySelector('code');
    if (code) {
        var html = code.innerHTML;
        var originalHTML = html.trim();
        originalHTML = html.replaceAll('../dist/', 'https://unpkg.com/ddj.map@1.0.11/dist/');
        code.innerHTML = originalHTML;

        html = html.replaceAll('&lt;', '<');
        html = html.replaceAll('&gt;', '>');

        var mapPreview = document.getElementsByClassName('map-preview')[0];
        var cardBody = mapPreview.getElementsByClassName('card-body')[0];
        cardBody.innerHTML = html;
    }
})();