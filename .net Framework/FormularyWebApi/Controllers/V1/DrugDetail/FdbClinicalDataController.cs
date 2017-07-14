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

namespace AtlasWebApi.Controllers.V1.DrugDetail
{
    public class FdbClinicalDataController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _repoFactory;

        public FdbClinicalDataController(IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory repoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _repoFactory = repoFactory;
        }

        [HttpGet]
        public IHttpActionResult GetFdbClinicalData(string NDC)
        {
            try
            {
                using (var repo = _repoFactory.NDCNotes())
                {
                    var result = repo.GetFdbClinicalData(NDC);
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
