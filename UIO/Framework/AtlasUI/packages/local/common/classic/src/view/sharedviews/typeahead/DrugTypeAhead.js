/*
 Developer: Tremaine Grant
 Description: A typehead box for the Drug search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.DrugTypeAhead', {
    extend: 'Ext.form.field.ComboBox',
    xtype:'drugtypeahead',
    viewModel: 'drug',
    typeAhead: false,
    hideTrigger:true,
    bind: {
        store:'{drug}'
    },
    growMin: 120,
    growAppend:'WAW', // Ensure we have enough whitespace
    grow: true, // Let the field adjust to show entire drug name
    listConfig: {
        // Custom rendering template for each item
        minWidth: 370, // to accomodate paging toolbar
        userCls: 'common-key-value-boundlist',
        getInnerTpl: function() {
            return '<span><b>{LN}</b>-{LBLRID}</span><br>' +
                   '<span>NDC-{NDC}, GCN-{GCN_SEQNO}, HICL SEQ NO-{HICL_SEQNO}</span>';           
        }
    },
    // Override combo sizing to match with textfield (#1764)
    getGrowWidth: function () {
        return this.inputEl.dom.value;
    },
    // Force sizing during raw value set (#1764)
    setRawValue:function(){
        this.callParent(arguments);
        this.autoSize();
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
    displayField: 'LN',
    valueField: 'LN',
    queryParam: 'pWhere',
    pageSize: 10
});