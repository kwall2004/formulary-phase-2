using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    /// <summary>
    /// Full text drug search controller
    /// </summary>
    public class MissingNDCGCNSearchController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="bll">Drug search BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public MissingNDCGCNSearchController(IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        /// <summary>
        /// Search drugs based on smart search text string only. 
        /// </summary>
        /// <param name="queryString">Search query</param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Search(string queryString)
        {
            try
            {
                var result = new QueryResult<spMissingNDCGCN_Search_Result>();

                using (var repo = _FormularyRepoFactory.DrugSearch())
                {
                    var queryResult = repo.MissingNDCGCNSearch(queryString);

                    // Trim fields because SQL server is being goofy. 
                    foreach (var qr in queryResult)
                    {
                        qr.GCN_SEQNO = qr.GCN_SEQNO.TrimEnd();
                        qr.LabelName = qr.LabelName.TrimEnd();
                        qr.NDC = qr.NDC.TrimEnd();
                    }

                    result.Rows = queryResult;
                    result.Count = queryResult.Count;
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
