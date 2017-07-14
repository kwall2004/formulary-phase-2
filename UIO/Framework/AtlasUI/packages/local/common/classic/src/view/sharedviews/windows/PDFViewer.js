/**
 * Created by c4539 on 1/12/2017.
 */
Ext.define('Atlas.common.view.sharedviews.windows.PDFViewer', {
    extend: 'Ext.window.Window',
    title: 'Document Viewer',
    height: 800,
    width: 1000,
    viewModel: {
        data: {
            base64PDF: ''
        }
    },
    xtype: 'sharedviewspdfviewer',
    items: [
        {
            bind: {
                html: '<object width="100%" height="750" data="data:application/pdf;base64,{base64PDF}" type="application/pdf" class="internal"><embed src="data:application/pdf;base64,{base64PDF}" type="application/pdf" /></object>'
            }
        }
    ]
});