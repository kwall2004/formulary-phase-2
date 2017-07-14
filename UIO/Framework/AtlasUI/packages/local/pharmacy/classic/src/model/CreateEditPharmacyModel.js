/**
 * Created by n6684 on 11/19/2016.
 */
Ext.define('Atlas.pharmacy.model.CreateEditPharmacyModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/usercreatedpharmacylist',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {

                payload.data.forEach(function (val,index) {
                    //= Ext.Date.format(new Date(val.AddDate), 'm/d/Y');
                    if(val.AddDate)
                    {
                        var breaksdateandtime =val.AddDate.split('-');
                        val.AddDate  = breaksdateandtime[1] + '/' + breaksdateandtime[2] + '/' + breaksdateandtime[0]  ;
                    }
                })
                
                return payload.data;
            }
        }
    }

});


Ext.define('Atlas.pharmacy.model.PharmacyRelationShipDetail', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyrelationshipdetail',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                var uniquearray =[];
                payload.data.forEach(function(item, index){
                    var exists = false;

                    uniquearray.forEach(function(uniqueitem,uniqueindex){
                        if(uniqueitem.RelationShipId==item.RelationShipId)
                        {
                            exists = true;
                        }
                    });

                    if(!exists)
                    {
                        uniquearray.push(item);
                    }
                });

                return uniquearray;

            }
        }
    }

});



Ext.define('Atlas.pharmacy.model.PharmacyServiceType', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyservicetype',
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


Ext.define('Atlas.pharmacy.model.setpharmacyservicetypes', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyservicetypes',
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


Ext.define('Atlas.pharmacy.model.CarrierLOBs', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'plan/{0}/CarrierLOBs',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                var uniquearray =[];
                payload.data.forEach(function(item, index){
                    var exists = false;

                    uniquearray.forEach(function(uniqueitem,uniqueindex){
                        if(uniqueitem.carrierLOBId==item.carrierLOBId)
                        {
                            exists = true;
                        }
                    });

                    if(!exists)
                    {
                        uniquearray.push(item);
                    }
                });

                return uniquearray;
            }
        }
    }

});



Ext.define('Atlas.pharmacy.model.SetPharmacyMasterData', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }

});

