/**
 * Created by d3973 on 4/12/2017.
 */
Ext.define('Atlas.finance.store.CollectionCreditDetailExtStore', {
    extend: 'Ext.data.Store',
    alias: 'store.finance-collectioncreditdetailextstore',
    model: 'Atlas.finance.model.CollectioncreditDetailExt',
    autoLoad: false,
    pagination:true,
    pageSize:25,
    proxy: {
        type: 'layer7',
        extraParams: {
            pWhere: '',
            pSort: '',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: '',
            pagination: true
        },
        url: 'finance/{0}/collectioncreditdetailext',
        rootProperty: function(payload) {
            payload.data.forEach(function(val,contactlogindex){
                if(val.createDate && val.createDate.indexOf("T"))
                {
                    var breaksdateandtime = val.createDate.split('T');
                    var dateparts =breaksdateandtime[0].split('-');
                    var timeparts =breaksdateandtime[1].split(':');
                    val.createDate = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' + timeparts[0] + ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2) ;
                }


            });

            return payload.data;
        }
    }

});