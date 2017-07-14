/*
 Developer: Tremaine Grant
 Description: A typehead box for the Provider search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.ProviderTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'providertypeahead',
    viewModel: {
        stores: {
            providerlist: {
                model: 'Atlas.common.model.Provider',
                remoteSort:true,
                remoteFilter: true
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    matchFieldWidth: false,
    bind: {
        store:'{providerlist}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4><span>{ncpdpId}</span> {Name}</h4>' +
                '<h5>Address: <span>{Address1}</span></h5>'+
                '<h5>Location:<span>{locCity}</span>, <span>{locState}</span> <span>{locZip}</span></h5>'
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
    displayField:'Name',
    valueField:'ncpdpId',
    queryParam: 'pWhere',
    pageSize: 10
});