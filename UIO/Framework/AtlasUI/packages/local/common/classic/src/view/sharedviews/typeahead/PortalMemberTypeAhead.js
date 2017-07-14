/*
 Developer: Tremaine Grant
 Description: A typehead box for the Member search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PortalMemberTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'portalmembertypeahead',
    hideTrigger: true,
    emptyText: '[MemberID Name SSN MeridianRxID]',
    viewModel: {
        stores:{
            portalmembermasterext: {
                model: 'Atlas.common.model.PortalMemberExt',
                remoteSort: true,
                remoteFilter: true
            }
        }
    },
    bind: {
        store: '{portalmembermasterext}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function () {
            return '<h4>{MemberName}</h4>' +
                '<h5>MeridianRx ID:<span>{recipientID}</span></h5>' +
                '<h5>Member ID:<span>{carrierName}</span></h5>' +
                '<h5>Carrier:<span>{birthDate}</span></h5>' +
                '<h5>DOB:<span>{gender}</span></h5>' +
                '<h5>SSN:<span>{ssn}</span></h5>' +
                '<h5>Status:<span>{accountName}</span></h5>' +
                '<h5>Status:<span>{memStatus}</span></h5>'
        }
    },
    listeners:{
        beforequery: function (queryPlan) {
            var filter = queryPlan.query;

            if (filter.length < 3) {
                return;
            }

            queryPlan.query = 'wrdidx contains ' + queryPlan.query;
        }
    },
    displayField:'MemberName',
    valueField:'recipientID',
    queryParam: 'pWhere',
    pageSize: 10
});