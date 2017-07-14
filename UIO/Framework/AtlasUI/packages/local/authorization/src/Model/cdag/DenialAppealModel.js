/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.model.cdag.DenialAppealModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'createDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'approvedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'POBoxDropDate', type: 'date', dateFormat: 'c'},
        {name: 'POBoxDropDate02', type: 'date', dateFormat: 'c'}
    ],

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'claims/{0}/lettersbyauth',
        reader: {

            metaProperty: 'metadata',
            rootProperty: function(payload) {
                payload.data.forEach(function(item, index){
                    if (item.letterType == 'D'){
                        item.LetterTypeDesc = 'Denial';
                    }
                    else if (item.letterType == 'A'){
                        item.LetterTypeDesc = 'Member Appeal';
                    }
                    else if (item.letterType == 'R'){
                        item.LetterTypeDesc = 'Provider Appeal';
                    }
                    else{
                        item.LetterTypeDesc = item.letterType;
                    }
                });
                return payload.data;
            }
        }
    }
});