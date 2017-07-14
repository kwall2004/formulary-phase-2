using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels.ProgramVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Program
{
    public class PriorAuthorizationHeaderController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public PriorAuthorizationHeaderController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetPriorAuthorizationHeader(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.GetPriorAuthorizationHeader(coveragePropertyProgramSK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostPriorAuthorizationHeader(PriorAuthorizationProgramVM data)
        {
            string userId = Request.Headers.GetValues("username").FirstOrDefault();
            data.PAPgmSK = null;
            data.CvrgPrptyPgmSK = null;
            return SetPriorAuthorizationHeader(data, userId);
        }

        [HttpPut]
        public IHttpActionResult PutPriorAuthorizationHeader(PriorAuthorizationProgramVM data)
        {
            string userId = Request.Headers.GetValues("username").FirstOrDefault();
            return SetPriorAuthorizationHeader(data, userId);
        }

        private IHttpActionResult SetPriorAuthorizationHeader(PriorAuthorizationProgramVM data, string userId)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.SetPriorAuthorizationHeader(data, userId);
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
