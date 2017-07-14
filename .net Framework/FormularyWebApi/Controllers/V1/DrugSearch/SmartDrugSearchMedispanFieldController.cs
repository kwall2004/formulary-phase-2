using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Reference.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class SmartDrugSearchMedispanFieldController : ApiController
    {
        private IReferenceRepositoryFactory _referenceRepositoryFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public SmartDrugSearchMedispanFieldController(IReferenceRepositoryFactory referenceRepositoryFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _referenceRepositoryFactory = referenceRepositoryFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetSmartDrugSearchFields()
        {
            try
            {
                using (var repository = _referenceRepositoryFactory.SmartSearch())
                {
                    var groupObject = repository.GetSmartSearchGroupType("Drug Search - Medispan");
                    var result = repository.GetSmartSearchFields((int)groupObject.SmartSearchGroupSK);
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
