using System;
using System.Collections;
using System.Reflection;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions
{
    public static class PropertyInformation
    {
        public static bool IsNonStringEnumerable(this PropertyInfo pi)
        {
            return pi != null && pi.PropertyType.IsNonStringEnumerable();
        }

        public static bool IsUserDefined(this PropertyInfo pi)
        {
            return pi != null && pi.PropertyType.IsClass && !pi.PropertyType.FullName.StartsWith("System");
        }

        private static bool IsNonStringEnumerable(this object instance)
        {
            return instance != null && instance.GetType().IsNonStringEnumerable();
        }

        private static bool IsNonStringEnumerable(this Type type)
        {
            if (type == null || type == typeof(string))
                return false;
            return typeof(IEnumerable).IsAssignableFrom(type);
        }
    }
}
