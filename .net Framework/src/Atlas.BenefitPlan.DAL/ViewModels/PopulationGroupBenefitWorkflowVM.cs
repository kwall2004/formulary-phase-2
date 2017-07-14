using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Benefit Workflow View Model
    /// </summary>
    public class PopulationGroupBenefitWorkflowVM : BaseViewModel
    {
        public long PopGrpPBPSK { get; set; }

        public string PBPName { get; set; }

        public string PBPID { get; set; }

        public string EffectiveStartDate { get; set; }

        public string EffectiveEndDate { get; set; }

        public string Tenant { get; set; }

        public string Account { get; set; }

        public string Group { get; set; }

        public string PopGrp { get; set; }

        public string LastUser { get; set; }

        public string LastDate { get; set; }

        public string LastTime { get; set; }

        public long PopGrpPBPStatSK { get; set; }

        public List<StatusNoteVM> StatusNotes { get; set; }
    }
}