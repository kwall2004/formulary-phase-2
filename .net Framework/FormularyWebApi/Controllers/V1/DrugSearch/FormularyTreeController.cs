using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models.Containers;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    /// <summary>
    /// Formulary Tree controller
    /// </summary>
    public class FormularyTreeController : ApiController
    {
        private IDrugSearchBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public FormularyTreeController(IDrugSearchBLL bll, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _bll = bll;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        /// <summary>
        /// Returns a tree of ETCs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult FormularyTrees()
        {
            try
            {
                var result = new TreeChildren();
                result = _bll.FormularyEtcTree();
                return Ok(new { children = result });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
