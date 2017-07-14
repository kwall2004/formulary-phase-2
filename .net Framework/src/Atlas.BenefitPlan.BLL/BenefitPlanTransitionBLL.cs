using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Benefit Plan Transition BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IBenefitPlanTransitionBLL" />
    public class BenefitPlanTransitionBLL : IBenefitPlanTransitionBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Benefit Plan Transition BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public BenefitPlanTransitionBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get Low Income Cost Sharing Subsidy
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Low Income Cost Sharing Subsidy View Models</returns>
        public List<LowIncomeCostSharingSubsidyVM> GetLowIncomeCostSharingSubsidys(long bnftPlanSK)
        {
            List<LowIncomeCostSharingSubsidyVM> LowIncomeCostSharingSubsidys = _repoFactory.LowIncomeCostSharingSubsidySetup().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new LowIncomeCostSharingSubsidyVM()
                {
                    LICSSetupSK = s.LICSSetupSK,
                    BnftPlanSK = s.BnftPlanSK,
                    FrmlryTierSK = s.FrmlryTierSK,
                    CvrgPhaseSK = s.CvrgPhaseSK,
                    LICSTypeSK = s.LICSTypeSK ?? 0,
                    LICSTypeCode = s.LICSType.LICSTypeCode,
                    CopayCoinsuranceLogicTypeSK = s.CopayCoinsuranceLogicTypeSK,
                    CopayAmt = s.CopayAmt,
                    CoinsurancePct = s.CoinsurancePct,
                    DaySuplTypeSK = s.DaySuplTypeSK,
                    PharmTypeSK = s.PharmTypeSK ?? 0,
                    PharmTypeCode = s.PharmType.PharmTypeCode
                }).ToList();

            return LowIncomeCostSharingSubsidys.OrderBy(o => o.LICSTypeSK).ThenBy(t1 => t1.FrmlryTierSK).ThenBy(t2 => t2.CvrgPhaseSK).ToList();
        }

        /// <summary>
        /// Get Transition Rules
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>Transition Rules for the Benefit Plan</returns>
        public TransitionRulesVM GetTransitionRules(long bnftPlanSK)
        {
            return _repoFactory.BenefitPlan().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new TransitionRulesVM()
                {
                    BnftPlanSK = s.BnftPlanSK,
                    AllowTransitionFillsInd = s.AllowTransitionFillsInd,
                    TransitionTimeframeDays = s.TransitionTimeframeDays,
                    TransitionLookBackPerDays = s.TransitionLookBackPerDays,
                    LTCTransitionAlwdDays = s.LTCTransitionAlwdDays,
                    RtlTransitionAlwdDays = s.RtlTransitionAlwdDays,
                    RestartTransitionatPlanYrInd = s.RestartTransitionatPlanYrInd,
                    TransitionRestartMthNbr = s.TransitionRestartMthNbr
                }).FirstOrDefault();
        }

        /// <summary>
        /// Set Low Income Cost Sharing Subsidy
        /// </summary>
        /// <param name="itemToAddOrUpdate">Low Income Cost Sharing Subsidy View Models</param>
        /// <returns>LowIncomeCostSharingSubsidyVM.</returns>
        public LowIncomeCostSharingSubsidyVM SetLowIncomeCostSharingSubsidys(LowIncomeCostSharingSubsidyVM itemToAddOrUpdate)
        {
            return AddorUpdateLICSSetup(itemToAddOrUpdate);
        }

        /// <summary>
        /// Add or Update Transition Rules
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Transition Rules to Add or Update</param>
        /// <returns>TransitionRulesVM.</returns>
        public TransitionRulesVM SetTransitionRules(TransitionRulesVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.BenefitPlan())
            {
                BnftPlan benefitPlan = repository.FindOne(p => p.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);

                benefitPlan.AllowTransitionFillsInd = itemToAddOrUpdate.AllowTransitionFillsInd;
                benefitPlan.TransitionTimeframeDays = itemToAddOrUpdate.TransitionTimeframeDays;
                benefitPlan.TransitionLookBackPerDays = itemToAddOrUpdate.TransitionLookBackPerDays;
                benefitPlan.LTCTransitionAlwdDays = itemToAddOrUpdate.LTCTransitionAlwdDays;
                benefitPlan.RtlTransitionAlwdDays = itemToAddOrUpdate.RtlTransitionAlwdDays;
                benefitPlan.RestartTransitionatPlanYrInd = itemToAddOrUpdate.RestartTransitionatPlanYrInd;
                benefitPlan.TransitionRestartMthNbr = itemToAddOrUpdate.TransitionRestartMthNbr == 0 ? null : itemToAddOrUpdate.TransitionRestartMthNbr;
                benefitPlan.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                benefitPlan.LastModfdTs = timeStamp;

                repository.AddOrUpdate(benefitPlan);
                repository.SaveChanges();

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate Transition Rules
        /// </summary>
        /// <param name="itemToValidate">the TransitionRule Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateTransitionRules(TransitionRulesVM itemToValidate)
        {
            List<Message> result = new List<Message>();

            if (itemToValidate.AllowTransitionFillsInd && itemToValidate.RestartTransitionatPlanYrInd)
            {
                if (!Enum.IsDefined(typeof(Month), (Int32)itemToValidate.TransitionRestartMthNbr))
                {
                    result.Add(new Message() { MessageText = "The field TransitionRestartMthNbr is invalid.", Fieldname = "transitionRules.TransitionRestartMthNbr" });
                }
            }

            return result;
        }

        #region " Private Methods "

        /// <summary>
        /// Add or Update Low Income Cost Sharing Subsidy
        /// </summary>
        /// <param name="itemToAddOrUpdate">Low Income Cost Sharing Subsidy View Model</param>
        /// <returns>Low Income Cost Sharing Subsidy VM</returns>
        private LowIncomeCostSharingSubsidyVM AddorUpdateLICSSetup(LowIncomeCostSharingSubsidyVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.LowIncomeCostSharingSubsidySetup())
            {
                LICSSetup licsSetup = itemToAddOrUpdate.LICSSetupSK != 0
                    ? repository.FindOne(p => p.LICSSetupSK == itemToAddOrUpdate.LICSSetupSK)
                    : PopulateNewLICSSetup(itemToAddOrUpdate, timeStamp);

                licsSetup.CopayCoinsuranceLogicTypeSK = itemToAddOrUpdate.CopayCoinsuranceLogicTypeSK;

                licsSetup.FrmlryTierSK = itemToAddOrUpdate.FrmlryTierSK;
                licsSetup.CvrgPhaseSK = itemToAddOrUpdate.CvrgPhaseSK;
                licsSetup.LICSTypeSK = itemToAddOrUpdate.LICSTypeSK;

                licsSetup.CopayAmt = itemToAddOrUpdate.CopayAmt;
                licsSetup.CoinsurancePct = itemToAddOrUpdate.CoinsurancePct;
                licsSetup.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                licsSetup.LastModfdTs = timeStamp;
                licsSetup.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;
                licsSetup.DaySuplTypeSK = itemToAddOrUpdate.DaySuplTypeSK;
                licsSetup.PharmTypeSK = itemToAddOrUpdate.PharmTypeSK;

                repository.AddOrUpdate(licsSetup);
                repository.SaveChanges();

                itemToAddOrUpdate.LICSSetupSK = licsSetup.LICSSetupSK;
                return itemToAddOrUpdate;
            };
        }

        /// <summary>
        /// Add or Update a LICS Setup for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">the LICS Setup to Add or Update</param>
        /// <param name="timeStamp">The time stamp.</param>
        /// <returns>LICSSetup.</returns>
        private LICSSetup PopulateNewLICSSetup(LowIncomeCostSharingSubsidyVM itemToAddOrUpdate, DateTime timeStamp)
        {
            BnftPlan benefitPlan = _repoFactory.BenefitPlan().FindOne(w => w.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);
            return new LICSSetup()
            {
                BnftPlanSK = itemToAddOrUpdate.BnftPlanSK,
                FrmlryTierSK = itemToAddOrUpdate.FrmlryTierSK,
                CvrgPhaseSK = itemToAddOrUpdate.CvrgPhaseSK,
                LICSTypeSK = itemToAddOrUpdate.LICSTypeSK,
                EfctvStartDt = benefitPlan != null ? benefitPlan.EfctvStartDt : UtilityFunctions.GetEffectiveStartDate(),
                EfctvEndDt = benefitPlan != null ? benefitPlan.EfctvEndDt : UtilityFunctions.GetEffectiveEndDate(),
                CreatedBy = itemToAddOrUpdate.CurrentUser,
                CreatedTs = timeStamp,
                DaySuplTypeSK = itemToAddOrUpdate.DaySuplTypeSK,
                PharmTypeSK = itemToAddOrUpdate.PharmTypeSK
            };
        }

        #endregion " Private Methods "
    }
}