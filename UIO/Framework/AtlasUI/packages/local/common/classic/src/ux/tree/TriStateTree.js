Ext.define('Atlas.common.ux.tree.TriStateTree', {
    extend: 'Ext.tree.Panel',
    config:{
        ALL_ID: 1,
        width: 700,
        height: 900,
        rootVisible: true,
        useArrows: true,
        frame: false,
        header: false,
        style: 'margin: 0px 5px',
        disabledCls: 'x-tree-checkbox-checked-disabled',
        cls:'headerTriState',
        ui: 'default'
    },
    selModel: {
        type: 'treemodel',
        mode: 'MULTI',
        ignoreRightMouseSelection: true
    },

    listeners: {
        checkchange: function (node, check) {
            var me = this;

            //node.get(node.getIdProperty()) != this.ALL_ID  &&
            if( me.isThirdState(node)){
                // uncheck all children if thirdstate
                node.set('checked', false);
                node.set('nodeChecked', 3);
                me.applyCheck(node);
            }else{
                me.applyCheck(node);
            }

        },
        afterrender: function(treePanel){
            var me = this;
            // treePanel.expandAll();
            me.prepareTriState(treePanel);
        }
    },

    prepareTriState: function(treePanel){
        var me = this;
        treePanel.store.each(function(node){
            if( node.get('nodeChecked') == 2){
                me.setThirdState(node);
            }
        })
    },

    applyCheck: function(node){
        var me = this;
        if (node.hasChildNodes()) {
            node.eachChild(this.setChildrenCheckedStatus);
        }
        if (node.get(node.getIdProperty()) == this.ALL_ID) {
            // console.log('[root checked]');

            //unsetThirdState for all
            me.clearThirdState()
        }else{


            node.set('cls', '');
            me.updateCheckedStatus(node);

        }

    },

    // Propagate change downwards (for all children of current node).
    setChildrenCheckedStatus: function (current) {
        //console.log('[setChildrenCheckedStatus]');
        //console.log( 'current.data' , current.data);
        if (current.data.visible !== false) {
            // if not root checked
            if (current.parentNode) {
                var parent = current.parentNode;

                current.set('checked', parent.get('checked'));

                //Set integer value based on parent 1=checked 3=not
                current.set('nodeChecked', parent.get('checked') ? 1 : 3);
            }

            if (current.hasChildNodes()) {
                current.eachChild(arguments.callee);
            }
        }

    },

    // Propagate change upwards (if all siblings are the same, update parent).
    updateCheckedStatus: function (current) {
        var me = this,
            currentChecked = me.isChecked(current);

        //console.log('currentChecked' , currentChecked)

        var childrenWithState = 0;
        var childrenChecked = 0;

        // console.log(current.get('text'), currentChecked);

        current.eachChild(function (n) {
            if(me.isChecked(n)){
                childrenChecked++;
            }
            if(me.isThirdState(n)){
                childrenWithState++;
            }

        });

        me.unsetThirdState(current);

        if (!currentChecked && (childrenChecked > 0 || childrenWithState > 0)){
            me.setThirdState(current);
        }

//        console.log('childrenWithState '  + childrenWithState);
//        console.log('childrenChecked '  + childrenChecked);
//        console.log('--------');

        if (current.parentNode) {
            var parent = current.parentNode;
            var siblingsWithState = 0;
            var siblingsChecked = 0;

            parent.eachChild(function (n) {
                if(me.isChecked(n)){
                    siblingsChecked++;
                }
                if(me.isThirdState(n)){
                    siblingsWithState++;
                }
            });

            me.unsetThirdState(parent);
            parent.set('checked' , false);
            parent.set('nodeChecked' , 3);

            if(siblingsChecked == parent.childNodes.length){
                parent.set('checked' , true);
                parent.set('nodeChecked' , 1);

            }else if (childrenChecked > 0 || childrenWithState > 0){
                me.setThirdState(parent);
            }
//            console.log(parent.get('text'))
//            console.log('siblingsWithState '  + siblingsWithState)
//            console.log('siblingsChecked '  + siblingsChecked)
//            console.log('--------')
            me.updateCheckedStatus(parent);

        }
    },


    isChecked: function (node) {
        return  node.get('checked')===true;
    },

    uncheckRoot: function(){
        var me = this;
        me.getRootNode().set('checked' , false);
        me.getRootNode().set('nodeChecked' , 3);

        me.applyCheck(me.getRootNode());
    },

    clearThirdState: function(){
        var me = this;
        me.getRootNode().cascadeBy(function(){
            if (me.isThirdState(this)) {
                me.unsetThirdState(this);
            }
        });
    },

    isThirdState: function (node) {
        return  node.get('cls') == this.disabledCls;

    },

    setThirdState: function (node) {
        node.set('cls', this.disabledCls);

        node.set('checked', false);
        node.set('nodeChecked', 2);

        // console.log( 'setThirdState ' +  node.get('text'));
    },

    unsetThirdState: function (node) {
        node.set('cls', '');
    },

    getSelections: function (id_only, leafs_only) {
        var me = this;

        //console.log('[accessPanel getSelections]');

        try {
            var grid_selections = me.getView().getChecked(),
                allFound = false,
                result = [];

            Ext.Array.each(grid_selections, function (rec) {

                var pushdata = false;

                //  find all checked items
                if (rec.get(node.getIdProperty()) ) {

                    if (!!leafs_only ){
                        if (rec.get('leaf') === true){
                            pushdata = true;
                        }
                    }   else{
                        pushdata = true;
                    }
                    if (pushdata){
                        result.push(id_only == true ?  rec.get(node.getIdProperty()) : {id: rec.get(node.getIdProperty())});
                    }

                }

                //  if NODE 'ALL' checked  - no children required
                if (rec.get(node.getIdProperty()) == me.ALL_ID) {
                    allFound = true;
                }
            });


            if (allFound) {
                result = id_only ? [  me.ALL_ID ] : [ {id: me.ALL_ID} ];
            }

            //console.log(result);
            return result;
        } catch (e) {

            console.log('[error in accessPanel getSelections]');
            console.log(e);
        }
    },

    setSelections: function (ids) {

        var me = this;
        //  me.stopListener = true;

        me.clearThirdState();

//        console.log('[accessPanel setSelections]');
//         console.log(ids);

        if (ids[0] && ids[0]['id']){
            ids = Ext.Array.pluck(ids, 'id');
        }

        // check RootNode or do cascade checking

        if (ids.indexOf(me.ALL_ID) > -1) {

            // console.log('[ALL_ID found]');
            me.getRootNode().set('checked', true);
            me.getRootNode().set('nodeChecked', 3);
            me.applyCheck(me.getRootNode());
        } else {

            // console.log('[ALL_ID not found]');

            me.getRootNode().cascadeBy(function () {

                var currNode = this;
                var checked = ids.indexOf(currNode.get(node.getIdProperty())) > -1;

                if(checked){
                    me.unsetThirdState(currNode);
                    currNode.set('checked',  checked);
                    currNode.set('nodeChecked',  checked ? 1 : 3);
                    //  console.log(currNode.get('text') , checked);
                    if (currNode.hasChildNodes()) {
                        currNode.eachChild(function(n) {
                            //if(currNode.get(node.getIdProperty())== 7){
                            n.set('checked', checked);
                            // console.log(n.get('text'));
                            //}

                        });
                    }
                    me.updateCheckedStatus(currNode);
                }
            });
        }
    }

});
