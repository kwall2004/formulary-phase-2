namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Benefit Workflow Update View Model
    /// </summary>
    public class PopulationGroupBenefitWorkflowUpdateVM : BaseViewModel
    {
        public long PopGrpPBPStatSK { get; set; }

        public long PopGrpPBPSK { get; set; }

        public long StatTypeSK { get; set; }
    }
}