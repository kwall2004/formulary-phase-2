/**
 * Created by Scheruku on 12/7/2016.
 */
Ext.define('Atlas.portals.provider.model.DiagnosisModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.authorizationdiagnosis',

    fields: [
        {
            name: 'diagCode'
        },
        {
            name: 'description'
        },
        {
            name: 'cpt'
        },
        {
            name: 'procServiceLineNumber'
        }
    ]
});