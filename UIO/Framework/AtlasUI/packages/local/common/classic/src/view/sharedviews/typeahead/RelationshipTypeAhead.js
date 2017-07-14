/**
 * Created by n6684 on 11/10/2016.
 */

Ext.define('Atlas.common.view.sharedviews.typeahead.RelationshipTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'relationshiptypeahead',
    viewModel: {
        stores: {
            relationshiptypelist: {
                model: 'Atlas.common.model.ProviderRelationship',
                remoteSort:true,
                remoteFilter: true
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    matchFieldWidth: false,
    bind: {
        store:'{relationshiptypelist}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4><b>{relationshipID} {name}</b></h4>' +
                '<h5>Address: <span>{address1}</span></h5>'+
                '<h5>Location:<span>{city}</span>,<span>{state}</span> <span>{zip}</span></h5>'
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
    displayField:'name',
    valueField:'relationshipID',
    queryParam: 'pWhere',
    pageSize: 10
});
