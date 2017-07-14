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
    /// The MAC List Controller for Benefit Plan
    /// </summary>
    public class MACListController : ApiController
    {
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitServiceType Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public MACListController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the MAC Lists and return them in a list
        /// </summary>
        /// <returns>List of MAC Lists</returns>
        [HttpGet]
        public IHttpActionResult MACLists()
        {
            try
            {
                List<MACList> macLists = GetAllMACList();
                var result = new QueryResult<MACList>() { Rows = macLists, Count = macLists.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the MAC Lists from the repository
        /// </summary>
        /// <returns>List of MAC Lists</returns>
        private List<MACList> GetAllMACList()
        {
            using (var repo = _repoFactory.MACList())
            {
                List<MACList> macList = repo.FindAll().ToList();
                return macList;
            }
        }
    }
}
