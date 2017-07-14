using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Models.Requests;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.DAL;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    /// <summary>
    /// Drug Search API Endpoints
    /// </summary>
    public class DrugSearchController : ApiController
    {
        private IDrugSearchBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="bll">Drug search BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public DrugSearchController(IDrugSearchBLL bll, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _bll = bll;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        /// <summary>
        /// Search drugs based on array of queries. 
        /// </summary>
        /// <param name="query">Drug search query</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult FdbDrugSearch(DrugSearchRequest<Criteria> query)
        {
            try
            {
                var result = _bll.Search(query.Payload,
                                         query.StartIndex,
                                         query.Count,
                                         query.FormularySK,
                                         query.OrderBy,
                                         query.userId,
                                         query.CriteriaChange,
                                         query.SessionId,
                                         query.DrugListSK, 
                                         query.CoveragePropertyProgramSK);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
