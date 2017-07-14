Ext.define('Atlas.portals.rxmember.model.DrugSearchResults', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'LN', type: 'string' },
        { name: 'DrugType', type: 'string' },
        { name: 'Covered', type: 'string' },
        { name: 'CoveredDisplay', type: 'string',
            calculate: function (data) {
                return 'true' === data.Covered ? 'Yes' : 'No';
            }
        },
        { name: 'BN', type: 'string' },
        { name: 'OTCInd', type: 'string' },
        { name: 'OTCIndDisplay', type: 'string',
            calculate: function(data) {
                return '1' === data.OTCInd ? 'Yes' : 'No';
            }
        },
        { name: 'FormularyID', type: 'string' },
        { name: 'MinAge', type: 'string' },
        { name: 'MaxAge', type: 'string' },
        { name: 'PAInd', type: 'string' },
        { name: 'PaIndDisplay', type: 'string',
            calculate: function (data) {
                return 'true' === data.PAInd ? 'Yes' : 'No';
            }
        },
        { name: 'STApplies', type: 'string' },
        { name: 'STDetails', type: 'string' },
        { name: 'STAppliesDisplay', type: 'string',
            calculate: function(data) {
                if ('true' === data.STApplies) {
                    return 'Yes; ' + data.STDetails;
                }

                return 'No';
            }
        },
        { name: 'QLApplies', type: 'string' },
        { name: 'QLDetails', type: 'string' },
        { name: 'QLAppliesDisplay', type: 'string',
            calculate: function(data) {
                if ('true' === data.QLApplies) {
                    return 'Yes; ' + data.QLDetails;
                }

                return 'No';
            }
        },
        { name: 'Copay', type: 'string' },
        { name: 'maxCopay', type: 'string' },
        { name: 'coinsuranceStartAmt', type: 'string' },
        { name: 'deductible', type: 'string' },
        { name: 'memberResponsibilityAmt', type: 'string' },
        { name: 'memberResponsibilityAmtDisplay', type: 'string',
            calculate: function (data) {
                if (data.memberResponsibilityAmt === "") {
                    return "N/A";
                } else {
                    return data.memberResponsibilityAmt;
                }
            }
        },
        { name: 'maxCopayDisplay', type: 'string',
            calculate: function (data) {
                if (data.maxCopay === "$0" || data.maxCopay === "") {
                    return "N/A";
                } else {
                    return data.maxCopay;
                }
            }
        },
        { name: 'coinsuranceStartAmtDisplay', type: 'string',
            calculate: function (data) {
                if (data.coinsuranceStartAmt === "$0" || data.coinsuranceStartAmt === "") {
                    return "N/A";
                } else {
                    return data.coinsuranceStartAmt;
                }
            }
        },
        { name: 'deductibleDisplay', type: 'string',
            calculate: function (data) {
                if (data.deductible === "$0" || data.deductible === "") {
                    return "N/A";
                } else {
                    return data.deductible;
                }
            }
        },
        { name: 'DrugCode', type: 'string' },
        { name: 'strength', type: 'string' },
        { name: 'SideEffect', type: 'string' },
        { name: 'tierCode', type: 'string' },
        { name: 'tierDesc', type: 'string' },
        { name: 'TitleName', type: 'string' },
        { name: 'Uses', type: 'string' },
        { name: 'OtherBrandNames', type: 'string' },
        { name: 'CoverageGapDrug', type: 'string' }
    ],

    proxy: {
        url: 'portal/{0}/portalmemberdrugsearch',
        extraParams: {
            pagination: true
        }
    }
});