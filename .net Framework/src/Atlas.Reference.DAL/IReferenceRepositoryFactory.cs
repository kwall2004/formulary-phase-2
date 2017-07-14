using Atlas.Reference.DAL.Repositories.Interfaces;

namespace Atlas.Reference.DAL
{
    public interface IReferenceRepositoryFactory
    {
        IFormularyHeaderVMRepository FormularyHeaderVM();

        IDrugTypeFnRepository DrugType();

        IFrmlryPlanTypeRepository FrmlryPlanType();


        IFDBDrugListRepository FDBDrugList();

        IMedispanDrugListRepository MedispanDrugList();

        INDCTypeRepository NDCType();

        IFrmlryPlanSubTypeRepository FrmlryPlanSubType();

        ISqlConfigRepository SqlConfig();

        ISmartSearchRepository SmartSearch();

        IValidationRepository Validation();
    }
}
