/**
 * Created by s6627 on 10/11/2016.
 */
Ext.define('Atlas.formulary.model.FormularyNameModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'FormularyID', type: 'int'},
        {name: 'FormularyName', type: 'string'},
        {name: 'StatDesc', type: 'string'}
    ],
    proxy: {
        url: 'formulary/{0}/formularies',
        reader: {
            type    : 'json',
            rootProperty: function(payload) {
                if(payload.data.length > 0) {
                    var data=[];
                    var FormularyID=0;
                    for(var i=0;i<payload.data.length;i++)
                    {
                        if(payload.data[i].StatDesc.toUpperCase()!='DRAFT'&&payload.data[i].StatDesc.toUpperCase()!='REJECT'&& payload.data[i].FormularyID !=FormularyID)
                        {
                            FormularyID=payload.data[i].FormularyID;
                            data.push({FormularyID: payload.data[i].FormularyID, FormularyName: payload.data[i].FormularyName});
                        }
                    }
                    return data;
                }
            }
        }
    }
});