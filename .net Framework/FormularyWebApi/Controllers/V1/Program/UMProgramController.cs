using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Program
{
    public class UMProgramController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public UMProgramController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetAllPrograms()
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.GetAllCoveragePropertyPrograms();
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteProgram(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    programRepo.DeleteCoveragePropertyProgram(coveragePropertyProgramSK, userId);
                    return Ok("Successful delete.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult CopyProgram(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = programRepo.CopyCoveragePropertyProgram(coveragePropertyProgramSK, userId);
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
