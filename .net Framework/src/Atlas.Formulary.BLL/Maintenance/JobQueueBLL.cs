using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL;
using Atlas.Core.DAL.Models.Containers;

namespace Atlas.Formulary.BLL.Maintenance
{
    /// <summary>
    /// Business logic for job queue.
    /// </summary>
    public class JobQueueBLL : IJobQueueBLL
    {
        private IFormularyRepositoryFactory _repoFactory;

        public JobQueueBLL(IFormularyRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get's all jobs between date range for a specified user. 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="dateFrom"></param>
        /// <param name="dateTo"></param>
        /// <returns></returns>
        /// <remarks>Defaults to last seven days if now dates passed.</remarks>
        public QueryResult<JobQueueVM> GetJobQueuesByUserId(string userId, DateTime? dateFrom = null, DateTime? dateTo = null)
        {
            using (var repo = _repoFactory.JobQueue())
            {
                var jobQueues = repo.GetAllJobsForUserAndRange(userId, dateFrom, dateTo);
                var result = new QueryResult<JobQueueVM>();
                jobQueues.ForEach(c => result.Rows.Add(new JobQueueVM {UserId = userId,
                                                                       JobDesc = c.JobDesc,
                                                                       JobEndTs = c.JobEndTs,
                                                                       JobNbr = c.JobNbr,
                                                                       JobSK = c.JobSK,
                                                                       JobStartTs = c.JobStartTs,
                                                                       JobTypeCode = c.JobTypeCode,
                                                                       JobTypeSK = c.JobTypeSK,
                                                                       StatDesc = c.StatDesc,
                                                                       Actn = c.Actn,
                                                                       Rslt = c.Rslt }));
                result.Count = jobQueues.Count();

                return result;        
            }
                
        }
    }
}
