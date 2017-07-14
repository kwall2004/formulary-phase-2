using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugList
{
    public class DrugListFormularyController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DrugListFormularyController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Gets all formularies by DrugList
        /// </summary>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetFormulariesByDrugList(long drugListSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.GetFormulariesByDrugList(drugListSK);
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
