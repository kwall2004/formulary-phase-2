Ext.define('Atlas.common.view.sharedviews.editablegrid.EditWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-editgrid-window',

    onDoneClick: function () {
        // Save the changes pending in the editor's child session back to the
        // parent session.

        console.log('on done click on add screen in plan program code');
        //debugger;
        var me = this,
            vm = me.getViewModel(),
            store = this.getView().store,
            form = me.lookupReference('editorForm'),
            modelName = store.initialConfig.model,
            isEditing = vm.get('isEditing'),
            editor = me.up('window'),
            id;

        if (form.isValid()) {
           /*
            if (form.isDirty()) {
                this.getViewModel().set('dirty', true);
            }

            if (!isEditing) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = editor.getViewModel().get('gridRecord').id;
            }
            editor.getSession().save();

            if (!isEditing) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                store.add(me.getSession().getRecord(modelName, id));
            }
            */

            me.onCancelClick();

        }
    },

    onCancelClick: function () {
        this.getView().destroy();
    }
});