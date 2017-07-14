/**
 * Created by S4505 on 10/20/2016.
 * Updated by S4662
 */

Ext.define('Atlas.admin.model.ContactCodes', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admincontactcodes',

    fields: [


        { name: 'ReasonCode',      type: 'string', defaultValue:'' },
        { name: 'ShortDescription',   type: 'string', defaultValue:''},
        { name: 'DESCRIPTION',     type: 'string', defaultValue:'' },
        { name: 'GroupPermissions',      type: 'string', defaultValue:'' },
        { name: 'ACTIVE',   type: 'boolean', defaultValue:true},
        { name: 'rowNum',   type: 'integer',defaultValue:0},
        { name: 'SystemID',   type: 'float',defaultValue:0},
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}

    ],
    proxy: {
       /* unifyOperations: true,
        createUrl: 'shared/rx/contactcode',
        updateUrl: 'shared/rx/contactcode',
        destroyUrl: 'shared/rx/contactcode',*/

        url: 'shared/rx/contactcode',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                payload.data.forEach(function (item, index) {
                    item.GroupPermissionsData=[];
                    item.isNeedUpdate =false;
                    if(!item.Category)
                      item.Category= 0;
                    if(item.GroupPermissions == "*")
                        item.GroupPermissionsData.push("0");
                    else
                    {
                        item.GroupPermissions.split(',').forEach(function(v,i){
                            item.GroupPermissionsData.push(v.toString().replace("*","0"));
                        })


                    }

                });

                return payload.data;
            }
        },
        extraParams: {
            pagination: true,
            pShowAll:true,
            ipcCategory:'All'
        }
    }

});


Ext.define('Atlas.admin.model.CategoryCodes', {
    extend: 'Atlas.common.model.Base',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'ContactCodeCategory'
        },
        url: 'shared/{0}/listitems',
        pagination: true,
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                var objall =  [];
                objall.push({name: '',value:0});
                payload.data.forEach(function (item, index) {
                    objall.push(item);
                });
                return objall;
            }
        }
    }
});
