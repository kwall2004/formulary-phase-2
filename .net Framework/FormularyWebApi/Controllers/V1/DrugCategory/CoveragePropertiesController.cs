using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    /// <summary>
    /// Formulary Coverage Properties controller
    /// </summary>
    public class CoveragePropertiesController : ApiController
    {
        private IDrugCategoryBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public CoveragePropertiesController(IDrugCategoryBLL bll, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
            _bll = bll;
        }

        /// <summary>
        /// Returns coverage properties by drug category ID
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCoveragePropertiesByDrugCategory(long drugCategorySK)
        {
            try
            {
                var result = new QueryResult<spCoverageProperties_Get_Result>();
                using (var repo = _FormularyRepoFactory.DrugCategory())
                {

                    List<spCoverageProperties_Get_Result> values = repo.GetCoverageProperties(drugCategorySK);
                    result.Count = values.Count();
                    result.Rows = values;
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostCoverageProperties(spCoverageProperties_Get_Result drugCoverage)
        {
            return PutOrPostCoverageProperties(drugCoverage);
        }

        [HttpPut]
        public IHttpActionResult PutCoverageProperties(spCoverageProperties_Get_Result drugCoverage)
        {
            return PutOrPostCoverageProperties(drugCoverage);
        }

        private IHttpActionResult PutOrPostCoverageProperties (spCoverageProperties_Get_Result drugCoverage)
        {
            try
            {
                int result;
                using (var repo = _FormularyRepoFactory.DrugCategory())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    if(string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId must be passed in the header");
                    }
                    drugCoverage.UserId = userId;
                    result = repo.SetCoverageProperties(drugCoverage);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
