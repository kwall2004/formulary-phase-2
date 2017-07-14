using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Benefit Workflow History View Model
    /// </summary>
    public class PopulationGroupBenefitWorkflowHistoryVM : BaseViewModel
    {
        public long PopGrpPBPStatSK { get; set; }

        public long PopGrpPBPSK { get; set; }

        public long StatTypeSK { get; set; }

        public string Action { get; set; }

        public string ActionDate { get; set; }

        public string ActionTime { get; set; }

        public string SubmittingUser { get; set; }

        public string AdministrativeUser { get; set; }

        public List<StatusNoteVM> StatusNotes { get; set; }
    }
}