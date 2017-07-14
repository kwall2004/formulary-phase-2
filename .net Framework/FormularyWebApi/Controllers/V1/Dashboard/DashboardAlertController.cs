using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Dashboard
{
    public class DashboardAlertController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DashboardAlertController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetDashboardAlerts(bool IsActionable)
        {
            try
            {
                using (var repo = _repoFactory.Dashboard())
                {
                    var data = repo.GetDashboardAlerts(IsActionable);
                    var result = new QueryResult<spDashboard_Get_Result>();
                    result.Rows = data;
                    result.Count = data.Count;
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutDashboardAlert(long AlertSK)
        {
            try
            {
                var UserId = Request.Headers.GetValues("username").FirstOrDefault();

                if (string.IsNullOrEmpty(UserId))
                {
                    throw new Exception("userId missing from header of request!");
                }

                using (var repo = _repoFactory.Dashboard())
                {
                    repo.PutDashBoardAlerts(AlertSK, UserId);
                    return Ok("Alert update successful.");
                }

            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
