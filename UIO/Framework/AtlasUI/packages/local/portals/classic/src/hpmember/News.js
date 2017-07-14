/**
 * Created by K3279 on 1/09/2016.
 */

Ext.define('Atlas.portals.view.hpmember.News', {
    extend: 'Ext.container.Container',
    xtype: 'portalsmembernews',
    title: 'Local Health Events & News',

    items: [{
        xtype: 'panel',
        cls: 'card-panel',
        title: 'Local Health Events & News',

        items: [{
            xtype: 'container',
            padding: 7,

            html: 'Click on the region of Illinois that you live in to find health events and news near you!<br>' +
            '<ul>' +
            '<li><a href="http://www.hsidn.org/calendar.htmlcalendar.html" target="_blank">Southern Illinois</a></li>' +
            '<li><a href="http://www.americantowns.com/il/chicago/events/health-and-fitness" target="_blank">Chicago</a></li>' +
            '</ul><br>' +
            'More regions coming soon!'
        }]
    }]
});