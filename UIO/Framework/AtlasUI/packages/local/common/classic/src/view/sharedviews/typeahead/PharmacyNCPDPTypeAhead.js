/**
 * Created by d4662 on 1/6/2017.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PharmacyNCPDPTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'pharmacytypeahead',
    viewModel: {
        stores: {
            providerlist: {
                model: 'Atlas.common.model.PharmacyLoc',
                remoteSort:true,
                remoteFilter: true
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    bind: {
        store:'{providerlist}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4><span>{ncpdpId}</span> {Name}</h4>' +
                '<h5><span>{Address1}</span></h5>'+
                '<h5><span>{locCity}</span>, <span>{locState}</span> <span>{locZip}</span></h5>'
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
    //displayField:'Name',
    /*displayTpl:Ext.create('Ext.XTemplate',
     '<tpl for=".">{ncpdpId} {Name}</tpl>'
     ),*/
    //valueField:'ncpdpId',
    queryParam: 'pWhere',
    pageSize: 10
});
