/**
 * A Picker field that contains a tree panel on its popup, enabling selection of tree nodes.
 */
Ext.define('Atlas.common.view.merlin.TriStateTreePicker', {
    extend: 'Ext.ux.TreePicker',
    xtype: 'common-tri-treepicker',

    config: {
        hideApply: false,
        //required to save data
        pickerURL: null,
        pickerUI: 'default'
    },

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function () {
        var me = this,
            pickerUI = me.pickerUI,
            picker = new Atlas.common.ux.tree.TriStateTree({
                baseCls: Ext.baseCSSPrefix + 'boundlist',
                ui: me.pickerUI,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    hidden: me.hideApply,
                    items: [
                        {
                            xtype: 'displayfield',
                            value: 'Data Access List'
                        },
                        '->',
                        {
                            text: 'Apply',
                            handler: 'onApplyDataSource',
                            scope: me
                        }
                    ]
                }],
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                // height: me.pickerHeight,
                // width: me.pickerWidth,
                manageHeight: false,
                shadow: false,
                bufferedRenderer: false,
                rootVisible: false, //TODO This gives an error in buffered renderer, Added override to silence error and keep just console log in dev mode
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick,
                    itemkeydown: me.onPickerKeyDown
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },


    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.event.Event} e
     */
    onItemClick: function (view, record, node, rowIndex, e) {
        // don't select on check change. need to hit apply.
        // this.selectItem(record);
    },

    onApplyDataSource: function () {
        var me = this,
            checkedInfo = [];

        Ext.Array.each(me.picker.store.data.items, function (node, index, items) {
            if (node.getDepth() == 4 && node.data.checked) {
                checkedInfo.push({
                    CarrierId: node.parentNode.parentNode.get('nodeValue'),
                    CarrierAccount: node.parentNode.get('nodeValue'),
                    carrierLob: node.get('nodeValue')
                });
            }
        });

        /*        Ext.Ajax.request({
         useDefaultXhrHeader: false,
         paramsAsJson: true,
         noCache: false,
         url: Atlas.apiURL + me.pickerURL,
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         params: Ext.JSON.encode({
         ttDataAccess: {ttDataAccess: checkedInfo},
         pSessionID: Atlas.sessionId
         // pFullTree: 'no',
         // pSessionOnly: 'yes'
         }),
         success: function (response, opts) {
         var obj = Ext.decode(response.responseText);
         me.collapse();
         }
         });

         */

        Atlas.common.utility.Utilities.post(
            me.pickerURL,

            {
                ttDataAccess: {ttDataAccess: checkedInfo},
                pSessionID: Atlas.sessionId
                // pFullTree: 'no',
                // pSessionOnly: 'yes'
            },
            null
        );

        Atlas.common.utility.Utilities.updatePlanGroupList();
    }

});

