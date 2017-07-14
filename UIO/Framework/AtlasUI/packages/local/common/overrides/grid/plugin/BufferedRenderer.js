//Silence Missing node error in scrollTo in dev mode
Ext.define('Atlas.common.overrides.grid.plugin.BufferedRenderer', {
    override: 'Ext.grid.plugin.BufferedRenderer',

    scrollTo: function (recordIdx, options) {
        var args = arguments,
            me = this,
            view = me.view,
            lockingPartner = view.lockingPartner && view.lockingPartner.grid.isVisible() && view.lockingPartner.bufferedRenderer,
            store = me.store,
            total = store.getCount(),
            startIdx, endIdx,
            targetRow,
            tableTop,
            groupingFeature,
            metaGroup,
            record,
            direction;

        // New option object API
        if (options !== undefined && !(options instanceof Object)) {
            options = {
                select: args[1],
                callback: args[2],
                scope: args[3]
            };
        }

        // If we have a grouping summary feature rendering the view in groups,
        // first, ensure that the record's group is expanded,
        // then work out which record in the groupStore the record is at.
        if ((groupingFeature = view.dataSource.groupingFeature) && (groupingFeature.collapsible)) {
            if (recordIdx.isEntity) {
                record = recordIdx;
            } else {
                record = view.store.getAt(Math.min(Math.max(recordIdx, 0), view.store.getCount() - 1));
            }

            metaGroup = groupingFeature.getMetaGroup(record);

            if (metaGroup && metaGroup.isCollapsed) {
                if (!groupingFeature.isExpandingOrCollapsing && record !== metaGroup.placeholder) {
                    groupingFeature.expand(groupingFeature.getGroup(record).getGroupKey());
                    total = store.getCount();
                    recordIdx = groupingFeature.indexOf(record);
                } else {
                    // If we've just been collapsed, then the only record we have is
                    // the wrapped placeholder
                    record = metaGroup.placeholder;
                    recordIdx = groupingFeature.indexOfPlaceholder(record);
                }
            } else {
                recordIdx = groupingFeature.indexOf(record);
            }

        } else {

            if (recordIdx.isEntity) {
                record = recordIdx;
                recordIdx = store.indexOf(record);

                // Currently loaded pages do not contain the passed record, we cannot proceed.
                if (recordIdx === -1) {
                    //<debug>
                    console.log('Unknown record passed to BufferedRenderer#scrollTo');
                    //</debug>
                    return;
                }
            } else {
                // Sanitize the requested record index
                recordIdx = Math.min(Math.max(recordIdx, 0), total - 1);
                record = store.getAt(recordIdx);
            }
        }

        // See if the required row for that record happens to be within the rendered range.
        if (record && (targetRow = view.getNode(record))) {
            view.grid.ensureVisible(record, options);

            // Keep the view immediately replenished when we scroll an existing element into view.
            // DOM scroll events fire asynchronously, and we must not leave subsequent code without a valid buffered row block.
            me.onViewScroll();
            me.onViewScrollEnd();

            return;
        }

        // Calculate view start index.
        // If the required record is above the fold...
        if (recordIdx < view.all.startIndex) {
            // The startIndex of the new rendered range is a little less than the target record index.
            direction = -1;
            startIdx = Math.max(Math.min(recordIdx - (Math.floor((me.leadingBufferZone + me.trailingBufferZone) / 2)), total - me.viewSize + 1), 0);
            endIdx = Math.min(startIdx + me.viewSize - 1, total - 1);
        }
        // If the required record is below the fold...
        else {
            // The endIndex of the new rendered range is a little greater than the target record index.
            direction = 1;
            endIdx = Math.min(recordIdx + (Math.floor((me.leadingBufferZone + me.trailingBufferZone) / 2)), total - 1);
            startIdx = Math.max(endIdx - (me.viewSize - 1), 0);
        }
        tableTop = Math.max(startIdx * me.rowHeight, 0);

        store.getRange(startIdx, endIdx, {
            callback: function (range, start, end) {
                // Render the range.
                // Pass synchronous flag so that it does it inline, not on a timer.
                // Pass fromLockingPartner flag so that it does not inform the lockingPartner.
                me.renderRange(start, end, true, true);
                record = store.data.getRange(recordIdx, recordIdx + 1)[0];
                targetRow = view.getNode(record);

                // bodyTop property must track the translated position of the body
                view.body.translate(null, me.bodyTop = tableTop);

                // Ensure the scroller knows about the range if we're going down
                if (direction === 1) {
                    me.refreshSize();
                }

                // Locking partner must render the same range
                if (lockingPartner) {
                    lockingPartner.renderRange(start, end, true, true);

                    // Sync all row heights
                    me.syncRowHeights();

                    // bodyTop property must track the translated position of the body
                    lockingPartner.view.body.translate(null, lockingPartner.bodyTop = tableTop);

                    // Ensure the scroller knows about the range if we're going down
                    if (direction === 1) {
                        lockingPartner.refreshSize();
                    }
                }

                // The target does not map to a view node.
                // Cannot scroll to it.
                if (!targetRow) {
                    return;
                }
                view.grid.ensureVisible(record, options);

                me.scrollTop = me.position = me.scroller.getPosition().y;

                if (lockingPartner) {
                    lockingPartner.position = lockingPartner.scrollTop = me.scrollTop;
                }
            }
        });
    }
});
