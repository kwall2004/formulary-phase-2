Ext.define('Atlas.common.overrides.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    compatibility: '6.2.0',

    addFieldsForColumn: function (column, initial) {
        var me = this,
            nestedIndex = column.nestedIndex, //added
            recordValue, // added
            i, len, field, style;

        if (Ext.isArray(column)) {
            for (i = 0, len = column.length; i < len; i++) {
                me.addFieldsForColumn(column[i], initial);
            }
            return;
        }

        if (column.getEditor) {

            // Get a default display field if necessary
            field = column.getEditor(null, me.getDefaultFieldCfg());
            //overridden
            //Inform the field that we will be using nestedIndex
            if (nestedIndex) {
                field.nestedIndex = nestedIndex;
            }
            //--
            if (column.align === 'right') {
                style = field.fieldStyle;
                if (style) {
                    if (Ext.isObject(style)) {
                        // Create a copy so we don't clobber the object
                        style = Ext.apply({}, style);
                    } else {
                        style = Ext.dom.Element.parseStyles(style);
                    }
                    if (!style.textAlign && !style['text-align']) {
                        style.textAlign = 'right';
                    }
                } else {
                    style = 'text-align:right';
                }

                field.fieldStyle = style;

            }

            if (column.xtype === 'actioncolumn') {
                field.fieldCls += ' ' + Ext.baseCSSPrefix + 'form-action-col-field';
            }

            if (me.isVisible() && me.context) {
                if (field.is('displayfield')) {
                    me.renderColumnData(field, me.context.record, column);
                } else {
                    field.suspendEvents();
                    //overridden
                    recordValue = nestedIndex ? eval('me.context.record.record.data.' + nestedIndex + '.' + column.dataIndex) : me.context.record.data[column.dataIndex];
                    //field.setValue(me.context.record.get(column.dataIndex));
                    field.setValue(recordValue);
                    field.resumeEvents();
                }
            }
            if (column.hidden) {
                me.onColumnHide(column);
            } else if (column.rendered && !initial) {
                // Setting after initial render
                me.onColumnShow(column);
            }
        }
    },

    renderColumnData: function (field, record, activeColumn) {
        var me = this,
            grid = me.editingPlugin.grid,
            headerCt = grid.headerCt,
            view = me.scrollingView,
            store = view.dataSource,
            column = activeColumn || field.column,
            nestedIndex = column.nestedIndex,
            //Overridden below
            //value = record.get(column.dataIndex),
            value = nestedIndex ? eval('record.data.' + nestedIndex) : record.get(column.dataIndex),

            renderer = column.editRenderer || column.renderer,
            metaData,
            rowIdx,
            colIdx,
            scope = (column.usingDefaultRenderer && !column.scope) ? column : column.scope;

        // honor our column's renderer (TemplateHeader sets renderer for us!)
        if (renderer) {
            metaData = {tdCls: '', style: ''};
            rowIdx = store.indexOf(record);
            colIdx = headerCt.getHeaderIndex(column);

            value = renderer.call(
                scope || headerCt.ownerCt,
                value,
                metaData,
                record,
                rowIdx,
                colIdx,
                store,
                view
            );
        }

        field.setRawValue(value);
    },

    loadRecord: function (record) {
        var me = this,
            form = me.getForm(),
            fields = form.getFields(),
            items = fields.items,
            length = items.length,
            i, displayFields,
            isValid, item;

        // temporarily suspend events on form fields before loading record to prevent the fields' change events from firing
        for (i = 0; i < length; i++) {
            item = items[i];
            item.suspendEvents();
            item.resetToInitialValue();
        }

        form.loadRecord(record, true); // use nested loading functionality that iterates over fields rather than record data

        for (i = 0; i < length; i++) {
            items[i].resumeEvents();
        }

        // Because we suspend the events, none of the field events will get propagated to
        // the form, so the valid state won't be correct.
        if (form.hasInvalidField() === form.wasValid) {
            delete form.wasValid;
        }
        isValid = form.isValid();
        if (me.errorSummary) {
            if (isValid) {
                me.hideToolTip();
            } else {
                me.showToolTip();
            }
        }
        me.updateButton(isValid);

        // render display fields so they honor the column renderer/template
        displayFields = me.query('>displayfield');
        length = displayFields.length;

        for (i = 0; i < length; i++) {
            me.renderColumnData(displayFields[i], record);
        }
    },

    completeEdit: function () {
        var me = this,
            form = me.getForm();

        if (!form.isValid()) {
            return false;
        }

        me.completing = true;
        form.updateRecord(me.context.record, true); // Sync nested data back in to record
        me.hide();
        me.completing = false;
        return true;
    },

    //EXTJS-19471 RowEditing buttons are missing/incorrectly sized on a small grid
    syncButtonPosition: function () {
        var me = this,
            scrollDelta = me.getScrollDelta(),
            floatingButtons = me.getFloatingButtons(),
            // If this is negative, it means we're not scrolling so lets just ignore it
            scrollHeight = Math.max(0, me.scroller.getSize().y - me.scroller.getClientSize().y),
            overflow = scrollDelta - (scrollHeight - me.scroller.getPosition().y);

        floatingButtons.show();

        if (overflow > 0) {
            if (!me._buttonsOnTop) {
                floatingButtons.setButtonPosition('top');
                me._buttonsOnTop = true;
                me.layout.setAlign('bottom');
                me.updateLayout();
            }
            scrollDelta = 0;
        } else if (me._buttonsOnTop !== false) {
            floatingButtons.setButtonPosition('bottom');
            me._buttonsOnTop = false;
            me.layout.setAlign('top');
            me.updateLayout();
        }
        // Ensure button Y position is synced with Editor height even if button
        // orientation doesn't change
        else {
            floatingButtons.setButtonPosition(floatingButtons.position);
        }

        return scrollDelta;
    }
});
