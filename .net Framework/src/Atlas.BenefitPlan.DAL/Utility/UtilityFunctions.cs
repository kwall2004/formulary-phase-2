using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.DAL.Utility
{
    /// <summary>
    /// Static Utility Class
    /// </summary>
    public static class UtilityFunctions
    {
        private const string _defaultUser = "system";

        #region " Public Properties "
        #endregion

        #region " Public Methods "

        public static string GetContactTypeCode()
        {
            return "Work";
        }
        /// <summary>
        /// Takes in a user text, and then if null returns the current user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string GetCurrentUser(string user = null)
        {
            return user == null ? _defaultUser : user;
        }

        /// <summary>
        /// Gets the Current Time stamp
        /// </summary>
        /// <returns>the Current UTC Time Stamp</returns>
        public static DateTime GetTimeStamp()
        {
            return DateTime.UtcNow;
        }

        /// <summary>
        /// Gets the Effective Start Date
        /// </summary>
        /// <returns>the Effective Start Date of 12/31/1900</returns>
        public static DateTime GetEffectiveStartDate()
        {
            return new DateTime(1900, 1, 1);
        }

        /// <summary>
        /// Gets the Effective End Date
        /// </summary>
        /// <returns>the Effective End Date of 12/31/9999</returns>
        public static DateTime GetEffectiveEndDate()
        {
            return new DateTime(9999, 12, 31);
        }
        #endregion

        /// <summary>
        /// Checks if the IEnumeration is null
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }

        public static Type GetGenericElementType(this Type type)
        {
            // Short-circuit for Array types
            if (typeof(Array).IsAssignableFrom(type))
            {
                return type.GetElementType();
            }

            while (true)
            {
                // Type is IEnumerable<T>
                if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(IEnumerable<>))
                {
                    return type.GetGenericArguments().First();
                }

                // Type implements/extends IEnumerable<T>
                Type elementType = (from subType in type.GetInterfaces()
                                    let retType = subType.GetGenericElementType()
                                    where retType != subType
                                    select retType).FirstOrDefault();

                if (elementType != null)
                {
                    return elementType;
                }

                if (type.BaseType == null)
                {
                    return type;
                }

                type = type.BaseType;
            }
        }

        public static Type GetItemType<T>(this IEnumerable<T> enumerable)
        {
            return typeof(T);
        }
    }
}
