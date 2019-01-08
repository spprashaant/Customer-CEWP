<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/repositories.js"></script>
    <script type="text/javascript" src="../Scripts/utils.js"></script>
    <script type="text/javascript" src="../Scripts/ko.sp.v1.0.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/fabric.min.css" rel="stylesheet" />
    <link href="../Content/fabric.components.min.css" rel="stylesheet" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/CustomerEdit.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Data Correctness
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

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

</asp:Content>
