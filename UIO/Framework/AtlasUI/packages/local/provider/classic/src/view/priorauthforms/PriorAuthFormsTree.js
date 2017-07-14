Ext.define('Atlas.provider.view.priorauthforms.PriorAuthFormsTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'prescriberportal-priorauthforms-tree',


    height: 400,
    width: 350,
    useArrows: true,

    initComponent: function() {
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                root: {
                    text: 'Medicare',
                    id: 'src',
                    expanded: true,
                    
                    children: [{
                        text: 'Illinois',
                        leaf: false,
                        children: [{
                            text: 'Document 1',
                            leaf: true
                        },{
                            text: 'Other Medicare',
                            leaf: false,
                            children: [{
                                text: 'Other Document 1',
                                leaf: true
                            }]
                        }]
                    },{
                        text: 'Michigan',
                        leaf: false,
                        children: [{
                            text: 'Other Medicare',
                            leaf: false,
                            
                            children: [{
                                text: 'Other Document 1',
                                leaf: true
                            }]
                        },{
                            text: 'Prescription Drug Plan (PDP)',
                            leaf: false,
                            
                            children: [{
                                text: 'Other Document 1',
                                leaf: true
                            }]
                        },{
                            text: 'Advantage-Plus Meridian (PDP)',
                            leaf: false,
                            
                            children: [{
                                text: 'Coverage Determination Request Form',
                                leaf: true
                            },{
                                text: 'Coverage Redetermination Request Form',
                                leaf: true
                            }]
                        }]
                      },{
                        text: 'Prime',
                        leaf: false,
                        
                        children: [{
                            text: 'Document 1',
                            leaf: true
                        }]
                      },{
                        text: 'Michigan / Ohio',
                        leaf: false,
                        
                        children: [{
                          text: 'Document 1',
                          leaf: true
                        }]
                      },{
                        text: 'Ohio',
                        leaf: false,

                        children: [{
                            text: 'Document 1',
                            leaf: true
                        }]
                    }]
                },
                folderSort: true,
                
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            }
        });
        this.callParent();
    },

    onExpandAllClick: function(){
        var me = this,
            toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');

        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
    }
});
