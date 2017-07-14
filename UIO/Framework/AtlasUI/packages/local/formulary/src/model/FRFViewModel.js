/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.model.FRFViewModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'RxCUI ', type: 'string'},
        {name: 'TTY', type: 'string'},
        {name: 'RxNormDesc', type: 'string'},
        {name: 'RelatedSCDC', type: 'string'},
        {name: 'RelatedDF ', type: 'string'},
        {name: 'RelatedNDC', type: 'string'},
        {name: 'CMSFlag', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pSessionId:''
        },
        url: 'formulary/{0}/drugcommonnames',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});