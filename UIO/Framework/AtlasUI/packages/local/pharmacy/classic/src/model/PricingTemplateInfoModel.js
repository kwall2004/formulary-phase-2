/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.pharmacy.model.PricingDetailTemplateArchive', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },

        url: 'pharmacy/{0}/pricingdetailtemplatearchive',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});



Ext.define('Atlas.pharmacy.model.PricingDetailTemplate', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },

        url: 'pharmacy/{0}/pricingdetailtemplate',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function (val,index) {
                    // val.DiscPercent = Ext.util.Format.number(val.DiscPercent, '0,000.000') + "%";
                    // val.DiscAmount = "$"+ Ext.util.Format.number(val.DiscAmount, '0,000.000');
                    // val.DispFee = "$"+ Ext.util.Format.number(val.DispFee, '0,000.000');

                    val.DiscPercent = Ext.util.Format.number(val.DiscPercent, '0,000.000');
                    val.DiscAmount = Ext.util.Format.number(val.DiscAmount, '0,000.000');
                    val.DispFee = Ext.util.Format.number(val.DispFee, '0,000.000');
                })

                return payload.data;
            }
        }
    }
});



Ext.define('Atlas.pharmacy.model.Setpricingdetailtemplate', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },

        url: 'pharmacy/{0}/pricingdetailtemplate',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});




Ext.define('Atlas.pharmacy.model.SetPricingDetailArchive', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pricingdetailtemplatearchive'
    }
});



Ext.define('Atlas.pharmacy.model.storeCostBasis', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/listitems',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});


Ext.define('Atlas.pharmacy.model.storeDrugType', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/listitems',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});


Ext.define('Atlas.pharmacy.model.storeMaintenance', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/listitems',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});


Ext.define('Atlas.pharmacy.model.storePharContractNetworkType', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/listitems',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});



Ext.define('Atlas.pharmacy.model.storeOTCInd', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    data : [
        {name: 'All',   value: 'A'},
        {name: 'OTC',    value: 'O'},
        {name: 'Non-OTC',     value: 'R'}
    ]
});



