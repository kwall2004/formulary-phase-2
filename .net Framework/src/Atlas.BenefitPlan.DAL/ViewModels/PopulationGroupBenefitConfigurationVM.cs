using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Benefit Configuration View Model
    /// </summary>
    public class PopulationGroupBenefitConfigurationVM
    {
        /// <summary>the Population Group Plan Benefit Package</summary>
        public PopulationGroupPlanBenefitPackageVM PopulationGroupPlanBenefitPackage { get; set; }

        #region " Reference Data Properties #

        /// <summary>The MAC List</summary>
        public List<MACList> MACList { get; set; }

        /// <summary>The Navigation Break Crumb</summary>
        public HierarchyNodeDetail NavigationBreadCrumb { get; set; }

        /// <summary>The List of Medical Networks</summary>
        public List<Ntwrk> Networks { get; set; }

        /// <summary>The List of pharmacy Networks</summary>
        public List<Ntwrk> PharmacyNetworks { get; set; }

        /// <summary>List of all the Account PCN for the Account</summary>
        public List<DropDownList> AccountPCN { get; set; }

        /// <summary>List of all the Account RXBIN for the Account</summary>
        public List<DropDownList> AccountRXBIN { get; set; }

        #endregion " Reference Data Properties #
    }
}