/**
 * Created by g2304 on 10/24/2016.
 */
Ext.define('Atlas.common.view.GridPicker', {
    extend: 'Ext.form.field.ComboBox'


    , alias: 'widget.gridpicker'

    //, defaultListenerScope: true
    , requires: [
        'Ext.grid.Panel'
        , 'Atlas.common.view.GridPickerKeyNav'
    ],
    xtype: 'gridpicker'
    , defaultGridConfig: {
        xclass: 'Ext.grid.Panel'

        , floating: true
        , focusOnToFront: false
        , resizable: true

        , hideHeaders: false
        , stripeRows: false

        //        ,viewConfig: {
        //               stripeRows: false
        //        }
        , rowLines: false

        , initComponent: function () {
            Ext.grid.Panel.prototype.initComponent.apply(this, arguments);

            var store = this.getStore();

            this.query('pagingtoolbar').forEach(function (pagingToolbar) {
                pagingToolbar.bindStore(store);
            });
        }
    }

    /**
     * Configuration object for the picker grid. It will be merged with {@link #defaultGridConfig}
     * before creating the grid with {@link #createGrid}.
     *
     * @cfg {Object}
     */
    , gridConfig: null

    // /**
    // * @cfg {Boolean}
    // */
    // ,multiSelect: false

    /**
     * Overriden: delegates to {@link #createGrid}.
     *
     * @protected
     */
    , createPicker: function () {
        // We must assign it for Combo's onAdded method to work
        return this.picker = this.createGrid();
    }

    /**
     * Creates the picker's grid.
     *
     * @protected
     */
    , createGrid: function () {
        var grid = Ext.create(this.getGridConfig());
        //debugger;
        this.bindGrid(grid);
        return grid;
    }

    /**
     * @return {Ext.grid.Panel}
     */
    , getGrid: function () {
        return this.getPicker();
    }

    /**
     * Gets the configuration for the picked's grid.
     *
     * The returned object will be modified, so it must be an instance dedicated to
     * this object.
     *
     * @return {Object}
     * @protected
     */
    , getGridConfig: function () {
        var config = {};

        Ext.apply(config, this.gridConfig, this.defaultGridConfig);

        Ext.applyIf(config, {
            store: this.store

            , columns: [{
                dataIndex: this.displayField || this.valueField
                , flex: 1
            }]
        });

        // Avoid "Layout run failed" error
        // See: http://stackoverflow.com/a/21740832/1387519
        if (!config.width) {
            config.width = this.inputEl.getWidth();
        }
        return config;
    }

    /**
     * Binds the specified grid to this picker.
     *
     * @param {Ext.grid.Panel}
     * @private
     */
    , bindGrid: function (grid) {

        this.grid = grid;

        grid.ownerCt = this;
        grid.registerWithOwnerCt();

        grid.mon({
            scope: this

            //, itemclick: this.onItemClick
            //, refresh: this.onListRefresh
            //
            //, beforeselect: this.onBeforeSelect
            //, beforedeselect: this.onBeforeDeselect
            //, selectionchange : this.onListSelectionChange

            // fix the buffered view!!!
            , afterlayout: function (grid) {
                if (grid.getStore().getCount()) {
                    if (!grid.fixingTheLayout) {
                        var el = grid.getView().el;
                        grid.fixingTheLayout = true
                        el.setHeight('100%');
                        el.setStyle('overflow-x', 'hidden');
                        grid.fixingTheLayout = false;
                    }
                }
            }

        });

        grid.on("selectionchange", this.onListSelectionChange);
        //grid.on("select", this.onListSelectionChange);




        // Prevent deselectAll, that is called liberally in combo box code, to actually deselect
        // the current value
        var me = this,
            sm = grid.getSelectionModel(),
            uber = sm.deselectAll;
        sm.deselectAll = function () {
            if (!me.ignoreSelection) {
                uber.apply(this, arguments);
            }
        };
    }

    /**
     * Highlight (i.e. select) the specified record.
     *
     * @param {Ext.data.Record}
     * @private
     */
    , highlightRecord: function (record) {
        var grid = this.getGrid(),
            sm = grid.getSelectionModel(),
            view = grid.getView(),
            node = view.getNode(record),
            plugins = grid.plugins,
            bufferedPlugin = plugins && plugins.filter(function (p) {
                    return p instanceof Ext.grid.plugin.BufferedRenderer
                })[0];

        sm.select(record, false, true);

        if (node) {
            Ext.fly(node).scrollIntoView(view.el, false);
        } else if (bufferedPlugin) {
            bufferedPlugin.scrollTo(grid.store.indexOf(record));
        }
    }

    /**
     * Highlight the record at the specified index.
     *
     * @param {Integer} index
     * @private
     */
    , highlightAt: function (index) {
        var grid = this.getGrid(),
            sm = grid.getSelectionModel(),
            view = grid.getView(),
            node = view.getNode(index),
            plugins = grid.plugins,
            bufferedPlugin = plugins && plugins.filter(function (p) {
                    return p instanceof Ext.grid.plugin.BufferedRenderer
                })[0];

        sm.select(index, false, true);

        if (node) {
            Ext.fly(node).scrollIntoView(view.el, false);
        } else if (bufferedPlugin) {
            bufferedPlugin.scrollTo(index);
        }
    }

// private
    , onExpand: function () {
        var me = this,
            keyNav = me.listKeyNav,
            selectOnTab = me.selectOnTab;

        // Handle BoundList navigation from the input field. Insert a tab listener specially to enable selectOnTab.
        if (keyNav) {
            keyNav.enable();
        } else {
            keyNav = me.listKeyNav = Ext.create('Atlas.common.view.GridPickerKeyNav', {
                target: this.inputEl
                , forceKeyDown: true
                , pickerField: this
                , grid: this.getGrid()
            });
        }

        // While list is expanded, stop tab monitoring from Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
            me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); //wait a bit so it doesn't react to the down arrow opening the picker

        this.focusWithoutSelection(10);
    }

// private
    , focusWithoutSelection: function (delay) {
        function focus() {
            var me = this,
                previous = me.selectOnFocus;
            me.selectOnFocus = false;
            me.inputEl.focus();
            me.selectOnFocus = previous;
        }

        return function (delay) {
            if (Ext.isNumber(delay)) {
                //                           Ext.defer(focus, delay, me.inputEl);
                Ext.defer(focus, delay, this);
            } else {
                focus.call(this);
            }
        };
    }()

    // private
    , doAutoSelect: function () {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            // Highlight the last selected item and scroll it into view
            lastSelected = picker.getSelectionModel().lastSelected;
            if (lastSelected) {
                picker.getSelectionModel().select(lastSelected, false, true);
            }
        }
    }

// private
    , onTypeAhead: function () {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            grid = me.getPicker(),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;

            //grid.highlightItem(grid.getNode(record));
            this.highlightRecord(record);

            if (selStart !== 0 && selStart !== len) {
                me.setRawValue(newValue);
                me.selectText(selStart, newValue.length);
            }
        }
    }
// private added by Tony Xu
    , onItemClick: function () {
    }

// private added by jp
    , onListRefresh: function () {
    }
// private added by Tony xu
    , onBeforeSelect: function () {
    }
// private added by Tony xu
    , onBeforeDeselect: function () {
    }

// private added by Tony xu
    , onListSelectionChange: function (theObj, theRecords) {
        //debugger;
        if (theRecords.length < 1) return false;
        var selectedRec = theRecords[0];
        var me = this.ownerCmp;
        if (!me.picker) return false;

        var displayText = selectedRec.get(me.displayField);
        var selectedValue = selectedRec.get(me.valueField);

        me.select(selectedRec);
        me.setValue(selectedValue);
        //me.setRawValue(displayText);

        me.picker.hide();


        me.fireEvent('select',me, selectedRec);
    }
}, function () {

    // Specific to Ext 4.2.0
    //if (Ext.getVersion().isLessThan('4.2.1')) {
    //    Ext.require('Ext.ux.Rixo.form.field.GridPicker-4-2-0');
    //}

    // Polyfill for forEach

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fun /*, thisArg */) {
            "use strict";

            if (this === void 0 || this === null)
                throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();

            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t)
                    fun.call(thisArg, t[i], i, t);
            }
        };
    }
});
