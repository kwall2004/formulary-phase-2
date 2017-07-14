Ext.define('Atlas.atlasformulary.model.FDBClinicalData', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'MonographTitle',
    'PhoeneticTitle',
    'BrandNames',
    'Section1Content',
    'Section2Content',
    'Section3Content',
    'Section4Content',
    'Section5Content',
    'Section6Content',
    {
      name: 'Footer',
      convert: function (value) {
        return value.replace('\r\n', '<br>');
      }
    }
  ],

  proxy: {
    url: '/fdbclinicaldata',
    idParam: 'ndc'
  }
});
