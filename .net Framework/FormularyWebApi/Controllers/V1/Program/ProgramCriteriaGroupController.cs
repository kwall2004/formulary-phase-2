using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Program
{
    public class ProgramCriteriaGroupController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public ProgramCriteriaGroupController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPut]
        public IHttpActionResult PutProgramCriteriaGroup(CvrgPrptyPgmCrtriaGrpSP programCriteriaGroup)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    programRepo.SetCoveragePropertyProgramCriteriaGroup(programCriteriaGroup);
                    return Ok("Successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetProgramCriteriaGroup(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.GetCoveragePropertyProgramCriteriaGroup(coveragePropertyProgramSK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteProgramCriteriaGroup(long coveragePropertyProgramSK)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    programRepo.DeleteCoveragePropertyProgramCriteriaGroup(coveragePropertyProgramSK, userId);
                    return Ok("Successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
