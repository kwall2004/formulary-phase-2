/**
 * Created by j2487 on 11/2/2016.
 */
Ext.define('Atlas.member.view.MemberPAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberpriorauthcontroller',

    onRender: function () {
        //debugger;
        var view = this.getView();
        var vm = view.up().getViewModel(),
            grid = view.up().lookup('priorauthgrid');
        //myMask.show();

        //vm.set('openedTabs.priorAuth', true);
        if(vm){
            if(vm.get('masterrecord')) {
                var recipientID = vm.get('masterrecord').get('recipientID'),
                    priorauthstore = vm.getStore('memberpriorauths');

                priorauthstore.getProxy().setExtraParam('pKeyValue', recipientID);
                priorauthstore.getProxy().setExtraParam('pKeyType', 'recipientID');
                priorauthstore.load({
                    callback: function(record,operation,success) {

                    }
                });
            }
        }
    },
          onRowDblClick: function( me , record , tr , rowIndex , e , eOpts) {
              var me = this,
                  vm = me.getViewModel(),
                  myParent = vm.getParent();
              var menuId = Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
                 /* menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
                  node =  menuItems.findNode('route', 'merlin/authorization/cdag_CDAGMain'),
                  client = me.getView().atlasClient,
                  route = node.get('route') || node.get('routeId'),
                  parentMenuId = node.get('parentMenuID'),
                  menuId = node.get('menuID'),
                  menuTitle = node.get('menuTitle'),
                  routeParams = menuId + '/' + record.data.authId;*/

              me.fireEvent('openView','merlin','authorization','cdag_CDAGMain', {
                  ID: menuId,
                  menuId: menuId,
                  AuthID: record.data.authId,
                  keyValue: '0',
                  openView: true
              });

          }
});


