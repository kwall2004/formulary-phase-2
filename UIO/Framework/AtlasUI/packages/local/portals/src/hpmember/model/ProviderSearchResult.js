/**
 * Created by b6636 on 10/13/2016.
 */
Ext.define('Atlas.portals.hpmember.model.ProviderSearchResult', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        'provId',
        'lastName',
        'firstName',
        'countyCode',
        'countyDescription',
        'specCode',
        'specDescription',
        'Address1',
        'Address2',
        'City',
        'State',
        'Zip',
        'birthDate',
        'Gender',
        'providerType',
        'socSecNum',
        'dirGroup',
        'Phone',
        'Fax',
        {name: 'Hours', type: 'array', delimiter: '^'},
        'Languages',
        'Hospitals',
        'newClients',
        'ageLimitLow',
        'ageLimitHigh',
        'boardCertified',
        'titleDegree',
        'dirCounty',
        'wrdIdx',
        'inNetwork',
        'locationID',
        'aliases',
        'npi',
        'pcp',
        'boardCerts',
        'lobID',
        'cshcs',
        'groupName',
        'distanceMile',
        'latitude',
        'longitude',
        'accreditation',
        'stJames',
        'handicapAccess',
        'adaHandiPark',
        'adaHandiRestroom',
        'adaHandiOther',
        'adaTTY',
        'publicTrans',
        'adaTransBus',
        'adaTransSub',
        'adaTransTrain',
        'adaTransOther',
        'adaAmericanSignLang',
        'adaMentalPhysServices',
        'adaDisabilityServices',
        'TDDphone',
        'levelIIIFacility',
        'acceptedGenders',
        'rowNum',
        {
            name: 'fullName',
            calculate: function (data) {
                return data.firstName + ' ' + data.lastName;
            }
        },
        {
            name: 'fullAddress',
            calculate: function (data) {
                return Ext.String.format('{0}\<br />{1}{2}, {3} {4}'
                    , data.Address1
                    , (data.Address2 != null) && (data.Address2 != "") ? data.Address2 + '\<br />' : ''
                    , data.City
                    , data.State
                    , data.Zip);
            }
        },
        {
            name: 'fullAddressSingleLine',
            calculate: function (data) {
                return Ext.String.format('{0},{1}{2}, {3} {4}'
                    , data.Address1
                    , (data.Address2 != null) && (data.Address2 != "") ? data.Address2 + ', ' : ''
                    , data.City
                    , data.State
                    , data.Zip);
            }
        },
        {
            name: 'hoursSingleLine',
            calculate: function (data) {
                return data.Hours.join(',')
            }

        },
        {
            name: 'formattedPhone',
            calculate: function (data) {
                return Atlas.common.Util.formatPhone(data.Phone);
            }
        },
        {
            name: 'formattedFax',
            calculate: function (data) {
                return Atlas.common.Util.formatPhone(data.Fax);
            }
        },
        {
            name: 'providerMessage',
            calculate: function (data) {
                var msg = ' - ';
                if (data.ageLimitLow && data.ageLimitHigh) {
                    if (data.ageLimitLow == 0) {
                        if (data.ageLimitHigh > 0) {
                            msg = 'Accepting all ages.';
                        }
                    } else {
                        if (data.ageLimitHigh > 0) {
                            msg = 'Accepting ages from ' + data.ageLimitLow + ' and above';
                        }
                    }
                }
                return msg;
            }
        },
        {
            name: 'adaMessage',
            calculate: function (data) {

                // I know this is crusty - I was just trying to prove the concept before figuring out where this should go
                var messageList = [];

                if (data.handicapAccess) {
                    messageList.push("Bldg");
                }
                if (data.adaHandiPark) {
                    messageList.push("Parking");
                }
                if (data.adaHandiRestroom) {
                    messageList.push("Restroom");
                }
                if (data.adaHandiOther) {
                    messageList.push(data.adaHandiOther);
                }
                if (data.adaTTY) {
                    messageList.push("TTY");
                }
                if (data.adaAmericanSignLang) {
                    messageList.push("American Sign Language");
                }
                if (data.adaMentalPhysServices) {
                    messageList.push("Mental/Physical Impairment Service");
                }
                if (data.adaDisabilityServices) {
                    messageList.push(data.adaDisabilityServices);
                }
                if (data.adaTransBus) {
                    messageList.push("Bus");
                }
                if (data.adaTransSub) {
                    messageList.push("Subway");
                }
                if (data.adaTransTrain) {
                    messageList.push("Train");
                }
                if (data.adaTransOther) {
                    messageList.push(data.adaTransOther);
                }
                if (data.TDDphone) {
                    messageList.push("TDD Phone: " + Atlas.common.Util.formatPhone(data.TDDphone));
                }

                return messageList.join(",");
            }
        }
    ],

    proxy: {
        url: 'portal/hp/pcpsearchlistwithzip'
        //url: 'resources/data/dummydata/portals/member/providersearch.json'
    }
});