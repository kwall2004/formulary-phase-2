/**
 * Created by c4539 on 10/5/2016.
 */
Ext.define('Atlas.common.view.sharedviews.typeahead.AllergenTypeAhead', {
    extend: 'Ext.form.field.ComboBox',

    xtype: 'allergentypeahead',

    viewModel: {
        stores:{
            allergenpicklistmstr: {
                model: 'Atlas.common.model.AllergenPickListMstr',
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    emptyText: '[e.g. Menthacin]',

    typeAhead: false,

    hideTrigger: true,

    bind: {
        store: '{allergenpicklistmstr}'
    },

    listConfig: {
        userCls: 'common-key-value-boundlist',

        getInnerTpl: function() {
            return '<h4>{CONCEPT_ID_DESC}</h4>' +
                '<h5>ID: <span>{DAM_CONCEPT_ID}</span></h5>'+
                '<h5>Type: <span>{DAM_CONCEPT_ID_TYP_DESC}</span></h5>'
        }
    },

    listeners: {
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

    displayField: 'CONCEPT_ID_DESC',

    valueField: 'CONCEPT_ID_DESC',

    queryParam: 'pWhere',

    pageSize: 10
});