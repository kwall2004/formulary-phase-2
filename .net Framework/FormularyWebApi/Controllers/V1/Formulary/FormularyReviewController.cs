using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// Formulary Review WebApi controller
    /// </summary>
    public class FormularyReviewController : ApiController
    {

        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyReviewBLL _BLL;
        
        public FormularyReviewController(IFormularyReviewBLL bll, IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _BLL = bll;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Initiates the formulary review
        /// </summary>
        /// <param name="formularyId"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult InitiateFormularyReview(long formularySK)
        {
            try
            {
                using (var repo = _repoFactory.FormularyReview())
                {
                    repo.InitiateFormularyReview(formularySK);
                    return Ok();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetFormularyReview(long formularySK, long? DrugCatgSK = null, long? ETC_ID = null, string AHFS_Id = null, string GPI = null, 
            int? tierSK = null, string criteriaProperty = null, string criteriaOperator = null, string criteriaValue = null)
        {
            try
            {
                Criteria criteria = null; 

                if (criteriaProperty != null && criteriaOperator != null && criteriaValue != null)
                {
                    criteria = new Criteria() { Property = criteriaProperty, Operator = criteriaOperator, Value = criteriaValue };
                }

                var queryResult = _BLL.GetFormularyReview(formularySK, DrugCatgSK, ETC_ID, AHFS_Id, GPI, tierSK, criteria);
                var returnedResult = new QueryResult<spFormularyReview_GetV2_Result>()
                {
                    Count = queryResult.Count,
                    Rows = queryResult
                };
                return Ok(returnedResult);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        
    }
}