Ext.define('Atlas.atlasformulary.service.RuleUtils', {
  singleton: true,

  translateToPlainEnglish: function (criteria) {
    var property = criteria.data ? criteria.data.property : criteria.property,
      operator = criteria.data ? criteria.data.operator : criteria.operator,
      value = criteria.data ? criteria.data.value : criteria.value,
      displayProperty = criteria.data ? criteria.data.displayProperty : criteria.displayProperty,
      displayValue = criteria.data ? criteria.data.displayValue : criteria.displayValue,
      criteriaId = criteria.data ? criteria.data.id : criteria.id,
      description = null;

    if (!displayProperty) {
      displayProperty = property;
    }

    if (!displayValue) {
      displayValue = value.toString().split('***').join('nothing');
      displayValue = displayValue.split(/,(?!\d)/g).join(' or ');
    } else {
      displayValue = displayValue.toString().split('***').join('nothing');
      displayValue = displayValue.split(/,(?!\d)/g).join(' or ');
    }

    if (operator !== 'include') {
      switch (operator) {
        case 'LIKE':
          description = displayProperty + ' is equal to ' + displayValue;
          break;
        case '=':
          description = displayProperty + ' is equal to ' + displayValue;
          break;
        case 'NOT LIKE':
          description = displayProperty + ' is not equal to ' + displayValue;
          break;
        case '!=':
          description = displayProperty + ' is not equal to ' + displayValue;
          break;
        case 'include':
          //property += " is not included in the results";
          break;
        default:
          Ext.raise({
            msg: 'Invalid operator.',
            operator: operator
          });
      }

      description += '.';

      return Atlas.atlasformulary.model.TranslatedRule.create({
        property: property,
        description: description,
        criteriaId: criteriaId
      });
    }

    return null;
  }
});
