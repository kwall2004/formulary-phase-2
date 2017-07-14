Ext.define('Atlas.benefitplan.view.benefitplandetailprogress.Main', {
    extend: 'Ext.container.Container',
    controller: 'benefitplan-mainbenefitplanprogresscontroller',
    alias: 'widget.benefitplan-progress',
    viewModel: {
    },
    items: [
        {
            xtype: 'panel',
            itemId: 'progressbar',
            listeners: {
                'render': {
                    fn: function() {
                        this.body.on('click', this.handleClick, this);
                    }
                    //,
                    //scope: content,
                    //single: true
                }
            },
            handleClick: function(e, t){
                this.up().getController(e, t).onProgressClick(e, t);
            }
        }
    ]
});
