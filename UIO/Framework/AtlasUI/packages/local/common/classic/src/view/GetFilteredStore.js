/*
PARAMETERS:
myStore - the store that you want to filter. Send the entire store with all records
    to be filtered
filteredFields - an array of objects that has all the filters you would like to include.
    Each type of filter is as follows with it's corresponding keys:
    --string
        filterType - must have value of 'string'
        fieldToFilter - the name of the field to filter
        valueToFilter - the value which you want to pull up in the store
        valueToFilterOut - the value which you do not want in your store
    --date
        filterType - must have value of 'date'
        fieldToFilter - the name of the field to filter
        minDate - the minimum date value to include in the store
        maxDate - the maximum date value to include in the store
        exactDateToFilterOut - a date to not include in the store
        exactDateToFilter - the only date to include in the store
    --number
        filterType - must have value of 'number'
        fieldToFilter - the name of the field to filter,
        minVal - the lowest number value that can be included in the store
        maxVal - the highest number value that can be included in the store
        valueToFilter - the value which should be included in the store
        valueToFilterOut - the value to not include in the store
    For example, the filteredFields might look as follows:
     var filteredFields = [{
         filterType: 'date',
         fieldToFilter: 'auditRespFileUploadDate',
         minDate: new Date('02/17/2016'),
         maxDate: new Date('03/20/2016'),
     }]
newStore - the new store which will have all the filters included in the filteredFields
    parameter. The store should look as follows in the viewModel:
         storeName: {
             pageSize: 25,
             remoteSort: true,
             remoteFilter: true,
             proxy: {
                 type: 'memory',
                 enablePaging: true
             }
         }
 */
Ext.define('Atlas.common.view.GetFilteredStore', {
    singleton: true,

    getFilteredStore: function(myStore, filteredFields, newStore){
        var myFilters = [],
            preexistingFilters = myStore.getFilters().items;

        for (var i = 0, filterLength = preexistingFilters.length; i < filterLength; i += 1){
            myFilters.push(preexistingFilters[i]);
        }
        myStore.clearFilter();

        for (var idx = 0, length = filteredFields.length; idx < length; idx += 1){
            var currentFilter = filteredFields[idx],
                filterType = currentFilter.filterType,
                fieldToFilter = currentFilter.fieldToFilter;

            switch (filterType){
                case 'string':
                    var valueToFilter = currentFilter.valueToFilter,
                        valueToFilterOut = currentFilter.valueToFilterOut;
                    if (valueToFilter){
                        myStore.filter(fieldToFilter, valueToFilter);
                    }
                    if (valueToFilterOut){
                        myStore.filterBy(function(rec){
                            if(rec.get(fieldToFilter) !== valueToFilterOut){
                                return true;
                            }
                        });
                    }
                    break;
                case 'date':
                    var minDate = currentFilter.minDate,
                        maxDate = currentFilter.maxDate,
                        exactDateToFilter = currentFilter.exactDateToFilter,
                        exactDateToFilterOut = currentFilter.exactDateToFilterOut,
                        formatter = Ext.util.Format;
                    if (minDate){
                        myStore.filterBy(function(rec){
                            if(Ext.util.Format.date(rec.get(fieldToFilter), 'm/d/Y') >= formatter.date(minDate, 'm/d/Y')){
                                return true;
                            }
                        });
                    }
                    if (maxDate){
                        myStore.filterBy(function(rec){
                            if(Ext.util.Format.date(rec.get(fieldToFilter), 'm/d/Y') <= formatter.date(maxDate, 'm/d/Y')){
                                return true;
                            }
                        });
                    }
                    if (exactDateToFilter){
                        myStore.filterBy(function(rec){
                            if(Ext.util.Format.date(rec.get(fieldToFilter), 'm/d/Y') === formatter.date(exactDateToFilter, 'm/d/Y')){
                                return true;
                            }
                        });
                    }
                    if (exactDateToFilterOut){
                        myStore.filterBy(function(rec){
                            if(Ext.util.Format.date(rec.get(fieldToFilter), 'm/d/Y') !== formatter.date(exactDateToFilterOut, 'm/d/Y')){
                                return true;
                            }
                        });
                    }
                    break;
                case 'number':
                    var minVal = currentFilter.minVal,
                        maxVal = currentFilter.maxVal,
                        valueToFilter = currentFilter.valueToFilter,
                        valueToFilterOut = currentFilter.valueToFilterOut;
                    if (isNaN(minVal) === false){
                        myStore.filterBy(function(rec){
                            if(rec.get(fieldToFilter) >= minVal){
                                return true;
                            }
                        });
                    }
                    if (isNaN(maxVal) === false){
                        myStore.filterBy(function(rec){
                            if(rec.get(fieldToFilter) <= maxVal){
                                return true;
                            }
                        });
                    }
                    if (isNaN(valueToFilter) === false){
                        myStore.filter(fieldToFilter, valueToFilter);
                    }
                    if (isNaN(valueToFilterOut) === false){
                        myStore.filterBy(function(rec){
                            if(rec.get(fieldToFilter) !== valueToFilterOut){
                                return true;
                            }
                        });
                    }
                    break;
            }
        }

        newStore.getProxy().setData(myStore.getData().items);
        newStore.reload();
        myStore.clearFilter();
        myStore.addFilter(myFilters);
    }
});