/**
 * Created by c4539 on 11/22/2016.
 */
Ext.define('Atlas.portals.provider.ProfessionalClaimsOBVisitsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderprofessionalclaimsobvisitswindow',

    init: function() {
        var visits = this.getView().getViewModel().get('obVisits');

        if (!visits) { return; }
        visits = visits.split('|');
        for (var i = 0; i < visits.length; i++) {
            this.lookupReference('obVisit' + (i + 1)).setValue(visits[i]);
        }
    },

    updateOBVisits: function() {
        var visits = [],
            finalVisits = '';

        for (var i = 0; i < 20; i++) {
            visits.push(this.lookupReference('obVisit' + (i + 1)).rawValue);
        }

        finalVisits = visits.toString();
        finalVisits = finalVisits.replace(/,/g, '|');
        this.fireEvent('obVisitsUpdated', finalVisits);
        this.getView().up().destroy();
    },

    clearOBVisits: function() {
        this.lookupReference('obVisitsForm').reset();
    }
});