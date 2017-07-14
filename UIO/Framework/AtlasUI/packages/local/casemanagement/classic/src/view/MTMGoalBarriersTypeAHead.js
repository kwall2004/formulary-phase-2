/**
 * Created by s6627 on 11/17/2016.
 */
Ext.define('Atlas.casemanagement.view.MTMGoalBarriersTypeAHead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'barrierstypeahead',
    viewModel: 'ProblemsAndGoalsViewModel',
    typeAhead: false,
    hideTrigger:true,
    bind: {
        store:'{storeBarriersTypeahead}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h3><span></span>{Detail}</h3>'
        }
    },
    displayField: 'Detail',
    valueField: 'Code',
    queryParam: 'pSearchString',
    pageSize: 10,
    width: 450
});