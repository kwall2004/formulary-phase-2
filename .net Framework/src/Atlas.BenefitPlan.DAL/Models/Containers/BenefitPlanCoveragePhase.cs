namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Benefit Plan Coverage Phase
    /// </summary>
    public class BenefitPlanCoveragePhase
    {
        /// <summary>
        /// Benefit Plan SK
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Coverage Phase SK
        /// </summary>
        /// <value>The CVRG phase sk.</value>
        public long CvrgPhaseSK { get; set; }

        /// <summary>
        /// Coverage Phase Type SK
        /// </summary>
        /// <value>The CVRG phase type sk.</value>
        public long CvrgPhaseTypeSK { get; set; }

        /// <summary>
        /// Coverage Phase Type Code
        /// </summary>
        /// <value>The CVRG phase code.</value>
        public string CvrgPhaseCode { get; set; }
    }
}