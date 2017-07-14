using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Models.Requests;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// FormularyHeader VersionClone controller
    /// </summary>
    public class FormularyHeaderVersionCloneController : ApiController
    {


        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyHeaderVersionCloneController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Copy or change the version of the formulary header
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult CreateNewFormularyHeaderVersionOrClone(Request<FormularyHeader> request)
        {
            try
            {
                if (request == null || request.Payload == null || request.Payload.Count() < 1)
                {
                    throw new ArgumentException("This service requires a properly formatted request object in payload!");
                }


                FormularyHeader query = request.Payload[0];
                var result = new QueryResult<long>();


                using (var formRepo = _repoFactory.Formulary())
                {
                    if (query.UserId != null)
                    {
                        long sk = formRepo.CopyOrUpdateVersion(query.FormularySK_From, query.IsNewVersion, query.UserId);
                        result.Rows.Add(sk);
                        result.Count = 1;

                    }
                    else
                    {
                        throw new ArgumentException("This service requires a non-null UserId");
                    }

                }

                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }


        }


    }
}