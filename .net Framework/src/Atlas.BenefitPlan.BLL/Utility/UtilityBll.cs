using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Utility
{
    /// <summary>
    /// Class UtilityBll.
    /// </summary>
    public static class UtilityBll
    {
        #region Active deleted utilities

        /// <summary>
        /// Items the active.
        /// </summary>
        /// <param name="EfctvStartDt">The efctv start dt.</param>
        /// <param name="EfctvEndDt">The efctv end dt.</param>
        /// <param name="InctvTs">The inctv ts.</param>
        /// <returns>Boolean.</returns>
        public static Boolean itemActive(DateTime EfctvStartDt, DateTime EfctvEndDt, DateTimeOffset? InctvTs)
        {
            Boolean IsActive = true;

            if (DateTime.Today.Date >= EfctvStartDt.Date
                     && DateTime.Today.Date <= EfctvEndDt.Date
                     && (!InctvTs.HasValue || InctvTs.Value.Date > DateTime.Today.Date)
                )
            {
                IsActive = true;
                return IsActive;
            }
            else
            {
                IsActive = false;
                return IsActive;
            }
        }

        #endregion Active deleted utilities

        #region " Hierarchy nodes "

        /// <summary>
        /// Create a Hierarchy Node
        /// </summary>
        /// <param name="entitySK">the Entity Key</param>
        /// <param name="tenantFamilyHierarchy">the Hierarchy Type</param>
        /// <param name="entityDesription">the Hierarchy Text</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <param name="inctvTs">The inctv ts.</param>
        /// <returns>a Hierarchy Node</returns>
        static public HierarchyTreeNode loadHierarchyNode(long entitySK, TenantFamilyHierarchy tenantFamilyHierarchy, string entityDesription
            , DateTime efctvStartDt, DateTime efctvEndDt, DateTimeOffset? inctvTs)
        {
            HierarchyTreeNode node = new HierarchyTreeNode();
            node.ChildrenNodes = new List<HierarchyTreeNode>();
            node.EntitySK = entitySK;
            node.EntityType = tenantFamilyHierarchy;
            node.EntityDescription = entityDesription;
            node.Active = UtilityBll.itemActive(efctvStartDt, efctvEndDt, inctvTs);
            return node;
        }

        #endregion " Hierarchy nodes "

        #region Date Time - UTC Time Functions
        public static DateTimeOffset dateUTCToDate(DateTimeOffset utcDate)

        {
            DateTimeOffset returnDate= new DateTimeOffset();


            if (utcDate == DateTimeOffset.MinValue)
            {
                returnDate = DateTimeOffset.MinValue;
            }
            else
            { 
                Double  hours = 0;
                hours = (double)(DateTimeOffset.Now.Offset).Hours; 
                returnDate = utcDate.AddHours(hours);
            }
            


            return returnDate;
        }
        #endregion

    }
}