Ext.define('Atlas.common.overrides.grid.Panel', {
    override: 'Ext.grid.Panel',

    compatibility: '6.2.0',
    /*custom function used in conjuction with the responsive plugin to allow correct disabling and enabling the
    row expander plugin by simply showing and hiding the row expander column*/
    setRowExpanderEnabled: function(isEnabled) {
        var rowExpander = this.getPlugin('expander');
        if(rowExpander.expanderColumn) {
            if (isEnabled) {
                rowExpander.expanderColumn.show();
                this.updateLayout();
            } else {
                var store = this.getStore(),
                    nodes = rowExpander.view.getNodes();

                for (var i = 0; i < nodes.length; i++) {
                    var node = Ext.fly(nodes[i]);

                    if (!node.hasCls(rowExpander.rowCollapsedCls)) {
                        rowExpander.toggleRow(i, store.getAt(i));
                    }
                }
                rowExpander.expanderColumn.hide();
                this.updateLayout();
            }
        }
    }
});
