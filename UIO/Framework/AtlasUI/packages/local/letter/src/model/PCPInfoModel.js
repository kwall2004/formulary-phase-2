/** ... **/

Ext.define('Atlas.letter.model.PCPInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.pcpinfomdl',
    fields: [
        {name: 'PCPID', type: 'string' },
        {name: 'PCPName', type: 'string' },
        {name: 'locPhone', type: 'string' },
        {name: 'locFax', type: 'string' }
    ],
    proxy: {
        url: 'pharmacy/{0}/pharmacymasterdata'
    }
});