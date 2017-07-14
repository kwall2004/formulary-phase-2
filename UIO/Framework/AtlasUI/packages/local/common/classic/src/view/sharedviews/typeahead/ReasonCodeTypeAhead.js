/**
 * Created by T4317 on 10/3/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ReasonCodeTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'reasontypeahead',
    viewModel: 'reasoncodetypeaheadmodel',
    //typeAhead: false,
    hideTrigger:true,
    bind: {
        store:'{contactcodelist}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>{ContactCodeDispText}</h4>'

        }
    },
    listeners: {
        beforequery: function (queryReasonCode) {
            var filter = queryReasonCode.query;

            filter = filter.trim();
            filter = filter.replace("'", "");

            queryReasonCode.query = filter + '*';
        }
    },
    displayField:'ContactCodeDispText',
    valueField:'ContactCode',
    queryParam: 'pSearchString',
    pageSize: 10
});
