/**
 * Created by n6684 on 11/15/2016.
 */

Ext.define('Atlas.pharmacy.model.ContractAssignmentModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'RelationShipName', type: 'string'},
        {name: 'contractStatus', type: 'string'},
        {name: 'Termdate', type: 'date',dateFormat:'Y-m-d'},
        {name: 'ContractId', type: 'number'},
        {name: 'NetworkID', type:'string'},
        {name: 'NetworkDescr', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'EffectiveDate', type: 'date',dateFormat:'Y-m-d'}

    ],


    proxy: {
        extraParams: {
            pageSize: 25,
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },
        url: 'pharmacy/{0}/pharmacynetworks',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata'
            //Optionally specify root of the data if it's other than 'data'
            // rootProperty: function(payload) {
            //
            //
            //     payload.data.forEach(function(item, index){
            //         //item.NetworkName = item.NetworkDescription;
            //         //debugger;
            //         //Ext.Date.format(item.EffectiveDate, 'Y-m-d')
            //         //item.EffectiveDate = Ext.util.Format.date(item.EffectiveDate, 'Y-m-d');
            //     });
            //     return payload.data;
            // }
        }
    }

});



Ext.define('Atlas.pharmacy.model.allNetworkSetup', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        extraParams: {

            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },

        url: 'pharmacy/{0}/networkmaster',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {

                var uniquearr = [];
                var addall ={
                    NetworkDescription : "All",
                    NetworkID :'0',
                    RowNum :1,
                    systemID:'1'
                }
                uniquearr.push(addall);
                payload.data.forEach(function(item, index){
                    item.NetworkName = item.NetworkDescription;
                    uniquearr.push(item);
                });
                return uniquearr;
            }
        }
    }

});


Ext.define('Atlas.pharmacy.model.allpharmacynetworks', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        extraParams: {

            remoteSort:true,
            remoteFilter: true,
            pagination: false
        },

        url: 'pharmacy/{0}/networkmaster',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {

                var uniquearr = [];
                var addall ={
                    NetworkDescription : "All",
                    NetworkID :'0',
                    RowNum :1,
                    systemID:'1'
                }
                uniquearr.push(addall);
                var addunassigned ={
                    NetworkDescription : "Unassigned",
                    NetworkID :'-1',
                    RowNum :2,
                    systemID:'1'
                }
                uniquearr.push(addunassigned);
                payload.data.reverse().forEach(function(item, index){
                    item.NetworkName = item.NetworkDescription;
                    uniquearr.push(item);
                });
                return uniquearr;
            }
        }
    }

});


