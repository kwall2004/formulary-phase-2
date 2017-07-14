Ext.define('Atlas.common.view.sharedviews.typeahead.PortalMedicationTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'portalmedicationtypeahead',
    viewModel: {
        stores:{
            medicationmasterextp: {
                model: 'Atlas.common.model.portals.MedicationMasterExtP'
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    bind: {
        store:'{medicationmasterextp}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>{LN}</h4> - {LBLRID}' +
                '<h5>NDC:<span>{NDC}</span></h5>'+
                '<h5>GCN:<span>{GCN_SEQNO}</span></h5>'
        }
    },
    listeners: {
        beforequery: function (queryPlan) {
            var filter = queryPlan.query;

            if (filter.length < 3) {
                return;
            }

            queryPlan.query = 'wrdidx contains ' + queryPlan.query;
        }
    },
    displayField: 'BN',
    valueField: 'BN',
    queryParam: 'pWhere',
    pageSize: 10,
    width: 450
});