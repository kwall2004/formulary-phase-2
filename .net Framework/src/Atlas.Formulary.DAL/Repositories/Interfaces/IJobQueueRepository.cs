using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IJobQueueRepository : IRepository<Job>
    {
        List<spJob_GetAll_Result> GetAllJobsForUserAndRange(string userId, DateTime? from, DateTime? to);

        List<string> GetAllUsersForJobQueue();


        void DeleteJobQueue(long JobSK);
    }
}
