/**
 * Created by agupta on 11/28/2016.
 */

Ext.define('Atlas.admin.view.TaskConfigurationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.taskconfigurationviewmodel',

    stores: {
        storeTaskConfigMaster: {
            model: 'Atlas.plan.model.PbmTaskConfiguration',
            autoLoad: false
        },

        storeTaskConfigDetail : {

        },

        storeCarrierID: {
            model: 'Atlas.plan.model.Carrier',
            autoLoad: false
        },

        storeTaskDataSource: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TaskDataSource'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeCarrierAccount: {
            model: 'Atlas.admin.model.CarrierAccountsModel'
            //autoLoad: true
        },

        storeLOB: {
            model: 'Atlas.pharmacy.model.CarrierLOBs'
            //autoLoad: true
        },

        storeTaskSourceEntity: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TaskSourceEntity'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeTaskTargetEntity: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TaskTargetEntity'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storePBMErrorListID : {
            model: 'Atlas.admin.model.ErrorListModel',
            autoLoad: true
        },

        storeTaskFileFormat: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'TaskFileFormat'
                },
                url: 'shared/{0}/listitems'
            }
        },

        storeProgGroupCodeAll : {


        },

        storeMCSProgGroupCode : {
            model: 'Atlas.plan.model.PlanProgramCodeUnique'
            //autoLoad: true
        },

        storeMCSprogBenefitCode : {
            model: 'Atlas.plan.model.PlanProgramCode'
            //autoLoad: true
        },

        storeTaskDetail : {
            model: 'Atlas.plan.model.PbmTaskConfiguration',
            autoLoad: true
        }





        /*pbmrulesStore: {
         model:'Atlas.admin.model.PbmRules',
         remoteSort:true,
         remoteFilter: true,
         autoLoad: false

         },
         pbmTypes:{
         model:'Atlas.common.model.PbmTypes',
         remoteSort:true,
         remoteFilter: true,
         autoLoad: false,
         listeners: {
         load: function (store , records , successful , operation , eOpts) {

         var ptypes = Ext.decode(operation.getResponse().responseText);
         if (ptypes != null && ptypes.metadata != null) {
         var listArray = new Array();//['[Create a New Rule Type]'];

         var data = ptypes.metadata.pDataList + "";
         store.insert(0,{pbmType: "[Create a New Rule Type]"});
         var listArray = data.split('|');
         for (var i=0;i<listArray.length;i++)
         {
         store.insert((i+1), {pbmType: listArray[i]});
         }

         }
         }
         }

         }*/

    }
});