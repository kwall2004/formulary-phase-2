Ext.define('Atlas.common.overrides.form.field.Text', {
    override: 'Ext.form.field.Text',
    compatibility: '6.2.0',
    selectOnFocus: true,
    /*custom function used in conjuction with the responsive plugin to allow correct responsive display of
    form field labels*/
    setLabelAlign: function(align) {
        var el = this.el;
        Ext.apply(this, {labelAlign: align});
        if(align.toLowerCase() === 'top') {
            if (el) {
                el.child('.x-form-item-label').addCls('x-form-item-label-top');
                el.child('.x-form-item-label').child('.x-form-item-label-inner').setStyle(
                    {
                        'padding-bottom': this.labelPad + 'px'
                    }
                );
            }
        } else {
            if(el) {
                el.child('.x-form-item-label').removeCls('x-form-item-label-top');
                el.child('.x-form-item-label').setStyle(
                    {
                        'padding-right': this.labelPad + 'px',
                        'width': (this.labelWidth + (this.labelPad ? this.labelPad : 0)) + 'px'
                    }
                );
                el.child('.x-form-item-label').child('.x-form-item-label-inner').setStyle(
                    {
                        'padding-bottom': '0px'
                    }
                );
            }
        }
    },
    setLabelWidth: function(newWidth) {
        var el = this.el;
        Ext.apply(this, {labelWidth: newWidth});
        if (this.labelAlign != 'top') {
            if (this.labelPad) {
                this.labelStyle += this.getHorizontalPaddingStyle() + this.labelPad + 'px;';
            }
            this.labelStyle += 'width:' + (newWidth + (this.labelPad ? this.labelPad : 0)) + 'px;';
            this.labelInnerStyle = 'width:' + newWidth + 'px';
        }
        if(el) {
            if (this.labelAlign != 'top') {
                el.child('.x-form-item-label').removeCls('x-form-item-label-top');
                el.child('.x-form-item-label').setStyle(
                    {
                        'padding-right': this.labelPad + 'px',
                        'width': (newWidth + (this.labelPad ? this.labelPad : 0)) + 'px'
                    }
                );
                el.child('.x-form-item-label').child('.x-form-item-label-inner').setStyle(
                    {
                        'padding-bottom': '0px'
                    }
                );
            } else {
                el.child('.x-form-item-label').addCls('x-form-item-label-top');
                el.child('.x-form-item-label').child('.x-form-item-label-inner').setStyle(
                    {
                        'padding-bottom': this.labelPad + 'px'
                    }
                );
            }
        }
    }
});
