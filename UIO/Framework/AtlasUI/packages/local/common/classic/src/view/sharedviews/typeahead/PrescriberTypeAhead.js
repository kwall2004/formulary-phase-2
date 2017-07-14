/*
 Developer: Tremaine Grant
 Description: A typehead box for the Prescriber search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.PrescriberTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'prescribertypeahead',
    //viewModel: 'prescribertypeaheadmodel',
    viewModel: {
        stores: {
            prescriberlist: {
                model: 'Atlas.common.model.PrescriberList',
                remoteSort:true,
                remoteFilter: true
            }
        }
    },
    typeAhead: false,
    hideTrigger:true,
    emptyText: '[NPI DEA PrescriberName Address]',
    bind: {
        store:'{prescriberlist}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>{fullname}</h4>' +
                '<h5>NPI: <span>{npi}</span></h5>' +
                '<h5>Address: <span>{locaddr1}</span></h5>' +
                '<h5>Location:<span>{loccity}, {locstate} {loczip}</span></h5>'
        }
    },
    listeners:{
        beforequery: function(queryPlan){
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
    //displayField:'fullname',
    //valueField:'npi',
    queryParam: 'pWhere',
    pageSize: 10
});