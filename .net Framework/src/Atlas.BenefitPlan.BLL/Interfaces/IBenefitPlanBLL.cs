using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Benefit Plan BLL for Benefit Plan
    /// </summary>
    public interface IBenefitPlanBLL
    {

        /// <summary>
        /// Get all benefit plans
        /// </summary>
        /// <returns>List of Benefit Plans</returns>
        IEnumerable<BnftPlan> GetAllBenefitPlans();

        /// <summary>
        /// Copy a benefit Plan by bnftPlanSK
        /// </summary>
        /// <param name="bnftPlanSKToCopy">the Benefit Plan ID to copy</param>
        /// <param name="currentUser">the current user to save</param>
        /// <returns>bnftPlanSK for new benefit plan</returns>
        long CopyBenefitPlan(long bnftPlanSKToCopy, string currentUser);

        /// <summary>
        /// Get a benefit Plan by ID
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>Benefit Plan View Model</returns>
        BenefitPlanVM GetBenefitPlanVM(long bnftPlanSK);

        /// <summary>
        /// Set the Benefit Plan and Benefit Plan Details
        /// </summary>
        /// <param name="benefitPlanVM">the Benefit plan View Model to Update</param>
        /// <returns>BenefitPlanVM.</returns>
        BenefitPlanVM SetBenefitPlanAndDetail(BenefitPlanVM benefitPlanVM);

        /// <summary>
        /// Benefits the plan search.
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List&lt;spBenefitPlanSearch_Result&gt;.</returns>
        List<spBenefitPlanSearch_Result> BenefitPlanSearch(long? bnftPlanSK, long? LOBSK, long? pBPSK, long? bnftPlanTypeSK, Boolean? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// Benefits the plan search by Text.
        /// </summary>
        /// <param name="bnftPlanName">The BNFT plan Name.</param>
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List&lt;spBenefitPlanSearch_Result&gt;.</returns>
        List<spBenefitPlanSearchByText_Result> BenefitPlanSearchByText(string bnftPlanName, long? LOBSK, long? pBPSK, long? bnftPlanTypeSK, bool? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// Gets the list of Copay Distribution
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionVM&gt;.</returns>
        List<CopayDistributionVM> GetAllCopayDistribution(long bnftPlanSK);

        /// <summary>
        /// Set All Copay Distribution
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        bool AddOrUpdateCostShareMaximum(BenefitPlanCostShareMaximumsVM itemToAddOrUpdate);

        /// <summary>
        /// Add/Update Copay Distribution
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>CopayDistributionVM.</returns>
        CopayDistributionVM AddOrUpdateCopayDistribution(CopayDistributionVM item);

        /// <summary>
        /// Get all DAW copays for a given bnftplanSK
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;DispenseAsWrittenCopayVM&gt;.</returns>
        List<DispenseAsWrittenCopayVM> GetAllDAWCopay(long bnftPlanSK);

        /// <summary>
        /// Add or update a DAW copay
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>DispenseAsWrittenCopayVM.</returns>
        DispenseAsWrittenCopayVM AddorUpdateDAWCopay(DispenseAsWrittenCopayVM itemToAddOrUpdate);

        /// <summary>
        /// Get All Deductible Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;DeductibleExceptionVM&gt;.</returns>
        List<DeductibleExceptionVM> GetAllDeductibleExceptions(long bnftPlanSK);

        /// <summary>
        /// Add Or Update Deductible Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>DeductibleExceptionVM.</returns>
        DeductibleExceptionVM AddOrUpdateDeductibleException(DeductibleExceptionVM itemToAddOrUpdate);

        /// <summary>
        /// Get All Fill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;FillExceptionVM&gt;.</returns>
        List<FillExceptionVM> GetAllFillExceptions(long bnftPlanSK);

        /// <summary>
        /// Add Or Update Fill Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>FillExceptionVM.</returns>
        FillExceptionVM AddOrUpdateFillException(FillExceptionVM itemToAddOrUpdate);

        /// <summary>
        /// Get All Copay Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayExclusionVM&gt;.</returns>
        List<CopayExclusionVM> GetAllCopayExclusions(long bnftPlanSK);

        /// <summary>
        /// Add Or Update Copay Exclusion
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>CopayExclusionVM.</returns>
        CopayExclusionVM AddOrUpdateCopayExclusion(CopayExclusionVM itemToAddOrUpdate);

        /// <summary>
        /// Get All Early Refill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;EarlyRefillExceptionsVM&gt;.</returns>
        List<EarlyRefillExceptionsVM> GetAllEarlyRefillExceptions(long bnftPlanSK);

        /// <summary>
        /// Add Or Update Early Refill Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EarlyRefillExceptionsVM.</returns>
        EarlyRefillExceptionsVM AddOrUpdateEarlyRefillException(EarlyRefillExceptionsVM itemToAddOrUpdate);

        /// <summary>
        /// Get All Plan Cap Limits
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;PlanCapLimitsVM&gt;.</returns>
        List<PlanCapLimitsVM> GetAllPlanCapLimits(long bnftPlanSK);

        /// <summary>
        /// Add Or Update Plan Cap Limits
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>PlanCapLimitsVM.</returns>
        PlanCapLimitsVM AddOrUpdatePlanCapLimits(PlanCapLimitsVM itemToAddOrUpdate);

        /// <summary>
        /// Get Copay Distribution LICSVM
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionLICSVM&gt;.</returns>
        CopayDistributionLICSVM GetCopayDistributionLICSVM(long bnftPlanSK);

        /// <summary>
        /// Save LICS4DeducblAmt
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionLICSVM&gt;.</returns>
        CopayDistributionLICSVM SetCopayDistributionLICSVM(CopayDistributionLICSVM itemToAddOrUpdate);

        #region " Public - Coverage Phase "
        /// <summary>
        /// Get all coverage phase for a given The Benefit plan Key
        /// </summary>
        /// <param name="bnftPlanSK">The Benefit plan Key</param>
        /// <returns>List of Coverage Phase VM</returns>
        List<CoveragePhaseVM> GetAllCoveragePhase(long benefitPlanSK);

        /// <summary>
        /// add or update coverage phase
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>CoveragePhaseVM.</returns>
        CoveragePhaseVM AddOrUpdateCoveragePhase(CoveragePhaseVM itemToAddOrUpdate);
        #endregion " Public - Coverage Phase "
    }
}