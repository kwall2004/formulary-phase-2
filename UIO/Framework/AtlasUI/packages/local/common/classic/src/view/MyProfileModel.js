/**
 * Created by n6684 on 11/29/2016.
 */
//Revisited by @Sencha
//TODO - move in to separate files
// Fix class names
Ext.define('Atlas.common.view.GetUserDashboardItems', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'system/{0}/userdashboarditems'
    }
});

//Same model as above! Why?
Ext.define('Atlas.common.view.SetUserDashboardItems', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'system/{0}/userdashboarditems'
    }
});

Ext.define('Atlas.common.view.GetUserMasterData', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'username',
        'firstname',
        'lastname',
        'middlename',
        'groupid',
        'active',
        'queueAdmin',
        'createDateTime',
        'email.ContactInfo',
        'homephone.ContactInfo',
        'workphone.ContactInfo',
        'cell.ContactInfo',
        'Ext.ContactInfo',
        'fax.ContactInfo'
    ],
    proxy: {
        url: 'system/{0}/usermasterdata'
    }
});
//TODO Same model as above but with different name??? Why??
Ext.define('Atlas.common.view.SetUserMasterData', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'system/{0}/usermasterdata'
    }
});
