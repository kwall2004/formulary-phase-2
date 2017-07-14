Ext.define('Atlas.atlasformulary.model.FdbDrug', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'NDC' },
    { name: 'ETC_ID' },
    { name: 'ETC_NAME' },
    { name: 'HICL_SEQNO' },
    { name: 'GCN_SEQNO' },
    { name: 'LabelName' },
    { name: 'MedId' },
    { name: 'DrugType' },
    {
      name: 'OTC',
      type: 'bool'
    },
    { name: 'DrugStrength' },
    { name: 'DosageForm' },
    { name: 'RouteAdministration' },
    { name: 'PackageSize' },
    {
      name: 'IsObsolete',
      type: 'bool'
    },
    {
      name: 'ObsoleteDate',
      type: 'date'
    },
    { name: 'GenericName' },
    { name: 'GTC' },
    { name: 'GTC_DESC' },
    {
      name: 'IsCovered',
      type: 'bool'
    },
    {
      name: 'IsMaintDrug',
      type: 'bool'
    },
    {
      name: 'IsSpecialtyDrug',
      type: 'bool'
    },
    { name: 'RowCount' },
    { name: 'RelatedDrugLists' },
    { name: 'FrmlryChanges' },
    { name: 'MSGenericIndicator' },
    { name: 'GPI' },
    { name: 'DateToMarket' },
    { name: 'DateAdded' },
    { name: 'TierCode' },
    { name: 'DrugCatgName' },
    {
      name: 'PriceAWPPkg',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceAWPUnit',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceWACPkg',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceWACUnit',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceFedUprLimit',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceSugWhlPkg',
      type: 'float',
      allowNull: true
    },
    {
      name: 'PriceSugWhlUnit',
      type: 'float',
      allowNull: true
    },
    {
      name: 'EffectiveDate',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],
  /* eslint-enable object-curly-newline */
  hasMany: {
    model: 'Atlas.atlasformulary.model.FormularyRelatedDrugList',
    name: 'RelatedDrugLists',
    associationKey: 'RelatedDrugLists'
  },

  onLoad: function () {
    var drugLists = this.get('DrugLists'),
      lists = '',
      toAdd = {},
      toAdds = [],
      i = 0;

    if (drugLists) {
      lists = drugLists.split(',');

      for (i = 0; i < lists.length; i++) {
        toAdd = Ext.create('Atlas.atlasformulary.model.FormularyRelatedDrugList', { name: lists[i] }); // eslint-disable-line object-curly-newline

        toAdds.push(toAdd);
      }

      this.RelatedDrugLists().add(toAdds); // eslint-disable-line new-cap
    }
  }
});
