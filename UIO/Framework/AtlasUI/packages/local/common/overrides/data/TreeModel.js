//Depth of nodes are not calculated properly when adding instantiated nodes to a node config
//EXTJS-22570
//Fixed for 6.2.1
Ext.define('Atlas.common.overrides.data.TreeModel', {
    override: 'Ext.data.TreeModel',

    compatibility: '6.2.0',

    updateInfo: function (commit, info) {
        var me = this,
            phantom = me.phantom,
            result;

        commit = {
            silent: true,
            commit: commit
        };

        // The only way child data can be influenced is if this node has changed level in this update.
        if (('depth' in info) && info.depth !== me.data.depth) {
            var childInfo = {
                    depth: info.depth + 1
                },
                children = me.childNodes,
                childCount = children.length,
                i;

            for (i = 0; i < childCount; i++) {
                children[i].updateInfo(commit, childInfo);
            }
        }

        result = me.set(info, commit);

        // Restore phantom flag which might get cleared by a commit.
        me.phantom = phantom;

        return result;
    }

});
