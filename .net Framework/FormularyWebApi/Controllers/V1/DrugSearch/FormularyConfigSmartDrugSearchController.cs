using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class FormularyConfigSmartDrugSearchController : ApiController
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
        public FormularyConfigSmartDrugSearchController(IDrugSearchBLL bll, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _bll = bll;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        /// <summary>
        /// Search drugs based on smart search text string only. 
        /// </summary>
        /// <param name="queryString">Search query</param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult FdbSmartDrugSearchColumn(string queryString, long frmlrySK, long smartColumnSK)
        {
            try
            {
                QueryResult<SmartSearchResult> result = _bll.FormularyConfigSmartSearch(queryString, frmlrySK, smartColumnSK);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult FdbSmartDrugSearch(string queryString, long frmlrySK)
        {
            try
            {
                QueryResult<SmartSearchResult> result = _bll.FormularyConfigSmartSearch(queryString, frmlrySK, null);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
