/**
 * Created by d3973 on 10/11/2016.
 */
Ext.define('Atlas.admin.view.ListsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminlistsviewmodel',

    stores: {
        listGrid: {
            model: 'Atlas.admin.model.getListCollection',
            autoLoad: false,
            sorters: [
                'ListItem'
            ],
            storeId: 'listGrid',
            listName: '',
            setListName: function(listVal){
                this.listName = listVal;
            },
            getListName: function(){
                return this.listName;
            }
        },
        planGroupAccess: {
            model: 'Atlas.admin.model.planGroupHierarchyExt',
            autoLoad: true,
            sorters: [
                'planGroupHierFullName']
        },
        newListGrid: {
            model: 'Atlas.admin.model.getListCollection',
            autoLoad: false,
            sorters: [
                'ListItem'
            ],
            storeId: 'newListGrid',
            listName: '',
            setListName: function(listVal){
                this.listName = listVal;
            },
            getListName: function(){
                return this.listName;
            }
        },
        comboBoxLists: {
            model: 'Atlas.admin.model.ListNamesModel',
            remoteSort: true,
            remoteFilter: false
           //,autoLoad: true
        }
    }
});
