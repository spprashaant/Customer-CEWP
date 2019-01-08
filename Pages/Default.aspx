<script type="text/javascript" src="../SiteAssets/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../SiteAssets/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../SiteAssets/utils.js"></script>
<script type="text/javascript" src="../SiteAssets/App.js"></script>

<link rel="Stylesheet" type="text/css" href="../SiteAssets/App.css" />
    <link href="../SiteAssets/fabric.min.css" rel="stylesheet" />
    <link href="../SiteAssets/fabric.components.min.css" rel="stylesheet" />

    <div>
        <div id="customersContainer" class="ms-font-m-plus" style="display:none">
            <table border="1" cellspacing="0" cellpadding="5" width="95%">
                <thead class="ms-bgColor-themePrimary ms-fontColor-white">
                <th>SupplierID</th>
                <th>SupplierName</th>
                <th>TotalAR</th>
                <th>PastDueAmounts</th>
                <th>CreditBreachStatus</th>
                <th>DeviationApprovalRequired</th>
                <th>CreditBreachPercent</th>
                <th>SeekingProcess</th>
                    <th></th>
                </thead>
                <tbody data-bind="foreach: customers">
                    <tr>
                        <td data-bind="text: SupplierID"></td>
                        <td data-bind="text: SupplierName"></td>
                        <td data-bind="text: TotalAR"></td>
                        <td data-bind="text: PastDueAmounts"></td>
                        <td data-bind="text: CreditBreachStatus"></td>
                        <td data-bind="text: DeviationApprovalRequired"></td>
                        <td data-bind="text: CreditBreachPercent"></td>
                        <td data-bind="text: SeekingProcess"></td>
                        <td>
                            <a class="ms-Link editButton" data-bind="click: editCustomer">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
