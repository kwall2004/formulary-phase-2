using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.BLL.Services
{
    public class SearchWhereCriteriaGenerator : ISearchWhereCriteriaGenerator
    {
        public string BuildSearchWhereQuery(List<Criteria> criteria)
        {
            StringBuilder sb = new StringBuilder();

            if (criteria.Count > 0)
            {
                BuildFilterString(criteria, sb);
            }

            return sb.ToString();
        }

        private void BuildFilterString(List<Criteria> criteria, StringBuilder sb)
        {
            sb.Append("WHERE ");
            for (int i = 0; i < criteria.Count(); i++)
            {
                // Column name
                sb.Append(criteria[i].Property + " ");

                switch (criteria[i].Operator)
                {
                    case "=":
                        sb.Append("IN (");
                        break;
                    case "!=":
                        sb.Append("NOT IN (");
                        break;
                    default:
                        throw new ArgumentException("Only supports operators = and !=");
                }

                var vals = criteria[i].Value.Split(',');

                for (int j = 0; j < vals.Count(); j++)
                {
                    sb.Append("'" + vals[j].Replace("'", "''") + "'");

                    if (j < (vals.Count() - 1))
                    {
                        sb.Append(", ");
                    }
                }

                sb.Append(")");

                if (i < (criteria.Count() - 1))
                {
                    sb.Append(" AND ");
                }
            }
        }
    }
}
