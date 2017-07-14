Ext.define('Atlas.common.view.users.UserMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usermain',

    onNavigationItemClick: function (tree, info) {

        return; // todo: no-op until we know how you want handle this section

        var me = this,
            node = info.node,
            client = me.getView()['client'],
            route = node.get('routeId'),
            to;


        if(node.get('leaf') == true){
            Ext.defer(function(){
                tree.suspendEvents(true);
                tree.setSelection(node.parentNode);
                tree.resumeEvents();
            },1000);
        }



        if(route){
            to = client + '/' + route;
            me.redirectTo(to);
        }


    }

});