<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../SiteAssets/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../SiteAssets/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../SiteAssets/utils.js"></script>
<script type="text/javascript" src="../SiteAssets/App.js"></script>

<link rel="Stylesheet" type="text/css" href="../SiteAssets/App.css" />
    <link href="../SiteAssets/fabric.min.css" rel="stylesheet" />
    <link href="../SiteAssets/fabric.components.min.css" rel="stylesheet" />

    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    

    <!-- Add your JavaScript to the following file -->
    
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Data Correctness
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

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

</asp:Content>
