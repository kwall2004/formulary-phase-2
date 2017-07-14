/*
 Developer: Srujith Cheruku
 Description: A combo box for the plan Benefit search
 Origin: Merlin
 8/24/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PlanBenefit', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'planBenefit',
    viewModel: 'planbenefitmodel',

    emptyText: 'Select a Plan Benefit',
    editable: false,
    bind: {
        store: '{planbenefitext}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function () {
            return '<h4>{BenefitCode}</h4>' +
                '<h5><span>{BenefitName}</span></h5>' +
                '<h5><span>{carrierName}</span></h5>'
        }
    },
    queryParam: 'pWhere',
    pageSize: 10
});
