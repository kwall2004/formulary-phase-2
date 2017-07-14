namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The DropDown List Container for Service Area Node Detail
    /// </summary>
    public class ServiceAreaNodeDetail
    {
        /// <summary>
        /// The ISO Country Code SK
        /// </summary>
        /// <value>The iso cntry code sk.</value>
        public long ISOCntryCodeSK { get; set; }

        /// <summary>
        /// The ISO Country Code Description
        /// </summary>
        /// <value>The iso cntry code1.</value>
        public string ISOCntryCode1 { get; set; }

        /// <summary>
        /// The State Province Code SK
        /// </summary>
        /// <value>The st PRVNC code sk.</value>
        public long StPrvncCodeSK { get; set; }

        /// <summary>
        /// The State Province Code Description
        /// </summary>
        /// <value>The st PRVNC desc.</value>
        public string StPrvncDesc { get; set; }

        /// <summary>
        /// The FIPS County Code SK
        /// </summary>
        /// <value>The fips cnty code sk.</value>
        public long FIPSCntyCodeSK { get; set; }

        /// <summary>
        /// The FIPS County Code Description
        /// </summary>
        /// <value>The fips cnty code desc.</value>
        public string FIPSCntyCodeDesc { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceAreaNodeDetail"/> class.
        /// </summary>
        public ServiceAreaNodeDetail()
        {
            this.ISOCntryCode1 = string.Empty;
            this.StPrvncDesc = string.Empty;
            this.FIPSCntyCodeDesc = string.Empty;
        }
    }
}