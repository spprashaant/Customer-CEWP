(function () {
    var listUrl = "/_api/Web/Lists/getByTitle('Steel Resale Credit Breach')";
var currentWebUrl = _spPageContextInfo.webServerRelativeUrl;
var parentWebUrl =  currentWebUrl.substr(0, currentWebUrl.lastIndexOf("/"));
var supplierId = GetUrlKeyValue("SupplierID");
var url = parentWebUrl + listUrl + "/Items(" + supplierId + ")?$select=*";

    

    jQuery(function () {
        var call = jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });
        call.done(function (data, textStatus, jqXHR) {
            var viewModel = getViewModel(data.d);
            ko.applyBindings(viewModel);

            var container = jQuery("#customerContainer");
            container.show();
        });
        call.fail(failHandler);
    });

    function getViewModel(customer) {
        var viewModel = {
            SupplierID: customer.SupplierID,
            CreditLimitOptions: ["Correct", "Incorrect"],
            CREDITLIMIT: ko.observable(customer.CREDITLIMIT),
            UPDATECORRECTCREDITLIMIT: ko.observable(customer.UPDATECORRECTCREDITLIMIT),
            CreditLimitStatusOptions: ["Supplier under Credit Limit", "Supplier in Credit Breach"],
            CREDITLIMITSTATUS: ko.observable(customer.CREDITLIMITSTATUS),
            OverallStatusOptions: ["Issue Resolved", "Proceed for Notification process","Proceed for Deviation Approval process"],
            OVERALLSTATUS: ko.observable(customer.OVERALLSTATUS),
            COMMENTS1: ko.observable(customer.COMMENTS1),
            saveCustomer: function () {
                UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);

                var customer = formatCustomer(this);
		var url = parentWebUrl + listUrl + "/Items(" + this.SupplierID + ")";
	var call = jQuery.ajax({
            url: url,
            type: "POST",
            data: customer,
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-Http-Method": "PATCH"
            }
        });
                call.done(function (data, textStatus, jqXHR) {
                    navigateHome();
                });
                call.fail(failHandler);
            },
            cancel: function () {
                navigateHome();
            }
        }

        return viewModel;
    }

    function formatCustomer(data) {
        var fields = ["CREDITLIMIT", "UPDATECORRECTCREDITLIMIT", "CREDITLIMITSTATUS", "OVERALLSTATUS", "COMMENTS1"];

        var customer = {
            "__metadata": { type: "SP.Data.SteelResaleCreditBreachListItem" }
        };
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (data[field] !== null) {
                var value = data[field];
                if (jQuery.isFunction(value)) {
                    value = value();
                }
                customer[field] = value;
            }
        }

        return JSON.stringify(customer);
    }
	
    function navigateHome() {
        var url = "Demo.aspx";
        SP.Utilities.HttpUtility.navigateTo(url);
    }

    function failHandler(jqXHR, textStatus, errorThrown) {
        var response = "";
        try {
            var parsed = JSON.parse(jqXHR.responseText);
            response = parsed.error.message.value;
        } catch (e) {
            response = jqXHR.responseText;
        }
        alert("Call failed. Error: " + response);
    }
})();