using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Reference.DAL.ViewModels;
using System.Linq.Expressions;
using Atlas.Reference.DAL.Models;

namespace Atlas.Reference.DAL.Repositories
{
    class FormularyHeaderVMRepository : IFormularyHeaderVMRepository
    {
        private IReferenceRepositoryFactory _factory;
        public FormularyHeaderVMRepository(IReferenceRepositoryFactory factory)
        {
            _factory = factory;
        }
        public void AddOrUpdate(FormularyHeaderVM itemToAddOrUpdate)
        {
            throw new NotImplementedException();
        }

        public void Delete(FormularyHeaderVM toDelete)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            // DOES NOTHING
        }

        /// <summary>
        /// Loads FormularyHeaderVM with associated data
        /// </summary>
        /// <param name="where">Not implemented</param>
        /// <param name="setToFilter">Not implemented</param>
        /// <returns></returns>
        public IQueryable<FormularyHeaderVM> FindAll(Expression<Func<FormularyHeaderVM, bool>> where = null, IQueryable<FormularyHeaderVM> setToFilter = null)
        {
            if (where != null || setToFilter != null)
            {
                throw new ArgumentException("Argument 'where' and 'setToFilter' are not implemented!");
            }

            FormularyHeaderVM headerVm = new FormularyHeaderVM()
            {
                DrugTypeVMs = new List<FormularyHeaderDrugTypeVM>(),
                PlanTypeVMs = new List<FormularyHeaderPlanTypeVM>()
            };

            // Fetch records and fill headerVm
            using (var drugTypeRepo = _factory.DrugType())
            using (var planTypeRepo = _factory.FrmlryPlanType())
            {
                drugTypeRepo.FindAll().ToList()
                    .ForEach(x =>
                        headerVm.DrugTypeVMs.Add(new FormularyHeaderDrugTypeVM()
                        {
                            DrugTypeFnCd = x.DrugTypeFnCd,
                            DrugTypeFnName = x.DrugTypeFnName
                        }));

                planTypeRepo.FindAll().ToList()
                    .ForEach(x =>
                        headerVm.PlanTypeVMs.Add(new FormularyHeaderPlanTypeVM()
                        {
                            FrmlryPlanTypeCd = x.FrmlryPlanTypeCd,
                            FrmlryPlanTypeName = x.FrmlryPlanTypeName
                        }));
            }
            
            List<FormularyHeaderVM> result = new List<FormularyHeaderVM>() { headerVm };
            return result.AsQueryable();
        }

        public FormularyHeaderVM FindOne(Expression<Func<FormularyHeaderVM, bool>> where = null)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}
