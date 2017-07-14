using Atlas.Core.WebApi.Services;
using Atlas.Reference.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class DrugValidationController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IReferenceRepositoryFactory _referenceRepoFactory;

        public DrugValidationController(IExceptionMessageGenerator exceptionResponseGenerator, IReferenceRepositoryFactory refRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _referenceRepoFactory = refRepoFactory;
        }

        [HttpGet]
        public IHttpActionResult NDCSearch(string NDCs, string dataSource)
        {
            try
            {
                using (var repo = _referenceRepoFactory.Validation())
                {
                    var result = repo.ValidateNDC(NDCs, dataSource);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult ETCSearch(int ETC)
        {
            try
            {
                using (var repo = _referenceRepoFactory.Validation())
                {
                    var result = repo.ValidateETC(ETC);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GCNSearch(long GCN)
        {
            try
            {
                using (var repo = _referenceRepoFactory.Validation())
                {
                    var result = repo.ValidateGCN(GCN);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GPISearch(string GPI)
        {
            try
            {
                using (var repo = _referenceRepoFactory.Validation())
                {
                    var result = repo.ValidateGPI(GPI);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult MedIdSearch(long MedId)
        {
            try
            {
                using (var repo = _referenceRepoFactory.Validation())
                {
                    var result = repo.ValidateMedId(MedId);
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
