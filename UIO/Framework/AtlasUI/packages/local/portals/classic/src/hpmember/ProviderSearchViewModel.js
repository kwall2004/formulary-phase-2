Ext.define('Atlas.portals.hpmember.ProviderSearchViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.providerSearchViewModel',

    stores: {
        counties: {
            type: 'hpmember-counties'
        },
        cities: {
            type: 'hpmember-cities',
            autoLoad: false,
            listeners: {
                beforeLoad: 'onCityBeforeLoad',
                clear: 'onCityClear'
            }
        },
        languages: {
            type: 'hpmember-languages'
        },
        memberLobs: {
            type: 'hpmember-memberlob'
        },
        affiliations: {
            type: 'hpmember-affiliations',
            autoLoad: 'false'
        },
        specialties: {
            type: 'hpmember-specialtybygroup'
        },
        genders: {
            type: 'hpmember-genders'
        },
        providerSearchResults: {
            type: 'hpmember-providersearchresults',
            listeners: {
                load: 'onSearchResultsLoad',
                beforeLoad: 'onSearchResultsBeforeLoad'
            }
        },
        searchResultsPaged: {
            pageSize: 15,
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
        hideProviderDetails: true
    }
});