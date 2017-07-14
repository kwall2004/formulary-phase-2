using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Coverage Set BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.ICoverageSetBLL" />
    public class CoverageSetBLL : ICoverageSetBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// Criteria Group BLL
        /// </summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>
        /// The Constructor for the Coverage Set BLL for Benefit Plan
        /// </summary>
        /// <param name="criteriaGroupBLL">The criteria group BLL.</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public CoverageSetBLL(ICriteriaGroupBLL criteriaGroupBLL, IBenefitPlanRepositoryFactory repoFactory)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _repoFactory = repoFactory;
        }

        #region "Coverage Set Configuration"

        #region "Public Methods"

        /// <summary>
        /// Get Coverage Set Configuration by CvrgSetSK
        /// </summary>
        /// <param name="cvrgSetSK">cvrgSetSK</param>
        /// <returns>Benefit Coverage Set Configuration</returns>
        public CoverageSetConfigurationVM GetCoverageSetConfiguration(long cvrgSetSK)
        {
            return GetACoverageSetConfiguration(cvrgSetSK);
        }

        /// <summary>
        /// Set the Coverage Set Configuration
        /// </summary>
        /// <param name="itemToAddOrUpdate">Coverage Set Configuration View Model to Update</param>
        /// <returns>CoverageSetConfigurationVM</returns>
        public CoverageSetConfigurationVM SetCoverageSetConfiguration(CoverageSetConfigurationVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.CoverageSet())
            using (var repoCvrgSetThreshold = _repoFactory.CvrgSetThreshold())
            using (var repoThreshold = _repoFactory.Threshold())
            using (var repoPymtPrfl = _repoFactory.PymtPrfl())
            using (var repoPymtPrflDtl = _repoFactory.PymtPrflDtl())
            using (var repoCvrgSetCrtriaSet = _repoFactory.CoverageSetCriteriaSet())
            using (var repoCrtriaSet = _repoFactory.CriteriaSet())
            using (var repoCrtriaDtl = _repoFactory.CriteriaDetail())
            using (var repoDeducblEpsd = _repoFactory.DeductibleEpisode())
            {
                CvrgSet cvrgSet = itemToAddOrUpdate.coverageSet.CvrgSetSK != 0
                ? repository.FindOne(c => c.CvrgSetSK == itemToAddOrUpdate.coverageSet.CvrgSetSK)
                : new CvrgSet() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                cvrgSet.BnftPlanSK = itemToAddOrUpdate.coverageSet.BnftPlanSK;

                cvrgSet.CvrgSetName = itemToAddOrUpdate.coverageSet.CvrgSetName;
                cvrgSet.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                cvrgSet.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                cvrgSet.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                cvrgSet.LastModfdTs = timeStamp;

                repository.AddOrUpdate(cvrgSet);

                if (itemToAddOrUpdate.Thresholds.Count() > 0)
                {
                    SetCoverageSetThresholds(itemToAddOrUpdate, cvrgSet, repoCvrgSetThreshold, repoThreshold);
                }

                SetCoverageSetPaymentProfile(itemToAddOrUpdate, cvrgSet, repoPymtPrfl, repoPymtPrflDtl, repoDeducblEpsd);

                if (itemToAddOrUpdate.RuleSets.Count() > 0)
                {
                    itemToAddOrUpdate.RuleSets = SetCoverageSetCriteriaSets(itemToAddOrUpdate.RuleSets, cvrgSet, repoCvrgSetCrtriaSet, repoCrtriaSet, repoCrtriaDtl);
                }

                repository.SaveChanges();

                itemToAddOrUpdate.coverageSet.CvrgSetSK = cvrgSet.CvrgSetSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate Coverage Set Configuration
        /// </summary>
        /// <param name="itemToValidate">CoverageSetConfigurationVM</param>
        /// <returns>List of Message</returns>
        public List<Message> ValidateCoverageSetConfiguration(CoverageSetConfigurationVM itemToValidate)
        {
            long bnftPlanSK = itemToValidate.coverageSet.BnftPlanSK;

            List<Message> result = new List<Message>();

            CvrgSet cvrgSet = _repoFactory.CoverageSet().FindOne(c => c.CvrgSetName == itemToValidate.coverageSet.CvrgSetName && c.BnftPlanSK == bnftPlanSK && c.CvrgSetSK != itemToValidate.coverageSet.CvrgSetSK);

            if (cvrgSet != null)
            {
                result.Add(new Message() { MessageText = string.Format("Coverage Set Name: ({0}) is a duplicate of another coverage set name.", itemToValidate.coverageSet.CvrgSetName), Fieldname = "coverageSet.CvrgSetName" });
            }

            if (itemToValidate.Thresholds.IsAny())
            {
                foreach (ThresholdVM thresholdVM in itemToValidate.Thresholds)
                {
                    Threshold threshold = _repoFactory.Threshold().FindOne(c => c.ThresholdSK != thresholdVM.ThresholdSK && c.BnftPlanSK == bnftPlanSK && c.ThresholdName == thresholdVM.BenefitThresholdName && c.ThresholdLimAmt == thresholdVM.ThresholdLimit && c.ThresholdQulfrTypeSK == thresholdVM.ThresholdQulfrTypeSK);

                    if (thresholdVM.RestartThresholdCalendarYear != "" && thresholdVM.RestartThresholdCalendarYear.Length < 4)
                    {
                        result.Add(new Message() { MessageText = string.Format("Restart Threshold Calendar Year: ({0}) if entered needs to be 4 characters.", thresholdVM.RestartThresholdCalendarYear), Fieldname = "thresholdVM.RestartThresholdCalendarYear" });
                    }

                    if (thresholdVM.RestartThresholdPlanYear != "" && thresholdVM.RestartThresholdPlanYear.Length < 4)
                    {
                        result.Add(new Message() { MessageText = string.Format("Restart Threshold Plan Year: ({0}) if entered needs to be 4 characters.", thresholdVM.RestartThresholdPlanYear), Fieldname = "thresholdVM.RestartThresholdPlanYear" });
                    }

                    if (threshold != null)
                    {
                        result.Add(new Message() { MessageText = string.Format("Threshold: ({0}) with this setup already exists on this coverage set configuration.", thresholdVM.BenefitThresholdName), Fieldname = "thresholdVM.BenefitThresholdName" });
                    }
                }
            }

            if (itemToValidate.RuleSets.IsAny())
            {
                int? priority = itemToValidate.RuleSets.GroupBy(c => new { c.CrtriaSetPrity }).Where(x => x.Count() > 1).Select(g => g.Key.CrtriaSetPrity).FirstOrDefault();

                if (priority != null && priority > 0)
                {
                    result.Add(new Message() { MessageText = string.Format("Priority: ({0}) already exists on a Rule Set.", priority), Fieldname = "priority" });
                }

                foreach (RuleSetVM ruleSetVM in itemToValidate.RuleSets)
                {
                    CvrgSetCrtriaSet cvrgSetCrtriaSet = _repoFactory.CoverageSetCriteriaSet().FindOne(c => c.CvrgSetSK == ruleSetVM.CvrgSetSK && c.CrtriaSetSK != ruleSetVM.CrtriaSetSK && c.CrtriaSetName == ruleSetVM.CriteriaSetName);

                    if (cvrgSetCrtriaSet != null)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Name: ({0}) already exists on this coverage set configuration.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CriteriaSetName" });
                    }

                    CvrgSetCrtriaSet cvrgSetCrtriaSet2 = _repoFactory.CoverageSetCriteriaSet().FindOne(c => c.CvrgSetSK == ruleSetVM.CvrgSetSK && c.CrtriaSetSK != ruleSetVM.CrtriaSetSK && c.CrtriaSetPrity == ruleSetVM.CrtriaSetPrity);

                    if (cvrgSetCrtriaSet2 != null)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Set: ({0}) has the same priority as another rule set.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CrtriaSetPrity" });
                    }

                    if (ruleSetVM.CrtriaSetTypeSK != (long)CriteriaSetType.CoverageSet)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Set: ({0}) must be a Coverage Set criteria set type.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CrtriaSetTypeSK" });
                    }

                    if (ruleSetVM.CriteriaDetails.IsAny())
                    {

                        foreach (CriteriaDetailVM criteriaDetailVM in ruleSetVM.CriteriaDetails)
                        {
                            CrtriaDtl crtriaDtl = _repoFactory.CriteriaDetail().FindOne(c => c.CrtriaSetSK == criteriaDetailVM.CrtriaSetSK && c.CrtriaPrity == criteriaDetailVM.CrtriaPrity && c.CrtriaDtlSK != criteriaDetailVM.CrtriaDtlSK);

                            if (crtriaDtl != null)
                            {
                                result.Add(new Message() { MessageText = string.Format("Rule Detail: ({0}) has the same priority as another rule detail.", criteriaDetailVM.CrtriaPrity), Fieldname = "criteriaDetailVM.CrtriaPrity" });
                            }
                        }
                    }
                }
            }
            return result;
        }

        #endregion "Public Methods"

        #region "Private Methods"

        /// <summary>
        /// Get Benefit Coverage Set Configuration
        /// </summary>
        /// <param name="cvrgSetSK">cvrgSetSK</param>
        /// <returns>Benefit Coverage Set Configuration</returns>
        private CoverageSetConfigurationVM GetACoverageSetConfiguration(long cvrgSetSK)
        {
            using (var repoCoverageSet = _repoFactory.CoverageSet())
            using (var repoCoverageSetCriteriaSet = _repoFactory.CoverageSetCriteriaSet())
            using (var repoCoverageSetThreshold = _repoFactory.CvrgSetThreshold())
            using (var repoPymtPrfl = _repoFactory.PymtPrfl())
            using (var repoPymtPrflDtl = _repoFactory.PymtPrflDtl())
            using (var repoDeducblEpsd = _repoFactory.DeductibleEpisode())
            {
                CvrgSet result = repoCoverageSet.FindOne(s => s.CvrgSetSK == cvrgSetSK);
                CvrgSetCrtriaSet cvrgSetCrtriaSet = repoCoverageSetCriteriaSet.FindOne(s => s.CvrgSetSK == cvrgSetSK);
                CvrgSetThreshold cvrgSetThreshold = repoCoverageSetThreshold.FindOne(s => s.CvrgSetSK == cvrgSetSK);

                PymtPrfl pymtPrfl = repoPymtPrfl.FindOne(p => p.CvrgSetSK == cvrgSetSK);

                PymtPrflDtl pymtPrflDtl = new PymtPrflDtl();
                DeducblEpsd deducblEpsd = new DeducblEpsd();

                // Should not happen.
                if (pymtPrfl != null)
                {
                    pymtPrflDtl = repoPymtPrflDtl.FindOne(p => p.PymtPrflSK == pymtPrfl.PymtPrflSK);
                    if (pymtPrflDtl != null)
                    {
                        deducblEpsd = repoDeducblEpsd.FindOne(p => p.PymtPrflDtlSK == pymtPrflDtl.PymtPrflDtlSK);
                    }
                }

                List<RuleSetVM> ruleSets = new List<RuleSetVM>();
                List<ThresholdVM> thresholds = new List<ThresholdVM>();

                if (cvrgSetCrtriaSet != null)
                {
                    ruleSets = _criteriaGroupBLL.GetAllRuleSets(CriteriaSetType.CoverageSet, cvrgSetSK);
                }

                if (cvrgSetThreshold != null)
                {
                    thresholds = repoCoverageSetThreshold.FindAll(s => s.CvrgSetSK == cvrgSetSK)
                    .Select(s => new ThresholdVM()
                    {
                        ThresholdSK = s.ThresholdSK,
                        CvrgSetThresholdSK = s.CvrgSetThresholdSK,
                        BenefitThresholdName = s.Threshold.ThresholdName,
                        ThresholdQulfrTypeSK = s.Threshold.ThresholdQulfrTypeSK,
                        ThresholdLimit = s.Threshold.ThresholdLimAmt,
                        RestartThresholdCalendarYear = s.Threshold.RestartThresholdAtCalendarYr,
                        RestartThresholdPlanYear = s.Threshold.RestartThresholdAtPlanYr,
                        ThresholdRestartDaysAfterLastService = s.Threshold.RestartThresholdAfterSvcDays,
                        ThresholdRestartMonthsAfterLastService = s.Threshold.RestartThresholdAfterSvcMths,
                        ThresholdRestartDaysAfterMbrEnroll = s.Threshold.RestartThresholdAfterMbrEnrlmtDays,
                        ThresholdRestartMonthsAfterMbrEnroll = s.Threshold.RestartThresholdAfterMbrEnrlmtMths,
                        ThresholdRestartAtBegOfMonthNbr = s.Threshold.RestartThresholdAtBgnofCalendarMthNbr,
                        ApplyToBenefitThreshold = s.ApplyToBnftThresholdInd,
                        LimitByBenefitThreshold = s.LimByBnftThresholdInd
                    }).ToList();
                }

                CoverageSetVM coverageSet = new CoverageSetVM()
                {
                    CvrgSetSK = result.CvrgSetSK,
                    CvrgSetName = result.CvrgSetName,
                    BnftPlanSK = result.BnftPlanSK
                };

                CoverageSetConfigurationVM coverageSetConfigurationVM = new CoverageSetConfigurationVM();

                // Should not happen where it is null.
                if (pymtPrfl != null)
                {
                    coverageSetConfigurationVM = new CoverageSetConfigurationVM()
                    {
                        coverageSet = coverageSet,
                        RuleSets = ruleSets,
                        Thresholds = thresholds,
                        PymtPrflSK = pymtPrfl.PymtPrflSK,
                        PymtPrflDtlSK = pymtPrflDtl.PymtPrflDtlSK,
                        CopayBeforeDeductibleAmtIsMet = pymtPrflDtl.CopayBfrDeducblAmt,
                        CopayAfterDeductibleAmtIsMet = pymtPrflDtl.CopayAfterDeductableIsMetAmt,
                        CopayCountsTowardsDeductable = pymtPrflDtl.CopayCountsTowardsDeductableInd,
                        CoinsuranceCalculatedBeforeCopayIsApplied = pymtPrflDtl.CalcCoinsuranceBfrCopayIsApldInd,
                        CopaymentFreqQulfrTypeSK = pymtPrflDtl.CopaymentFreqQulfrTypeSK,
                        CopayFrequencyValue = pymtPrflDtl.CopayFreqVal,
                        CoinsurancePct = pymtPrflDtl.CoinsurancePct,
                        CoinsuranceEpisodeAmt = pymtPrflDtl.EpisodeCoinsuranceAmt,
                        CopaymentEpisodeAmt = pymtPrflDtl.EpisodeCopayAmt,
                        CountMemberRespTowardsMOOP = pymtPrflDtl.CntMbrRespTowardsMOOPInd,
                        CopayCountsTowardsNetworkLevelDeductible = pymtPrflDtl.CopayCountsTowardsNtwrkLvlDeductableInd,
                        CountMemberRespTowardsPlanLevelDeductible = pymtPrflDtl.CntMbrRespTowardsPlanLvlDeductableInd,
                        Excluded = pymtPrflDtl.ExclInd,
                        DeducblEpsdSK = deducblEpsd != null ? deducblEpsd.DeducblEpsdSK : 0,
                        DeducblAmt = deducblEpsd != null ? deducblEpsd.DeducblAmt : null
                    };
                }
                else
                {
                    coverageSetConfigurationVM = new CoverageSetConfigurationVM()
                    {
                        coverageSet = coverageSet,
                        RuleSets = ruleSets,
                        Thresholds = thresholds,
                        PymtPrflSK = 0,
                        PymtPrflDtlSK = 0,
                        CopayBeforeDeductibleAmtIsMet = 0,
                        CopayAfterDeductibleAmtIsMet = 0,
                        CopayCountsTowardsDeductable = false,
                        CoinsuranceCalculatedBeforeCopayIsApplied = false,
                        CopaymentFreqQulfrTypeSK = null,
                        CopayFrequencyValue = null,
                        CoinsurancePct = null,
                        CoinsuranceEpisodeAmt = null,
                        CopaymentEpisodeAmt = null,
                        CountMemberRespTowardsMOOP = false,
                        CopayCountsTowardsNetworkLevelDeductible = false,
                        CountMemberRespTowardsPlanLevelDeductible = false,
                        Excluded = false,
                        DeducblEpsdSK = 0,
                        DeducblAmt = null
                    };
                }

                return coverageSetConfigurationVM;
            }
        }

        /// <summary>
        /// Add Thresholds to a Coverage Set.
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Coverage Set Configuration</param>
        /// <param name="cvrgSet">cvrgSet</param>
        /// <param name="repoCvrgSetThreshold">the Coverage Set Threshold Repository</param>
        /// <param name="repoThreshold">the Threshold Repository</param>
        private void SetCoverageSetThresholds(CoverageSetConfigurationVM itemToAddOrUpdate, CvrgSet cvrgSet, ICoverageSetThresholdRepository repoCvrgSetThreshold, IThresholdRepository repoThreshold)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            foreach (ThresholdVM thresholdVM in itemToAddOrUpdate.Thresholds)
            {
                Threshold threshold = thresholdVM.ThresholdSK != 0
                ? repoThreshold.FindOne(c => c.ThresholdSK == thresholdVM.ThresholdSK)
                : new Threshold() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                threshold.BnftPlanSK = cvrgSet.BnftPlanSK;
                threshold.ThresholdQulfrTypeSK = thresholdVM.ThresholdQulfrTypeSK;
                threshold.ThresholdName = thresholdVM.BenefitThresholdName;
                threshold.ThresholdLimAmt = (int?)thresholdVM.ThresholdLimit;
                threshold.RestartThresholdAtCalendarYr = thresholdVM.RestartThresholdCalendarYear != string.Empty ? thresholdVM.RestartThresholdCalendarYear : null;
                threshold.RestartThresholdAtPlanYr = thresholdVM.RestartThresholdPlanYear != string.Empty ? thresholdVM.RestartThresholdPlanYear : null;
                threshold.RestartThresholdAfterMbrEnrlmtDays = (int?)thresholdVM.ThresholdRestartDaysAfterMbrEnroll;
                threshold.RestartThresholdAfterMbrEnrlmtMths = (int?)thresholdVM.ThresholdRestartMonthsAfterMbrEnroll;
                threshold.RestartThresholdAfterSvcDays = (int?)thresholdVM.ThresholdRestartDaysAfterLastService;
                threshold.RestartThresholdAfterSvcMths = (int?)thresholdVM.ThresholdRestartMonthsAfterLastService;
                threshold.RestartThresholdAtBgnofCalendarMthNbr = (int?)thresholdVM.ThresholdRestartAtBegOfMonthNbr;
                threshold.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                threshold.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                threshold.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                threshold.LastModfdTs = timeStamp;

                repoThreshold.AddOrUpdate(threshold);

                CvrgSetThreshold cvrgSetThreshold = thresholdVM.CvrgSetThresholdSK != 0
                ? repoCvrgSetThreshold.FindOne(c => c.CvrgSetThresholdSK == thresholdVM.CvrgSetThresholdSK)
                : new CvrgSetThreshold() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                //Navigational Properties
                cvrgSetThreshold.CvrgSet = cvrgSet;
                cvrgSetThreshold.CvrgSetSK = cvrgSet.CvrgSetSK;
                cvrgSetThreshold.Threshold = threshold;
                cvrgSetThreshold.ThresholdSK = threshold.ThresholdSK;

                cvrgSetThreshold.ApplyToBnftThresholdInd = thresholdVM.ApplyToBenefitThreshold;
                cvrgSetThreshold.LimByBnftThresholdInd = thresholdVM.LimitByBenefitThreshold;
                cvrgSetThreshold.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                cvrgSetThreshold.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                cvrgSetThreshold.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                cvrgSetThreshold.LastModfdTs = timeStamp;
                cvrgSetThreshold.DelTs = thresholdVM.Deleted ? (DateTime?)timeStamp : null;

                repoCvrgSetThreshold.AddOrUpdate(cvrgSetThreshold);
            }
        }

        /// <summary>
        /// Add Payment Profile to a Coverage Set.
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Coverage Set Configuration</param>
        /// <param name="cvrgSet">cvrgSet</param>
        /// <param name="repoPymtPrfl">the Payment Profile Repository</param>
        /// <param name="repoPymtPrflDtl">the Payment Profile Detail Repository</param>
        /// <param name="repoDeducblEpsd">the Deductible Episode Repository</param>
        private void SetCoverageSetPaymentProfile(CoverageSetConfigurationVM itemToAddOrUpdate, CvrgSet cvrgSet, IPaymentProfileRepository repoPymtPrfl, IPaymentProfileDetailRepository repoPymtPrflDtl, IDeductibleEpisodeRepository repoDeducblEpsd)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            PymtPrfl pymtPrfl = itemToAddOrUpdate.PymtPrflSK != 0
            ? repoPymtPrfl.FindOne(c => c.PymtPrflSK == itemToAddOrUpdate.PymtPrflSK)
            : new PymtPrfl() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

            //Navigational Properties
            pymtPrfl.CvrgSet = cvrgSet;
            pymtPrfl.CvrgSetSK = cvrgSet.CvrgSetSK;

            pymtPrfl.PymtPrflDesc = null;
            pymtPrfl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            pymtPrfl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            pymtPrfl.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
            pymtPrfl.LastModfdTs = timeStamp;

            repoPymtPrfl.AddOrUpdate(pymtPrfl);

            PymtPrflDtl pymtPrflDtl = itemToAddOrUpdate.PymtPrflDtlSK != 0
            ? repoPymtPrflDtl.FindOne(c => c.PymtPrflDtlSK == itemToAddOrUpdate.PymtPrflDtlSK)
            : new PymtPrflDtl() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

            //Navigational Properties
            pymtPrflDtl.PymtPrfl = pymtPrfl;
            pymtPrflDtl.PymtPrflSK = pymtPrfl.PymtPrflSK;

            switch (itemToAddOrUpdate.CopaymentFreqQulfrTypeSK)
            {
                case (int?)FrequencyQualifierType.CopaymentEpisode:
                    itemToAddOrUpdate.CopayBeforeDeductibleAmtIsMet = null;
                    itemToAddOrUpdate.CopayAfterDeductibleAmtIsMet = null;
                    itemToAddOrUpdate.CoinsuranceEpisodeAmt = null;
                    itemToAddOrUpdate.DeducblAmt = null; //Should trigger a delete of the deductible if it exists.
                    break;
                case (int?)FrequencyQualifierType.CoinsuranceEpisode:
                    itemToAddOrUpdate.CoinsurancePct = null;
                    itemToAddOrUpdate.CopaymentEpisodeAmt = null;
                    itemToAddOrUpdate.DeducblAmt = null;  
                    break;
                case (int?)FrequencyQualifierType.DeductibleEpisode:
                    itemToAddOrUpdate.CoinsuranceEpisodeAmt = null;
                    itemToAddOrUpdate.CopaymentEpisodeAmt = null;
                    break;
                default:
                    itemToAddOrUpdate.DeducblAmt = null;  
                    break;
            }

            pymtPrflDtl.CopayBfrDeducblAmt = itemToAddOrUpdate.CopayBeforeDeductibleAmtIsMet;
            pymtPrflDtl.CopayAfterDeductableIsMetAmt = itemToAddOrUpdate.CopayAfterDeductibleAmtIsMet;
            pymtPrflDtl.CoinsurancePct = itemToAddOrUpdate.CoinsurancePct;
            pymtPrflDtl.EpisodeCoinsuranceAmt = itemToAddOrUpdate.CoinsuranceEpisodeAmt;
            pymtPrflDtl.EpisodeCopayAmt = itemToAddOrUpdate.CopaymentEpisodeAmt;

            pymtPrflDtl.CopaymentFreqQulfrTypeSK = (int?)itemToAddOrUpdate.CopaymentFreqQulfrTypeSK;
            pymtPrflDtl.CopayCountsTowardsDeductableInd = itemToAddOrUpdate.CopayCountsTowardsDeductable;
            pymtPrflDtl.CalcCoinsuranceBfrCopayIsApldInd = itemToAddOrUpdate.CoinsuranceCalculatedBeforeCopayIsApplied;
            pymtPrflDtl.CopayFreqVal = (int?)itemToAddOrUpdate.CopayFrequencyValue;
            pymtPrflDtl.CntMbrRespTowardsMOOPInd = itemToAddOrUpdate.CountMemberRespTowardsMOOP;
            pymtPrflDtl.CopayCountsTowardsNtwrkLvlDeductableInd = itemToAddOrUpdate.CopayCountsTowardsNetworkLevelDeductible;
            pymtPrflDtl.CntMbrRespTowardsPlanLvlDeductableInd = itemToAddOrUpdate.CountMemberRespTowardsPlanLevelDeductible;
            pymtPrflDtl.ExclInd = itemToAddOrUpdate.Excluded;
            pymtPrflDtl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            pymtPrflDtl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            pymtPrflDtl.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
            pymtPrflDtl.LastModfdTs = timeStamp;

            repoPymtPrflDtl.AddOrUpdate(pymtPrflDtl);

            DeducblEpsd deducblEpsd = new DeducblEpsd();

            if (itemToAddOrUpdate.DeducblEpsdSK != null && itemToAddOrUpdate.DeducblEpsdSK != 0)
            {
                deducblEpsd = repoDeducblEpsd.FindOne(c => c.DeducblEpsdSK == itemToAddOrUpdate.DeducblEpsdSK && c.PymtPrflDtlSK == pymtPrflDtl.PymtPrflDtlSK);

                deducblEpsd.DeducblAmt = itemToAddOrUpdate.DeducblAmt;
                deducblEpsd.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                deducblEpsd.LastModfdTs = timeStamp;

                if (itemToAddOrUpdate.DeducblAmt == null)
                {
                    deducblEpsd.DelTs = timeStamp;
                }

                repoDeducblEpsd.AddOrUpdate(deducblEpsd);
            }
            else
            {
                if (itemToAddOrUpdate.DeducblAmt != null)
                {
                    deducblEpsd.PymtPrflDtl = pymtPrflDtl;
                    deducblEpsd.PymtPrflDtlSK = pymtPrflDtl.PymtPrflDtlSK;
                    deducblEpsd.BnftPlanSK = cvrgSet.BnftPlanSK;

                    deducblEpsd.DeducblTypeSK = (long)DeductibleType.PaymentProfileDeductible;
                    deducblEpsd.FreqQulfrTypeSK = (int?)FrequencyQualifierType.DeductibleEpisode;
                    deducblEpsd.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                    deducblEpsd.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                    deducblEpsd.CreatedBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                    deducblEpsd.CreatedTs = timeStamp;

                    deducblEpsd.DeducblAmt = itemToAddOrUpdate.DeducblAmt;
                    deducblEpsd.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                    deducblEpsd.LastModfdTs = timeStamp;

                    repoDeducblEpsd.AddOrUpdate(deducblEpsd);

                }
            }

        }

        /// <summary>
        /// Set Coverage Set Criteria Sets
        /// </summary>
        /// <param name="itemToAddOrUpdate">List of RuleSetVM</param>
        /// <param name="cvrgSet">cvrgSet</param>
        /// <param name="repoCvrgSetCrtriaSet">repoCvrgSetCrtriaSet</param>
        /// <param name="repoCrtriaSet">repoCrtriaSet</param>
        /// <param name="repoCrtriaDtl">repoCrtriaDtl</param>
        /// <returns>Rule Sets</returns>
        private List<RuleSetVM> SetCoverageSetCriteriaSets(List<RuleSetVM> itemToAddOrUpdate, CvrgSet cvrgSet, ICoverageSetCriteriaSetRepository repoCvrgSetCrtriaSet, ICriteriaSetRepository repoCrtriaSet, ICriteriaDetailRepository repoCrtriaDtl)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            foreach (RuleSetVM ruleSet in itemToAddOrUpdate)
            {
                CrtriaSet crtriaSet = ruleSet.CrtriaSetSK != 0
                ? repoCrtriaSet.FindOne(c => c.CrtriaSetSK == ruleSet.CrtriaSetSK)
                : new CrtriaSet() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                crtriaSet.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                crtriaSet.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                crtriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(ruleSet.CurrentUser);
                crtriaSet.LastModfdTs = timeStamp;

                CvrgSetCrtriaSet cvrgSetCriteriaSet = ruleSet.CvrgSetCrtriaSetSK != 0
                ? repoCvrgSetCrtriaSet.FindOne(c => c.CvrgSetCrtriaSetSK == ruleSet.CvrgSetCrtriaSetSK)
                : new CvrgSetCrtriaSet() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                cvrgSetCriteriaSet.CvrgSetSK = cvrgSet.CvrgSetSK;
                cvrgSetCriteriaSet.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                cvrgSetCriteriaSet.CrtriaOperTypeSK = (long?)CriteriaOperatorType.Or;
                cvrgSetCriteriaSet.CrtriaSetName = ruleSet.CriteriaSetName;
                cvrgSetCriteriaSet.CrtriaSetPrity = ruleSet.CrtriaSetPrity;
                cvrgSetCriteriaSet.EfctvStartDt = ruleSet.EfctvStartDt;
                cvrgSetCriteriaSet.EfctvEndDt = ruleSet.EfctvEndDt;
                cvrgSetCriteriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(ruleSet.CurrentUser);
                cvrgSetCriteriaSet.LastModfdTs = timeStamp;

                if (ruleSet.Deleted)
                {
                    cvrgSetCriteriaSet.DelTs = timeStamp;
                }

                //  Adding Navigation Properties
                cvrgSetCriteriaSet.CrtriaSet = crtriaSet;

                repoCvrgSetCrtriaSet.AddOrUpdate(cvrgSetCriteriaSet);

                if (ruleSet.CriteriaDetails.IsAny())
                {
                    foreach (CriteriaDetailVM criteriaDetail in ruleSet.CriteriaDetails)
                    {
                        CrtriaDtl crtriaDtl = criteriaDetail.CrtriaDtlSK != 0
                        ? repoCrtriaDtl.FindOne(c => c.CrtriaDtlSK == criteriaDetail.CrtriaDtlSK)
                        : new CrtriaDtl() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                        crtriaDtl.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                        crtriaDtl.CrtriaOperTypeSK = (int)CriteriaOperatorType.And;
                        crtriaDtl.CrtriaCondTypeSK = criteriaDetail.CrtriaCondTypeSK;
                        crtriaDtl.ValQulfrTypeSK = criteriaDetail.ValQulfrTypeSK;
                        crtriaDtl.CrtriaPrity = criteriaDetail.CrtriaPrity;
                        crtriaDtl.CrtriaVal = criteriaDetail.CrtriaVal;
                        crtriaDtl.CrtriaDtlDesc = string.Empty;
                        crtriaDtl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        crtriaDtl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        crtriaDtl.LastModfdBy = criteriaDetail.CurrentUser;
                        crtriaDtl.LastModfdTs = timeStamp;

                        if (criteriaDetail.Deleted)
                        {
                            crtriaDtl.DelTs = UtilityFunctions.GetTimeStamp();
                        }

                        //  Adding Navigation Properties
                        crtriaDtl.CrtriaSet = crtriaSet;
                        crtriaSet.CrtriaDtl.Add(crtriaDtl);

                        repoCrtriaDtl.AddOrUpdate(crtriaDtl);
                    }
                }
                repoCrtriaSet.AddOrUpdate(crtriaSet);
            }

            return itemToAddOrUpdate;
        }

        #endregion "Private Methods"

        #endregion "Coverage Set Configuration"

        #region "Coverage Set Details"

        #region "Public Methods"

        /// <summary>
        /// Set the Benefit Coverage Set Detail
        /// </summary>
        /// <param name="itemToAddOrUpdate">the list of Benefit Coverage Set Detail View Model to Update</param>
        /// <returns>BenefitCoverageSetDetailsVM</returns>
        public BenefitCoverageSetDetailsVM SetBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.BenefitPlanBenefit())
            using (var repoBnftPlanBnftCvrgSetNtwrkTier = _repoFactory.BenefitPlanBenefitCoverageSetNetworkTier())
            using (var repoDeductible = _repoFactory.Deductible())
            {
                BnftPlanBnft benefitPlanBenefit = repository.FindOne(s => s.BnftSK == itemToAddOrUpdate.BnftSK && s.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);

                if (benefitPlanBenefit == null)
                {
                    benefitPlanBenefit = new BnftPlanBnft()
                    {
                        CreatedBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser),
                        CreatedTs = timeStamp,
                        BnftPlanSK = itemToAddOrUpdate.BnftPlanSK,
                        BnftSK = itemToAddOrUpdate.BnftSK,
                        EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                        EfctvEndDt = UtilityFunctions.GetEffectiveEndDate()
                    };
                }

                benefitPlanBenefit.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                benefitPlanBenefit.LastModfdTs = timeStamp;
                benefitPlanBenefit.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;
              
                repository.AddOrUpdate(benefitPlanBenefit);

                SetBenefitDeductible(itemToAddOrUpdate, benefitPlanBenefit, repoDeductible, repoBnftPlanBnftCvrgSetNtwrkTier);

                repository.SaveChanges();

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate Benefit Coverage Set Detail
        /// </summary>
        /// <param name="itemToValidate">the Benefit CoverageSet Detail to Validate</param>
        /// <returns>List of Messages</returns>
        public List<Message> ValidateBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            // The 2 api validations that existed were removed because the frontend does not allow them to be entered.
            return result;
        }

        #endregion "Public Methods"

        #region "Private Methods"

        /// <summary>
        /// Add a Deductible to a Benefit for a Network Tier on a Plan
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Benefit CoverageSet Detail</param>
        /// <param name="benefitPlanBenefit">benefitPlanBenefit</param>
        /// <param name="repoDeductible">the Deductible Repository</param>
        /// <param name="repoBnftPlanBnftCvrgSetNtwrkTier">the BenefitPlanBenefit CoverageSet NetworkTier Repository</param>
        private void SetBenefitDeductible(BenefitCoverageSetDetailsVM itemToAddOrUpdate, BnftPlanBnft benefitPlanBenefit, IDeductibleRepository repoDeductible, IBenefitPlanBenefitCoverageSetNetworkTierRepository repoBnftPlanBnftCvrgSetNtwrkTier)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            foreach (BenefitPlanBenefitNetworkTierVM benefitPlanBenefitNetworkTier in itemToAddOrUpdate.Tiers)
            {
                Deducbl deducbl = repoDeductible.FindOne(b => b.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && b.BnftPlanBnftSK == benefitPlanBenefit.BnftPlanBnftSK && b.NtwrkTierSK == benefitPlanBenefitNetworkTier.NtwrkTierSK);

                if (deducbl == null)
                {
                    deducbl = new Deducbl()
                    {
                        CreatedBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser),
                        CreatedTs = timeStamp,
                    };
                }

                deducbl.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                deducbl.NtwrkTierSK = benefitPlanBenefitNetworkTier.NtwrkTierSK;
                deducbl.BnftPlanBnftSK = benefitPlanBenefit.BnftPlanBnftSK;

                deducbl.DeducblTypeSK = (long)DeductibleType.NetworkTier;
                deducbl.DeducblScopeType = null;
                deducbl.DeducblAmt = benefitPlanBenefitNetworkTier.DeductibleAmt;

                // Find the Cost Share Maximums page Embedded Indicator and the BnftPlanBnft Deductible Embedded Indicator has to be set to match.
                Deducbl planDeducbl = repoDeductible.FindOne(b => b.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && b.DeducblScopeTypeSK != null && b.NtwrkTierSK != null && b.BnftPlanBnftSK == null);

                deducbl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                deducbl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                deducbl.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                deducbl.LastModfdTs = timeStamp;

                repoDeductible.AddOrUpdate(deducbl);

                SetCoverageSets(benefitPlanBenefitNetworkTier, benefitPlanBenefit, repoBnftPlanBnftCvrgSetNtwrkTier);
            }
        }

        /// <summary>
        /// Add a CoverageSet to a Benefit on a Plan
        /// </summary>
        /// <param name="benefitPlanBenefitNetworkTier">benefitPlanBenefitNetworkTier</param>
        /// <param name="benefitPlanBenefit">benefitPlanBenefit</param>
        /// <param name="repoBnftPlanBnftCvrgSetNtwrkTier">the BenefitPlanBenefit CoverageSet NetworkTier Repository</param>
        private void SetCoverageSets(BenefitPlanBenefitNetworkTierVM benefitPlanBenefitNetworkTier, BnftPlanBnft benefitPlanBenefit, IBenefitPlanBenefitCoverageSetNetworkTierRepository repoBnftPlanBnftCvrgSetNtwrkTier)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            long ntwrkTierSK = benefitPlanBenefitNetworkTier.NtwrkTierSK;
            long bnftPlanBnftSK = benefitPlanBenefit.BnftPlanBnftSK;

            IEnumerable<BnftPlanBnftCvrgSetNtwrkTier> bnftPlanBnftCvrgSetNtwrkTiers = repoBnftPlanBnftCvrgSetNtwrkTier.FindAll(s => s.BnftPlanBnftSK == bnftPlanBnftSK && s.NtwrkTierSK == ntwrkTierSK).AsEnumerable();

            if (benefitPlanBenefitNetworkTier.SelectedCoverageSets.IsAny())
            {
                foreach (BenefitPlanBenefitNetworkTierCoverageSetVM benefitPlanBenefitNetworkTierCoverageSet in benefitPlanBenefitNetworkTier.SelectedCoverageSets)
                {
                    BnftPlanBnftCvrgSetNtwrkTier bnftPlanBnftCvrgSetNtwrkTier = bnftPlanBnftCvrgSetNtwrkTiers.Where(s => s.CvrgSetSK == benefitPlanBenefitNetworkTierCoverageSet.CvrgSetSK).FirstOrDefault();

                    // If the CvrgSet already exists on the Benefit Plan, Benefit, and Network Tier make sure its active.
                    if (bnftPlanBnftCvrgSetNtwrkTier != null)
                    {
                        bnftPlanBnftCvrgSetNtwrkTier.CvrgSetPrity = benefitPlanBenefitNetworkTierCoverageSet.CvrgSetPrity;
                        bnftPlanBnftCvrgSetNtwrkTier.InctvTs = null;
                        bnftPlanBnftCvrgSetNtwrkTier.DelTs = null;
                        bnftPlanBnftCvrgSetNtwrkTier.LastModfdBy = UtilityFunctions.GetCurrentUser(benefitPlanBenefitNetworkTierCoverageSet.CurrentUser);
                        bnftPlanBnftCvrgSetNtwrkTier.LastModfdTs = timeStamp;
                    }
                    // If the CvrgSet does not already exist on the Benefit Plan, Benefit, and Network Tier, add it.
                    else
                    {
                        bnftPlanBnftCvrgSetNtwrkTier = new BnftPlanBnftCvrgSetNtwrkTier()
                        {
                            CreatedBy = benefitPlanBenefitNetworkTier.CurrentUser,
                            CreatedTs = timeStamp,
                            BnftPlanBnftSK = bnftPlanBnftSK,
                            CvrgSetSK = benefitPlanBenefitNetworkTierCoverageSet.CvrgSetSK,
                            NtwrkTierSK = ntwrkTierSK,
                            CvrgSetPrity = benefitPlanBenefitNetworkTierCoverageSet.CvrgSetPrity,
                            EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                            EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                            LastModfdBy = UtilityFunctions.GetCurrentUser(benefitPlanBenefitNetworkTierCoverageSet.CurrentUser),
                            LastModfdTs = timeStamp
                        };
                    }

                    repoBnftPlanBnftCvrgSetNtwrkTier.AddOrUpdate(bnftPlanBnftCvrgSetNtwrkTier);
                }
            }

            // If the CvrgSet previously existed on the Benefit Plan, Benefit, and Network Tier and no longer does, delete it.

            if (bnftPlanBnftCvrgSetNtwrkTiers.IsAny())
            {
                if (benefitPlanBenefitNetworkTier.SelectedCoverageSets.IsAny())
                {
                    foreach (BnftPlanBnftCvrgSetNtwrkTier bnftPlanBnftCvrgSetNtwrkTier in bnftPlanBnftCvrgSetNtwrkTiers)
                    {
                        if (!benefitPlanBenefitNetworkTier.SelectedCoverageSets.Exists(s => s.CvrgSetSK == bnftPlanBnftCvrgSetNtwrkTier.CvrgSetSK && bnftPlanBnftCvrgSetNtwrkTier.NtwrkTierSK == ntwrkTierSK))
                        {
                            bnftPlanBnftCvrgSetNtwrkTier.DelTs = timeStamp;
                            bnftPlanBnftCvrgSetNtwrkTier.LastModfdBy = UtilityFunctions.GetCurrentUser(benefitPlanBenefitNetworkTier.CurrentUser);
                            bnftPlanBnftCvrgSetNtwrkTier.LastModfdTs = timeStamp;
                            repoBnftPlanBnftCvrgSetNtwrkTier.AddOrUpdate(bnftPlanBnftCvrgSetNtwrkTier);
                        }
                    }
                }
                else
                {
                    foreach (BnftPlanBnftCvrgSetNtwrkTier bnftPlanBnftCvrgSetNtwrkTier in bnftPlanBnftCvrgSetNtwrkTiers)
                    {
                        bnftPlanBnftCvrgSetNtwrkTier.DelTs = timeStamp;
                        bnftPlanBnftCvrgSetNtwrkTier.LastModfdBy = UtilityFunctions.GetCurrentUser(benefitPlanBenefitNetworkTier.CurrentUser);
                        bnftPlanBnftCvrgSetNtwrkTier.LastModfdTs = timeStamp;
                        repoBnftPlanBnftCvrgSetNtwrkTier.AddOrUpdate(bnftPlanBnftCvrgSetNtwrkTier);
                    }
                }
            }

        }

        #endregion "Private Methods"

        #endregion "Coverage Set Details"
    }
}