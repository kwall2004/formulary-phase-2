/**
 * Created by d3973 on 10/3/2016.
 */
Ext.define('Atlas.admin.model.DashboardModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admindashboardmodel',
    fields: [{
        name: 'dashboardName',
        type: 'string'
    }, {
        name: 'dashboardProgramName',
        type: 'string'
    }, {
        name: 'dashboardDesc',
        type: 'string'
    }, {
        name: 'dashboardIcon',
        type: 'string'
    }, {
        name: 'dashboardSortOrder',
        type: 'int'
    },
        {
            name: 'dashboardId',
            type: 'int', defaultValue: 0
        },
        {
            name: 'dashboardHeight',
            type: 'int'
        }, {
            name: 'isDefault',
            type: 'boolean', defaultValue: false
        }],

    proxy: {
        unifyOperations: true,
        createUrl: 'system/{0}/dashboardmaster',
        updateUrl: 'system/{0}/dashboardmaster',
        destroyUrl: 'system/{0}/dashboardmaster',
        extraParams: {
            pagination: true
        },
        //calling getDashboardMaster.p
        url: 'system/{0}/dashboardmaster'
// need to comment out this, probably chang is default to boolean then render it like in outreach
        /*reader: {
         //Specify metadata property
         metaProperty: 'metadata',
         //Optionally specify root of the data if it's other than 'data'
         rootProperty: function(payload) {

         payload.data.forEach(function(item, index){
         if(item.isDefault==true)
         item.isDefault ="yes";

         if(item.isDefault==false)
         item.isDefault ="no";

         });
         return payload.data;
         }
         }*/
    }
});