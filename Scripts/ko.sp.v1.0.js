﻿/*
 * Project Name : KoSp - Knockout for SharePoint
 * Version      : 1.0 
 * Build Date   : 10-Sep-2013
 * Author       : Ashok Raja .T
 * Blog         : http://www.ashokraja.me 
 * Project Site : http://kosp.codeplex.com
 */
var formatMutliItems = function (element, valueAccessor, allBindingsAccessor, dField, sType) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var strLookUpData = ko.utils.unwrapObservable(value);
    var dispColumn = allBindings.displayField || dField;
    var sourceType = sType || 'rest';
    var bas = allBindings.dataFormat;
    var dispSep = bas || ', ';
    var resu = parseMultiItems(strLookUpData, sourceType, dispSep, dispColumn);
    if (resu) {
        if (bas)
            element.innerHTML = resu.substring(0, resu.length - dispSep.length);
        else
            return resu.substring(0, resu.length - dispSep.length);
    }
    else {
        return allBindings.defaultValue;
    }
};

function parseMultiItems(strLookUpData, sType, dispSep, dispColumn) {
    var resu = '';
    if (strLookUpData) {
        switch (sType) {
            case "camlLookup":
                var lpItems = strLookUpData.split(';#');
                var ItemType = dispColumn == "id" ? 0 : 1;
                for (var i = 0, j = lpItems.length; i < j; i++) {
                    if (i % 2 == ItemType)
                        resu += lpItems[i] + dispSep;
                }
                return resu;
            case "camlChoice":
            case "camlAttach":
                if (sType == 'camlAttach' && strLookUpData == '0')
                    return null;
                var lpItems = strLookUpData.split(';#');
                ko.utils.arrayForEach(lpItems, function (item) {
                    if (item)
                        resu += item + dispSep;
                });
                return resu;
            case "restLookup":
            default:
                ko.utils.arrayForEach(strLookUpData.results, function (item) {
                    resu += item[dispColumn] + dispSep;
                });
                return resu;
        }
    }
    return strLookUpData;
}
var formatMetaItems = function (element, valueAccessor, allBindingsAccessor, dField) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var strLookUpData = ko.utils.unwrapObservable(value);
    var dispColumn = allBindings.displayField || dField;
    var dispIndex = allBindings.displayIndex;
    var bas = allBindings.dataFormat;
    var dispSep = bas || ', ';
    var resu = '';

    if (dispIndex) {
        resu = strLookUpData.results[dispIndex].__metadata[dispColumn];
    }
    else {
        ko.utils.arrayForEach(strLookUpData.results, function (item) {
            resu += item.__metadata[dispColumn] + dispSep;
        });
        if (bas)
            element.innerHTML = resu.substring(0, resu.length - dispSep.length);
        else
            return resu.substring(0, resu.length - dispSep.length);
    }
};

var formatText = function (element, valueAccessor, allBindingsAccessor, dField, dType) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var strDict = ko.utils.unwrapObservable(value);
    var dispColumn = allBindings.displayField || dField;
    var srcType = allBindings.sourceType || dType;
    if (strDict) {
        return getDataStringFromKo(strDict, srcType, dispColumn, ',');
    }
    else {
        return allBindings.defaultValue;
    }
};

function getDataStringFromKo(strDict, srcType, dispColumn, splitText) {
    switch (srcType) {
        case 'lookup':
            return strDict[dispColumn] || strDict[parseInt(dispColumn)];
        case 'meta':
            return strDict.__metadata[dispColumn] || strDict.__metadata[parseInt(dispColumn)];
        case 'array':
            return strDict.split(splitText)[parseInt(dispColumn)];
        case 'link':
        case 'img':
            return strDict.split(splitText)[0];
        case 'linktext':
            return strDict.split(splitText)[1];
        default:
            return strDict;
    }
}

var formatAttr = function (element, valueAccessor, allBindingsAccessor, dField, dType, attrib, onlyAttrib) {

    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var strDict = ko.utils.unwrapObservable(value);
    var dispColumn = allBindings.displayField || dField;
    var sText = allBindings.splitText || ',';
    var srcType = allBindingsAccessor().sourceType || dType;
    var htmlAttr = allBindings.attrName || attrib;
    var dispText = allBindings.displayText;
    var dValue = allBindings.defaultValue;
    var tData = getDataStringFromKo(strDict, srcType, dispColumn, sText);

    if (tData)
        element.setAttribute(htmlAttr, tData);
    else
        element.setAttribute(htmlAttr, dValue);

    if (dispText)
        element.innerHTML = dispText;
    else if (srcType == 'link') {
        tData = strDict.split(',');
        dispText = dispText || tData.length > 1 ? tData[1] : tData;
        element.innerHTML = dispText;
    } else if (onlyAttrib === false)
        element.innerHTML = dValue ? dValue : tData;
};

var formatSPDate = function (element, valueAccessor, allBindingsAccessor, format) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var CustFormat = allBindings.dataFormat || format;
    var strData = ko.utils.unwrapObservable(value);
    return strData ? moment.utc(strData).format(CustFormat) : allBindings.defaultValue;
};

var formatSPsDate = function (element, valueAccessor, allBindingsAccessor, format) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var CustFormat = allBindings.dataFormat || format;
    var strData = ko.utils.unwrapObservable(value);
    return strData ? moment(parseKoCaml(strData)).format(CustFormat) : allBindings.defaultValue;
};

var formatSPNumber = function (element, valueAccessor, allBindingsAccessor, format) {

    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var CustFormat = allBindings.dataFormat || format;
    var strData = ko.utils.unwrapObservable(value);
    if (strData)
        return CustFormat ? numeral(strData).format(CustFormat) : strData;
    else
        return allBindings.defaultValue;
};

var formatSPsNumber = function (element, valueAccessor, allBindingsAccessor, format) {

    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var CustFormat = allBindings.dataFormat || format;
    var strData = ko.utils.unwrapObservable(value);
    if (strData) {
        strData = parseKoCaml(strData);
        return CustFormat ? numeral(strData).format(CustFormat) : strData;
    }
    else
        return allBindings.defaultValue;
};

function parseKoCaml(strData) {
    var sepIndex = strData.indexOf(';#');
    if (sepIndex > -1)
        strData = strData.substring(sepIndex + 2);
    return strData;
}

var formatPair = function (element, valueAccessor, allBindingsAccessor, seperator, index) {

    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var itIndex = allBindings.itemIndex || index;
    itIndex = allBindings.itemIndex == 0 ? 0 : itIndex;
    var sep = allBindings.seperator || seperator;
    var strData = ko.utils.unwrapObservable(value);
    if (strData) {
        var itms = strData.split(sep);
        return itms.length >= itIndex ? itms[itIndex] : allBindings.defaultValue;
    }
    else
        return allBindings.defaultValue;
};

var formatBool = function (element, valueAccessor, allBindingsAccessor, format, srcType) {
    var value = valueAccessor(), allBindings = allBindingsAccessor();
    var strDict = ko.utils.unwrapObservable(value);
    var CustFormat = allBindings.dataFormat || format;
    if (srcType == 'caml') {
        if (strDict) {
            strDict = (strDict == 'true' || strDict == '1') ? true : false;
            return parseKoBool(strDict, CustFormat);
        } else return allBindings.defaultValue;
    } else
        return parseKoBool(strDict, CustFormat);
};

function parseKoBool(strDict, CustFormat) {
    switch (CustFormat) {
        case 'upper':
            return strDict ? 'TRUE' : 'FALSE';
        case 'lower':
            return strDict ? 'true' : 'false';
        case 'number':
            return strDict ? '1' : '0';
        default:
            return strDict ? 'True' : 'False';
    }
}

ko.bindingHandlers.spLookup = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var ab = allBindingsAccessor();
        if (ab.src == 'sps')
            $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Title", 'camlLookup'));
        else {
            if (ab.multi == true)
                $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Title", 'restLookup'));
            else
                $(element).text(formatText(element, valueAccessor, allBindingsAccessor, "Title", 'lookup'));
        }
    }
};

ko.bindingHandlers.spChoice = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var ab = allBindingsAccessor();
        if (ab.src == 'sps') {
            var tempValue = ko.utils.unwrapObservable(valueAccessor());
            if (tempValue) {
                if (ab.multi == true || tempValue.indexOf(';#') > -1)
                    $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Value", 'camlChoice'));
                else
                    $(element).text(tempValue);
            }
            else {
                $(element).text(ab.defaultValue);
            }
        }
        else {
            if (ab.multi == true)
                $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Value"));
            else
                $(element).text(formatText(element, valueAccessor, allBindingsAccessor, "Value", 'lookup'));
        }
    }
};


ko.bindingHandlers.spUser = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var ab = allBindingsAccessor();
        if (ab.src == 'sps') {
            $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Title", 'camlLookup'));
        }
        else {
            if (ab.multi == true)
                $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Name"));
            else
                $(element).text(formatText(element, valueAccessor, allBindingsAccessor, "Name","lookup"));
        }
    }
};

ko.bindingHandlers.spDate = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        if (allBindingsAccessor().src == 'sps')
            $(element).text(formatSPsDate(element, valueAccessor, allBindingsAccessor, "DD-MMM-YYYY"));
        else
            $(element).text(formatSPDate(element, valueAccessor, allBindingsAccessor, "DD-MMM-YYYY"));
    }
};

ko.bindingHandlers.spNumber = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        if (allBindingsAccessor().src == 'sps')
            $(element).text(formatSPsNumber(element, valueAccessor, allBindingsAccessor, ''));
        else
            $(element).text(formatSPNumber(element, valueAccessor, allBindingsAccessor, ''));
    }
};

ko.bindingHandlers.spBool = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        if (allBindingsAccessor().src == 'sps')
            $(element).text(formatBool(element, valueAccessor, allBindingsAccessor, 'default', 'caml'));
        else
            $(element).text(formatBool(element, valueAccessor, allBindingsAccessor, 'default', 'rest'));
    }
};

ko.bindingHandlers.spItem = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatPair(element, valueAccessor, allBindingsAccessor, ';#', 1));
    }
};

ko.bindingHandlers.spUrl = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var ab = allBindingsAccessor();
        if (ab.src == 'sps')
            $(element).text(formatMutliItems(element, valueAccessor, allBindingsAccessor, "Value", 'camlAttach'));
        else {
            if (ab.multi == true)
                $(element).text(formatMetaItems(element, valueAccessor, allBindingsAccessor, "media_src"));
            else
                $(element).text(formatText(element, valueAccessor, allBindingsAccessor, 'media_src', 'meta'));
        }
    }
};

ko.bindingHandlers.spMetaItem = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        if (allBindingsAccessor().multi == true)
            $(element).text(formatMetaItems(element, valueAccessor, allBindingsAccessor, "uri"));
        else
            $(element).text(formatText(element, valueAccessor, allBindingsAccessor, 'uri', 'meta'));
    }
};

ko.bindingHandlers.spHref = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatAttr(element, valueAccessor, allBindingsAccessor, '', 'link', 'href', false));
    }
};

ko.bindingHandlers.spSrc = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatAttr(element, valueAccessor, allBindingsAccessor, '', 'img', 'src', true));
    }
};

ko.bindingHandlers.spLink = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatText(element, valueAccessor, allBindingsAccessor, '', 'link'));
    }
};

ko.bindingHandlers.spLinkText = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatText(element, valueAccessor, allBindingsAccessor, '', 'linktext'));
    }
};

ko.bindingHandlers.spText = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatText(element, valueAccessor, allBindingsAccessor));
    }
};

ko.bindingHandlers.spAttr = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).text(formatAttr(element, valueAccessor, allBindingsAccessor, '', '', '', true));
    }
};