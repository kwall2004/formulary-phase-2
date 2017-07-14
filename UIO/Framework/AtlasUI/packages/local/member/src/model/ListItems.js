/**
 * Created by p3946 on 8/22/2016.
 */
Ext.define('Atlas.member.model.ListItems', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'listItems'
        /*{name: 'documentTypes', calculate: function(obj){
            var docTypes = "";
            debugger;
            docTypes = obj;
            if(obj.listItems != null || obj.listItems != 'undefined'){
                docTypes = obj.split(',');
            }
            return docTypes;
        }}*/
    ],

    proxy: {
        extraParams: {
            pListName: 'coverLetterType'
        },
        url: 'shared/{0}/listitems'
    }

});