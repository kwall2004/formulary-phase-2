/**
 * Created By: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 7/26/2016
 * Origin: MERLIN - Member
 * Description: View Model for the HEDIS Page
 **/

Ext.define('Atlas.member.view.HEDISViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hedisviewmodel',

    stores: {
        hedisdata: {
            model: 'Atlas.member.model.HEDISModel',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/apps/atlas/resources/data/member/hedisdata.json',

                reader: {
                    type: 'json',
                    rootProperty: 'hedisdata'
                }
            },
            groupField: 'complete'
        }
    }
});