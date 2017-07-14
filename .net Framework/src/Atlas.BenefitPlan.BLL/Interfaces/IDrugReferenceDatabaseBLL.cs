using Atlas.BenefitPlan.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Drug Reference Database BLL for Benefit Plan
    /// </summary>
    public interface IDrugReferenceDatabaseBLL
    {
        /// <summary>
        /// Get the List of Copay Override Qualifier Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Copay Override Qualifier Type</returns>
        List<CopayOvrrdQulfrType> GetCopayOverrideQualifierType(long bnftPlanSK);

        /// <summary>
        /// Get the List of Deductible Exclusion Qualifier Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Deductible Exclusion Qualifier Type</returns>
        List<DeducblExclQulfrType> GetDeductibleExclusionQualifierType(long bnftPlanSK);

        /// <summary>
        /// Get the List of Drug Class Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Drug Class Type</returns>
        List<DrugClsType> GetDrugClassType(long bnftPlanSK);

        /// <summary>
        /// Get the List of Early Refill Exception Qualifier Types for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Early Refill Exception Qualifier Type</returns>
        List<EarlyRefillExcpQulfrType> GetEarlyRefillExceptionQualifierType(long bnftPlanSK);

        /// <summary>
        /// Get the List of Plan Cap Limits Qualifier Types for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Plan Cap Limits Qualifier Type</returns>
        List<PlanCapLimQulfrType> GetPlanCapLimitsQualifierType(long bnftPlanSK);
    }
}
