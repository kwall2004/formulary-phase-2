//Fix unselectable text in Window
//Sencha JIRA Ticket: EXTJS-22653
//Remove in 6.2.1+
Ext.define('Atlas.common.overrides.dd.DragTracker', {
    override: 'Ext.dd.DragTracker',
    compatibility: '6.2.0',

    initEl: function (el) {
        var me = this,
            delegate = me.delegate,
            elCmp, touchScrollable, unselectable;

        me.el = el = Ext.get(el);

        // Disable drag to select. We must take over any drag selecting gestures.

        // The delegate option may also be an element on which to listen
        if (delegate) {
            if (delegate.isElement) {
                me.handle = delegate;
                unselectable = delegate;
            }
        } else {
            unselectable = el;
        }

        // Only make the element unselectable if we have a known delegate, or this item is to be dragged.
        // Otherwise it's too wide of a net to cast, callers will need to apply unselectable to the appropriate
        // delegated elements to get the same effect.
        if (unselectable) {
            unselectable.addCls(Ext.baseCSSPrefix + 'unselectable');
        }

        // If delegate specified an actual element to listen on, we do not use the delegate listener option
        me.delegate = me.handle ? undefined : me.delegate;

        // See if the handle or delegates are inside the scrolling part of the component.
        // If they are, we will need to use longpress to trigger the dragstart.
        if (Ext.supports.Touch) {
            elCmp = Ext.ComponentManager.fromElement(el);
            touchScrollable = elCmp && elCmp.getScrollable();
            if (touchScrollable) {
                elCmp = touchScrollable.getElement();
                if (me.handle && !elCmp.contains(me.handle)) {
                    touchScrollable = false;
                } else if (me.delegate && !elCmp.down(me.delegate)) {
                    touchScrollable = false;
                } else {
                    touchScrollable = touchScrollable.getX() || touchScrollable.getY();
                }
            }
        }

        if (!me.handle) {
            me.handle = el;
        }

        // Add a mousedown listener which reacts only on the elements targeted by the delegate config.
        // We process mousedown to begin tracking.
        me.handleListeners = {
            scope: me,
            delegate: me.delegate,
            dragstart: me.onDragStart
        };

        // If the element is part of a component which is scrollable by touch
        // then we have to use a longpress to trigger drag.
        // In this case, we also use untranslated mousedown because of multi input platforms.
        if (touchScrollable) {
            me.handleListeners.longpress = me.onMouseDown;
            me.handleListeners.mousedown = {
                fn: me.onMouseDown,
                delegate: me.delegate,
                translate: false
            };
            me.handleListeners.contextmenu = function (e) {
                e.stopEvent();
            };
        } else {
            me.handleListeners.mousedown = me.onMouseDown;
        }

        // If configured to do so, track mouse entry and exit into the target (or delegate).
        // The mouseover and mouseout CANNOT be replaced with mouseenter and mouseleave
        // because delegate cannot work with those pseudoevents. Entry/exit checking is done in the handler.
        if (!Ext.supports.TouchEvents && (me.trackOver || me.overCls)) {
            Ext.apply(me.handleListeners, {
                mouseover: me.onMouseOver,
                mouseout: me.onMouseOut
            });
        }
        me.mon(me.handle, me.handleListeners);

        // Accessibility
        me.keyNav = new Ext.util.KeyNav({
            target: el,
            up: me.onResizeKeyDown,
            left: me.onResizeKeyDown,
            right: me.onResizeKeyDown,
            down: me.onResizeKeyDown,
            scope: me
        });
    }
});