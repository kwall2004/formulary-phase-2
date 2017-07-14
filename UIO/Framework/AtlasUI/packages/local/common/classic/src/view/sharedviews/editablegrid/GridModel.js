Ext.define('Atlas.common.view.sharedviews.editablegrid.GridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.common-shared-editgridmodel',
    data:{
        //default to not enable any actions
        userpermissions: {
            create: false,
            read: false,
            update : false,
            save : false,
            destroy : false,
            activate : false,
            deactivate : false,
            export: false,
            pdf: false
        },
        isEditing: false,
        placeholder: null
    },
    formulas:{
        canCreate: function(get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.create');
            }else{
                return false;
            }
        },
        isCreatable: function(get) {
            return true;
        },

        canRead: function(get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.read');
            }else{
                return false;
            }
        },
        isReadable: function(get) {
            return !get('editgrid.selection');
        },

        canEdit: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.update');
            }else{
                return false;
            }
        },
        isEditable: function (get) {
           return get('editgrid.selection');
        },

        canSave: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.save');
            }else{
                return false;
            }
        },
        isSavable: function (get) {
            return get('isDirty');
        },

        canDestroy: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.destroy');
            }else{
                return false;
            }
        },
        isDestroyable: function (get) {
            return get('editgrid.selection');
        },

        canActivate: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.activate');
            }else{
                return false;
            }
        },
        isisActivatable: function (get) {
            return false;
        },

        canDeactivate: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.deactivate');
            }else{
                return false;
            }
        },
        isDeactivatable: function (get) {
            return false;
        },

        canExport: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.export');
            }else{
                return false;
            }
        },
        isExportable: function (get) {
            return false;
        },

        canPDF: function (get) {
            if(this.get('userpermissions') )
            {
                return !!this.get('userpermissions.pdf');
            }else{
                return false;
            }
        },
        isPDFable: function (get) {
            return false;
        }
    }
});