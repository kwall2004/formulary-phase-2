using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyCompareController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public FormularyCompareController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator )
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetUMCriteriaList()
        {
            try
            {
                using (var repo = _repoFactory.FormularyCompare())
                {
                    List<spCvrgPrptyType_GetAll_Result> UMCriteria = repo.GetUMCriteria();
                    return Ok(UMCriteria);
                }            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
