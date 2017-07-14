using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class JobQueueRepository : EFRepositoryBase<Job, FormularyEntities>, IJobQueueRepository
    {
        public JobQueueRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<spJob_GetAll_Result> GetAllJobsForUserAndRange(string userId, DateTime? from, DateTime? to)
        {
            var results = _db.spJob_GetAll(userId, from, to);

            return results.ToList();
        }

        public List<string> GetAllUsersForJobQueue()
        {
            var results = _db.spJobQueueUser_GetAll().ToList();

            return results;
        }

        public void DeleteJobQueue(long JobSK)
        {

            var jobJobStatTypeToDelete = _db.JobJobStatType.Where(r => r.JobSK == JobSK).FirstOrDefault();
            _db.JobJobStatType.Remove(jobJobStatTypeToDelete);

            Job jobQueueToDelete = _db.Job.Find(JobSK);
            _db.Job.Remove(jobQueueToDelete);

            var result = _db.SaveChanges();
            if (result < 1)
            {
                throw new Exception("Failed to delete job queue.");
            }
        }

        
    }
}
