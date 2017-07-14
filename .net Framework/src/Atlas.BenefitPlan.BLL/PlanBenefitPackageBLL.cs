using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Plan Benefit Package BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IPlanBenefitPackageBLL" />
    public class PlanBenefitPackageBLL : IPlanBenefitPackageBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// Search Where Criteria Generator
        /// </summary>
        private ISearchWhereCriteriaGenerator _whereCriteriaGenerator;

        /// <summary>
        /// The Constructor for the Plan Benefit Package BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="whereCriteriaGenerator">The where criteria generator.</param>
        public PlanBenefitPackageBLL(IBenefitPlanRepositoryFactory repoFactory, ISearchWhereCriteriaGenerator whereCriteriaGenerator)
        {
            _repoFactory = repoFactory;
            _whereCriteriaGenerator = whereCriteriaGenerator;
        }

        /// <summary>
        /// PBP Search
        /// </summary>
        /// <param name="pBPSK">the PBP ID</param>
        /// <param name="lOBSK">the line of business</param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName">tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        public List<spPlanBenefitPackageSearch_Result> PlanBenefitPackageSearch(long? pBPSK = null, long? lOBSK = null, long? bnftPlanTypeSK = null, string tenantFamName = null, string tenantName = null
            , string acctName = null, string grpName = null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                return repo.GetPlanBenefitPackageSearch(pBPSK, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt).ToList();
            }
        }

        /// <summary>
        /// PBP Search By Text
        /// </summary>
        /// <param name="pbpName">the PBP Name</param>
        /// <param name="lOBSK">the line of business</param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName">tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        public List<spPlanBenefitPackageSearchByText_Result> PlanBenefitPackageSearchByText(string pbpName, long? lOBSK = null, long? bnftPlanTypeSK = null
            , string tenantFamName = null, string tenantName = null, string acctName = null, string grpName = null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            return _repoFactory.AtlasBenefitPlanStoredProcs().GetPlanBenefitPackageSearchByText(pbpName, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt).ToList();
        }

        #region " Plan Benefit Package - PBP"

        /// <summary>
        /// Adds/Update the PlanBenefitPackage
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Plan Benefit Package View Model to Update</param>
        /// <returns>a Plan Benefit Package View Model</returns>
        public PlanBenefitPackageVM AddOrUpdatePlanBenefitPackage(PlanBenefitPackageVM itemToAddOrUpdate)
        {
            using (var repoPBP = _repoFactory.PlanBenefitPackage())
            using (var repoPBPBnftPlan = _repoFactory.PlanBenefitPackageBenefitPlan())
            {
                PBP planBenefitPackage = itemToAddOrUpdate.PBPSK == 0
                                      ? new PBP()
                                      {
                                          CreatedBy = itemToAddOrUpdate.CurrentUser,
                                          CreatedTs = UtilityFunctions.GetTimeStamp()
                                      }
                                       : repoPBP.FindOne(k => k.PBPSK == itemToAddOrUpdate.PBPSK);
                planBenefitPackage.LOBSK = itemToAddOrUpdate.LOBSK;
                planBenefitPackage.PBPID = itemToAddOrUpdate.PBPID;
                planBenefitPackage.PBPName = itemToAddOrUpdate.PBPName;
                planBenefitPackage.CombinedMOOPInd = itemToAddOrUpdate.CombinedMOOPInd;
                planBenefitPackage.CombinedPlanLvlDeducblInd = itemToAddOrUpdate.CombinedPlanLvlDeducbInd;
                planBenefitPackage.PBPYr = itemToAddOrUpdate.PBPYr;
                planBenefitPackage.HIOSPrdctID = itemToAddOrUpdate.HIOSPrdctID;
                planBenefitPackage.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                planBenefitPackage.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                planBenefitPackage.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                planBenefitPackage.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repoPBP.AddOrUpdate(planBenefitPackage);
                repoPBP.SaveChanges();
                itemToAddOrUpdate.PBPSK = planBenefitPackage.PBPSK;
                itemToAddOrUpdate.PBPBnftPlanList = SetPBPBnftPlans(itemToAddOrUpdate, repoPBPBnftPlan);
                repoPBPBnftPlan.SaveChanges();
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Assign the Benefit Plan to PlanBenefitPackage
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <param name="currentUser">The current user.</param>
        /// <returns>successful flag</returns>
        public long AssignBnftPlanToPlanBnftPackage(long pbpSK, long bnftPlanSK, string currentUser)
        {
            using (IPlanBenefitPackageBenefitPlanRepository repoPlanBenefitPackageBenefitPlan = _repoFactory.PlanBenefitPackageBenefitPlan())
            using (IPlanBenefitPackageRepository repoPlanBenefitPackageRepository = _repoFactory.PlanBenefitPackage())
            {
                PBPBnftPlan pbpBnftPlan = repoPlanBenefitPackageBenefitPlan.FindAll(k => k.PBPSK == pbpSK && k.BnftPlanSK == bnftPlanSK).FirstOrDefault();
                if (pbpBnftPlan == null)
                {
                    PBP pBP = repoPlanBenefitPackageRepository.FindAll(k => k.PBPSK == pbpSK).FirstOrDefault();
                    pbpBnftPlan = new PBPBnftPlan();

                    pbpBnftPlan.PBPSK = pbpSK;
                    pbpBnftPlan.BnftPlanSK = bnftPlanSK;
                    pbpBnftPlan.CombinedPlanLvlDeducblInd = false;
                    pbpBnftPlan.CombinedPlanMOOPInd = false;
                    pbpBnftPlan.PayasScndInd = false;
                    pbpBnftPlan.EfctvStartDt = pBP.EfctvStartDt;
                    pbpBnftPlan.EfctvEndDt = pBP.EfctvEndDt;
                    pbpBnftPlan.CreatedBy = currentUser;
                    pbpBnftPlan.CreatedTs = UtilityFunctions.GetTimeStamp();
                    pbpBnftPlan.LastModfdBy = UtilityFunctions.GetCurrentUser(currentUser);
                    pbpBnftPlan.LastModfdTs = UtilityFunctions.GetTimeStamp();
                    repoPlanBenefitPackageBenefitPlan.AddOrUpdate(pbpBnftPlan);
                    repoPlanBenefitPackageBenefitPlan.SaveChanges();
                    return pbpBnftPlan.PBPBnftPlanSK;
                }
                return 0;
            }
        }

        /// <summary>
        /// Get the Benefit Package details and Benefit Plans
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>the Plan Benefit Package View Model</returns>
        public PlanBenefitPackageVM GetPlanBenefitPackage(long pbpSK)
        {
            using (var repoPackage = _repoFactory.PlanBenefitPackage())
            using (var repoStatus = _repoFactory.PopulationGroupPlanBenefitPlanStatusCurrent())
            {
                PBP package = _repoFactory.PlanBenefitPackage().FindOne(w => w.PBPSK == pbpSK) ?? new PBP();
                return new PlanBenefitPackageVM()
                {
                    PBPSK = package.PBPSK,
                    LOBSK = package.LOBSK,
                    PBPID = package.PBPID,
                    PBPName = package.PBPName,
                    CombinedMOOPInd = package.CombinedMOOPInd,
                    CombinedPlanLvlDeducbInd = package.CombinedPlanLvlDeducblInd,
                    PBPYr = package.PBPYr,
                    HIOSPrdctID = package.HIOSPrdctID,
                    EfctvStartDt = package.EfctvStartDt,
                    EfctvEndDt = package.EfctvEndDt,
                    CanChangePBPBnftPlanList = !repoStatus.isPBPLocked(package.PBPSK),
                    PBPBnftPlanList = GetPlanBenefitPackageBenefitPlans(pbpSK)
                };
            }
        }

        /// <summary>
        /// Validate Plan Benefit Package
        /// </summary>
        /// <param name="itemToValidate">PlanBenefitPackageVM</param>
        /// <returns>List of Message</returns>
        public List<Message> ValidatePlanBenefitPackage(PlanBenefitPackageVM itemToValidate)
        {
            List<Message> result = new List<Message>();

            if (itemToValidate.PBPYr != "" && itemToValidate.PBPYr.Length < 4)
            {
                result.Add(new Message() { MessageText = string.Format("PBP Year: ({0}) if entered needs to be 4 characters.", itemToValidate.PBPYr), Fieldname = "itemToValidate.PBPYr" });
            }

            return result;
        }

        #endregion " Plan Benefit Package - PBP"

        #region " Plan Benefit Package - Savings Account"

        /// <summary>
        /// Get all savings account for given popGrpPBPSK
        /// </summary>
        /// <param name="popGrpPBPSK">The popGrpPBPSK.</param>
        /// <returns>List&lt;SavingsAccountVM&gt;.</returns>
        public List<SavingsAccountVM> GetAllSavingsAccounts(long popGrpPBPSK)
        {
            return _repoFactory.PopGroupPlanBenefitPackageHealthCareFinancialAccount().FindAll(c => c.PopGrpPBPSK == popGrpPBPSK)
                .Select(s => new SavingsAccountVM()
                {
                    PopGrpPBPHealthcareFinclAcctSK = s.PopGrpPBPHealthcareFinclAcctSK,
                    PopGrpPBPSK = s.PopGrpPBPSK,
                    BnftPlanTypeSK = s.BnftPlanTypeSK,
                    HealthcareFinclAcctTypeSK = s.HealthcareFinclAcctTypeSK,
                    BankName = s.BankName,
                    AcctNbr = s.BankAcctNbr,
                    MaxContributionAmt = s.MaxContributionAmt
                }).ToList();
        }

        /// <summary>
        /// Add or update savings account
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>SavingsAccountVM.</returns>
        public SavingsAccountVM AddOrUpdateSavingsAccount(SavingsAccountVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.PopGroupPlanBenefitPackageHealthCareFinancialAccount())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                PopGrpPBPHealthcareFinclAcct popGrpPBPHCFAcct = itemToAddOrUpdate.PopGrpPBPHealthcareFinclAcctSK != 0
                    ? repository.FindOne(c => c.PopGrpPBPHealthcareFinclAcctSK == itemToAddOrUpdate.PopGrpPBPHealthcareFinclAcctSK)
                    : new PopGrpPBPHealthcareFinclAcct()
                    {
                        EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                        EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp
                    };

                popGrpPBPHCFAcct.PopGrpPBPSK = itemToAddOrUpdate.PopGrpPBPSK;
                popGrpPBPHCFAcct.BnftPlanTypeSK = itemToAddOrUpdate.BnftPlanTypeSK;
                popGrpPBPHCFAcct.HealthcareFinclAcctTypeSK = itemToAddOrUpdate.HealthcareFinclAcctTypeSK;
                popGrpPBPHCFAcct.BankName = itemToAddOrUpdate.BankName;
                popGrpPBPHCFAcct.BankAcctNbr = itemToAddOrUpdate.AcctNbr;
                popGrpPBPHCFAcct.MaxContributionAmt = itemToAddOrUpdate.MaxContributionAmt;
                popGrpPBPHCFAcct.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                popGrpPBPHCFAcct.LastModfdTs = timeStamp;

                repository.AddOrUpdate(popGrpPBPHCFAcct);
                repository.SaveChanges();

                itemToAddOrUpdate.PopGrpPBPHealthcareFinclAcctSK = popGrpPBPHCFAcct.PopGrpPBPHealthcareFinclAcctSK;
            }

            return itemToAddOrUpdate;
        }

        #endregion " Plan Benefit Package - Savings Account"

        #region PBP Business Rules

        /// <summary>
        /// Get the business rules for the PBPSK
        /// </summary>
        /// <param name="pBPSK">The p BPSK.</param>
        ///  /// <param name="categoryTypeCodes">The Category Type Codes.</param>
        /// <returns>list of business rule view models</returns>
        public List<BusinessRulesVM> GetBusinessRules(long pBPSK, string[] categoryTypeCodes)
        {
            using (var repoConfigPropertyType = _repoFactory.ConfigurationPropertyType())
            using (var repoConfigPropertyOption = _repoFactory.ConfigurationPropertyOption())
            using (var repoPBPConfigPrpty = _repoFactory.PlanBenefitPackageConfigurationProperty())
            {
                List<BusinessRulesVM> returnRules = new List<BusinessRulesVM>();
                Dictionary<long, BusinessRulesVM> businessRules = new Dictionary<long, BusinessRulesVM>();

                businessRules = repoConfigPropertyType.FindAll()
                    .Where(c => categoryTypeCodes.Contains(c.ConfgPrptyCatgType.ConfgPrptyCatgTypeCode))
                    .OrderBy(o => o.ConfgPrptyTypeDsplyPrity)
                    .Select(s => new BusinessRulesVM()
                    {
                        ConfgPrptyTypeSK = s.ConfgPrptyTypeSK,
                        ConfgPrptyTypeParentSK = s.ConfgPrptyTypeParentSK,
                        PBPSK = pBPSK,
                        Question = s.ConfgPrptyTypeDesc,
                    }).ToDictionary(k => k.ConfgPrptyTypeSK);

                businessRules.Values.ToList().ForEach(r =>
                {
                    r.PossibleAnswers = repoConfigPropertyOption
                        .FindAll(o => o.ConfgPrptyTypeSK == r.ConfgPrptyTypeSK)
                        .Select(s => s.OptDesc).ToList<string>();

                    if (r.ChildBusinessRule)
                    {
                        long dictionaryIdx = r.ConfgPrptyTypeParentSK ?? long.MinValue;
                        if (businessRules.ContainsKey(dictionaryIdx))
                        {
                            businessRules[dictionaryIdx].ChildPossibleAnswers = r.PossibleAnswers;
                            businessRules[dictionaryIdx].ChildQuestion = r.Question;
                            businessRules[dictionaryIdx].ConfgPrptyTypeChildSK = r.ConfgPrptyTypeSK;
                        }
                    }
                });

                foreach (BusinessRulesVM businessRule in businessRules.Values.Where(w => !w.ChildBusinessRule))
                {
                    List<PBPConfgPrpty> pBPConfigProperties = repoPBPConfigPrpty
                        .FindAll(o => o.ConfgPrptyTypeSK == businessRule.ConfgPrptyTypeSK && o.PBPSK == pBPSK)
                        .ToList();

                    if (pBPConfigProperties.Any())
                    {
                        foreach (PBPConfgPrpty pBPConfigProperty in pBPConfigProperties)
                        {
                            BusinessRulesVM tmpRule = new BusinessRulesVM()
                            {
                                PBPSK = businessRule.PBPSK,
                                ConfgPrptyTypeSK = businessRule.ConfgPrptyTypeSK,
                                ConfgPrptyTypeParentSK = businessRule.ConfgPrptyTypeParentSK,
                                ConfgPrptyTypeChildSK = businessRule.ConfgPrptyTypeChildSK,
                                Question = businessRule.Question,
                                ChildQuestion = businessRule.ChildQuestion,
                                PossibleAnswers = businessRule.PossibleAnswers,
                                ChildPossibleAnswers = businessRule.ChildPossibleAnswers
                            };
                            tmpRule.PBPConfgPrptySK = pBPConfigProperty.PBPConfgPrptySK;
                            tmpRule.CurrentAnswer = pBPConfigProperty.ConfgPrptyVal;
                            tmpRule.ChildCurrentAnswer = pBPConfigProperty.ConfgPrptyChildVal;
                            returnRules.Add(tmpRule);
                        }
                    }
                    else
                    {
                        returnRules.Add(businessRule);
                    }
                }

                return returnRules;
            }
        }

        /// <summary>
        /// Add or update business rules
        /// </summary>
        /// <param name="businessRule">The business rule.</param>
        /// <returns>true if success</returns>
        public BusinessRulesUpdateVM AddOrUpdateBusinessRules(BusinessRulesUpdateVM businessRule)
        {
            using (var repoPBPConfigPrpty = _repoFactory.PlanBenefitPackageConfigurationProperty())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                PBPConfgPrpty pBPConfgPrpty = businessRule.PBPConfgPrptySK != 0
                    ? repoPBPConfigPrpty.FindOne(c => c.PBPConfgPrptySK == businessRule.PBPConfgPrptySK)// Update
                    : new PBPConfgPrpty()
                    {
                        ConfgPrptyTypeSK = businessRule.ConfgPrptyTypeSK,
                        PBPSK = businessRule.PBPSK,
                        EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                        EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                        CreatedBy = businessRule.CurrentUser,
                        CreatedTs = timeStamp
                    };// Insert


                pBPConfgPrpty.ConfgPrptyVal = businessRule.CurrentAnswer;
                pBPConfgPrpty.ConfgPrptyChildVal = businessRule.ChildCurrentAnswer;
                pBPConfgPrpty.LastModfdBy = businessRule.CurrentUser;
                pBPConfgPrpty.LastModfdTs = timeStamp;
                pBPConfgPrpty.DelTs = (businessRule.IsDeleted) ? pBPConfgPrpty.DelTs = timeStamp : null;

                repoPBPConfigPrpty.AddOrUpdate(pBPConfgPrpty);
                repoPBPConfigPrpty.SaveChanges();

                businessRule.PBPConfgPrptySK = pBPConfgPrpty.PBPConfgPrptySK;
            }

            return businessRule;
        }

        #endregion PBP Business Rules

        #region Private Methods

        /// <summary>
        /// Get the BenefitPlans of the PlanBenefitPackage
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>List of Plan Benefit Package Benefit Plan VM</returns>
        private List<PlanBenefitPackageBenefitPlanVM> GetPlanBenefitPackageBenefitPlans(long pbpSK)
        {
            using (var repo = _repoFactory.PlanBenefitPackageBenefitPlan())
            {
                return repo.FindAll(c => c.PBPSK == pbpSK).Select(s => new PlanBenefitPackageBenefitPlanVM()
                {
                    PBPSK = s.PBPSK,
                    PBPBnftPlanSK = s.PBPBnftPlanSK,
                    BnftPlanName = s.BnftPlan.BnftPlanName,
                    BnftPlanSK = s.BnftPlanSK,
                    PrdctTypeSK = s.BnftPlan.PrdctTypeSK,
                    PrdctTypeCode = s.BnftPlan.PrdctType.PrdctTypeCode,
                    BnftPlanTypeSK = s.BnftPlan.BnftPlanTypeSK,
                    BnftPlanTypeCode = s.BnftPlan.BnftPlanType.BnftPlanTypeCode,
                    LOBSK = s.BnftPlan.LOBSK,
                    LOBName = s.BnftPlan.LOB.LOBName,
                    EfctvStartDt = s.BnftPlan.EfctvStartDt,
                    EfctvEndDt = s.BnftPlan.EfctvEndDt,
                    NbrofNtwrkTiers = s.BnftPlan.NbrofNtwrkTiers,
                    PayasScndInd = s.PayasScndInd,
                    CombinedPlanLvlDeducbInd = s.CombinedPlanLvlDeducblInd,
                    CombinedMOOPInd = s.CombinedPlanMOOPInd
                }).ToList();
            }
        }

        /// <summary>
        /// Updates the PBPBnftPlan table properties
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="repoPBPBnftPlan">The repo PBP BNFT plan.</param>
        /// <returns>IEnumerable&lt;PlanBenefitPackageBenefitPlanVM&gt;.</returns>
        private IEnumerable<PlanBenefitPackageBenefitPlanVM> SetPBPBnftPlans(PlanBenefitPackageVM itemToAddOrUpdate, IPlanBenefitPackageBenefitPlanRepository repoPBPBnftPlan)
        {
            if (itemToAddOrUpdate.PBPBnftPlanList.IsAny())
            {
                foreach (PlanBenefitPackageBenefitPlanVM packagePlanVM in itemToAddOrUpdate.PBPBnftPlanList)
                {
                    PBPBnftPlan packagePlan = repoPBPBnftPlan.FindOne(s => s.PBPBnftPlanSK == packagePlanVM.PBPBnftPlanSK);
                    if (packagePlan != null)
                    {
                        packagePlan.EfctvStartDt = packagePlanVM.EfctvStartDt;
                        packagePlan.EfctvEndDt = packagePlanVM.EfctvEndDt;
                        packagePlan.PayasScndInd = packagePlanVM.PayasScndInd;
                        packagePlan.CombinedPlanLvlDeducblInd = packagePlanVM.CombinedPlanLvlDeducbInd;
                        packagePlan.CombinedPlanMOOPInd = packagePlanVM.CombinedMOOPInd;
                        packagePlan.LastModfdBy = packagePlanVM.CurrentUser;
                        packagePlan.LastModfdTs = UtilityFunctions.GetTimeStamp();
                        if (packagePlanVM.IsDeleted)
                        {
                            packagePlan.DelTs = UtilityFunctions.GetTimeStamp();
                        }
                        repoPBPBnftPlan.AddOrUpdate(packagePlan);
                    }
                }
            }
            return itemToAddOrUpdate.PBPBnftPlanList;
        }

        #endregion Private Methods
    }
}