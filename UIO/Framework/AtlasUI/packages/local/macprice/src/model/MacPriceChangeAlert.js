
Ext.define('Atlas.macprice.model.MacPriceChangeAlert', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'select', type: 'boolean'},
        { name: 'RecPointer', type: 'string'},
        { name: 'MACListId', type: 'number'},
        { name: 'drugLevel', type: 'string'},
        { name: 'alertType', type: 'string'},
        { name: 'alertTypeDesc', type: 'string'},
        { name: 'alertStatus', type: 'string'},
        { name: 'included', type: 'boolean'},
        {name: 'includedYesNo', type: 'string',
            calculate: function (data) {
                return (data.included == true ? 'Yes' : 'No');
            }
        },
        { name: 'GPICode', type: 'string'},
        { name: 'GCNSeqNo', type: 'number'},
        { name: 'GNN60', type: 'string'},
        { name: 'GPIName', type: 'string'},
        { name: 'NDC', type: 'string'},
        { name: 'LN', type: 'string'},
        { name: 'drugTypeFDB', type: 'string'},
        { name: 'drugTypeMDB', type: 'string'},
        { name: 'prevDrugTypeFDB', type: 'string'},
        { name: 'prevDrugTypeMDB', type: 'string'},
        { name: 'MACEffDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'userMac', type: 'number'},
        { name: 'sysMac', type: 'number'},
        { name: 'suggMAC', type: 'number'},
        { name: 'currAWP', type: 'number'},
        { name: 'currWAC', type: 'number'},
        { name: 'prevAWP', type: 'number'},
        { name: 'prevWAC', type: 'number'},
        { name: 'AWPChgPct', type: 'number'},
        { name: 'WACChgPct', type: 'number'},
        { name: 'prevAWPDt', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'prevWACDt', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'MIMAC', type: 'number'},
        { name: 'PctOfAWP85', type: 'number'},
        { name: 'totRxCurrMonth', type: 'number'},
        { name: 'totQtyCurrMonth', type: 'number'},
        { name: 'totIngCurrMonth', type: 'number'},
        { name: 'avgIngCurrMonth', type: 'number'},
        { name: 'mktRxCurrMonth', type: 'number'},
        { name: 'mktQtyCurrMonth', type: 'number'},
        { name: 'mktIngCurrMonth', type: 'number'},
        { name: 'totRxLastMonth', type: 'number'},
        { name: 'totQtyLastMonth', type: 'number'},
        { name: 'totIngLastMonth', type: 'number'},
        { name: 'avgIngLastMonth', type: 'number'},
        { name: 'mktRxLastMonth', type: 'number'},
        { name: 'mktQtyLastMonth', type: 'number'},
        { name: 'mktIngLastMonth', type: 'number'},
        { name: 'totRxLast3Mths', type: 'number'},
        { name: 'totQtyLast3Mths', type: 'number'},
        { name: 'totIngLast3Mths', type: 'number'},
        { name: 'avgIngLast3Mths', type: 'number'},
        { name: 'mktRxLast3Mths', type: 'number'},
        { name: 'mktQtyLast3Mths', type: 'number'},
        { name: 'mktIngLast3Mths', type: 'number'},
        { name: 'totRxLastQtr', type: 'number'},
        { name: 'totQtyLastQtr', type: 'number'},
        { name: 'totIngLastQtr', type: 'number'},
        { name: 'avgIngLastQtr', type: 'number'},
        { name: 'mktRxLastQtr', type: 'number'},
        { name: 'mktQtyLastQtr', type: 'number'},
        { name: 'mktIngLastQtr', type: 'number'},
        { name: 'totRxLast6Mths', type: 'number'},
        { name: 'totQtyLast6Mths', type: 'number'},
        { name: 'totIngLast6Mths', type: 'number'},
        { name: 'avgIngLast6Mths', type: 'number'},
        { name: 'mktRxLast6Mths', type: 'number'},
        { name: 'mktQtyLast6Mths', type: 'number'},
        { name: 'mktIngLast6Mths', type: 'number'},
        { name: 'totRxLastYear', type: 'number'},
        { name: 'totQtyLastYear', type: 'number'},
        { name: 'totIngLastYear', type: 'number'},
        { name: 'avgIngLastyear', type: 'number'},
        { name: 'mktRxLastYear', type: 'number'},
        { name: 'mktQtyLastYear', type: 'number'},
        { name: 'mktIngLastYear', type: 'number'},
        { name: 'totRxYTD', type: 'number'},
        { name: 'totQtyYTD', type: 'number'},
        { name: 'totIngYTD', type: 'number'},
        { name: 'avgIngYTD', type: 'number'},
        { name: 'mktRxYTD', type: 'number'},
        { name: 'mktQtyYTD', type: 'number'},
        { name: 'mktIngYTD', type: 'number'},
        { name: 'proposedBy', type: 'string'},
        { name: 'proposedDt', type: 'string'},
        { name: 'reviewedBy', type: 'string'},
        { name: 'reviewedDt', type: 'string'},
        { name: 'priceChangeDt', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'lastUpdateDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'covFormularies', type: 'string'},
        { name: 'exclFormularyIds', type: 'string'},
        { name: 'pendApprRecId', type: 'number'},
        { name: 'newPriceRecId', type: 'number'},
        { name: 'systemID', type: 'number'},
        { name: 'DateAddedFDB', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'DateAddedMDB', type: 'date', dateFormat: 'Y-m-d'}

    ],
    proxy: {
        extraParams: {
            //pagination: true
        },
        url: 'formulary/{0}/macpricechangealerts'
    }
});