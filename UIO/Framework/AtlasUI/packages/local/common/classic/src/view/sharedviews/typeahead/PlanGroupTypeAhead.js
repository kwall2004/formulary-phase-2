/*
 Developer: Srujith Cheruku
 Description: A typehead box for the Plan Group search
 Origin: Merlin
 8/22/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PlanGroupTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'plangrouptypeahead',
    viewModel: {
        stores: {
            plangroup: {
                model: 'Atlas.common.model.PlanGroup',
                remoteSort:true,
                remoteFilter: true
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    emptyText: '[e.g. MHP Medicare 2011]',
    bind: {
        store:'{plangroup}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>{planGroupCode}</h4>' +
                '<h5><span>{planGroupName}, {lobName}</span></h5>'+
                '<h5><span>{carrierName}</span></h5>'

        }
    },
    listeners:{
        beforequery: function (queryPlan) {
            var filter = queryPlan.query;
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
    displayField:'planGroupName',
    valueField:'planGroupId',
    queryParam: 'pWhere',
    pageSize: 10
});