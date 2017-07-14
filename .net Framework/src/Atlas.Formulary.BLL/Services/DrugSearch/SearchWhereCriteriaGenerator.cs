using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.Services.DrugSearch
{
    /// <summary>
    /// Utility service that builds an SQL where clause from a collection of
    /// Criteria.
    /// </summary>
    public class SearchWhereCriteriaGenerator : ISearchWhereCriteriaGenerator
    {
        /// <summary>
        /// Builds an SQL where clause from a collection of Criteria.
        /// </summary>
        /// <param name="criteria"></param>
        /// <returns></returns>
        public string BuildDrugSearchWhereQuery(List<Criteria> criteria, DataSourceEnum dataSource)
        {
            StringBuilder sb = new StringBuilder();

            if(criteria.Count > 0)
            {
                BuildFilterString(criteria, sb, dataSource);
            }
            
            return sb.ToString();
        }

        /// <summary>
        /// Actually builds the sql where clause. 
        /// </summary>
        /// <param name="criteria"></param>
        /// <param name="sb"></param>
        private void BuildFilterString(List<Criteria> criteria, StringBuilder sb, DataSourceEnum dataSource)
        {
            sb.Append("WHERE ");
            for (int i = 0; i < criteria.Count(); i++)
            {

                // Tier number is a special case and should be handeled independant of the remanider of this logic.
                if (criteria[i].Property == "TierNbr")
                {
                    sb.Append("(FormularyCache.TierNbr = " + criteria[i].Value + ")");

                    if (i < (criteria.Count() - 1))
                    {
                        sb.Append(" AND ");
                    }

                    continue;
                }
                
                // Column name
                var exemptionsToTheRule = new List<string>() { "TierCode", "IsCovered", "IsSpecialtyDrug", "DrugLists"};

                if (exemptionsToTheRule.Contains(criteria[i].Property))
                {
                    criteria[i].Property = "FormularyCache." + criteria[i].Property;
                }
                else
                {
                    if(dataSource == DataSourceEnum.FDB)
                    {
                        criteria[i].Property = "FDBDrugList." + criteria[i].Property;
                    }
                    else if(dataSource == DataSourceEnum.Medispan)
                    {
                        if(criteria[i].Property == "MSGenericIndicator") criteria[i].Property = "MultiSourceCode";
                        criteria[i].Property = "MedispanDrugList." + criteria[i].Property;
                    }                    
                }

                sb.Append("(" + criteria[i].Property + " ");

                if (criteria[i].Value == "***")
                {
                    if (criteria[i].Operator == "=")
                    {
                        sb.Append("IS NULL");
                    }
                    else
                    {
                        sb.Append("IS NOT NULL");
                    }
                }
                else
                { 
                    switch (criteria[i].Operator)
                    {
                        case "=":
                        case "IN":
                            sb.Append("IN (");
                            break;
                        case "!=":
                        case "NOT IN":
                            sb.Append("NOT IN (");
                            break;
                        case "LIKE":
                            sb.Append("LIKE ");
                            break;
                        case "NOT LIKE":
                            sb.Append("NOT LIKE ");
                            break;
                        default:
                            throw new ArgumentException("Only supports operators =, !=, IN, NOT IN, LIKE and NOT LIKE");
                    }

                    var vals = criteria[i].Value.Split(',');

                    if (criteria[i].Operator != "LIKE" && criteria[i].Operator != "NOT LIKE")
                    {
                        for (int j = 0; j < vals.Count(); j++)
                        {
                            sb.Append("'" + vals[j].Replace("'", "''") + "'");

                            if (j < (vals.Count() - 1))
                            {
                                sb.Append(", ");
                            }
                        }

                        sb.Append(")");

                    }
                    else if (criteria[i].Operator == "LIKE")
                    {
                        for (int j = 0; j < vals.Count(); j++)
                        {
                            sb.Append(@"'%" + vals[j].Replace("'", "''") + @"%'");

                            if (j < (vals.Count() - 1))
                            {
                                sb.Append(" OR " + criteria[i].Property + " LIKE ");
                            }
                        }
                    }
                    else
                    {
                        for (int j = 0; j < vals.Count(); j++)
                        {
                            sb.Append(@"'%" + vals[j].Replace("'", "''") + @"%'");

                            if (j < (vals.Count() - 1))
                            {
                                sb.Append(" AND " + criteria[i].Property + " NOT LIKE ");
                            }
                        }
                    }

                }

                sb.Append(") ");

                if (i < (criteria.Count() - 1))
                {
                    sb.Append(" AND ");
                }
            }
        }
    }
}
