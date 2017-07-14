using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface ISqlConfigRepository : IRepository<AppSettings>
    {
        string GetDeletedTimestampColumn(string environment);
        string GetInactiveTimestampColumn(string environment);
        string GetFormularyRulesImportPath(string environment);
        string GetFormularyDetailsImportPath(string environment);
        string GetDrugListDetailsImportPath(string environment);
        string GetFormularySummaryFrontPagePath(string environment);
        string GetFormularySummaryBackPagePath(string environment);
        string GetFormularySummaryTitlePagePath(string environment);
    }
}
