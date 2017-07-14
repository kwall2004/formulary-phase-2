using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class NewDrugsToMarketController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        public NewDrugsToMarketController(IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        [HttpGet]
        public IHttpActionResult GetNewDrugsToMarket(int? etcId = null, string drugType = null,  DateTime? fromDate = null, DateTime? thruDate = null)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.NewDrugsToMarket())
                {
                    var result = repo.GetAllNewDrugsToMarket(fromDate, thruDate, drugType, etcId).ToList();
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
        [HttpGet]
        public IHttpActionResult GetAllFormulariesByNDC(string NDC)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.NewDrugsToMarket())
                {
                    var result = repo.GetAllFormulariesByNDC(NDC).ToList();
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetNewDrugsToMarketFullText(string searchString)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.NewDrugsToMarket())
                {
                    var result = repo.GetNewDrugsToMarketFullTextSearch(searchString);
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
