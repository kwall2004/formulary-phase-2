using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugCriteria;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugCriteria
{
    public class DrugCriteriaController : ApiController
    {
        private IDrugCriteriaBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DrugCriteriaController(IDrugCriteriaBLL bll, IExceptionMessageGenerator exResponseGenerator)
        {
            _bll = bll;
            _exceptionResponseGenerator = exResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetDrugCategoryCriteria(long drugCategorySK)
        {
            try
            {
                var result = _bll.GetCriteriaForDrugCategorySK(drugCategorySK);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
