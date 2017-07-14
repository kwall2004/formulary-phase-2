namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class BenefitNetworkCoverageSetDetail.
    /// </summary>
    public class BenefitNetworkCoverageSetDetail
    {
        /// <summary>
        /// Gets or sets the BNFT plan BNFT CVRG set NTWRK tier sk.
        /// </summary>
        /// <value>The BNFT plan BNFT CVRG set NTWRK tier sk.</value>
        public long BnftPlanBnftCvrgSetNtwrkTierSK { get; set; }
        /// <summary>
        /// Gets or sets the name of the CVRG set.
        /// </summary>
        /// <value>The name of the CVRG set.</value>
        public string CvrgSetName { get; set; }
        /// <summary>
        /// Gets or sets the CVRG set sk.
        /// </summary>
        /// <value>The CVRG set sk.</value>
        public long CvrgSetSK { get; set; }
        /// <summary>
        /// Gets or sets the CVRG set prity.
        /// </summary>
        /// <value>The CVRG set prity.</value>
        public int CvrgSetPrity { get; set; }
        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="BenefitNetworkCoverageSetDetail"/> is deleted.
        /// </summary>
        /// <value><c>true</c> if deleted; otherwise, <c>false</c>.</value>
        public bool Deleted { get; set; }
    }
}