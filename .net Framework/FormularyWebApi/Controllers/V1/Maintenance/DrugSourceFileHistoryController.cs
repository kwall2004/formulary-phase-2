using System;
using System.Web.Http;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Reference.DAL;
using Atlas.Core.WebApi.Services;

namespace AtlasWebApi.Controllers.V1.Maintenance
{
    /// <summary>
    /// Formulary Job Queue controller
    /// </summary>
    public class DrugSourceFileHistoryController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IReferenceRepositoryFactory _refFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="refFactory">Reference repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DrugSourceFileHistoryController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Returns all job queues.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDrugSourceFileHistory(DateTime startDate, DateTime endDate)
        {
            try
            {
                using (var repo = _repoFactory.DrugSourceFileHistory())
                {
                    var repoResult = repo.GetDrugSourceFileHistory(startDate, endDate.AddDays(1));

                    var result = new QueryResult<spDrugSourceFileHistory_Get_Result>() { Rows = repoResult, Count = repoResult.Count };
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }
    }
}
