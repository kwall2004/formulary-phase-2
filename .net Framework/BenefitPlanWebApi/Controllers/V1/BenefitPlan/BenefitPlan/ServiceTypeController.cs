using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Service Type Controller for Benefit Plan
    /// </summary>
    public class ServiceTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Service Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ServiceTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Service Types and return them in a list
        /// </summary>
        /// <returns>List of Service Types</returns>
        [HttpGet]
        public IHttpActionResult ServiceTypes()
        {
            try
            {
                List<SvcType> serviceTypes = GetAllServiceTypes();
                var result = new QueryResult<SvcType>() { Rows = serviceTypes, Count = serviceTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the ServiceTypes from the drepository
        /// </summary>
        /// <returns>List of ServiceTypes</returns>
        private List<SvcType> GetAllServiceTypes()
        {
            using (var repo = _repoFactory.ServiceType())
            {
                List<SvcType> serviceTypes = repo.FindAll().ToList();
                return serviceTypes;
            }
        }

    }
}