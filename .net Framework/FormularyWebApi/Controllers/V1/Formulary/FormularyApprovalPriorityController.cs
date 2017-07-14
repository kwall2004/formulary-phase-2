using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyApprovalPriorityController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyApprovalPriorityController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        [HttpGet]
        public IHttpActionResult GetFormularyApprovalPriority(long formularySK)
        {
            try
            {
                using (var repo = _repoFactory.FormularyReview())
                {
                    var result = new QueryResult<spFmrlry_GetAprvlPrity_Result>();
                    var ap = repo.GetFormularyApprovalPriority(formularySK);

                    if (ap.Count > 0)
                    {
                        result.Count = ap.Count;
                        result.Rows.AddRange(ap);
                    }

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
