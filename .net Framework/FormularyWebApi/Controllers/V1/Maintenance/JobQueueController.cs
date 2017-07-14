using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Formulary.DAL;
using Atlas.Reference.DAL;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.BLL.Maintenance;
using Atlas.Core.WebApi.Services;
using System.Linq;

namespace AtlasWebApi.Controllers.V1.Maintenance
{
    /// <summary>
    /// Formulary Job Queue controller
    /// </summary>
    public class JobQueueController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IJobQueueBLL _bll;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public JobQueueController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IJobQueueBLL bll)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _bll = bll;
        }

        /// <summary>
        /// Returns all job queues.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetJobQueue(string userId, DateTime? from = null, DateTime? to = null)
        {
            try
            {
                using (var repo = _repoFactory.JobQueue())
                {
                    var jobQueues = _bll.GetJobQueuesByUserId(userId, from, to);
                    return Ok(jobQueues);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        
        [HttpGet]
        public IHttpActionResult GetUsersForJobQueue()
        {
            try
            {
                using (var repo = _repoFactory.JobQueue())
                {
                    var users = repo.GetAllUsersForJobQueue();
                    var viewModelList = new List<JobQueueUsersVM>();
                    users.ForEach(c => viewModelList.Add(new JobQueueUsersVM { userId = c }));
                    return Ok(viewModelList);
                }
            }   
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            } 
        
        }




        [HttpDelete]
        public IHttpActionResult DeleteJobQueue(long JobSK)
        {
            try
            {
                using (var repo = _repoFactory.JobQueue())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    if (string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId not found in header.");
                    }

                    repo.DeleteJobQueue(JobSK);

                    return Ok("Successful.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
