namespace Atlas.BenefitPlan.DAL.Models.Enums
{
    /// <summary>
    /// The Service Area Address Hierarchy Noes.
    /// </summary>
    public enum ServiceAreaAddressHierarchy
    {
        /// <summary>
        /// The root
        /// </summary>
        Root = 0,
        /// <summary>
        /// The country
        /// </summary>
        Country = 10,
        /// <summary>
        /// The state province
        /// </summary>
        StateProvince = 20,
        /// <summary>
        /// The county
        /// </summary>
        County = 30,
        /// <summary>
        /// The postal code
        /// </summary>
        PostalCode = 40,
        /// <summary>
        /// The leaf
        /// </summary>
        Leaf = 999
    }
}