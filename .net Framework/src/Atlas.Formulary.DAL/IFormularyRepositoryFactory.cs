using Atlas.Formulary.DAL.Repositories;
using Atlas.Formulary.DAL.Repositories.Interfaces;

namespace Atlas.Formulary.DAL
{
    public interface IFormularyRepositoryFactory
    {
        IDrugSearchRepository DrugSearch();

        IFormularyTierRepository DrugTier();   

        IFormularyRepository Formulary();

        IDrugCategoryRepository DrugCategory();

        ILOBRepository LOB();

        IDrugThrputcClsTypeRepository DrugThrputcClsType();

        IDrugRefDbRepository DrugRefDb();

        IDrugRefDbValQulfrTypeRepository DrugRefDbValQulfrType();

        IUserGroupRepository UserGroup();

        IFormularyExportRepository FormularyExport();

        IJobQueueRepository JobQueue();

        IJobStatTypeRepository JobStatType();

        IJobTypeRepository JobType();

        IDrugSourceFileHistoryRepository DrugSourceFileHistory();

        INewDrugsToMarketRepository NewDrugsToMarket();

        IFormularyReviewRepository FormularyReview();

        IDashboardRepository Dashboard();

        IDrugListRepository DrugList();

        ICustomNdcRepository CustomNDC();

        INDCRepository NDCNotes();

        IImportRepository Import();

        IFormularyCompareRepository FormularyCompare();

        IFormularySummaryRepository FormularySummary();

        IProgramRepository CoveragePropertyProgram();
    }
}
