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
    public class FormularyExportRepository : EFRepositoryBase<spFormularyImport_Put_Result, FormularyEntities>, IFormularyExportRepository
    {
        public FormularyExportRepository(IConfig config, FormularyEntities db) : base(config, db) { }



        public void FormularyImportStart(FormularyImportVM formularyImport)
        {
            _db.spFileImport_Start(formularyImport.ImportFilePath, 
                                   formularyImport.BatchID, 
                                   formularyImport.FormularySK, 
                                   formularyImport.userID);
        }

        public int JobExportNDC(long formularySK, string userId, long jobTypeSK)
        {
            var result = _db.spJob_PutExportNDC(jobTypeSK, formularySK, userId);
            if (result > 0)
            {
                return result;
            }
            else
            {
                throw new Exception("Import failed.");
            }
        }

        public void PutJobExport(long jobTypeSK, long formularySK, string userId)
        {
            var result = _db.spJob_PutExport(jobTypeSK, formularySK, userId);
        }
    }
}
