/*
 Developer: Manasa Korivi
 Description: view model for GPI
 Origin: Merlin
 11/01/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ETCTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'etctypeahead',
    viewModel: 'etc',
    typeAhead: false,
    hideTrigger:true,
    bind: {
        //value: '{drugName}',
        store:'{etc}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>ETC Id:<span>{ETC_ID}</span></h4>' +
                '<h5>Name:<span>{ETC_NAME}</span></h5>'
        }
    },
    listeners: {
        beforequery: function (queryPlan) {
            var filter = queryPlan.query;

            if (filter.length < 3) {
                return;
            }

            queryPlan.query =  queryPlan.query;
        }
    },
    displayField: 'ETC_NAME',
    valueField: 'ETC_ID',
    queryParam: 'pcLookup',
    pageSize: 10,
    width: 450

});