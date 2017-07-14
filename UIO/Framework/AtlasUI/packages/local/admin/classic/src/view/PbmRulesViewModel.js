/**
 * Created by d4662 on 11/21/2016.
 */
Ext.define('Atlas.admin.view.PbmRulesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminPbmRulesViewModel',

    stores: {
        pbmrulesStore: {
            model:'Atlas.admin.model.PbmRules',
            remoteSort:true,
            remoteFilter: true,
            autoLoad: false

        },
        pbmTypes:{
            model:'Atlas.common.model.PbmTypes',
            // remoteSort:true,
            // remoteFilter: true,
            autoLoad: true,
            listeners: {
                load: function (store , records , successful , operation , eOpts) {
                    /*debugger;
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

                    }*/
                    store.insert(0,{value:'',name:'[Create a New Rule Type]'});
                }
            }

        }

    }
});