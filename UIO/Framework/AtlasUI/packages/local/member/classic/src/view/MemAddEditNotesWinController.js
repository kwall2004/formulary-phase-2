/**
 * Created by agupta on 12/12/2016.
 */

Ext.define('Atlas.member.view.MemAddEditNotesWinController', {
        //extend: 'Atlas.common.view.AppBaseController',
        extend: 'Ext.app.ViewController',
        alias: 'controller.memaddeditnoteswincontroller',

        winNotesBtnSaveNotes_Click: function () {
            this.fireEvent('parentSaveEnrollNotes', this.getView().down('#winTxtNotes').rawValue);
        }//,

        /*init: function () {
         var view = this.getView();
         var txtNotes = view.extraParams["pTxtNotes"];
         view.down('#hdnLetterNameWinNotes').setValue(view.extraParams["pLetterName"]);
         view.down('#winTxtNotes').setValue(txtNotes);
         }*/


    }
);