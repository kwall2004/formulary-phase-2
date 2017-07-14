using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Pharmacy Type Day Supply Controller for Benefit Plan
    /// </summary>

    public class PharmacyTypeDaySupplyController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copay Configuration Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PharmacyTypeDaySupplyController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Pharmacy Type with Day Supply
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>the Benefit Plan Pharmacy Type with Day Supply</returns>
        [HttpGet]
        public IHttpActionResult GetPharmacyTypesWithDaySupply(long bnftPlanSK, long pharmTypeSK = 0)
        {
            try
            {
                List<PharmacyTypeWithDaySupply> pharmacyTypes = PopulatePharmacyTypesWithDaySupply(bnftPlanSK, pharmTypeSK);
                var result = new QueryResult<PharmacyTypeWithDaySupply>() { Rows = pharmacyTypes, Count = pharmacyTypes.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        #region " Private Methods "
        /// <summary>
        /// Populate the Pharmacy Type with Day Supply
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <param name="pharmTypeSK">the Pharmacy Type ID</param>
        /// <returns>the Benefit Plan Pharmacy Type with Day Supply</returns>
        private List<PharmacyTypeWithDaySupply> PopulatePharmacyTypesWithDaySupply(long bnftPlanSK, long pharmTypeSK)
        {
            List<PharmacyTypeWithDaySupply> pharmacyTypes = _repoFactory.BenefitPlanPharmacyType()
                .FindAll(w => w.BnftPlanSK == bnftPlanSK && (w.PharmTypeSK == pharmTypeSK || pharmTypeSK == 0))
                .Select(s => new PharmacyTypeWithDaySupply()
                {
                    BnftPlanPharmTypeSK = s.BnftPlanPharmTypeSK,
                    BnftPlanSK = s.BnftPlanSK,
                    PharmTypeSK = s.PharmTypeSK,
                    PharmTypeCode = s.PharmType.PharmTypeCode
                }).ToList();

            pharmacyTypes.ForEach(pharmType =>
            {
                pharmType.DaySupply.AddRange(GetDaySupply(pharmType.BnftPlanPharmTypeSK));
            });
            return pharmacyTypes;
        }

        /// <summary>
        /// Get the Day Supply Records for the Pharmacy Type
        /// </summary>
        /// <param name="bnftPlanPharmTypeSK">Benefit Plan Pharmacy Type SK</param>
        /// <returns>the List of Day Supply for the Benefit Plan Pharmacy Type</returns>
        private List<DaySupply> GetDaySupply(long bnftPlanPharmTypeSK)
        {
            return _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindAll(w => w.BnftPlanPharmTypeSK == bnftPlanPharmTypeSK)
                .Select(s => new DaySupply()
                {
                    BnftPlanPharmTypeDaySuplSK = s.BnftPlanPharmTypeDaySuplSK,
                    DaySuplTypeSK = s.DaySuplTypeSK,
                    DaySuplTypeCode = s.DaySuplType.DaySuplTypeCode
                }).ToList();
        }

        #endregion
    }
}
