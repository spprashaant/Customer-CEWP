<script type="text/javascript" src="../SiteAssets/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../SiteAssets/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../SiteAssets/utils.js"></script>
<script type="text/javascript" src="../SiteAssets/CustomerEdit.js"></script>

<link rel="Stylesheet" type="text/css" href="../SiteAssets/App.css" />
    <link href="../SiteAssets/fabric.min.css" rel="stylesheet" />
    <link href="../SiteAssets/fabric.components.min.css" rel="stylesheet" />

    <div>
        <div id="customerContainer" style="display:none">
            <table class="ms-font-m-plus ms-bgColor-themeLighter" cellspacing="0" cellpadding="15">
                <tbody>
                    <tr>
                        <td>Credit Limit</td>
                        <td>
                            <select data-bind="options:CreditLimitOptions, value:CREDITLIMIT, optionsCaption: 'Select...'" ></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Update Correct Credit Limit</td>
                        <td>
                            <input type="text" data-bind="numeric, value:UPDATECORRECTCREDITLIMIT" />
                        </td>
                    </tr>
                    <tr>
                        <td>Credit Limit Status</td>
                        <td>
                            <select data-bind="options:CreditLimitStatusOptions, value:CREDITLIMITSTATUS, optionsCaption: 'Select...'" ></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Overall Status</td>
                        <td>
                            <select data-bind="options:OverallStatusOptions, value:OVERALLSTATUS, optionsCaption: 'Select...'" ></select>
                        </td>
                    </tr>
                    <tr>
                        <td>Comments</td>
                        <td>
                            <input data-bind="value: COMMENTS1" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td colspan="2" align="right">
                            <button type="button" class="ms-Button" data-bind="click: saveCustomer">
                                <span class="ms-Button-label">Save</span>
                            </button>
                            <button type="button" class="ms-Button" data-bind="click: cancel">
                                <span class="ms-Button-label">Cancel</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>