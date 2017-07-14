/*
 Developer: Kevin Tabasan
 Last Developer: Kevin Tabasan, Tremaine Grant, Juris, Brad
 Description: A base controller for EditableFieldSet
 Origin: Merlin
 9/15/2016
 */

Ext.define('Atlas.common.view.sharedviews.editablefieldset.FieldsetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-shared-editablefieldset',

    requires: ["Atlas.common.model.Prescriber"],

    init: function () {
        this.getViewModel().set('dirty', false);
    },

    createEditor: function (record, fieldsetModel) {
        var me = this,
            view = this.getView(),
            pxtype = view.xtype.toLowerCase() + 'window';


        if (!Ext.ClassManager.getByAlias('widget.' + pxtype)) {
            pxtype = 'editorwindowerror';
        }
        me.isEditing = !!record;

        me.editor = view.add({
            xtype: 'window',
            bind: {
                title: '{title}'
            },

            layout: 'fit',
            iconCls: 'icon-contactlog,8',
            ghost: false, //disable ghost so we can actually see window content while dragging
            modal: true,

            closable: true,
            items: [{
                xtype: view.dialogxtype || pxtype
            }],

            buttons: [{
                text: 'Save',
                iconCls: 'x-fa fa-save',
                handler: 'onSaveClick'
            },{
                text: 'Cancel',
                iconCls: 'x-fa fa-ban',
                //Because we add this window to the parent, all methods defined in that view will be accessible
                handler: 'onCancelClick'
            }],

            // Creates a child session that will spawn from the current session
            // of this view.
            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    title: record ? 'Edit Record' : 'Add New Record'
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.


                links: {
                    fieldrecord: record || {
                        type: fieldsetModel,
                        create: true
                    }
                }
            }
        });

        me.editor.show();
    },

    onAdd: function () {
        var vm = this.getViewModel(),
            editFieldset = Ext.ComponentQuery.query('button[itemId=editFieldset]')[0],
            deleteFieldset = Ext.ComponentQuery.query('button[itemId=deleteFieldset]')[0];

        editFieldset.disable();
        deleteFieldset.disable();
        vm.set('masterrecord',null);
        vm.set('fieldrecord',null);

        this.createEditor(null);
    },

    onEdit: function () {
        var record = this.getViewModel().get('masterrecord');
        this.createEditor(record);
    },

    onSaveClick: function () {
        /* Keeping this blank since other fieldsets might use other
        *  calls that require different logic. If call is setNPIData, please
        *  refer to CreatePrescriberController to see how saving is done. */

        this.onCancelClick();
    },

    onCancelClick: function () {
        this.editor = Ext.destroy(this.editor);
    }
});