using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugList
{
    public class DrugListActivateController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DrugListActivateController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult ActivateDrugList(long drugListSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    if (string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId missing from header of request!");
                    }

                    repo.ActivateDrugList(drugListSK, userId);                    
                    return Ok("Successful activation.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
