/**
 * Created by d4662 on 3/7/2017.
 */
Ext.define(null, {
    // (EXTJS-24044) Ext.ux.TabCloseMenu should use close method on panels 
    override: 'Ext.ux.TabCloseMenu',

    onClose : function(){
        this.item.close();
    },

    doClose : function(excludeActive){
        var items = [];

        this.tabPanel.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item !== this.item){
                    items.push(item);
                }
            }
        }, this);

        Ext.suspendLayouts();
        Ext.Array.forEach(items, function(item){
            item.close();
        });
        Ext.resumeLayouts(true);
    }
});