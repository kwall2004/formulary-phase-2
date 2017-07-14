/**
 * This override introduces new Column property nestedIndex
 * It can be used to explicitly render and edit properties located deep in hierarchical data
 * @example
 *
 * columns:[
 *  {
 *  title: 'Nested Baz',
 *  nestedIndex: 'foo.bar[4].baz'
 *  }
 * ]
 */
Ext.define('Atlas.common.overrides.view.Table', {
    override: 'Ext.view.Table',
    compatibility: '6.2.0',

    renderCell: function (column, record, recordIndex, rowIndex, columnIndex, out) {
        var me = this,
            fullIndex,
            selModel = me.selectionModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            nestedIndex = column.nestedIndex,
            fieldValue,
            cellTpl = me.cellTpl,
            enableTextSelection = column.enableTextSelection,
            value, clsInsertPoint,
            lastFocused = me.navigationModel.getPosition();

        fieldValue = nestedIndex ? eval('record.data.' + nestedIndex) : record.data[column.dataIndex];

        // Only use the view's setting if it's not been overridden on the column
        if (enableTextSelection == null) {
            enableTextSelection = me.enableTextSelection;
        }

        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.rowIndex = rowIndex;
        cellValues.columnIndex = cellValues.cellIndex = columnIndex;
        cellValues.align = column.textAlign;
        cellValues.innerCls = column.innerCls;
        cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
        cellValues.unselectableAttr = enableTextSelection ? '' : 'unselectable="on"';

        // Begin setup of classes to add to cell
        classes[1] = column.getCellId();

        // On IE8, array[len] = 'foo' is twice as fast as array.push('foo')
        // So keep an insertion point and use assignment to help IE!
        clsInsertPoint = 2;

        if (column.renderer && column.renderer.call) {
            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
            value = column.renderer.call(column.usingDefaultRenderer ? column : column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.dataSource, me);
            if (cellValues.css) {
                // This warning attribute is used by the compat layer
                // TODO: remove when compat layer becomes deprecated
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                cellValues.css = null;
            }

            // Add any tdCls which was added to the cellValues by the renderer.
            if (cellValues.tdCls) {
                classes[clsInsertPoint++] = cellValues.tdCls;
            }
        } else {
            value = fieldValue;
        }

        cellValues.value = (value == null || value.length === 0) ? column.emptyCellText : value;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.dirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;

            if (column.dirtyTextElementId) {
                cellValues.tdAttr = (cellValues.tdAttr ? cellValues.tdAttr + ' ' : '') +
                    'aria-describedby="' + column.dirtyTextElementId + '"';
            }
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!enableTextSelection) {
            classes[clsInsertPoint++] = me.unselectableCls;
        }
        if (selModel && (selModel.isCellModel || selModel.isSpreadsheetModel) && selModel.isCellSelected(me, recordIndex, column)) {
            classes[clsInsertPoint++] = me.selectedCellCls;
        }
        if (lastFocused && lastFocused.record.id === record.id && lastFocused.column === column) {
            classes[clsInsertPoint++] = me.focusedItemCls;
        }

        // Chop back array to only what we've set
        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);

        // Dereference objects since cellValues is a persistent var in the XTemplate's scope chain
        cellValues.column = cellValues.record = null;
    },

    handleUpdate: function (store, record, operation, changedFieldNames, info, allColumns) {
        operation = operation || Ext.data.Model.EDIT;
        var me = this,
            recordIndex = me.store.indexOf(record),
            rowTpl = me.rowTpl,
            markDirty = me.markDirty,
            dirtyCls = me.dirtyCls,
            clearDirty = operation !== Ext.data.Model.EDIT,
            columnsToUpdate = [],
            hasVariableRowHeight = me.variableRowHeight,
            updateTypeFlags = 0,
            ownerCt = me.ownerCt,
            cellFly = me.cellFly || (me.self.prototype.cellFly = new Ext.dom.Fly()),
            oldItemDom, oldDataRow,
            newItemDom,
            newAttrs, attLen, attName, attrIndex,
            overItemCls,
            columns,
            column,
            len, i,
            cellUpdateFlag,
            cell,
            fieldName,
            value,
            defaultRenderer,
            scope,
            elData,
            emptyValue,
            hasNested,
            idx,
            idxArrPos;

        if (me.viewReady) {
            // Some features might need to know that we're updating
            me.updatingRows = true;

            // Table row being updated
            oldItemDom = me.getNodeByRecord(record);

            // Row might not be rendered due to buffered rendering or being part of a collapsed group...
            if (oldItemDom) {
                // refreshNode can be called on a collapsed placeholder record.
                // Update it from a new rendering.
                if (record.isCollapsedPlaceholder) {
                    Ext.fly(oldItemDom).syncContent(me.createRowElement(record, me.indexOfRow(record)));
                    return;
                }

                overItemCls = me.overItemCls;
                columns = me.ownerCt.getVisibleColumnManager().getColumns();

                // A refreshNode operation must update all columns, and must do a full rerender.
                // Set the flags appropriately.
                if (allColumns) {
                    columnsToUpdate = columns;
                    updateTypeFlags = 1;
                } else {

                    // Collect an array of the columns which must be updated.
                    // If the field at this column index was changed, or column has a custom renderer
                    // (which means value could rely on any other changed field) we include the column.
                    for (i = 0, len = columns.length; i < len; i++) {
                        column = columns[i];

                        // We are not going to update the cell, but we still need to mark it as dirty.
                        if (column.preventUpdate) {
                            cell = Ext.fly(oldItemDom).down(column.getCellSelector(), true);

                            // Mark the field's dirty status if we are configured to do so (defaults to true)
                            if (cell && !clearDirty && markDirty) {
                                cellFly.attach(cell);
                                if (record.isModified(column.dataIndex)) {
                                    cellFly.addCls(dirtyCls);

                                    if (column.dirtyTextElementId) {
                                        cell.setAttribute('aria-describedby', column.dirtyTextElementId);
                                    }
                                }
                                else {
                                    cellFly.removeCls(dirtyCls);
                                    cell.removeAttribute('aria-describedby');
                                }
                            }
                        } else {
                            // 0 = Column doesn't need update.
                            // 1 = Column needs update, and renderer has > 1 argument; We need to render a whole new HTML item.
                            // 2 = Column needs update, but renderer has 1 argument or column uses an updater.
                            cellUpdateFlag = me.shouldUpdateCell(record, column, changedFieldNames);

                            if (cellUpdateFlag) {
                                // Track if any of the updating columns yields a flag with the 1 bit set.
                                // This means that there is a custom renderer involved and a new TableView item
                                // will need rendering.
                                updateTypeFlags = updateTypeFlags | cellUpdateFlag; // jshint ignore:line

                                columnsToUpdate[columnsToUpdate.length] = column;
                                hasVariableRowHeight = hasVariableRowHeight || column.variableRowHeight;
                            }
                        }
                    }
                }

                // Give CellEditors or other transient in-cell items a chance to get out of the way
                // if there are in the cells destined for update.
                me.fireEvent('beforeitemupdate', record, recordIndex, oldItemDom, columnsToUpdate);

                // If there's no data row (some other rowTpl has been used; eg group header)
                // or we have a getRowClass
                // or one or more columns has a custom renderer
                // or there's more than one <TR>, we must use the full render pathway to create a whole new TableView item
                if (me.getRowClass || !me.getRowFromItem(oldItemDom) ||
                    (updateTypeFlags & 1) || // jshint ignore:line
                    (oldItemDom.tBodies[0].childNodes.length > 1)) {

                    elData = oldItemDom._extData;
                    newItemDom = me.createRowElement(record, me.indexOfRow(record), columnsToUpdate);
                    if (Ext.fly(oldItemDom, '_internal').hasCls(overItemCls)) {
                        Ext.fly(newItemDom).addCls(overItemCls);
                    }

                    // Copy new row attributes across. Use IE-specific method if possible.
                    // In IE10, there is a problem where the className will not get updated
                    // in the view, even though the className on the dom element is correct.
                    // See EXTJSIV-9462
                    if (Ext.isIE9m && oldItemDom.mergeAttributes) {
                        oldItemDom.mergeAttributes(newItemDom, true);
                    } else {
                        newAttrs = newItemDom.attributes;
                        attLen = newAttrs.length;
                        for (attrIndex = 0; attrIndex < attLen; attrIndex++) {
                            attName = newAttrs[attrIndex].name;
                            if (attName !== 'id') {
                                oldItemDom.setAttribute(attName, newAttrs[attrIndex].value);
                            }
                        }
                    }

                    // The element's data is no longer synchronized. We just overwrite it in the DOM
                    if (elData) {
                        elData.isSynchronized = false;
                    }

                    // If we have columns which may *need* updating (think locked side of lockable grid with all columns unlocked)
                    // and the changed record is within our view, then update the view.
                    if (columns.length && (oldDataRow = me.getRow(oldItemDom))) {
                        me.updateColumns(oldDataRow, Ext.fly(newItemDom).down(me.rowSelector, true), columnsToUpdate);
                    }

                    // Loop thru all of rowTpls asking them to sync the content they are responsible for if any.
                    while (rowTpl) {
                        if (rowTpl.syncContent) {
                            // *IF* we are selectively updating columns (have been passed changedFieldNames), then pass the column set, else
                            // pass null, and it will sync all content.
                            if (rowTpl.syncContent(oldItemDom, newItemDom, changedFieldNames ? columnsToUpdate : null) === false) {
                                break;
                            }
                        }
                        rowTpl = rowTpl.nextTpl;
                    }
                }

                // No custom renderers found in columns to be updated, we can simply update the existing cells.
                else {
                    // Loop through columns which need updating.
                    for (i = 0, len = columnsToUpdate.length; i < len; i++) {
                        column = columnsToUpdate[i];
                        idx = null;
                        hasNested = !!column.nestedIndex;

                        if (hasNested) {
                            idx = column.nestedIndex.split('.')[0]; // get root field name
                            // If name has an Array part we have to trim it off
                            idxArrPos = idx.indexOf('[');
                            if (idxArrPos > 0) {
                                idx = idx.substr(0, idxArrPos);
                            }
                        }

                        // The dataIndex of the column is the field name
                        fieldName = column.nestedIndex || column.dataIndex;

                        value = hasNested ? eval('record.data.' + column.nestedIndex) : record.get(fieldName);
                        cell = Ext.fly(oldItemDom).down(column.getCellSelector(), true);
                        cellFly.attach(cell);

                        // Mark the field's dirty status if we are configured to do so (defaults to true)
                        if (!clearDirty && markDirty) {
                            if (record.isModified(hasNested ? idx : column.dataIndex)) {
                                cellFly.addCls(dirtyCls);

                                if (column.dirtyTextElementId) {
                                    cell.setAttribute('aria-describedby', column.dirtyTextElementId);
                                }
                            }
                            else {
                                cellFly.removeCls(dirtyCls);
                                cell.removeAttribute('aria-describedby');
                            }
                        }

                        defaultRenderer = column.usingDefaultRenderer;
                        scope = defaultRenderer ? column : column.scope;

                        // Call the column updater which gets passed the TD element
                        if (column.updater) {
                            Ext.callback(column.updater, scope, [cell, value, record, me, me.dataSource], 0, column, ownerCt);
                        }
                        else {
                            if (column.renderer) {
                                value = Ext.callback(column.renderer, scope,
                                    [value, null, record, 0, 0, me.dataSource, me], 0, column, ownerCt);
                            }

                            emptyValue = value == null || value.length === 0;
                            value = emptyValue ? column.emptyCellText : value;

                            // Update the value of the cell's inner in the best way.
                            // We only use innerHTML of the cell's inner DIV if the renderer produces HTML
                            // Otherwise we change the value of the single text node within the inner DIV
                            // The emptyValue may be HTML, typically defaults to &#160;
                            if (column.producesHTML || emptyValue) {
                                cellFly.down(me.innerSelector, true).innerHTML = value;
                            } else {
                                cellFly.down(me.innerSelector, true).childNodes[0].data = value;
                            }
                        }

                        // Add the highlight class if there is one
                        if (me.highlightClass) {
                            Ext.fly(cell).addCls(me.highlightClass);

                            // Start up a DelayedTask which will purge the changedCells stack, removing the highlight class
                            // after the expiration time
                            if (!me.changedCells) {
                                me.self.prototype.changedCells = [];
                                me.prototype.clearChangedTask = new Ext.util.DelayedTask(me.clearChangedCells, me.prototype);
                                me.clearChangedTask.delay(me.unhighlightDelay);
                            }

                            // Post a changed cell to the stack along with expiration time
                            me.changedCells.push({
                                cell: cell,
                                cls: me.highlightClass,
                                expires: Ext.Date.now() + 1000
                            });
                        }
                    }
                }

                // If we have a commit or a reject, some fields may no longer be dirty but may
                // not appear in the modified field names. Remove all the dirty class here to be sure.
                if (clearDirty && markDirty && !record.dirty) {
                    Ext.fly(oldItemDom, '_internal').select('.' + dirtyCls).removeCls(dirtyCls).set({'aria-describedby': undefined});
                }

                // Coalesce any layouts which happen due to any itemupdate handlers (eg Widget columns) with the final refreshSize layout.
                if (hasVariableRowHeight) {
                    Ext.suspendLayouts();
                }

                // Since we don't actually replace the row, we need to fire the event with the old row
                // because it's the thing that is still in the DOM
                me.fireEvent('itemupdate', record, recordIndex, oldItemDom, me);

                // We only need to update the layout if any of the columns can change the row height.
                if (hasVariableRowHeight) {
                    // Must climb to ownerGrid in case we've only updated one field in one side of a lockable assembly.
                    // ownerGrid is always the topmost GridPanel.
                    me.ownerGrid.updateLayout();

                    // Ensure any layouts queued by itemupdate handlers and/or the refreshSize call are executed.
                    Ext.resumeLayouts(true);
                }
            }

            me.updatingRows = false;
        }
    }
});