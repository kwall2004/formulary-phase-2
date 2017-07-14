/** ... **/

Ext.define('Atlas.letter.model.PrescriberInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.prescriberinfomdl',
    fields: [
        'firstname', 'lastname', 'locfax', 'locphone', 'FullName', 'tPCPID'
    ],
    proxy: {
        url: 'prescriber/{0}/prescribermasterdata'
    }
});