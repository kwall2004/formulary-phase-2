using Atlas.Core.DAL.Exceptions;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Net;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// Dashboard FormularyApprove controller
    /// </summary>
    public class FormularyApproveController : ApiController
    {

        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyApproveController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Approve the Dashboard Formulary 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult CreateFormularyApprove(DashboardVM request)
        {
            try
            {
                if (request == null)
                {
                    throw new ArgumentException("This service requires a properly formatted request object!");
                }

                                
                using (var formRepo = _repoFactory.Formulary())
                          
                {
                    if (request.UserId!= null)
                    {
                       formRepo.DashboardFormularyApprove(request.FrmlrySK, request.AprvlTypePrity, request.AprvlNotes, request.UserId);
                    }
                    else
                    {
                        throw new ArgumentException("This service requires a non-null UserId");
                    }

                }
                return Ok();

            }
            catch (StoredProcedureException ex)
            {
                return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "730", ex.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }


        }


    }
}