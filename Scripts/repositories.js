window.Conduent = window.Conduent || {};
window.Conduent.Repositories = window.Conduent.Repositories || {};

Conduent.Repositories.getWeb = function (context, hostUrl) {
    var web = null;

    if (hostUrl) {
        var hostContext = new SP.AppContextSite(context, hostUrl);
        web = hostContext.get_web();
    } else {
        web = context.get_web();
    }

    return web;
}

Conduent.Repositories.targetUrl = function (url, hostUrl) {
    if (hostUrl) {
        var api = "_api/";
        var index = url.indexOf(api);
        url = url.slice(0, index + api.length) +
            "SP.AppContextSite(@target)" +
            url.slice(index + api.length - 1);

        var connector = "?";
        if (url.indexOf("?") > -1 && url.indexOf("$") > -1) {
            connector = "&";
        }

        url = url + connector + "@target='" + hostUrl + "'";
    }

    return url;
}

Conduent.Repositories.CustomerRepository = function () {
    var listUrl = "/_api/Web/Lists/getByTitle('Steel Resale Credit Breach')";

    function getCustomers(orderby, top) {
        if (!orderby) orderby = "OVERALLSTATUS";
        if (!top) top = 15;

        var url = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, listUrl + "/Items?$select=*&$orderby=" + orderby + "&$top=" + top;

        var call = jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });

        return call;
    }

    function getCustomer(id) {
        if (!id) id = "1";

        var url = appUrl + listUrl + "/Items(" + id + ")?$select=*";
        url = Conduent.Repositories.targetUrl(url, hostUrl);

        var call = jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });

        return call;
    }

    function saveCustomer(id, data, formDigest) {
        var url = appUrl + listUrl + "/Items(" + id + ")";
        url = Conduent.Repositories.targetUrl(url, hostUrl);

        var call = jQuery.ajax({
            url: url,
            type: "POST",
            data: data,
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": formDigest,
                "IF-MATCH": "*",
                "X-Http-Method": "PATCH"
            }
        });

        return call;
    }


    return {
        getCustomers: getCustomers,
        getCustomer: getCustomer,
        saveCustomer: saveCustomer,
    }
}