/** ... **/

Ext.define('Atlas.letter.model.PlanGroupListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.plangrouplistmdl',
    fields: [
        'firstname', 'lastname', 'locfax', 'locphone', 'FullName', 'tPCPID'
    ],
    proxy: {
        url: 'member/{0}/memberplangroups'
    }
});