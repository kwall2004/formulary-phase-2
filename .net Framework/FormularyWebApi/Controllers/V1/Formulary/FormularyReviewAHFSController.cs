using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyReviewAHFSController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyReviewBLL _bll;

        public FormularyReviewAHFSController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyReviewBLL bll)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _bll = bll;
        }

        [HttpGet]
        public IHttpActionResult GetFormularyReviewAHFS(long formularySK)
        {
            try
            {
                var result = _bll.FormularyAhfsTree(formularySK);
                return Ok(result);               

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
