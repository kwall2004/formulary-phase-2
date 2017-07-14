Ext.define('Atlas.common.overrides.toolbar.Paging', {
    override: 'Ext.toolbar.Paging',

    /**
     * @cfg keep load Operation parameters between page transitions
     */
    keepParams: false,
    enableOverflow:false,

    beforeRender: function () {
        var me = this,
            node;

        //Adds feature to hide refresh buton and it's adjacent tbseparator
        if (me.hideRefresh) {
            node = me.child('#refresh');
            node.previousSibling().hide();
            node.hide();

        }

        me.callParent(arguments);
    },
    onLoad : function(){
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;

            // Check for invalid current page.
            if (currPage > pageCount) {
                // If the surrent page is beyond the loaded end,
                // jump back to the loaded end if there is a valid page count.
                if (pageCount > 0) {
                    me.store.loadPage(pageCount, me.keepParams ? {params: me.store.lastOptions.params} : {});
                }
                // If no pages, reset the page field.
                else {
                    me.getInputItem().reset();
                }
                return;
            }

            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.update(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (!me.calledInternal) {
            me.fireEvent('change', me, pageData || me.emptyPageData);
        }
    },

    processKeyEvent: function(field, e) {
        var me = this,
            key = e.getKey(),
            pageData = me.getPageData(),
            increment = e.shiftKey ? 10 : 1,
            pageNum;

        if (key === e.RETURN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if (pageNum !== pageData.currentPage && me.fireEvent('beforechange', me, pageNum) !== false) {
                    me.store.loadPage(pageNum, me.keepParams ? {params: me.store.lastOptions.params} : {});
                }
            }
        } else if (key === e.HOME || key === e.END) {
            e.stopEvent();
            pageNum = key === e.HOME ? 1 : pageData.pageCount;
            field.setValue(pageNum);
        } else if (key === e.UP || key === e.PAGE_UP || key === e.DOWN || key === e.PAGE_DOWN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum) {
                if (key === e.DOWN || key === e.PAGE_DOWN) {
                    increment *= -1;
                }
                pageNum += increment;
                if (pageNum >= 1 && pageNum <= pageData.pageCount) {
                    field.setValue(pageNum);
                }
            }
        }
    },

    moveFirst : function(){
        var me = this;
        if (me.fireEvent('beforechange', me, 1) !== false){
            me.store.loadPage(1, me.keepParams ? {params: me.store.lastOptions.params} : {});
            return true;
        }
        return false;
    },

    moveLast: function () {
        var me = this,
            last = me.getPageData().pageCount;

        if (me.fireEvent('beforechange', me, last) !== false) {
            me.store.loadPage(last, me.keepParams ? {params: me.store.lastOptions.params} : {});
            return true;
        }
        return false;
    },

    doRefresh : function(){
        var me = this,
            store = me.store,
            current = store.currentPage;

        if (me.fireEvent('beforechange', me, current) !== false) {
            store.loadPage(current, me.keepParams ? {params: me.store.lastOptions.params} : {});
            return true;
        }
        return false;
    },

    moveNext : function(){
        var me = this,
            store = me.store,
            total = me.getPageData().pageCount,
            next = store.currentPage + 1;

        if (next <= total) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                store.nextPage(me.keepParams ? {params: me.store.lastOptions.params} : {});
                return true;
            }
        }
        return false;
    },

    movePrevious : function(){
        var me = this,
            store = me.store,
            prev = store.currentPage - 1;

        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                store.previousPage(me.keepParams ? {params: me.store.lastOptions.params} : {});
                return true;
            }
        }
        return false;
    }
});
