using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// Class Drug Reference Database BLL.
    /// </summary>
    public class DrugReferenceDatabaseBLL : IDrugReferenceDatabaseBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;
        
        /// <summary>
        /// Medispan DataSource Text & Qualifier Types
        /// </summary>
        private const string MedispanDatasource = "Medispan";
        private const string MedispanQualifierType = "GPI";

        /// <summary>
        /// FDB or First Data Bank DataSource Text & Qualifier Types
        /// </summary>
        private const string FDBDatasource = "FDB";
        private const string FDBQualifierType = "GCN";


        /// <summary>
        /// The Constructor for the Entity BLL for Benefit Plan
        /// </summary>
        /// <param name="criteriaGroupBLL">The criteria group BLL.</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public DrugReferenceDatabaseBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get the List of Copay Override Qualifier Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Copay Override Qualifier Type</returns>
        public List<CopayOvrrdQulfrType> GetCopayOverrideQualifierType(long bnftPlanSK)
        {
            List<CopayOvrrdQulfrType> qualifierTypes = new List<CopayOvrrdQulfrType>();

            qualifierTypes.AddRange(
                _repoFactory.CopayOverrideQualifierType()
                    .FindAll(w => w.CopayOvrrdQulfrTypeCode != FDBQualifierType && w.CopayOvrrdQulfrTypeCode != MedispanQualifierType)
            );

            switch (GetDrugDatabaseReferenceDatasource(bnftPlanSK))
            {
                case MedispanDatasource:
                    qualifierTypes.AddRange(_repoFactory.CopayOverrideQualifierType().FindAll(w => w.CopayOvrrdQulfrTypeCode == MedispanQualifierType));
                    break;
                case FDBDatasource:
                    qualifierTypes.AddRange(_repoFactory.CopayOverrideQualifierType().FindAll(w => w.CopayOvrrdQulfrTypeCode == FDBQualifierType));
                    break;
                default:
                    break;
            }
            return qualifierTypes.OrderBy(o => o.CopayOvrrdQulfrTypeCode).ToList();
        }

        /// <summary>
        /// Get the List of Deductible Exclusion Qualifier Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Deductible Exclusion Qualifier Type</returns>
        public List<DeducblExclQulfrType> GetDeductibleExclusionQualifierType(long bnftPlanSK)
        {
            List<DeducblExclQulfrType> qualifierTypes = new List<DeducblExclQulfrType>();

            qualifierTypes.AddRange(
                _repoFactory.DeductibleExclusionQualifierType()
                    .FindAll(w => w.DeducblExclQulfrTypeCode != FDBQualifierType && w.DeducblExclQulfrTypeCode != MedispanQualifierType)
            );

            switch (GetDrugDatabaseReferenceDatasource(bnftPlanSK))
            {
                case MedispanDatasource:
                    qualifierTypes.AddRange(_repoFactory.DeductibleExclusionQualifierType().FindAll(w => w.DeducblExclQulfrTypeCode == MedispanQualifierType));
                    break;
                case FDBDatasource:
                    qualifierTypes.AddRange(_repoFactory.DeductibleExclusionQualifierType().FindAll(w => w.DeducblExclQulfrTypeCode == FDBQualifierType));
                    break;
                default:
                    break;
            }
            return qualifierTypes.OrderBy(o => o.DeducblExclQulfrTypeCode).ToList();
        }

        /// <summary>
        /// Get the List of Drug Class Type for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Drug Class Type</returns>
        public List<DrugClsType> GetDrugClassType(long bnftPlanSK)
        {
            List<DrugClsType> classTypes = new List<DrugClsType>();

            classTypes.AddRange(
                _repoFactory.DrugClassType()
                    .FindAll(w => !w.DrugClsTypeCode.StartsWith(FDBQualifierType) && !w.DrugClsTypeCode.StartsWith(MedispanQualifierType))
            );

            switch (GetDrugDatabaseReferenceDatasource(bnftPlanSK))
            {
                case MedispanDatasource:
                    classTypes.AddRange(_repoFactory.DrugClassType().FindAll(w => w.DrugClsTypeCode.StartsWith(MedispanQualifierType)));
                    break;
                case FDBDatasource:
                    classTypes.AddRange(_repoFactory.DrugClassType().FindAll(w => w.DrugClsTypeCode.StartsWith(FDBQualifierType)));
                    break;
                default:
                    break;
            }
            return classTypes.OrderBy(o => o.DrugClsTypeCode).ToList();
        }

        /// <summary>
        /// Get the List of Early Refill Exception Qualifier Types for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Early Refill Exception Qualifier Type</returns>
        public List<EarlyRefillExcpQulfrType> GetEarlyRefillExceptionQualifierType(long bnftPlanSK)
        {
            List<EarlyRefillExcpQulfrType> qualifierTypes = new List<EarlyRefillExcpQulfrType>();

            qualifierTypes.AddRange(
                _repoFactory.EarlyRefillExcptionQulfierType()
                    .FindAll(w => w.EarlyRefillExcpQulfrTypeCode != FDBQualifierType && w.EarlyRefillExcpQulfrTypeCode != MedispanQualifierType)
            );

            switch (GetDrugDatabaseReferenceDatasource(bnftPlanSK))
            {
                case MedispanDatasource:
                    qualifierTypes.AddRange(_repoFactory.EarlyRefillExcptionQulfierType().FindAll(w => w.EarlyRefillExcpQulfrTypeCode == MedispanQualifierType));
                    break;
                case FDBDatasource:
                    qualifierTypes.AddRange(_repoFactory.EarlyRefillExcptionQulfierType().FindAll(w => w.EarlyRefillExcpQulfrTypeCode == FDBQualifierType));
                    break;
                default:
                    break;
            }
            return qualifierTypes.OrderBy(o => o.EarlyRefillExcpQulfrTypeCode).ToList();
        }

        /// <summary>
        /// Get the List of Plan Cap Limits Qualifier Types for a Benefit Plan
        /// Filtered by the Drug Reference Database ID for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Plan Cap Limits Qualifier Type</returns>
        public List<PlanCapLimQulfrType> GetPlanCapLimitsQualifierType(long bnftPlanSK)
        {
            List<PlanCapLimQulfrType> qualifierTypes = new List<PlanCapLimQulfrType>();

            qualifierTypes.AddRange(
                _repoFactory.PlanCapLimitQualifierType()
                    .FindAll(w => w.PlanCapLimQulfrTypeCode != FDBQualifierType && w.PlanCapLimQulfrTypeCode != MedispanQualifierType)
            );

            switch (GetDrugDatabaseReferenceDatasource(bnftPlanSK))
            {
                case MedispanDatasource:
                    qualifierTypes.AddRange(_repoFactory.PlanCapLimitQualifierType().FindAll(w => w.PlanCapLimQulfrTypeCode == MedispanQualifierType));
                    break;
                case FDBDatasource:
                    qualifierTypes.AddRange(_repoFactory.PlanCapLimitQualifierType().FindAll(w => w.PlanCapLimQulfrTypeCode == FDBQualifierType));
                    break;
                default:
                    break;
            }
            return qualifierTypes.OrderBy(o => o.PlanCapLimQulfrTypeCode).ToList();
        }

        #region " Private Methods "
        /// <summary>
        /// Get the Drug Database Reference Data source for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>the Database Reference Data source</returns>
        private string GetDrugDatabaseReferenceDatasource(long bnftPlanSK)
        {
            return _repoFactory.BenefitPlan().FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => s.DrugRefDb.DrugRefDbName).FirstOrDefault() ?? string.Empty;
        }
        #endregion
    }
}
