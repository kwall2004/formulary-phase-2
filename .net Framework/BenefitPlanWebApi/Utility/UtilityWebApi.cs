using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BenefitPlanWebApi.Utility
{
   public static class UtilityWebApi
    {
        #region Datatable items for dynamic tier info
        /// <summary>
        /// find a datacolumn by the extended property
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="extendedPropertyName"></param>
        /// <param name="extendedPropertyValue"></param>
        /// <returns>datacolumn</returns>
        public static DataColumn findDataColumnByExtendedProperty(DataTable dt, string extendedPropertyName, string extendedPropertyValue)
        {
            DataColumn foundDataColumn = null;
            foreach (DataColumn dc in dt.Columns)
            {
                if(dc.ExtendedProperties.Count>0 && dc.ExtendedProperties[extendedPropertyName].ToString() == extendedPropertyValue)
                {
                    return dc;
                }
            }
            return foundDataColumn;
        }
        #endregion

    }
}
