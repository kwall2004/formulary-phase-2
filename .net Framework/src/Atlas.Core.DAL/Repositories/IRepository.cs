using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.DAL.Repositories
{
    public interface IRepository<T> : IDisposable
    {
        IQueryable<T> FindAll(Expression<Func<T, bool>> where = null, IQueryable<T> setToFilter = null);
        T FindOne(Expression<Func<T, bool>> where = null);

        void AddOrUpdate(T itemToAddOrUpdate);

        void Delete(T toDelete);

        void SaveChanges();
    }
}
