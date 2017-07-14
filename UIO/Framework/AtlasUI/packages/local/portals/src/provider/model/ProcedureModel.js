/**
 * Created by Scheruku on 12/7/2016.
 */
Ext.define('Atlas.portals.provider.model.ProcedureModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.authorizationprocedure',

    fields: [
        {
            name: 'cpt'
        },
        {
            name: 'description'
        },
        {
            name: 'units'
        },
        {
            name: 'measure'
        },
        {
            name: 'serviceLineNumber'
        },
        {
            name: 'measureCode'
        }
    ]
});