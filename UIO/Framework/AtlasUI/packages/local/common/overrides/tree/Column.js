Ext.define('Atlas.common.overrides.tree.Column', {
    override: 'Ext.tree.Column',
    compatibility: '6.2.0',

    useColorIcons: false,

    cellTpl: [
        '<tpl for="lines">',
            '<div class="{parent.childCls} {parent.elbowCls}-img ',
            '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
        '</tpl>',
            '<div class="{childCls} {elbowCls}-img {elbowCls}',
        '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
        '<tpl if="checked !== null">',
            '<div role="button" {ariaCellCheckboxAttr}',
        ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
        '</tpl>',
        '<tpl if="glyph">',
            '<span class="{baseIconCls}" ',
            '<tpl if="glyphFontFamily">',
                'style="font-family:{glyphFontFamily}"',
            '</tpl>',
            '>{glyph}</span>',
        '<tpl else>',
            '<tpl if="icon">',
                '<img src="{blankUrl}"',
            '<tpl else>',
            '<div',
        '</tpl>',
            ' role="presentation" class="{childCls} {baseIconCls} {customIconCls} ',
            '{baseIconCls}-<tpl if="leaf">leaf<tpl else><tpl if="expanded">parent-expanded<tpl else>parent</tpl></tpl> {[this.addIconCls(values)]}" ',
        '<tpl if="icon">style="background-image:url({icon})"/><tpl else>>{[this.getColorIcon(values)]}</div></tpl>',
        '</tpl>',
        '<tpl if="href">',
            '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
        '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>',
            {
                addIconCls: function (values) {
                    var name = values.iconCls,
                        parts = name.split(',');

                    if (!values.metaData.column || !values.metaData.column.useColorIcons) {
                        return values.iconCls;
                    }

                    if (values.metaData.column.useColorIcons) {
                        //Fallback to plain icons
                        if(!parts[1]) {
                            return values.iconCls;
                        }
                    }
                },
                getColorIcon: function (values) {
                    if (!values.metaData.column || !values.metaData.column.useColorIcons) {
                        return '';
                    }

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