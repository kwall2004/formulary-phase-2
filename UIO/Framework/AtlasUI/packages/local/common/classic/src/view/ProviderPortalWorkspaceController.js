/**
 * Created by t3852 on 10/19/2016.
 */
Ext.define('Atlas.common.view.Provider.ProviderPortalWorkspaceController', {
    extend: 'Atlas.common.view.PortalWorkspaceController',
    alias: 'controller.providerportalworkspacecontroller',


    listen: {
        controller: {
            '*': {
                userSet: 'onAuthValid'
            }
        }
    },

    onAuthValid: function() {
        var superuserButton = this.getView().up().up().lookup('superuserButton');
        var superuserTextField = this.getView().up().up().lookup('superuserTextContainer');
        var store = this.getViewModel().getStore('navigation'),
            user = Ext.first('viewport').getViewModel().get('user'),
            planID = 'hpm';

        if(user.providerStateSelected === 'IL') {
            planID = 'MHPIL';
        }

        store.getProxy().setExtraParam('pSessionID', user.sessionId);
        store.getProxy().setExtraParam('pRecipientID',"");
        store.getProxy().setExtraParam('pMemberID', user.memberId);
        store.getProxy().setExtraParam('pUserType', user.start);
        store.getProxy().setExtraParam('userState', user.providerStateSelected);
        store.getProxy().setExtraParam('pPlanID', planID);
        store.load();

        if(Atlas.user.webSuperUser === 'no' || Atlas.user.start !== 'hpprovider'){
            superuserButton.hide();
            superuserTextField.hide();
        } else {
            this.getView().items.items[0].hide();
        }
    },

    onNavigationItemClick: function (tree, info) {

        var me = this,
            //client = me.getView()['atlasClient'],
            node = info.node || info,
            //TODO Match property name for new Workspaces. Should align to 'route'
            route = node.get('route') || node.get('routeId'),
            //routeInfo,
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');

        //<debug>
        console.log('Navigate to menuId=' + menuId + ', parentMenuId=' + parentMenuId + ' Single view querystring: ?single=yes' + '#' + route + '/' + menuId + '/' + parentMenuId);
        //</debug>

        if (route) {

            if (route == "patientUrl") {
                var user = Atlas.user;
                sessionStorage.setItem('ssouser', user.memberId);
                sessionStorage.setItem('ssouserplan', user.portalStateSelected);
                sessionStorage.setItem('ssouserportalplan', user.portalPlanId);
                sessionStorage.setItem('ssouserrecid', '');
                window.open(Atlas.patientUrl);
            } else if (route === "priorAuthURL") {
                window.open(Atlas.priorAuthURL);
            } else {
                me.fireEvent('routeTo', {
                    routeId: route,
                    parentMenuId: parentMenuId,
                    menuId: menuId,
                    title: menuTitle
                });
            }

        }
        else{
            node.expand();
        }
    }
});
