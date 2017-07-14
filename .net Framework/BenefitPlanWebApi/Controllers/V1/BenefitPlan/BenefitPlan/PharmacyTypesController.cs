using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;


namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Pharmacy Types Controller for Benefit Plan
    /// </summary>
    public class PharmacyTypesController : ApiController
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the Pharmacy Types Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public PharmacyTypesController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All the pharmacy Types for the dropdownlist
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllPharmacyTypes()
        {

            try
            {
                List<PharmType> pharmacyTypes = _repoFactory.PharmacyType().FindAll().ToList();
                var result = new QueryResult<PharmType>() { Rows = pharmacyTypes, Count = pharmacyTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Gets the Pharmacy Types by Benefit Plan Id
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetPharmTypes(long bnftPlanSK)
        {
            try
            {
   
                IQueryable<BnftPlanPharmType> bnftPharmTypes = _repoFactory.BenefitPlanPharmacyType().FindAll(s => s.BnftPlanSK == bnftPlanSK);
                IQueryable<PharmType> pharmTypes = _repoFactory.PharmacyType().FindAll();
                List<PharmType> selectedPharmacyTypes = pharmTypes.ToList().Where(p => bnftPharmTypes.Any(a => p.PharmTypeSK == a.PharmTypeSK)).ToList();
                var result = new QueryResult<PharmType>() { Rows = selectedPharmacyTypes, Count = selectedPharmacyTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
