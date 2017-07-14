using System;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories;
using Atlas.Reference.DAL.Repositories.Interfaces;

namespace Atlas.Reference.DAL
{
    public class ReferenceRepositoryFactory : IReferenceRepositoryFactory
    {
        private ReferenceEntities _db;

        public ReferenceRepositoryFactory(ReferenceEntities db)
        {
            _db = db;
        }

        public IDrugTypeFnRepository DrugType()
        {
            return new DrugTypeFnRepository(_db);
        }

        public IFormularyHeaderVMRepository FormularyHeaderVM()
        {
            return new FormularyHeaderVMRepository(this);
        }

        public IFrmlryPlanTypeRepository FrmlryPlanType()
        {
            return new FrmlryPlanTypeRepository(_db);
        }

        public IFDBDrugListRepository FDBDrugList()
        {
            return new FDBDrugListRepository(_db);
        }

        public IMedispanDrugListRepository MedispanDrugList()
        {
            return new MedispanDrugListRepository(_db);
        }

        public INDCTypeRepository NDCType()
        {
            return new NDCRepository(_db);
        }

        public IFrmlryPlanSubTypeRepository FrmlryPlanSubType ()
        {
            return new FrmlryPlanSubTypeRepository(_db);
        }

        public ISqlConfigRepository SqlConfig()
        {
            return new SQLConfigRepository(_db);
        }

        public ISmartSearchRepository SmartSearch()
        {
            return new SmartSearchRepository(_db);
        }

        public IValidationRepository Validation()
        {
            return new ValidationRepository(_db);
        }
    }
}
