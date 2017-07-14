namespace Atlas.BenefitPlan.DAL.Models.Enums
{
    /// <summary>
    /// Enum DeductibleType
    /// </summary>
    public enum DeductibleType
    {
        /// <summary>
        /// The network tier
        /// </summary>
        NetworkTier = 1,
        /// <summary>
        /// The maximum out of pocket
        /// </summary>
        MaxOutOfPocket = 2,
        /// <summary>
        /// The plan year maximum benefit
        /// </summary>
        PlanYearMaxBenefit = 3,
        /// <summary>
        /// The maximum lifetime benefit
        /// </summary>
        MaxLifetimeBenefit = 4,
        /// <summary>
        /// The out of network
        /// </summary>
        PlanLevelDeductible = 5,
        /// <summary>
        /// The Payment Profile Deductible
        /// </summary>
        PaymentProfileDeductible = 6,
        /// <summary>
        /// The RX Deductible
        /// </summary>
        RXDeductible = 7
    }
}