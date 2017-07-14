using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Status Note Model
    /// </summary>
    public class StatusNoteVM : BaseViewModel
    {
        public long StatNoteSK { get; set; }

        public long PopGrpPBPStatSK { get; set; }

        [MaxLength(240)]
        [Required(AllowEmptyStrings = false)]
        public string NoteSubject { get; set; }

        [MaxLength(2000)]
        [Required(AllowEmptyStrings = false)]
        public string NoteDtl { get; set; }

        public string User { get; set; }

        public string DateCreated { get; set; }

    }
}