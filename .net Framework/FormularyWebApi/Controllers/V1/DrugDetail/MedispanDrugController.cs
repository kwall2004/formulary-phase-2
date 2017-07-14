using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugDetail
{
    public class MedispanDrugController : ApiController
    {
        private IReferenceRepositoryFactory _refFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="refFactory">Reference repositry factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public MedispanDrugController(IReferenceRepositoryFactory refFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _refFactory = refFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult getMedispanDrugByNDC(string ndc)
        {
            try
            {
                using (var repo = _refFactory.MedispanDrugList())
                {
                    var result = new QueryResult<MedispanDrugList>();
                    var match = repo.FindOne(d => d.NDC == ndc);

                    if (match != null)
                    {
                        match.LabelName = match.LabelName.TrimEnd();
                        result.Count = 1;
                        result.Rows.Add(match);
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
