/**
 * Created by d3973 on 3/17/2017.
 */
Ext.define('Atlas.common.view.CustomFilters', {
    singleton: true,

    menuFilterOnFilteredStore: function(myCol, myViewModel, myStore, focusedContainer){
        var headerMenu = myCol.up('headercontainer').getMenu(),
            colDataIndex = myCol.dataIndex,
            menuSep = Ext.create('Ext.menu.Separator'),
            numField = Ext.create('Ext.form.field.Number', {
                emptyText: 'Enter Filter Text...',
                padding: '3 -7 3 0',
                hideTrigger: true
            }),
            newMenu = Ext.create('Ext.menu.Menu', {
                dock: 'right',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    glyph: 'f002@FontAwesome',
                    cls: 'm-green-color',
                    margin: '7 -142 0 12',
                    width: 16,
                    height: 16
                },
                numField
                ]
            }),
            checkItem = Ext.create('Ext.menu.CheckItem', {
                text: 'Filter',
                menu: newMenu,
                bind: {
                    checked: '{filterHasVal}'
                }
            });
        headerMenu.insert(4, menuSep);
        headerMenu.insert(5, checkItem);

        numField.on('change', function(nField, newVal, oldVal, eOpts){
            var vm = eOpts[0],
                myStore = eOpts[1],
                colDataIndex = eOpts[2];
            if ((newVal !== null) && (String(newVal).length > 0)){
                vm.set('filterHasVal', true);
                myStore.filter(colDataIndex, newVal);
            }
            else {
                vm.set('filterHasVal', false);
                myStore.clearFilter();
            }

        }, focusedContainer, [myViewModel, myStore, colDataIndex]);
    }
});