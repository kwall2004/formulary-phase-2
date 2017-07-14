/**
 * Created by d3973 on 9/28/2016.
 */
Ext.define('Atlas.admin.view.ClaimsRuleDefinitionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminclaimsruledefinition',
    requires: [
        'Atlas.admin.model.ClaimEditRules'
    ],

    stores: {
        rulesDefinitions: {
            model: 'Atlas.admin.model.ClaimEditRules',
            remoteSort: true,
            remoteFilter: true,
            pageSize: 10,
            listeners: {
                beforeload:function(store,operation,eOpts){
                    var filters = operation._filters;
                    if (filters){
                        for (var i=0;i<filters.length;i++)
                        {
                            var filter = filters[i];
                            if (filter._property=='ttdataSource')
                            {
                                if (!Ext.Array.contains(filter._value,'All'))
                                {
                                    filter._value.push("All");
                                }
                                break;
                            }

                        }

                    }
                }
            }

        },

        ncpdpVersion: {
            autoLoad: false,
            model: 'Atlas.admin.model.NcpdpVersion'
        },

        SegmentStore: {
            autoLoad: false,
            model: 'Atlas.admin.model.claimdef.Segment'
        },

        ClaimDataSourceStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.FormularyDataSourceList',
            listeners: {
                load: function (store) {
                    store.insert(0, {ListDescription: 'All', ListItem: 'All'});
                }
            }
        },

        TransTypeStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.TransactionType'
        },

        RuleLevelStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.RuleLevels'
        },

        RuleSeqStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.RuleSequence'
        },

        NCPDPErrorCodes: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.NCPDPErrorCode'
        },
        NCPDPErrorCodesComb: {
            autoLoad: false,
            model: 'Atlas.admin.model.claimdef.NCPDPErrorCode'
        },


        SecNCPDPErrorCodes: {
            autoLoad: false,
            model: 'Atlas.admin.model.claimdef.NCPDPErrorCode'
        },

        IfTrueStore: {
            autoLoad: false,
            model: 'Atlas.admin.model.claimdef.IfTrue'
        },


        ConditionsStore: {
            model: 'Atlas.admin.model.claimdef.Conditions'
        },

        ConditionListStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.ConditionList'
        },
        YesNoNullStore:{
            fields: ['text', 'value'],
            data: [
                {text: 'Yes', value: true},
                {text: 'No', value: false && null}
            ]
        },
        ConditionFilterStore: {
            fields: ['text', 'value'],
            data: [
                {text: 'List Name', value: 'L'},
                {text: 'Table Fields', value: 'T'},
                {text: 'Function', value: 'F'},
                {text: 'Value', value: ''}
            ]
        },

        ValueFilterStore: {
            fields: ['text', 'value'],
            data: [
                {text: 'List Name', value: 'L'},
                {text: 'Table Fields', value: 'T'},
                {text: 'Function', value: 'F'},
                {text: 'Value', value: ''}
            ]
        },

        OperatorStore: {
            autoLoad: true,
            model: 'Atlas.admin.model.claimdef.OperatorList',
            remoteSort: true,
            remoteFilter: true
        },

        DURRsnCodes: {
            autoLoad: false,
            model: 'Atlas.admin.model.claimdef.DURReasonCodeList',
            remoteSort: true,
            remoteFilter: true
        }


        /*FilterDataSourceStore: {
         autoLoad: true,
         model: 'Atlas.admin.model.ClaimEditRules',
         remoteSort: true,
         remoteFilter: true
         },*/
        /*ActiveFlagStore: {
         autoLoad: true,
         model: 'Atlas.admin.model.ClaimEditRules',
         remoteSort: true,
         remoteFilter: true
         },*/

    }
});