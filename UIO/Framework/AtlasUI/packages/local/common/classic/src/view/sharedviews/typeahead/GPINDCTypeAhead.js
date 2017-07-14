/**
 * Created by s6627 on 11/4/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.GPINDCTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'gpindctypeahead',
    viewModel: 'gpindc',
    typeAhead: false,
    hideTrigger:true,
    bind: {
        //value: '{drugName}',
        store:'{gpindc}'
    },
    listConfig: {
        // Custom rendering template for each item
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<b>{descAbbr}</b> <br>' +
                    'NDC-{NDC}<br>' +
                    'GPI-{GPICode}, GPI10-{GPI10}';
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