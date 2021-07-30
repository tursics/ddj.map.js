(function() {  
    var codes = document.querySelectorAll('code');
    var codeCount = codes.length;

    for (c = 0; c < codeCount; ++c) {
        var code = codes[c];
        var html = code.innerHTML + ' ';
        var innerHTML = html.trim();
        innerHTML = innerHTML.replaceAll('../dist/', 'https://unpkg.com/ddj.map@1.0.18/dist/');
        innerHTML = innerHTML.replaceAll('./data/', 'https://tursics.github.io/ddj.map.js/sample/data/');
        html = html.replaceAll('./data/', 'https://tursics.github.io/ddj.map.js/sample/data/');
        code.innerHTML = innerHTML;

        html = html.replaceAll('&lt;', '<');
        html = html.replaceAll('&gt;', '>');

        var mapPreview = document.getElementsByClassName('map-preview')[c];
        var cardBody = mapPreview.getElementsByClassName('card-body')[0];
        cardBody.innerHTML = html;
    }
})();