Ext.define('Atlas.common.view.sharedviews.typeahead.MemberTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'membertypeahead',
    matchFieldWidth: false,
    hideTrigger: true,
    emptyText: '[MemberID Name SSN MeridianRxID]',
    viewModel: {
        stores:{
            membermasterext: {
                model: 'Atlas.common.model.MemberMasterExt',
                remoteSort: true,
                remoteFilter: true
            }
        }
    },
    bind: {
        store: '{membermasterext}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function () {
            return '<h4>{MemberName}</h4>' +
                '<h5>MeridianRx ID:<span>{recipientID}</span></h5>' +
                '<h5>Member ID:<span>{memberID}</span></h5>' +
                '<h5>Carrier:<span>{carrierName}</span></h5>' +
                '</span><h5>DOB:<span>{dobFormat}</span> Gender:<span>{gender}</span></h5>' +
                '<h5>SSN:<span>{ssn}</span></h5>' +
                '<h5>Account:<span>{accountName}</span></h5>' +
                '<h5>Status:<span>{memStatus}</span></h5>'
        }
    },
    listeners:{
        beforequery: function (queryPlan) {
            var filter = queryPlan.query.replace(/\*/g, "");

            if (filter.length < 3) {
                return;
            }

            filter = filter.trim();
            filter = filter.replace("'", "");

            var pFilter = filter.split(/,| /);

            var strWrd = "wrdidx contains '";
            for (var j = 0; j < pFilter.length; j++)
            {
                if (pFilter[j] != "")
                {
                    strWrd = strWrd + pFilter[j] + "* ";
                }
            }
            queryPlan.query = strWrd + "'";
        }
    },
    displayField:'MemberName',
    valueField:'recipientID',
    queryParam: 'pWhere',
    pageSize: 10
});


