window.Conduent = window.Conduent || {};

Conduent.UrlUtils = {};

Conduent.UrlUtils.addStandardTokens = function(url) {
    var tokens = ["SPHostUrl", "SPAppWebUrl", "SPLanguage", "SPClientTag", "SPProductNumber"];

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var value = GetUrlKeyValue(token);
        if (SP.ScriptUtility.isNullOrEmptyString(value) == false) {
            url = SetUrlKeyValue(token, value, true, url);
        }
    }

    return url;
}