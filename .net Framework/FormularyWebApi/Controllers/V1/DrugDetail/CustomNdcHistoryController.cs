using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugDetail
{
    public class CustomNdcHistoryController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _formularyFactory;

        public CustomNdcHistoryController(IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory formularyFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _formularyFactory = formularyFactory;
        }

        [HttpGet]
        public IHttpActionResult GetNDCChangeHistory(string NDC)
        {
            try
            {
                using (var repo = _formularyFactory.CustomNDC())
                {
                    var result = repo.GetAllNDCChangeHistory(NDC);
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
