/**
 * Created by n6684 on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.model.PopupArchivedPricingTemplate', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        url: 'pharmacy/{0}/pricingdetailtemplatearchive',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                
                payload.data.forEach(function (val,index) {
                    val.DiscPercent = Ext.util.Format.number(val.DiscPercent, '0,000.000') + "%";
                    val.DiscAmount = "$"+ Ext.util.Format.number(val.DiscAmount, '0,000.000');
                    val.DispFee = "$"+ Ext.util.Format.number(val.DispFee, '0,000.000');
                })

                return payload.data;
            }
        }
    }

});


Ext.define('Atlas.pharmacy.model.PricingDetailTemplateArchiveDate', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'ArchiveDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'systemID', type: 'string'}
],


    proxy: {
        url: 'pharmacy/{0}/pricingdetailtemplatearchivedate'
      /*  reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {

                payload.data.forEach(function (val,index) {
                    val.ArchiveDate = Ext.util.Format.date(val.ArchiveDate, 'm/d/Y');
                })
                return payload.data;
            }
        }*/
    }

});