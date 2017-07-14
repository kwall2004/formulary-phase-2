/**
 * Created by T4317 on 11/30/2016.
 */
Ext.define('Atlas.common.model.ReportsList', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready,

    proxy: {
        extraParams:{
            pShowAll: true,
            pShowFav: false,
            pReportModule: '',
            pReportObject: '',
            pagination: true
        },
        url: 'shared/rx/reportlist',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                payload.data.forEach(function (item, index) {
                    item.userGroupsData=[];
                    item.isNeedUpdate =false;
                    if(item.userGroup == "*")
                        item.userGroupsData.push("0");
                    else
                    {
                        item.userGroup.split(',').forEach(function(v,i){
                            item.userGroupsData.push(v.toString().replace("*","0"));
                        })
                    }

                });

                return payload.data;
            }
        }
    }
});
