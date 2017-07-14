Ext.define('Atlas.claims.model.detail.searchResultsModel', {
        extend: 'Ext.app.ViewModel',

        //requires: [
        //    'Ext.data.field.Field'
        //],

        alias: 'viewmodel.claimDetailSearchResultsModel',

        //fields: ['claimID', 'memberName', 'status', 'claimType', 'lob'],
        stores:{
            claimsDetailResult:{
                model: 'Ext.data.Model',
                data: [
                    {'claimID': '165447', 'memberName': 'Tyrion Lannister', 'status': 'Paid', 'claimType': 'Medical', 'lob': 'Medicaid'},
                    {'claimID': '254325', 'memberName': 'Denarys Targaryan', 'status': 'Pending', 'claimType': 'PBM', 'lob': 'Medicare'},
                    {'claimID': '386642', 'memberName': 'Ned Stark', 'status': 'Denied', 'claimType': 'PBM', 'lob': 'Medicare'},
                    {'claimID': '487687', 'memberName': 'Varys', 'status': 'Void', 'claimType': 'Medical', 'lob': 'Medicare'},
                    {'claimID': '559721', 'memberName': 'Arya Stark', 'status': 'Paid', 'claimType': 'Medical', 'lob': 'Medicaid'}
                ]  
            }
        }
    });