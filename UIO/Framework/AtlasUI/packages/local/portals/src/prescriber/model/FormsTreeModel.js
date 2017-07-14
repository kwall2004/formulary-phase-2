/**
 * Created by T3852 on 10/4/2016.
 */
Ext.define('Atlas.portals.prescriber.model.FormsTreeModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'name',
            convert : function(value, record) {
                var namePrefix = '';
                switch(record.get('EntityType')) {
                    case 10:
                        namePrefix = 'Tenant Family: ';
                        break;
                    case 20:
                        namePrefix = 'Tenant: ';
                        break;
                    case 30:
                        namePrefix = 'Account: ';
                        break;
                    case 40:
                        namePrefix = 'Group: ';
                }
                return namePrefix + record.get('EntityDescription');
            }
        }, {
            name: 'leaf',
            convert : function(value, record) {
                return record.get('EntityType') == 50;
            }
        }, {
            name: 'expanded',
            convert : function(value, record) {
                return true;
            }
        }, {
            name: 'entityType',
            convert : function(value, record) {
                return record.get('EntityType');
            }
        }, {
            name: 'entitySK',
            convert : function(value, record) {
                return record.get('EntitySK');
            }
        }
    ],

    proxy: {
        url : '/users'
    }
});