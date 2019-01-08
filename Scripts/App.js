(function () {
    "use strict";
    var listUrl = "/_api/Web/Lists/getByTitle('Steel Resale Credit Breach')";
var currentWebUrl = _spPageContextInfo.webServerRelativeUrl;
var parentWebUrl =  currentWebUrl.substr(0, currentWebUrl.lastIndexOf("/"));
var url = parentWebUrl + listUrl + "/Items?$select=*&$orderby=OVERALLSTATUS&$top=15";
    jQuery(document).ready(function () {
        var call = jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });
        call.done(function (data, textStatus, jqXHR) {
            var viewModel = getViewModel(data.d.results);
            ko.applyBindings(viewModel);

            var container = jQuery("#customersContainer");
            container.show();
        });
        call.fail(failHandler);
    });

    function getViewModel(customers) {
        var viewModel = {};
        viewModel.customers = [];
        jQuery.each(customers, function (index, value) {
            var customer = {
                SupplierID: value.SupplierID,
                SupplierName: value.SupplierName,
                TotalAR: value.TotalAR,
                PastDueAmounts: value.PASTDUEAMOUNTS,
                CreditBreachStatus: value.CREDITBREACHSTATUS,
                DeviationApprovalRequired: value.DEVIATIONAPPROVALREQUIRED,
                CreditBreachPercent: value.CREDITBREACHPERCENT,
                SeekingProcess: value.SEEKINGPROCESS,
                CREDITLIMIT: value.CREDITLIMIT,
                UPDATECORRECTCREDITLIMIT: value.UPDATECORRECTCREDITLIMIT,
                CREDITLIMITSTATUS: value.CREDITLIMITSTATUS,
                OVERALLSTATUS: value.OVERALLSTATUS,
                COMMENTS1: value.COMMENTS1,
                editCustomer: function (customer) {
                    var url = "CustomerEdit.aspx?SupplierID=" + customer.SupplierID;
                    SP.Utilities.HttpUtility.navigateTo(url);
                }
            }
            viewModel.customers.push(customer);
        });

        return viewModel;
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
