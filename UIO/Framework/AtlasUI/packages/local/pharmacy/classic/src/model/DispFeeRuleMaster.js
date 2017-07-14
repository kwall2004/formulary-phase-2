Ext.define('Atlas.pharmacy.model.DispFeeRuleMaster', {
    extend: 'Atlas.common.model.Base',
    fields: ['DispFeeRuleID', 'RuleName'],
    proxy: {
        url: 'pharmacy/{0}/dispfeerulemaster'
    }

});
