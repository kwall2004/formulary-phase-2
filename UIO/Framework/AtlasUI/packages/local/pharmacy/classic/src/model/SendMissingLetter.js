/**
 * Created by n6684 on 12/15/2016.
 */
Ext.define('Atlas.pharmacy.model.SendMissingLetter', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        extraParams: {
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },
        url: 'member/{0}/LetterDocument'
    }

});



Ext.define('Atlas.pharmacy.model.SendMissingLetterLetterDetail', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        //url: 'member/{0}/lettermaster'
        url: 'shared/{0}/querydb',
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




Ext.define('Atlas.pharmacy.model.ReturnDocument', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        //url: 'member/{0}/lettermaster'
        url: 'member/{0}/letterdetail',
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
