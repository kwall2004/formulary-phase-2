using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IDashboardRepository : IRepository<spDashboard_Get_Result>
    {
        List<spDashboard_Get_Result> GetDashboardAlerts(bool IsActionable);
        void PutDashBoardAlerts(long AlertSK, string userId);
    }
}
