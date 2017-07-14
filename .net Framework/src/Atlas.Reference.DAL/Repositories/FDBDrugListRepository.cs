using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Atlas.Reference.DAL.ViewModels;

namespace Atlas.Reference.DAL.Repositories
{
    public class FDBDrugListRepository : EFRepositoryBase<FDBDrugList, ReferenceEntities>, IFDBDrugListRepository
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public FDBDrugListRepository(ReferenceEntities db) : base(db)
        {

        }

        public override void AddOrUpdate(FDBDrugList itemToUpdate)
        {
            _db.FDBDrugList.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.DrugListSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
