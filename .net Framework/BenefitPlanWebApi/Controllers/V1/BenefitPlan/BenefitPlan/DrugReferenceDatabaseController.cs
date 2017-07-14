using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class DrugReferenceDatabaseController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DrugReferenceDatabaseController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        #region DrugReferenceDatabase
        /// <summary>
        /// Get all the Drug Reference Database and return them in a list
        /// </summary>
        /// <returns>List of DrugReferenceDatabase</returns>
        [HttpGet]
        public IHttpActionResult DrugReferenceDatabaseTypes()
        {
            try
            {
                using (var repo = _repoFactory.DrugReferenceDatabase())
                {
                    List<DrugRefDb> drugReferenceDatabase = repo.FindAll().ToList();
                    var result = new QueryResult<DrugRefDb>() { Rows = drugReferenceDatabase, Count = drugReferenceDatabase.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get the Drug Reference Database that applies for a FrmlrySK
        /// </summary>
        /// <param name="frmlrySK">frmlrySK</param>
        /// <returns>List of DrugReferenceDatabase</returns>
        [HttpGet]
        public IHttpActionResult DrugReferenceDatabaseTypes(long frmlrySK)
        {
            try
            {
                using (var repoFrmly = _repoFactory.Formulary())
                using (var repo = _repoFactory.DrugReferenceDatabase())
                {
                    long drugRefDbSK = repoFrmly.FindOne(f => f.FrmlrySK == frmlrySK).DrugRefDbSK;
                    
                    List<DrugRefDb> drugReferenceDatabase = repo.FindAll(d => d.DrugRefDbSK == drugRefDbSK).ToList();
                    var result = new QueryResult<DrugRefDb>() { Rows = drugReferenceDatabase, Count = drugReferenceDatabase.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
        #endregion
    }
}
