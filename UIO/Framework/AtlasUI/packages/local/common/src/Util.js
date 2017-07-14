Ext.define('Atlas.common.Util', {
    singleton: true,

    getWorkspaceInfo: function (name) {
        var cls, title;

        switch (name) {
            case 'merlin': {
                cls = 'MerlinWorkspace';
                title = 'Merlin';
                break;
            }
            case 'hpmember': {
                cls = 'MemberMHPPortalWorkspace';
                title = 'Member MHP';
                break;
            }
            case 'rxmember': {
                cls = 'MemberRxPortalWorkspace';
                title = 'Member Rx';
                break;
            }
            case 'rxprescriber': {
                cls = 'PrescriberPortalWorkspace';
                title = 'Prescriber';
                break;
            }
            case 'hpprovider': {
                cls = 'ProviderPortalWorkspace';
                title = 'Provider';
                break;
            }
            case 'rxpharmacy': {
                cls = 'PharmacyRxPortalWorkspace';
                title = 'Pharmacy';
                break;
            }
            case 'atlas': {
                cls = 'AtlasWorkspace';
                title = 'Atlas';
                break;
            }
            case 'mcs': {
                cls = 'MCSWorkspace';
                title = 'MCS';
                break;
            }
        }

        return {
            cls: cls,
            title: title
        };
    },

    classFromRoute: function (route) {
        if (route.length) {
            var parts = route.split('/');
            return 'Atlas.' + parts[1] + '.view.' + parts[2].replace('_', '.');
        } else {
            return 'Atlas.view.Unknown'
        }

    },

    formatPhone: function (val) {
        if (!val) {
            return '';
        }

        var phone = val.replace(/[^\d]/g, '');

        if (phone) {
            if (phone.length <= 5) {
                phone = phone.replace(/(\d{3})/, "($1)");
            } else if (phone.length <= 8) {
                phone = phone.replace(/(\d{3})(\d{3})/, "($1) $2");
            }
            else {
                phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            }
        }

        /*  if (phone.length === 10) {
         phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
         }*/

        return phone.substring(0, 14);
    },


    unformatPhone: function (val) {
        return val ? val.replace(/-/g, '').replace('(', '').replace(')', '').replace(' ', '') : '';
    },

    formatfax: function (val, a, b, c) {
        if (!val) {
            return '';
        }

        var phone = val.replace(/[^\d]/g, '');

        if (phone) {
            if (phone.length <= 3) {
                phone = phone.replace(/(\d{3})/, "$1");
            } else if (phone.length <= 6) {
                phone = phone.replace(/(\d{3})(\d{3})/, "$1-$2");
            }
            else {
                phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            }
        }

        return phone.substring(0, 12);
    },

    unformatfax: function (val) {
        return val ? val.replace(/-/g, '') : '';
    },

    usZip: function (val) {
        if (val && val.length > 5) {
            val = val.insertAt(5, '-');
        }
        return val;
    },

    setdateformat: function (date) {
        if (date && date.indexOf("T")) {
            var breaksdateandtime = date.split('T');
            var dateparts = breaksdateandtime[0].split('-');
            var timeparts = breaksdateandtime[1].split(':');
            return dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' + timeparts[0] + ":" + timeparts[1] + ':' + timeparts[2].substring(0, 2);
        }
    },

	setTimeformatWithAMPM: function (date) {
        if (date && date.indexOf("T")) {

            var breaksdateandtime = date.split('T');
            var dateparts = breaksdateandtime[0].split('-');
            var timeparts = breaksdateandtime[1].split(':');
            var formatter = 'AM';
            var hours = timeparts[0];
            if (hours >= 12) {
                formatter = 'PM';
            }

            if (hours > 12) {
                hours = hours % 12;
            }

            return  hours + ":" + timeparts[1] + ' ' + formatter;
        }
    },
    cloneObject :function (obj) {
        var clone = {};
        for(var i in obj) {
            if(typeof(obj[i])=="object" && obj[i] != null)
                clone[i] = this.cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    },

    setdateformatWithAMPM: function (date) {
        if (date && date.indexOf("T")) {

            var breaksdateandtime = date.split('T');
            var dateparts = breaksdateandtime[0].split('-');
            var timeparts = breaksdateandtime[1].split(':');
            var formatter = 'AM';
            var hours = timeparts[0];
            if (hours >= 12) {
                formatter = 'PM';
            }

            if (hours >= 12) {
                hours = hours % 12;
            }

            return dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' + hours + ":" + timeparts[1] + ':' + timeparts[2].substring(0, 2) + ' ' + formatter;
        }
    },


    /**
     *
     * @param data {Array} Array of data elements to renderer or array with separated values
     * @param headers {Array} Array of strings to use in header
     * @param splitter {String} Optional separator to split strings passed in to array. Defaults to ','
     * @returns {*}
     */
    buildTable: function (data, headers, splitter) {
        var splitter = splitter || ',',
            arr = [],
            i = 0,
            tmp = [],
            parts = [], tpl, len, columns, cursor;

        if (Ext.isArray(data)) {
            columns = headers.length;

            //Build template
            for (; i < columns; i++) {
                tmp.push('<span>{' + i + '}</span>');
            }

            tpl = '<div>' + tmp.join('') + '</div>';
            //---

            for (i = 0, len = data.length; i < len; i++) {
                cursor = data[i];
                parts = Ext.isArray(cursor) ? cursor : cursor.split(splitter);

                if (parts.length === columns) {
                    parts.unshift(tpl);
                    arr.push(Ext.String.format.apply(this, parts));
                }
                //<debug>
                //if (parts.length !== columns) {
                //    console.log("buildTable error: Data should match header column count");
                // }
                //</debug>
            }
            headers.unshift(tpl);

            return Ext.String.format.apply(this, headers) + arr.join('');
        }

        //<debug>
        if (!Ext.isArray(data)) {
            console.log("Can't build table as data is not an array");
        }
        //</debug>

        return '';
    },

    /**
     * Finds menuId for given route. This is required in openView methods where second level menu is present
     * @param route {String} Route name, e.g. pharmacy_Pharmacy
     * @param store {Array} Flat menu whre the search should be performed. If no data is provided, it will search within Merlin navigation menu
     * @returns {string} menuId if found
     */
    menuIdFromRoute: function (route, menu) {
        var menu = menu || Atlas.menu,
            key;

        for (key in menu) {
            if (menu[key].hasOwnProperty('route') && menu[key].route === route) {
                return menu[key].menuID;
            }
        }
        return null;
    },

    /**
     * Parses a name value pair list delimited by caret (^) and returns an array of objects
     * @param stringToParse
     */
    parseCaretDelimitedNameValuePairs: function (stringToParse) {
        var items = stringToParse.split('^'),
            i = 0,
            result = [];

        for (i; i < items.length; i += 2) {
            result.push({name: items[i], value: items[i + 1]});
        }

        return result;
    }

}, function (cls) {

    //Insert another string at the position. Typical use case is an address Zip code
    String.prototype.insertAt = function (index, string) {
        return this.substr(0, index) + string + this.substr(index);
    };

    //Make some methods available on Ext.util.Format so they can be accessed in XTemplate and bindings
    Ext.util.Format.formatPhone = cls.formatPhone;
    Ext.util.Format.usZip = cls.usZip;
});
