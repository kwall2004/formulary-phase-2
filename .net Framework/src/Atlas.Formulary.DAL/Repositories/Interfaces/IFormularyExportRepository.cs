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
    public interface IFormularyExportRepository : IRepository<spFormularyImport_Put_Result>
    {
        void FormularyImportStart(FormularyImportVM formularyImport);
        int JobExportNDC(long formularySK, string userId, long jobTypeSK);
        void PutJobExport(long jobTypeSK, long formularySK, string userId);
    }

}
