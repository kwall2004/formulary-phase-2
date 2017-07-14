using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.Maintenance
{
    /// <summary>
    /// Business logic for job queue.
    /// </summary>
    public interface IJobQueueBLL
    {
        /// <summary>
        /// Get's all jobs between date range for a specified user. 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="dateFrom"></param>
        /// <param name="dateTo"></param>
        /// <returns></returns>
        /// <remarks>Defaults to last seven days if now dates passed.</remarks>
        QueryResult<JobQueueVM> GetJobQueuesByUserId(string userId, DateTime? dateFrom = null, DateTime? dateTo = null);
    }
}
