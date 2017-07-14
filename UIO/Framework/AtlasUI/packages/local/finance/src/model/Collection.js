Ext.define('Atlas.finance.model.Collection', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],

    proxy: {

    }
});


Ext.define('Atlas.finance.model.Collectioncreditmasterext', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pWhere: '',
            pSort: '',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: '',
            pagination: true
        },
        url: 'finance/{0}/collectioncreditmasterext',

        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function(val,contactlogindex){

                    val.LetterApproveDate =  Atlas.common.Util.setdateformatWithAMPM(val.LetterApproveDate);
                    val.LetterCreatedDate =  Atlas.common.Util.setdateformatWithAMPM(val.LetterCreatedDate);
                    val.LetterSentDate =  Atlas.common.Util.setdateformatWithAMPM(val.LetterSentDate);

                });

                return payload.data;
            }
        }
    }

});



Ext.define('Atlas.finance.model.CollectioncreditDetailExt', {
    extend: 'Atlas.common.model.Base',

    proxy: {
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