namespace Atlas.BenefitPlan.DAL.Models.Enums
{
    /// <summary>
    /// Root is for the Associated population pop-up because you can have more than one Tenant Family.
    /// </summary>
    public enum TenantFamilyHierarchy
    {
        /// <summary>
        /// The tenant family
        /// </summary>
        TenantFamily = 10,
        /// <summary>
        /// The tenant
        /// </summary>
        Tenant = 20,
        /// <summary>
        /// The account
        /// </summary>
        Account = 30,
        /// <summary>
        /// The group
        /// </summary>
        Group = 40,
        /// <summary>
        /// The population group
        /// </summary>
        PopulationGroup = 50,

        /// <summary>
        /// The country
        /// </summary>
        Country = 100,
        /// <summary>
        /// The state
        /// </summary>
        State = 110,
        /// <summary>
        /// The county
        /// </summary>
        County = 120,
        /// <summary>
        /// The postal code
        /// </summary>
        PostalCode = 130
    }
}