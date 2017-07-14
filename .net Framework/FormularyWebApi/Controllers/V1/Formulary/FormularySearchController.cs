using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// Formulary Search controller
    /// </summary>
    public class FormularySearchController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularySearchController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Returns all formularies based on search criteria
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult FormularySearch(string searchString)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    List<spFormulary_FullTextSearch_Result> formularies = repo.FormularyFullSearch(searchString);
                    var result = new QueryResult<spFormulary_FullTextSearch_Result>() { Rows = formularies, Count = formularies.Count };
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
