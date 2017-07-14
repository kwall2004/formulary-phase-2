using Atlas.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Linq.Expressions;

namespace Atlas.Core.DAL.Repositories
{
    public abstract class EFRepositoryBase <T1, T2> where T1: class where T2: DbContext
    {
        protected T2 _db;
        protected IConfig _config;
        

        protected EFRepositoryBase(IConfig config, T2 db)
        {
            _config = config;
            _db = db;
        }

        public EFRepositoryBase(T2 db)
        {
            _db = db;
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public virtual IQueryable<T1> FindAll(Expression<Func<T1, bool>> where = null, IQueryable<T1> setToFilter = null)
        {
            IQueryable<T1> results;

            if (setToFilter != null)
            {
                results = null != where ? setToFilter.Where(where) : setToFilter;
            }
            else
            {
                results = null != where ? _db.Set<T1>().Where(where) : _db.Set<T1>();
            }

            if (typeof(T1).Name == "FDBDrugList" || typeof(T1).Name == "MedispanDrugList" || typeof(T1).Name == "FrmlryPlanSubType")
            {
                return results;
            }
            else
            {
                return results.Where(GetWherePredicate());
            }
        }

        public virtual T1 FindOne(Expression<Func<T1, bool>> where = null)
        {
            return FindAll(where).FirstOrDefault();
        }

        public virtual void SaveChanges()
        {
            _db.SaveChanges();
        }

        public virtual void AddOrUpdate(T1 itemToUpdate)
        {
            throw new NotImplementedException();
        }

        public virtual void Delete(T1 toDelete)
        {
            throw new NotImplementedException();
        }

        private Expression<Func<T1, bool>> GetWherePredicate()
        {
            Expression<Func<T1, bool>> truePredicate = f => true;
            ParameterExpression pe = Expression.Parameter(typeof(T1), "t1");
            Expression combined = null;
            combined = GetExpression(pe, combined, _config.DeletedTimestampColumn);
            combined = GetExpression(pe, combined, _config.InactiveTimestampColumn);
            
            return combined != null 
                ? Expression.Lambda<Func<T1, bool>>(combined, new ParameterExpression[] { pe })
                : truePredicate;
        }

        private Expression GetExpression(ParameterExpression pe, Expression combined, string columnName)
        {
            columnName = columnName ?? string.Empty;

            if (typeof(T1).GetProperty(columnName) != null)
            {
                Expression column = Expression.Property(pe, columnName);
                Expression dbNull = Expression.Constant(null, column.Type);
                Expression expression = Expression.Equal(column, dbNull);
                combined = combined == null ? expression : Expression.And(combined, expression);
            }
            return combined;
        }
    }
}
