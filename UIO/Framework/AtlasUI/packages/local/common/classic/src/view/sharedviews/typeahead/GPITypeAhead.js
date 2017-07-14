/*
 Developer: Tremaine Grant
 Description: A typehead box for the GPI search
 Origin: Merlin
 9/29/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.GPITypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'gpitypeahead',
    viewModel: 'gpi',
    typeAhead: false,
    hideTrigger:true,
    bind: {
        //value: '{drugName}',
        store:'{gpi}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<h4>{GPIName}</h4>' +
                '<h5>GPI:<span>{GPICode}</span></h5>'
        }
    },
    listeners: {
        beforequery: function (queryPlan) {
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
   /* displayField: 'GPIName',
    valueField: 'GPICode',*/
    queryParam: 'pWhere',
    pageSize: 10

});