Ext.define('Atlas.plan.view.group.GroupDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-group-detail',
    requires : [
        'Atlas.common.model.UserGroup'
    ],
    data:{
        isEditing: false
    },
    stores: {
        accounts: {
            type:'plan-carrieraccounts'
        },
        formularies: {
            type:'plan-formularyitems',
            filters:[ function(record) {
                // debugger;
                var now = Atlas.common.utility.Utilities.getLocalDateTime() ;
                return (record.get('StatDesc') == 'Draft' || record.get('StatDesc') == 'Approved'); // &&  record.get('TerminationDate') > now
            }]
        },
        copayfunctions: {
            type:'plan-copayfunctions'
        },
        maclists: {
           type:'plan-maclists',
            autoLoad:true
        },
        pharmanetworks: {
            type:'plan-pharmanetworks',
            autoLoad:true
        },
        nonpharmanetworks: {
            type:'plan-pharmanetworks',
            autoLoad:true
        },
        cmsplantypes: {
            type:'plan-cmsplantypes',
            autoLoad:true
        },
        pdeplantypes: {
            type:'plan-pdeplantypes',
            autoLoad:true
        },
        pcnDetail: {
            type:'plan-pcndetails'
        },
        planusergroup : {
            model : 'Atlas.plan.model.PlanUserGroupList',
            autoLoad : true,
            listeners:{
                load:function(store,records){
                    //debugger;
                }
            }
        },

        plangroupdetailinfo : {
            model : 'Atlas.plan.model.PlanGroupInfo',
            autoLoad : false
            // listeners:{
            //     load:function(store,records){
            //         //debugger;
            //     }
            // }
        },

        plandefaultaddress:{
            type: 'plan-planaddresslists'
        }
    }
});