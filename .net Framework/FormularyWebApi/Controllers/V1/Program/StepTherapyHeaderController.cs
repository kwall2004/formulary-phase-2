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
    public class StepTherapyHeaderController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public StepTherapyHeaderController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetStepTherapyHeader(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.GetStepTherapyHeader(coveragePropertyProgramSK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostStepTherapyHeader(StepTherapyProgramVM data)
        {
            string userId = Request.Headers.GetValues("username").FirstOrDefault();
            data.StepThrpyPgmSK = null;
            data.CvrgPrptyPgmSK = null;
            return SetStepTherapyHeader(data, userId);
        }

        [HttpPut]
        public IHttpActionResult PutStepTherapyHeader(StepTherapyProgramVM data)
        {
            string userId = Request.Headers.GetValues("username").FirstOrDefault();
            return SetStepTherapyHeader(data, userId);
        }

        private IHttpActionResult SetStepTherapyHeader(StepTherapyProgramVM data, string userId)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.SetStepTherapyHeader(data, userId);
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
