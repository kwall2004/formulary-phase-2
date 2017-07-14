Ext.define('Atlas.prescriber.view.DetailController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.prescriber-detail',

    onAdd: function () {
        var prescriberreccord = this.getView().up().getViewModel().get('masterrecord');
        var gridModel = this.getView().Model;
        this.createEditor(null, gridModel, prescriberreccord);
    },
    createEditor: function (record, gridModel, prescriberreccord) {
        var me = this,
            view = this.getView(),
            store = this.getView().store,
            modelName = gridModel || store.initialConfig.model,
            pxtype = view.xtype.toLowerCase() + 'window';

        if (!Ext.ClassManager.getByAlias('widget.' + pxtype)) {
            pxtype = 'editorwindowerror';
        }
        me.isEditing = !!record;

        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },

            layout: 'fit',

            ghost: false, //disable ghost so we can actually see window content while dragging
            modal: true,

            width: view['dialogwidth'] || 500,

            closable: true,
            items: [{
                xtype: view.dialogxtype || pxtype
            }],

            // Creates a child session that will spawn from the current session
            // of this view.
            session: {
                schema: 'atlas'
            },

            viewModel: {

                data: {
                    title: record ? 'Edit: ' : 'Add New',
                    prescriberrecord:prescriberreccord
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.
                links: {
                    gridRecord: record || {
                        type: modelName,
                        create: true
                    }
                }
            }
        });

        me.editor.show();
    }
});