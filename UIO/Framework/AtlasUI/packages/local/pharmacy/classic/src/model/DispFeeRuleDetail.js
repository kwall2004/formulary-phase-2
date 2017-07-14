Ext.define('Atlas.pharmacy.model.DispFeeRuleDetail', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'DispFeeRuleID', defaultValue: 0},
        {name: 'Maintenance', defaultValue: ''},
        {name: 'DrugType', defaultValue: ''},
        {name: 'OTCInd', defaultValue: 'A'},
        {name: 'RangeBasis', defaultValue: 'DSU'},
        {name: 'RangeFrom', defaultValue: 0},
        {name: 'RangeTo', defaultValue: 0},
        {name: 'DispFee', defaultValue: 0},
        {name: 'SystemID', defaultValue: 0}
    ],
    proxy: {
        url: 'pharmacy/{0}/dispfeeruledetail'
    }
});
