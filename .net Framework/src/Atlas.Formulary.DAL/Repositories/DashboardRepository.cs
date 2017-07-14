using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DashboardRepository : EFRepositoryBase<spDashboard_Get_Result, FormularyEntities>, IDashboardRepository
    {
        public DashboardRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<spDashboard_Get_Result> GetDashboardAlerts(bool IsActionable)
        {
            var result = _db.spDashboard_Get(IsActionable).ToList();
            return result;
        }

        public void PutDashBoardAlerts(long AlertSK, string userId)
        {
            var result = _db.spDashboard_Put(AlertSK, userId);

            if(result > 1)
            {
                throw new Exception("Alert update failed.");
            }
        }
    }
}
