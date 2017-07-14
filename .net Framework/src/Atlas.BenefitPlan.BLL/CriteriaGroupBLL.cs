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
    /// The Criteria Group BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.ICriteriaGroupBLL" />
    public class CriteriaGroupBLL : ICriteriaGroupBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Criteria Group BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public CriteriaGroupBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        #region "Public Methods"

        /// <summary>
        /// Get all Value Qualifier Types for a Criteria Set Type
        /// </summary>
        /// <param name="criteriaSetType">Criteria Set Type</param>
        /// <returns>List of Value Qualifier Types</returns>
        public List<ValQulfrType> GetAllValueQualifierTypes(long? criteriaSetType = null)
        {
            IQueryable<ValQulfrType> valQulfrType = _repoFactory.ValueQualifierType().FindAll() as IQueryable<ValQulfrType>;

            if (criteriaSetType != null)
            {
                return valQulfrType.Where(c => c.CrtriaSetTypeSK == null || c.CrtriaSetTypeSK == (int)criteriaSetType).ToList();
            }
            else
            {
                return valQulfrType.Where(c => c.CrtriaSetTypeSK == null).ToList();
            }
        }

        /// <summary>
        /// Get Rule Sets
        /// </summary>
        /// <param name="criteriaSetType">criteriaSetType</param>
        /// <param name="objectSK">objectSK</param>
        /// <returns>Rule Sets</returns>
        public List<RuleSetVM> GetAllRuleSets(CriteriaSetType criteriaSetType, long objectSK)
        {
            switch (criteriaSetType)
            {
                case CriteriaSetType.BenefitDefinition:
                    return GetBenefitDefinitionRuleSets(objectSK);

                case CriteriaSetType.CoverageSet:
                    return GetCoverageSetRuleSets(objectSK);

                default:
                    return new List<RuleSetVM>();
            }
        }

        /// <summary>
        /// Get Criteria Sets by CriteriaSetType
        /// </summary>
        /// <param name="crtriaSetType">crtriaSetType</param>
        /// <returns>Benefit Definition</returns>
        public List<CriteriaSetVM> GetCriteriaSets(CriteriaSetType crtriaSetType)
        {
            List<CriteriaSetVM> criteriaSets = new List<CriteriaSetVM>();

            switch (crtriaSetType)
            {
                case CriteriaSetType.BenefitDefinition:
                    criteriaSets = _repoFactory.BnftCrtriaSet().FindAll()
                    .Select(w => new CriteriaSetVM()
                    {
                        CrtriaSetSK = w.CrtriaSetSK,
                        CriteriaSetName = w.CrtriaSetName,
                        EfctvStartDt = w.EfctvStartDt,
                        EfctvEndDt = w.EfctvEndDt
                    }).ToList();
                    break;

                case CriteriaSetType.CoverageSet:
                    criteriaSets = _repoFactory.CoverageSetCriteriaSet().FindAll()
                    .Select(w => new CriteriaSetVM()
                    {
                        CrtriaSetSK = w.CrtriaSetSK,
                        CriteriaSetName = w.CrtriaSetName,
                        EfctvStartDt = w.EfctvStartDt,
                        EfctvEndDt = w.EfctvEndDt
                    }).ToList();
                    break;

                default:
                    return criteriaSets;
            }

            return criteriaSets;
        }

        /// <summary>
        /// Get All Criteria Sets by CriteriaSetType and objectSK
        /// </summary>
        /// <param name="crtriaSetType">crtriaSetType</param>
        /// <param name="objectSK">bnft or cvrgSet</param>
        /// <returns>Benefit Definition</returns>
        public List<CriteriaSetVM> GetAllCriteriaSets(CriteriaSetType crtriaSetType, long objectSK)
        {
            List<CriteriaSetVM> criteriaSets = new List<CriteriaSetVM>();

            switch (crtriaSetType)
            {
                case CriteriaSetType.BenefitDefinition:
                    criteriaSets = _repoFactory.BnftCrtriaSet().FindAll(c => c.BnftSK == objectSK)
                    .Select(w => new CriteriaSetVM()
                    {
                        CrtriaSetSK = w.CrtriaSetSK,
                        CriteriaSetName = w.CrtriaSetName,
                        EfctvStartDt = w.EfctvStartDt,
                        EfctvEndDt = w.EfctvEndDt,
                        CrtriaSetPrity = w.CrtriaSetPrity,
                        BnftCrtriaSetSK = w.BnftCrtriaSetSK,
                        CvrgSetCrtriaSetSK = null,
                        BnftSK = w.BnftSK,
                        CvrgSetSK = null
                    }).ToList();
                    break;

                case CriteriaSetType.CoverageSet:
                    criteriaSets = _repoFactory.CoverageSetCriteriaSet().FindAll(c => c.CvrgSetSK == objectSK)
                    .Select(w => new CriteriaSetVM()
                    {
                        CrtriaSetSK = w.CrtriaSetSK,
                        CriteriaSetName = w.CrtriaSetName,
                        EfctvStartDt = w.EfctvStartDt,
                        EfctvEndDt = w.EfctvEndDt,
                        CrtriaSetPrity = w.CrtriaSetPrity,
                        BnftCrtriaSetSK = null,
                        CvrgSetCrtriaSetSK = w.CvrgSetCrtriaSetSK,
                        BnftSK = null,
                        CvrgSetSK = w.CvrgSetSK
                    }).ToList();
                    break;

                default:
                    return criteriaSets;
            }

            return criteriaSets;
        }

        /// <summary>
        /// Get Rule Details
        /// </summary>
        /// <param name="crtriaSetSK">crtriaSetSK</param>
        /// <returns>Rule Details</returns>
        public List<CriteriaDetailVM> GetAllRuleDetails(long crtriaSetSK)
        {
            return _repoFactory.CriteriaDetail().FindAll(w => w.CrtriaSetSK == crtriaSetSK)
                .Select(w => new CriteriaDetailVM()
                {
                    CrtriaSetSK = w.CrtriaSetSK,
                    CrtriaDtlSK = w.CrtriaDtlSK,
                    CrtriaCondTypeSK = w.CrtriaCondTypeSK,
                    ValQulfrTypeSK = w.ValQulfrTypeSK,
                    CrtriaPrity = w.CrtriaPrity,
                    CrtriaVal = w.CrtriaVal
                }).ToList();
        }

        /// <summary>
        /// Set BenefitCriteriaSet
        /// </summary>
        /// <param name="itemToAddOrUpdate">CriteriaSet to Add or Update</param>
        /// <returns>CriteriaSetVM.</returns>
        public CriteriaSetVM SetBenefitCriteriaSet(CriteriaSetVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repoBnftCrtriaSet = _repoFactory.BnftCrtriaSet())
            using (var repoCrtriaSet = _repoFactory.CriteriaSet())
            { 
                CrtriaSet crtriaSet = itemToAddOrUpdate.CrtriaSetSK != 0
                ? repoCrtriaSet.FindOne(c => c.CrtriaSetSK == itemToAddOrUpdate.CrtriaSetSK)
                : new CrtriaSet() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                crtriaSet.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                crtriaSet.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                crtriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                crtriaSet.LastModfdTs = timeStamp;

                BnftCrtriaSet benefitCriteriaSet = itemToAddOrUpdate.BnftCrtriaSetSK != 0
                ? repoBnftCrtriaSet.FindOne(c => c.BnftCrtriaSetSK == itemToAddOrUpdate.BnftCrtriaSetSK)
                : new BnftCrtriaSet() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                benefitCriteriaSet.BnftSK = (long)itemToAddOrUpdate.BnftSK;
                benefitCriteriaSet.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                benefitCriteriaSet.CrtriaOperTypeSK = (long?)CriteriaOperatorType.Or;
                benefitCriteriaSet.CrtriaSetName = itemToAddOrUpdate.CriteriaSetName;
                benefitCriteriaSet.CrtriaSetPrity = itemToAddOrUpdate.CrtriaSetPrity;
                benefitCriteriaSet.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                benefitCriteriaSet.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                benefitCriteriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                benefitCriteriaSet.LastModfdTs = timeStamp;

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    benefitCriteriaSet.DelTs = timeStamp;
                    crtriaSet.DelTs = timeStamp;
                }

                //  Adding Navigation Properties
                benefitCriteriaSet.CrtriaSet = crtriaSet;

                repoBnftCrtriaSet.AddOrUpdate(benefitCriteriaSet);

                repoCrtriaSet.AddOrUpdate(crtriaSet);

                repoCrtriaSet.SaveChanges();

                itemToAddOrUpdate.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                itemToAddOrUpdate.BnftCrtriaSetSK = benefitCriteriaSet.BnftCrtriaSetSK;

            }
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set the Criteria Detail
        /// </summary>
        /// <param name="itemToAddOrUpdate">Criteria Detail View Model to Update</param>
        /// <returns>CriteriaDetailVM</returns>
        public CriteriaDetailVM SetCriteriaDetail(CriteriaDetailVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.CriteriaDetail())
            {
                CrtriaDtl crtriaDtl = itemToAddOrUpdate.CrtriaDtlSK != 0
                ? repository.FindOne(c => c.CrtriaDtlSK == itemToAddOrUpdate.CrtriaDtlSK)
                : new CrtriaDtl() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                crtriaDtl.CrtriaSetSK = itemToAddOrUpdate.CrtriaSetSK;

                crtriaDtl.CrtriaPrity = itemToAddOrUpdate.CrtriaPrity;
                crtriaDtl.ValQulfrTypeSK = itemToAddOrUpdate.ValQulfrTypeSK;
                crtriaDtl.CrtriaCondTypeSK = itemToAddOrUpdate.CrtriaCondTypeSK;
                crtriaDtl.CrtriaVal = itemToAddOrUpdate.CrtriaVal;
                crtriaDtl.CrtriaOperTypeSK = (long?)CriteriaOperatorType.And;

                crtriaDtl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                crtriaDtl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                crtriaDtl.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                crtriaDtl.LastModfdTs = timeStamp;

                if (itemToAddOrUpdate.Deleted == true)
                {
                    crtriaDtl.DelTs = timeStamp;
                }

                repository.AddOrUpdate(crtriaDtl);

                repository.SaveChanges();

                itemToAddOrUpdate.CrtriaDtlSK = crtriaDtl.CrtriaDtlSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate CriteriaSet
        /// </summary>
        /// <param name="itemToValidate">the CriteriaSet to Validate</param>
        /// <returns>List of Message</returns>
        public List<Message> ValidateCriteriaSet(CriteriaSetVM itemToValidate)
        {
            List<Message> result = new List<Message>();

            if (itemToValidate.BnftCrtriaSetSK != null)
            {
                long? bnftSK = itemToValidate.BnftSK;

                BnftCrtriaSet bnftCrtriaSet = _repoFactory.BnftCrtriaSet().FindOne(c => c.CrtriaSetName == itemToValidate.CriteriaSetName && c.BnftSK == bnftSK && c.CrtriaSetSK != itemToValidate.CrtriaSetSK);
                if (bnftCrtriaSet != null)
                {
                    result.Add(new Message() { MessageText = string.Format("Rule Name: ({0}) already exists on this benefit.", itemToValidate.CriteriaSetName), Fieldname = "itemToValidate.CriteriaSetName" });
                }
            }
            else
            {
                // do the cvrg set equivalent    
            }

            return result;
        }

        /// <summary>
        /// Remove a Criteria Detail from a Criteria Set
        /// </summary>
        /// <param name="crtriaDtlSK">the Criteria Detail SK</param>
        /// <param name="currentUser">the Current Username</param>
        public void RemoveRuleDetail(long crtriaDtlSK, string currentUser)
        {
            DateTime timestmp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.CriteriaDetail())
            {
                CrtriaDtl crtriaDtl = repository.FindOne(p => p.CrtriaDtlSK == crtriaDtlSK);
                if (crtriaDtl != null)
                {
                    crtriaDtl.LastModfdBy = currentUser;
                    crtriaDtl.LastModfdTs = timestmp;
                    crtriaDtl.DelTs = timestmp;

                    repository.AddOrUpdate(crtriaDtl);
                    repository.SaveChanges();
                }
            }
        }

        /// <summary>
        /// Remove a Criteria Set from a Benefit Definition
        /// </summary>
        /// <param name="bnftCrtriaSetSK">the Benefit Criteria Set SK</param>
        /// <param name="currentUser">the Current Username</param>
        public void RemoveRuleSet(long bnftCrtriaSetSK, string currentUser)
        {
            DateTime timestmp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.CriteriaSet())
            using (var repo_BnftCrtraSet = _repoFactory.BnftCrtriaSet())

            {
                BnftCrtriaSet bnftCrtriaSet = repo_BnftCrtraSet.FindOne(p => p.BnftCrtriaSetSK == bnftCrtriaSetSK);
                if (bnftCrtriaSet != null)
                {
                    bnftCrtriaSet.LastModfdBy = currentUser;
                    bnftCrtriaSet.LastModfdTs = timestmp;
                    bnftCrtriaSet.DelTs = timestmp;

                    repo_BnftCrtraSet.AddOrUpdate(bnftCrtriaSet);

                    CrtriaSet crtriaSet = repository.FindOne(p => p.CrtriaSetSK == bnftCrtriaSet.CrtriaSetSK);
                    if (crtriaSet != null)
                    {
                        crtriaSet.LastModfdBy = currentUser;
                        crtriaSet.LastModfdTs = timestmp;
                        crtriaSet.DelTs = timestmp;

                        repository.AddOrUpdate(crtriaSet);
                    }

                    repository.SaveChanges();
                }
            }
        }

        #endregion "Public Methods"

        #region "Private Methods"

        /// <summary>
        /// Get Benefit Definition Rule Sets
        /// </summary>
        /// <param name="benefitSK">benefitSK</param>
        /// <returns>Benefit Definition</returns>
        private List<RuleSetVM> GetBenefitDefinitionRuleSets(long benefitSK)
        {
            List<RuleSetVM> ruleSets = new List<RuleSetVM>();

            List<BnftCrtriaSet> bnftCrtriaSets = _repoFactory.BnftCrtriaSet().FindAll(w => w.BnftSK == benefitSK).ToList();

            foreach (BnftCrtriaSet bnftCrtriaSet in bnftCrtriaSets)
            {
                List<CriteriaDetailVM> criteriaDetails = new List<CriteriaDetailVM>();

                criteriaDetails = GetAllRuleDetails(bnftCrtriaSet.CrtriaSetSK);

                RuleSetVM ruleSet = new RuleSetVM()
                {
                    CrtriaSetTypeSK = (long)CriteriaSetType.BenefitDefinition,
                    BnftCrtriaSetSK = bnftCrtriaSet.BnftCrtriaSetSK,
                    CvrgSetCrtriaSetSK = null,
                    BnftSK = benefitSK,
                    CvrgSetSK = null,
                    CrtriaSetSK = bnftCrtriaSet.CrtriaSetSK,
                    CriteriaSetName = bnftCrtriaSet.CrtriaSetName,
                    CrtriaSetPrity = bnftCrtriaSet.CrtriaSetPrity,
                    EfctvStartDt = bnftCrtriaSet.EfctvStartDt,
                    EfctvEndDt = bnftCrtriaSet.EfctvEndDt,
                    CriteriaDetails = criteriaDetails
                };

                ruleSets.Add(ruleSet);
            }

            return ruleSets;
        }

        /// <summary>
        /// Get Coverage Set Rule Sets
        /// </summary>
        /// <param name="cvrgSetSK">cvrgSetSK</param>
        /// <returns>CoverageSet Rule Sets</returns>
        private List<RuleSetVM> GetCoverageSetRuleSets(long cvrgSetSK)
        {
            List<RuleSetVM> ruleSets = new List<RuleSetVM>();

            List<CvrgSetCrtriaSet> cvrgSetCrtriaSets = _repoFactory.CoverageSetCriteriaSet().FindAll(w => w.CvrgSetSK == cvrgSetSK).ToList();

            foreach (CvrgSetCrtriaSet cvrgSetCrtriaSet in cvrgSetCrtriaSets)
            {
                List<CriteriaDetailVM> criteriaDetails = new List<CriteriaDetailVM>();

                criteriaDetails = GetAllRuleDetails(cvrgSetCrtriaSet.CrtriaSetSK);

                RuleSetVM ruleSet = new RuleSetVM()
                {
                    CrtriaSetTypeSK = (long)CriteriaSetType.CoverageSet,
                    BnftCrtriaSetSK = null,
                    CvrgSetCrtriaSetSK = cvrgSetCrtriaSet.CvrgSetCrtriaSetSK,
                    BnftSK = null,
                    CvrgSetSK = cvrgSetCrtriaSet.CvrgSetSK,
                    CrtriaSetSK = cvrgSetCrtriaSet.CrtriaSetSK,
                    CriteriaSetName = cvrgSetCrtriaSet.CrtriaSetName,
                    CrtriaSetPrity = cvrgSetCrtriaSet.CrtriaSetPrity,
                    EfctvStartDt = cvrgSetCrtriaSet.EfctvStartDt,
                    EfctvEndDt = cvrgSetCrtriaSet.EfctvEndDt,
                    CriteriaDetails = criteriaDetails
                };

                ruleSets.Add(ruleSet);
            }

            return ruleSets;
        }

        #endregion "Private Methods"
    }
}