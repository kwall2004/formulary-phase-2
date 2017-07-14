using Atlas.Formulary.DAL.Repositories;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.Models;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL
{
    public class FormularyRepositoryFactory : IFormularyRepositoryFactory
    {
        private FormularyEntities _db;
        private IConfig _config;

        public FormularyRepositoryFactory(IConfig config, FormularyEntities db)
        {
            _config = config;
            _db = db;
        }

        public IDrugSearchRepository DrugSearch()
        {
            return new DrugSearchRepository(_config, _db);
        }

        public IFormularyTierRepository DrugTier()
        {
            return new FormularyTierRepository(_config, _db);
        }

        public IFormularyRepository Formulary()
        {
            return new FormularyRepository(_config, _db);
        }

        public IDrugCategoryRepository DrugCategory()
        {
            return new DrugCategoryRepository(_config, _db);
        }

        public ILOBRepository LOB()
        {
            return new LOBRepository(_config, _db);
        }

        public IDrugThrputcClsTypeRepository DrugThrputcClsType()
        {
            return new DrugThrputcClsTypeRepository(_config, _db);
        }

        public IDrugRefDbRepository DrugRefDb()
        {
            return new DrugRefDbRepository(_config, _db);
        }

        public IDrugRefDbValQulfrTypeRepository DrugRefDbValQulfrType()
        {
            return new DrugRefDbValQulfrTypeRepository(_db);
        }

        public IUserGroupRepository UserGroup()
        {
            return new UserGroupRepository(_config, _db);
        }

        public IFormularyExportRepository FormularyExport()
        {
            return new FormularyExportRepository(_config, _db);
        }

        public IJobQueueRepository JobQueue()
        {
            return new JobQueueRepository(_config, _db);
        }

        public IJobStatTypeRepository JobStatType()
        {
            return new JobStatTypeRepository(_db);
        }

        public IJobTypeRepository JobType()
        {
            return new JobTypeRepository(_db);
        }

        public IDrugSourceFileHistoryRepository DrugSourceFileHistory()
        {
            return new DrugSourceFileHistoryRepository(_config, _db);
        }

        public INewDrugsToMarketRepository NewDrugsToMarket()
        {
            return new NewDrugsToMarketRepository(_config, _db);
        }

        public IFormularyReviewRepository FormularyReview()
        {
            return new FormularyReviewRepository(_config, _db);
        }

        public IDashboardRepository Dashboard()
        {
            return new DashboardRepository(_config, _db);
        }

        public IDrugListRepository DrugList()
        {
            return new DrugListRepository(_config, _db);
        }

        public ICustomNdcRepository CustomNDC()
        {
            return new CustomNdcRepository(_config, _db);
        }

        public INDCRepository NDCNotes()
        {
            return new NDCRepository(_config, _db);
        }

        public IImportRepository Import()
        {
            return new ImportRepository(_config, _db);
        }

        public IFormularyCompareRepository FormularyCompare()
        {
            return new FormularyCompareRepository(_config, _db);
        }

        public IFormularySummaryRepository FormularySummary()
        {
            return new FormularySummaryRepository(_config, _db);
        }

        public IProgramRepository CoveragePropertyProgram()
        {
            return new ProgramRepository(_config, _db);
        }
    }
   
}
