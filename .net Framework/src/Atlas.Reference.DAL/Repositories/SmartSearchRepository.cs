using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories
{
    public class SmartSearchRepository : EFRepositoryBase <SmartSearchField, ReferenceEntities>, ISmartSearchRepository
    {
        public SmartSearchRepository(ReferenceEntities db) : base(db)
        {

        }

        public List<SmartSearchField> GetSmartSearchFields(int smartSearchGroupSK)
        {
            var queryResult = _db.SmartSearchField.Where(a => a.SmartSearchGroupSK == smartSearchGroupSK && a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }

        public SmartSearchGroup GetSmartSearchGroupType(string smartSearchGroupName)
        {
            var queryResult = _db.SmartSearchGroup.FirstOrDefault(a => a.SmartSearchGroupName == smartSearchGroupName && a.InctvTs == null && a.DelTs == null);
            return queryResult;
        }
    }
}
