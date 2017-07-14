Ext.define('Atlas.common.store.PortalSystemMenu', {
    alias: 'store.common-portalsystemmenu',
    extend: 'Ext.data.TreeStore',
    model: 'Atlas.common.model.hpmember.PortalMenu',
    parentIdProperty: 'parentMenuID',

    treeify: function (parentNode, records) {
        var me = this,
            loadParentNodeId = parentNode.getId(),
            parentIdProperty = me.getParentIdProperty(),
            len = records.length,
            result = [],
            menu = [],
            nodeMap = {},
            i, node, parentId, parent, id, children;

        // Collect all nodes keyed by ID, so that regardless of order, they can all be linked to a parent.
        for (i = 0; i < len; i++) {
            node = records[i];
            node.data.depth = 1;

            //Fix for parent node that is 0
            if (node.data[parentIdProperty] == 0) {
                delete node.data[parentIdProperty];
            }

            //Adjust leaf based on programName
            if (node.data.programName !== '') {
                node.data.leaf = true;
            }

            nodeMap[node.id] = node;

            //Introduce new variable
            node.data.openTabs = 0;
            //Build interanl menu hash
            menu[node.data.menuID] = node.data;
        }

        // Set the hash
        Atlas.menu = menu;

        // Link child nodes up to their parents
        for (i = 0; i < len; i++) {
            node = records[i];
            parentId = node.data[parentIdProperty];

            if (!(parentId || parentId === 0) || parentId === loadParentNodeId) {
                result.push(node);
            } else {
                //<debug>
                if (!nodeMap[parentId]) {
                    Ext.raise('Ext.data.TreeStore, Invalid parentId "' + parentId + '"');
                }
                //</debug>
                parent = nodeMap[parentId];
                parent.$children = parent.$children || [];
                parent.$children.push(node);
                node.data.depth = parent.data.depth + 1;
            }
        }

        for (id in nodeMap) {
            node = nodeMap[id];
            children = node.$children;
            if (children) {
                delete node.$children;
                me.setupNodes(children);
                node.appendChild(children);
            }
            me.registerNode(node);
        }

        me.setupNodes(result);

        return result;
    },
    autoLoad: false
});