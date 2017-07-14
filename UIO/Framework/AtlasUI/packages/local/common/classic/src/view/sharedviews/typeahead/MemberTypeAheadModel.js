/*
 Developer: Tremaine Grant
 Description: A typehead box for the Member search
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.typeahead.MemberTypeAheadModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.membertypeaheadmodel',
    stores:{
        membermasterext: {
            model: 'Atlas.common.model.MemberMasterExt',
            remoteSort: true,
            remoteFilter: true
        }
    }
});


