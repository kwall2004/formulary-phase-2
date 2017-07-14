Ext.define('Atlas.common.overrides.panel.Title', {
    override: 'Ext.panel.Title',
    compatibility: '6.2.0',

    iconTpl: [
        '<div id="{id}-iconWrapEl" data-ref="iconWrapEl" role="presentation" ' ,
        'class="{iconWrapCls} {iconWrapCls}-{ui} {iconAlignCls} {itemCls}{childElCls}"' ,
        '<tpl if="iconWrapStyle"> style="{iconWrapStyle}"</tpl>>' ,
        '<div id="{id}-iconEl" data-ref="iconEl" role="presentation" unselectable="on" ' ,
        'class="{baseIconCls} {baseIconCls}-{ui} {[this.addIconCls(values)]} {glyphCls}" style="' ,
        '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>' ,
        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' ,
        '<tpl if="glyph">{glyph}</tpl>{[this.getColorIcon(values)]}' ,
        '</div>' ,
        '</div>',
        {
            addIconCls: function (values) {
                var name = values.iconCls,
                    parts = name.split(',');

                if(!parts[1]) {
                    return values.iconCls;
                }
            },
            getColorIcon: function (values) {
                var name = values.iconCls,
                    parts = name.split(','),
                    str = [],
                    i = 1;

                if (parts[1]) {
                    str.push('<span class="' + parts[0] + '">');
                    for (; i <= parts[1]; i++) {
                        str.push('<span class="path' + i + '"></span>');
                    }
                    str.push('</span>');
                } else {
                    return;
                }

                return str.join('');
            }
        }
    ]
});