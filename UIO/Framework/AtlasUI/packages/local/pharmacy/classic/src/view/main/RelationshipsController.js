Ext.define('Atlas.pharmacy.view.main.RelationshipsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-relationships',

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },
    //Will be running after first layout
    boxReady: function () {
        // if so - load our data
        this.onModuleDataChange();
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            store = vm.getStore('relationships'),
            ncpdpId = vm.getParent().get('ncpdpId');

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (!ncpdpId) {
            return;
        }

        me.getView().mask('Loading...');
        store.removeAll(true); // remove any old data
        view.down('form').reset();

        store.load({
            params: {
                pKeyValue: ncpdpId
            },
            callback: function (record, operation) {
                var status = operation.getResultSet().message[0];
                me.getView().unmask();

                if (status.code !== 0) {
                }
            }
        });
    },

    recordSelected: function (grid, selected) {
        var view = this.getView(),
            rec = selected[0],
            hasData = selected.length,
            na = 'N/A',
            rs, pc, pm;

        if (hasData) {
            rec.data.RSfaxNum = this.phoneFaxFormatter(rec.get('RSfaxNum'), 'FAX');
            rec.data.RSphone = this.phoneFaxFormatter(rec.get('RSphone'), 'PHONE');
            rec.data.PCremitFax = this.phoneFaxFormatter(rec.get('PCremitFax'), 'FAX');
            rec.data.PCremitPhone = this.phoneFaxFormatter(rec.get('PCremitPhone'), 'PHONE');
            rec.data.PMfax = this.phoneFaxFormatter(rec.get('PMfax'), 'FAX');
            rec.data.PMphone = this.phoneFaxFormatter(rec.get('PMphone'), 'PHONE');


            view.down('form').loadRecord(rec);
            rs = rec.get('RSname');
            pc = rec.get('PCpayCenterName');
            pm = rec.get('PMparentOrgName');
        }
        //Set titles
        view.down('fieldset[name=rel]').setTitle(hasData ? (rs ? rs : na) : 'Relationships');
        view.down('fieldset[name=payment]').setTitle(hasData ? (pc ? pc : na) : 'Payment Center');
        view.down('fieldset[name=parentorg]').setTitle(hasData ? (pm ? pm : na) : 'Parent Organization');
    },

    /**
     * Number formatter for Phone & Fax number
     * @number number to format
     * @formatType type on which to format
     */
    phoneFaxFormatter: function (number, formatType) {
        var contactNumber = 0;
        var formattedNumber = number.toUpperCase() == "ERROR" ? '' : number;
        number = number.replace("/[-)(\s]/", ""); //Regex.Replace(number, @"[-)(\s]", string.Empty);

        if (number.length == 10) {
            if (formatType.toUpperCase() == "PHONE") {
                //formattedNumber = String.Format("{0:(###)-###-####}", contactNumber);
                formattedNumber = '(' + number.substring(0, 3) + ')-' + number.substring(3, 6) + '-' + number.substring(6, 10);
            }
            else {
                //formattedNumber = String.Format("{0:###-###-####}", contactNumber);
                formattedNumber = number.substring(0, 3) + '-' + number.substring(3, 6) + '-' + number.substring(6, 10);
            }
        }
        return formattedNumber == '0' ? '' : formattedNumber;
    }
});
