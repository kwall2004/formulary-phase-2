using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;

namespace Atlas.BenefitPlan.DAL
{
    /// <summary>
    /// The Benefit Plan Repository Factory
    /// </summary>
    /// <remarks>This Factory has the entries for each of the Repositories in Benefit Plan</remarks>
    public class BenefitPlanRepositoryFactory : IBenefitPlanRepositoryFactory
    {
        /// <summary>
        /// the Benefit Plan Entity Framework
        /// </summary>
        private BenefitPlanEntities _db;

        /// <summary>
        /// the Application Configuration
        /// </summary>
        private IConfig _config;

        /// <summary>
        /// the Constructor
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public BenefitPlanRepositoryFactory(IConfig config, BenefitPlanEntities db)
        {
            _config = config;
            _db = db;
        }

        /// <summary>
        /// The Stored Procedure Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CommunicationUsageType Repository</returns>
        public IAtlasBenefitPlanStoredProcsRepository AtlasBenefitPlanStoredProcs()
        {
            return new AtlasBenefitPlanStoredProcsRepository(_config, _db);
        }

        /// <summary>
        /// The CMSBenefitStructureType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CMSBenefitStructureType Repository</returns>
        public ICMSBenefitStructureTypeRepository CMSBenefitStructureType()
        {
            return new CMSBenefitStructureTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CommunicationUsageType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CommunicationUsageType Repository</returns>
        public ICommunicationUsageTypeRepository CommunicationUsageType()
        {
            return new CommunicationUsageTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CopayFunctionType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayFunctionType Repository</returns>
        public ICopayFunctionTypeRepository CopayFunctionType()
        {
            return new CopayFunctionTypeRepository(_config, _db);
        }

        /// <summary>
        /// The HealthCareFinancialAccountType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the HealthCareFinancialAccountType Repository</returns>
        public IHealthCareFinancialAccountTypeRepository HealthCareFinancialAccountType()
        {
            return new HealthCareFinancialAccountTypeRepository(_config, _db);
        }

        /// <summary>
        /// The LineOfBusiness Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LineOfBusiness Repository</returns>
        public ILineOfBusinessRepository LineOfBusiness()
        {
            return new LineOfBusinessRepository(_config, _db);
        }

        /// <summary>
        /// The MACList Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the MACList Repository</returns>
        public IMACListRepository MACList()
        {
            return new MACListRepository(_config, _db);
        }

        /// <summary>
        /// The Network Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Network Repository</returns>
        public INetworkRepository Network()
        {
            return new NetworkRepository(_config, _db);
        }

        /// <summary>
        /// The NetworkTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkTier Repository</returns>
        public INetworkTierRepository NetworkTier()
        {
            return new NetworkTierRepository(_config, _db);
        }

        /// <summary>
        /// The NetworkTierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkTierType Repository</returns>
        public INetworkTierTypeRepository NetworkTierType()
        {
            return new NetworkTierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The PayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PayerId Repository</returns>
        public IPayerIdRepository PayerId()
        {
            return new PayerIdRepository(_config, _db);
        }

        /// <summary>
        /// The PCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PCN Repository</returns>
        public IPCNRepository PCN()
        {
            return new PCNRepository(_config, _db);
        }

        /// <summary>
        /// The RXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the RXBIN Repository</returns>
        public IRXBINRepository RXBIN()
        {
            return new RXBINRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitStatus Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitStatus Repository</returns>
        public IBenefitStatusRepository BnftStat()
        {
            return new BenefitStatusRepository(_config, _db);
        }

        /// <summary>
        /// The CrtriaSetType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CrtriaSetType Repository</returns>
        public ICriteriaSetTypeRepository CrtriaSetType()
        {
            return new CriteriaSetTypeRepository(_config, _db);
        }

        /// <summary>
        /// The BnftCrtriaSet Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BnftCrtriaSet Repository</returns>
        public IBenefitCriteriaSetRepository BnftCrtriaSet()
        {
            return new BenefitCriteriaSetRepository(_config, _db);
        }

        /// <summary>
        /// The FreqQulfrType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FreqQulfrType Repository</returns>
        public IFrequencyQualifierTypeRepository FreqQulfrType()
        {
            return new FrequencyQualifierTypeRepository(_config, _db);
        }

        public ICopayOverrideRepository CopayExclusion()
        {
            return new CopayOverrideRepository(_config, _db);
        }

        #region " Account Repositories "

        /// <summary>
        /// The Address Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Address Repository</returns>
        public IAccountRepository Account()
        {
            return new AccountRepository(_config, _db);
        }

        /// <summary>
        /// The AccountAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountAddress Repository</returns>
        public IAccountAddressRepository AccountAddress()
        {
            return new AccountAddressRepository(_config, _db);
        }

        /// <summary>
        /// The AccountPCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountPCN Repository</returns>
        public IAccountPCNRepository AccountPCN()
        {
            return new AccountPCNRepository(_config, _db);
        }

        /// <summary>
        /// The AccountRXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountRXBIN Repository</returns>
        public IAccountRXBINRepository AccountRXBIN()
        {
            return new AccountRXBINRepository(_config, _db);
        }

        /// <summary>
        /// The AccountPayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountPayerId Repository</returns>
        public IAccountPayerIdRepository AccountPayerId()
        {
            return new AccountPayerIdRepository(_config, _db);
        }

        #endregion " Account Repositories "

        #region " Address Repositories "

        /// <summary>
        /// The Address Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Address Repository</returns>
        public IAddressRepository Address()
        {
            return new AddressRepository(_config, _db);
        }

        /// <summary>
		/// The CountyPostalCode Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the CountyPostalCode Repository</returns>
		public ICountyPostalCodeRepository CountyPostalCode()
        {
            return new CountyPostalCodeRepository(_config, _db);
        }

        /// <summary>
        /// The FIPSCountyCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FIPSCountyCode Repository</returns>
        public IFIPSCountyCodeRepository FIPSCountyCode()
        {
            return new FIPSCountyCodeRepository(_config, _db);
        }

        /// <summary>
        /// The ISOCountryCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ISOCountryCode Repository</returns>
        public IISOCountryCodeRepository ISOCountryCode()
        {
            return new ISOCountryCodeRepository(_config, _db);
        }

        /// <summary>
        /// The PostalCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PostalCode Repository</returns>
        public IPostalCodeRepository PostalCode()
        {
            return new PostalCodeRepository(_config, _db);
        }

        /// <summary>
        /// The StateProvinceCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StateProvinceCode Repository</returns>
        public IStateProvinceCodeRepository StateProvinceCode()
        {
            return new StateProvinceCodeRepository(_config, _db);
        }

        #endregion " Address Repositories "

        #region " Benefit Plans Repositories"

        /// <summary>
        /// The Allowed Prescribers List Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AllowedPrescribersList Repository</returns>
        public IAllowedPrescribersListRepository AllowedPrescribersList()
        {
            return new AllowedPrescribersListRepository(_config, _db);
        }

        /// <summary>
		/// The BenefitPlanConfigurationProperty Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the BenefitPlanConfigurationProperty Repository</returns>
		public IBenefitPlanConfigurationPropertyRepository BenefitPlanConfigurationProperty()
        {
            return new BenefitPlanConfigurationPropertyRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlan Repository</returns>
        public IBenefitPlanRepository BenefitPlan()
        {
            return new BenefitPlanRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanPharmacyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanPharmacyType Repository</returns>
        public IBenefitPlanPharmacyTypeRepository BenefitPlanPharmacyType()
        {
            return new BenefitPlanPharmacyTypeRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanPharmacyTypeDaySupply Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanPharmacyTypeDaySupply Repository</returns>
        public IBenefitPlanPharmacyTypeDaySupplyRepository BenefitPlanPharmacyTypeDaySupply()
        {
            return new BenefitPlanPharmacyTypeDaySupplyRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanSizeClassificationType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanSizeClassificationType Repository</returns>
        public IBenefitPlanSizeClassificationTypeRepository BenefitPlanSizeClassificationType()
        {
            return new BenefitPlanSizeClassificationTypeRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanType Repository</returns>
        public IBenefitPlanTypeRepository BenefitPlanType()
        {
            return new BenefitPlanTypeRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanWaiverRider Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanWaiverRider Repository</returns>
        public IBenefitPlanWaiverRiderRepository BenefitPlanWaiverRider()
        {
            return new BenefitPlanWaiverRiderRepository(_config, _db);
        }

        /// <summary>
		/// The ConfigurationPropertyOption Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the ConfigurationPropertyOption Repository</returns>
		public IConfigurationPropertyOptionRepository ConfigurationPropertyOption()
        {
            return new ConfigurationPropertyOptionRepository(_config, _db);
        }

        /// <summary>
		/// The ConfigurationPropertyType Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the ConfigurationPropertyType Repository</returns>
		public IConfigurationPropertyTypeRepository ConfigurationPropertyType()
        {
            return new ConfigurationPropertyTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CopayCoinsuranceLogicType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayCoinsuranceLogicType Repository</returns>
        public ICopayCoinsuranceLogicTypeRepository CopayCoinsuranceLogicType()
        {
            return new CopayCoinsuranceLogicTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CopayDistribution Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayDistribution Repository</returns>
        public ICopayDistributionRepository CopayDistribution()
        {
            return new CopayDistributionRepository(_config, _db);
        }

        /// <summary>
        /// The CopayOverride Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayOverride Repository</returns>
        public ICopayOverrideRepository CopayOverride()
        {
            return new CopayOverrideRepository(_config, _db);
        }

        /// <summary>
        /// The CopayOverrideQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayOverrideQualifierType Repository</returns>
        public ICopayOverrideQualifierTypeRepository CopayOverrideQualifierType()
        {
            return new CopayOverrideQualifierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CopaySetup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopaySetup Repository</returns>
        public ICopaySetupRepository CopaySetup()
        {
            return new CopaySetupRepository(_config, _db);
        }

        /// <summary>
        /// The CostBasisType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CostBasisType Repository</returns>
        public ICostBasisTypeRepository CostBasisType()
        {
            return new CostBasisTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DaySupplyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DaySupplyType Repository</returns>
        public IDaySupplyTypeRepository DaySupplyType()
        {
            return new DaySupplyTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DispenseAsWrittenCopay Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DispenseAsWrittenCopay Repository</returns>
        public IDispenseAsWrittenCopayRepository DispenseAsWrittenCopay()
        {
            return new DispenseAsWrittenCopayRepository(_config, _db);
        }

        /// <summary>
        /// The DispenseAsWrittenType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DispenseAsWrittenType Repository</returns>
        public IDispenseAsWrittenTypeRepository DispenseAsWrittenType()
        {
            return new DispenseAsWrittenTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DrugBrandType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugBrandType Repository</returns>
        public IDrugBrandTypeRepository DrugBrandType()
        {
            return new DrugBrandTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DrugClassType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugClassType Repository</returns>
        public IDrugClassTypeRepository DrugClassType()
        {
            return new DrugClassTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DrugReferenceDatabase Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugReferenceDatabase Repository</returns>
        public IDrugReferenceDatabaseRepository DrugReferenceDatabase()
        {
            return new DrugReferenceDatabaseRepository(_config, _db);
        }

        /// <summary>
		/// The EarlyRefillExcption Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the EarlyRefillExcption Repository</returns>
		public IEarlyRefillExcptionRepository EarlyRefillExcption()
        {
            return new EarlyRefillExcptionRepository(_config, _db);
        }

        /// <summary>
        /// The EarlyRefillExcptionQulfierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the EarlyRefillExcptionQulfierType Repository</returns>
        public IEarlyRefillExcptionQulfierTypeRepository EarlyRefillExcptionQulfierType()
        {
            return new EarlyRefillExcptionQulfierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The FillException Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FillException Repository</returns>
        public IFillExceptionRepository FillException()
        {
            return new FillExceptionRepository(_config, _db);
        }

        /// <summary>
		/// The FillExceptionChangeQualifierType Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the FillExceptionChangeQualifierType Repository</returns>
		public IFillExceptionChangeQualifierTypeRepository FillExceptionChangeQualifierType()
        {
            return new FillExceptionChangeQualifierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The Formulary Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Formulary Repository</returns>
        public IFormularyRepository Formulary()
        {
            return new FormularyRepository(_config, _db);
        }

        /// <summary>
        /// The Formularytier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Formularytier Repository</returns>
        public IFormularyTierRepository FormularyTier()
        {
            return new FormularyTierRepository(_config, _db);
        }

        /// <summary>
        /// The LowIncomeCostSharingSubsidySetup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LowIncomeCostSharingSubsidySetup Repository</returns>
        public ILowIncomeCostSharingSubsidySetupRepository LowIncomeCostSharingSubsidySetup()
        {
            return new LowIncomeCostSharingSubsidySetupRepository(_config, _db);
        }

        /// <summary>
        /// The LowIncomeCostSharingSubsidyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LowIncomeCostSharingSubsidyType Repository</returns>
        public ILowIncomeCostSharingSubsidyTypeRepository LowIncomeCostSharingSubsidyType()
        {
            return new LowIncomeCostSharingSubsidyTypeRepository(_config, _db);
        }

        /// <summary>
        /// The NetworkBenefitPlanType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkBenefitPlanType Repository</returns>
        public INetworkBenefitPlanTypeRepository NetworkBenefitPlanType()
        {
            return new NetworkBenefitPlanTypeRepository(_config, _db);
        }

        /// <summary>
        /// The PlanClassificationType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanClassificationType Repository</returns>
        public IPlanClassificationTypeRepository PlanClassificationType()
        {
            return new PlanClassificationTypeRepository(_config, _db);
        }

        /// <summary>
        /// The PharmacyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PharmacyType Repository</returns>
        public IPharmacyTypeRepository PharmacyType()
        {
            return new PharmacyTypeRepository(_config, _db);
        }

        /// <summary>
		/// The PlanCapLimit Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PlanCapLimit Repository</returns>
		public IPlanCapLimitRepository PlanCapLimit()
        {
            return new PlanCapLimitRepository(_config, _db);
        }

        /// <summary>
        /// The PlanCapLimitQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanCapLimitQualifierType Repository</returns>
        public IPlanCapLimitQualifierTypeRepository PlanCapLimitQualifierType()
        {
            return new PlanCapLimitQualifierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The PlanCapLimitPeriodQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanCapLimitPeriodQualifierType Repository</returns>
        public IPlanCapLimitPeriodQualifierTypeRepository PlanCapLimitPeriodQualifierType()
        {
            return new PlanCapLimitPeriodQualifierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The PrescriberDrugOverrideList Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PrescriberDrugOverrideList Repository</returns>
        public IPrescriberDrugOverrideListRepository PrescriberDrugOverrideList()
        {
            return new PrescriberDrugOverrideListRepository(_config, _db);
        }

        /// <summary>
        /// The PlanPricing Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanPricing Repository</returns>
        public IPlanPricingRepository PlanPricing()
        {
            return new PlanPricingRepository(_config, _db);
        }

        /// <summary>
        /// The ProductType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ProductType Repository</returns>
        public IProductTypeRepository ProductType()
        {
            return new ProductTypeRepository(_config, _db);
        }

        /// <summary>
        /// The RxPricingType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the RxPricingType Repository</returns>
        public IRxPricingTypeRepository RxPricingType()
        {
            return new RxPricingTypeRepository(_config, _db);
        }

        /// <summary>
        /// The ServiceType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceType Repository</returns>
        public IServiceTypeRepository ServiceType()
        {
            return new ServiceTypeRepository(_config, _db);
        }

        /// <summary>
        /// The WaiverRiderType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the WaiverRiderType Repository</returns>
        public IWaiverRiderTypeRepository WaiverRiderType()
        {
            return new WaiverRiderTypeRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitServiceType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitServiceType Repository</returns>
        public IBenefitServiceTypeRepository BenefitServiceType()
        {
            return new BenefitServiceTypeRepository(_config, _db);
        }

        /// <summary>
        /// The Benefit Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Benefit Repository</returns>
        public IBenefitRepository Benefit()
        {
            return new BenefitRepository(_config, _db);
        }

        /// <summary>
        /// The BenefitPlanBenefit Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanBenefit Repository</returns>
        public IBenefitPlanBenefitRepository BenefitPlanBenefit()
        {
            return new BenefitPlanBenefitRepository(_config, _db);
        }

        #endregion " Benefit Plans Repositories"

        #region " Coverage Phase Repositories"

        /// <summary>
        /// The CoveragePhase Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoveragePhase Repository</returns>
        public ICoveragePhaseRepository CoveragePhase()
        {
            return new CoveragePhaseRepository(_config, _db);
        }

        /// <summary>
        /// The CoveragePhaseType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoveragePhaseType Repository</returns>
        public ICoveragePhaseTypeRepository CoveragePhaseType()
        {
            return new CoveragePhaseTypeRepository(_config, _db);
        }

        #endregion " Coverage Phase Repositories"

        #region " Coverage Set Repositories "

        /// <summary>
        /// The BenefitPlanBenefitCoverageSetNetworkTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanBenefitCoverageSetNetworkTier Repository</returns>
        public IBenefitPlanBenefitCoverageSetNetworkTierRepository BenefitPlanBenefitCoverageSetNetworkTier()
        {
            return new BenefitPlanBenefitCoverageSetNetworkTierRepository(_config, _db);
        }

        /// <summary>
        /// The ThresholdQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ThresholdQualifierType Repository</returns>
        public IThresholdQualifierTypeRepository ThresholdQualifierType()
        {
            return new ThresholdQualifierTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CoverageSet Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoverageSet Repository</returns>
        public ICoverageSetRepository CoverageSet()
        {
            return new CoverageSetRepository(_config, _db);
        }

        /// <summary>
        /// The CoverageSetCriteriaSet Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoverageSetCriteriaSet Repository</returns>
        public ICoverageSetCriteriaSetRepository CoverageSetCriteriaSet()
        {
            return new CoverageSetCriteriaSetRepository(_config, _db);
        }

        /// <summary>
        /// The CvrgSetThreshold Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CvrgSetThreshold Repository</returns>
        public ICoverageSetThresholdRepository CvrgSetThreshold()
        {
            return new CoverageSetThresholdRepository(_config, _db);
        }

        /// <summary>
        /// The PymtPrflDtl Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PymtPrflDtl Repository</returns>
        public IPaymentProfileDetailRepository PymtPrflDtl()
        {
            return new PaymentProfileDetailRepository(_config, _db);
        }

        /// <summary>
        /// The PymtPrfl Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PymtPrfl Repository</returns>
        public IPaymentProfileRepository PymtPrfl()
        {
            return new PaymentProfileRepository(_config, _db);
        }

        /// <summary>
        /// The Threshold Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Threshold Repository</returns>
        public IThresholdRepository Threshold()
        {
            return new ThresholdRepository(_config, _db);
        }

        /// <summary>
        /// The DeductibleEpisode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleEpisode Repository</returns>
        public IDeductibleEpisodeRepository DeductibleEpisode()
        {
            return new DeductibleEpisodeRepository(_config, _db);
        }

        #endregion " Coverage Set Repositories "

        #region " Criteria Group Repositories "

        /// <summary>
        /// The CriteriaSet Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CriteriaSet Repository</returns>
        public ICriteriaSetRepository CriteriaSet()
        {
            return new CriteriaSetRepository(_config, _db);
        }

        /// <summary>
        /// The CriteriaDetail Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CriteriaDetail Repository</returns>
        public ICriteriaDetailRepository CriteriaDetail()
        {
            return new CriteriaDetailRepository(_config, _db);
        }

        /// <summary>
        /// The CriteriaConditionType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CriteriaConditionType Repository</returns>
        public ICriteriaConditionTypeRepository CriteriaConditionType()
        {
            return new CriteriaConditionTypeRepository(_config, _db);
        }

        /// <summary>
        /// The CriteriaOperatorType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CriteriaOperatorType Repository</returns>
        public ICriteriaOperatorTypeRepository CriteriaOperatorType()
        {
            return new CriteriaOperatorTypeRepository(_config, _db);
        }

        /// <summary>
        /// The ValueQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ValueQualifierType Repository</returns>
        public IValueQualifierTypeRepository ValueQualifierType()
        {
            return new ValueQualifierTypeRepository(_config, _db);
        }

        #endregion " Criteria Group Repositories "

        #region " Contact Repositories "

        /// <summary>
        /// The Contact Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Contact Repository</returns>
        public IContactRepository Contact()
        {
            return new ContactRepository(_config, _db);
        }

        /// <summary>
        /// The ContactAccount Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactAccount Repository</returns>
        public IContactAccountRepository ContactAccount()
        {
            return new ContactAccountRepository(_config, _db);
        }

        /// <summary>
        /// The ContactElectronicAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactElectronicAddress Repository</returns>
        public IContactElectronicAddressRepository ContactElectronicAddress()
        {
            return new ContactElectronicAddressRepository(_config, _db);
        }

        /// <summary>
        /// The ContactGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactGroup Repository</returns>
        public IContactGroupRepository ContactGroup()
        {
            return new ContactGroupRepository(_config, _db);
        }

        /// <summary>
        /// The ContactPopulationGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactPopulationGroup Repository</returns>
        public IContactPopulationGroupRepository ContactPopulationGroup()
        {
            return new ContactPopulationGroupRepository(_config, _db);
        }

        /// <summary>
        /// The ContactPostalAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactPostalAddress Repository</returns>
        public IContactPostalAddressRepository ContactPostalAddress()
        {
            return new ContactPostalAddressRepository(_config, _db);
        }

        /// <summary>
        /// The ContactResponsibilityType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactResponsibilityType Repository</returns>
        public IContactResponsibilityTypeRepository ContactResponsibilityType()
        {
            return new ContactResponsibilityTypeRepository(_config, _db);
        }

        /// <summary>
        /// The ContactTelephoneNumber Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTelephoneNumber Repository</returns>
        public IContactTelephoneNumberRepository ContactTelephoneNumber()
        {
            return new ContactTelephoneNumberRepository(_config, _db);
        }

        /// <summary>
        /// The ContactTenant Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTenant Repository</returns>
        public IContactTenantRepository ContactTenant()
        {
            return new ContactTenantRepository(_config, _db);
        }

        /// <summary>
        /// The ContactTenantFamily Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTenantFamily Repository</returns>
        public IContactTenantFamilyRepository ContactTenantFamily()
        {
            return new ContactTenantFamilyRepository(_config, _db);
        }

        /// <summary>
        /// The ContactType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactType Repository</returns>
        public IContactTypeRepository ContactType()
        {
            return new ContactTypeRepository(_config, _db);
        }

        #endregion " Contact Repositories "

        #region " Deductible Repositories "

        /// <summary>
        /// The Deductible Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Deductible Repository</returns>
        public IDeductibleRepository Deductible()
        {
            return new DeductibleRepository(_config, _db);
        }

        /// <summary>
        /// The DeductibleExclusion Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleExclusion Repository</returns>
        public IDeductibleExclusionRepository DeductibleExclusion()
        {
            return new DeductibleExclusionRepository(_config, _db);
        }

        /// <summary>
        /// The DeductibleScopeType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleScopeType Repository</returns>
        public IDeductibleScopeTypeRepository DeductibleScopeType()
        {
            return new DeductibleScopeTypeRepository(_config, _db);
        }

        /// <summary>
        /// The DeductibleType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleType Repository</returns>
        public IDeductibleTypeRepository DeductibleType()
        {
            return new DeductibleTypeRepository(_config, _db);
        }

        /// <summary>
        /// DeductibleExclusionQualifierTypeRepository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns></returns>
		public IDeductibleExclusionQualifierTypeRepository DeductibleExclusionQualifierType()
        {
            return new DeductibleExclusionQualifierTypeRepository(_config, _db);
        }

        #endregion " Deductible Repositories "

        #region " Group Repositories "

        /// <summary>
        /// The Group Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Group Repository</returns>
        public IGroupRepository Group()
        {
            return new GroupRepository(_config, _db);
        }

        /// <summary>
        /// The GroupAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the GroupAddress Repository</returns>
        public IGroupAddressRepository GroupAddress()
        {
            return new GroupAddressRepository(_config, _db);
        }

        #endregion " Group Repositories "

        #region " Plan Benefit Package "

        /// <summary>
        /// The PlanBenefitPackage Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackage Repository</returns>
        public IPlanBenefitPackageRepository PlanBenefitPackage()
        {
            return new PlanBenefitPackageRepository(_config, _db);
        }

        /// <summary>
        /// The PlanBenefitPackageBenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackageBenefitPlan Repository</returns>
        public IPlanBenefitPackageBenefitPlanRepository PlanBenefitPackageBenefitPlan()
        {
            return new PlanBenefitPackageBenefitPlanRepository(_config, _db);
        }

        /// <summary>
        /// The PlanBenefitPackageBenefitPlanConfigurationProperty Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackageBenefitPlanConfigurationProperty Repository</returns>
        public IPlanBenefitPackageBenefitPlanConfigurationPropertyRepository PlanBenefitPackageBenefitPlanConfigurationProperty()
        {
            return new PlanBenefitPackageBenefitPlanConfigurationPropertyRepository(_config, _db);
        }

        /// <summary>
		/// The PlanBenefitPackageConfigurationProperty Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PlanBenefitPackageConfigurationProperty Repository</returns>
		public IPlanBenefitPackageConfigurationPropertyRepository PlanBenefitPackageConfigurationProperty()
        {
            return new PlanBenefitPackageConfigurationPropertyRepository(_config, _db);
        }
         #endregion " Plan Benefit Package "

        #region " Population Group Repositories "

        /// <summary>
        /// The NetworkNetworkTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkNetworkTier Repository</returns>
        public INetworkNetworkTierRepository NetworkNetworkTier()
        {
            return new NetworkNetworkTierRepository(_config, _db);
        }

        /// <summary>
        /// The PopulationGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroup Repository</returns>
        public IPopulationGroupRepository PopulationGroup()
        {
            return new PopulationGroupRepository(_config, _db);
        }

        /// <summary>
        /// The PopulationGroupAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupAddress Repository</returns>
        public IPopulationGroupAddressRepository PopulationGroupAddress()
        {
            return new PopulationGroupAddressRepository(_config, _db);
        }

        /// <summary>
        /// The PopulationGroupBenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupBenefitPlan Repository</returns>
        public IPopulationGroupBenefitPlanRepository PopulationGroupBenefitPlan()
        {
            return new PopulationGroupBenefitPlanRepository(_config, _db);
        }

        /// <summary>
        /// The PopulationGroupPlanBenefitPackage Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupPlanBenefitPackage Repository</returns>
        public IPopulationGroupPlanBenefitPackageRepository PopulationGroupPlanBenefitPackage()
        {
            return new PopulationGroupPlanBenefitPackageRepository(_config, _db);
        }

        /// <summary>
        /// The PopGroupPlanBenefitPackageHealthCareFinancialAccount Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopGroupPlanBenefitPackageHealthCareFinancialAccount Repository</returns>
        public IPopGroupPlanBenefitPackageHealthCareFinancialAccountRepository PopGroupPlanBenefitPackageHealthCareFinancialAccount()
        {
            return new PopGroupPlanBenefitPackageHealthCareFinancialAccountRepository(_config, _db);
        }

        /// <summary>
        /// The PopulationGroupPlanBenefitPackageStatus Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupPlanBenefitPackageStatus Repository</returns>
        public IPopulationGroupPlanBenefitPackageStatusRepository PopulationGroupPlanBenefitPackageStatus()
        {
            return new PopulationGroupPlanBenefitPackageStatusRepository(_config, _db);
        }

        /// <summary>
		/// The PopulationGroupPlanBenefitPlanStatusCurrent Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PopulationGroupPlanBenefitPlanStatusCurrent Repository</returns>
		public IPopulationGroupPlanBenefitPlanStatusCurrentRepository PopulationGroupPlanBenefitPlanStatusCurrent()
        {
            return new PopulationGroupPlanBenefitPlanStatusCurrentRepository(_config, _db);
        }

        /// <summary>
        /// The StatusType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StatusType Repository</returns>
        public IStatusTypeRepository StatusType()
        {
            return new StatusTypeRepository(_config, _db);
        }

        #endregion " Population Group Repositories "

        #region " Prescriber Repositories "

        /// <summary>
        /// The AllowedPrescribersDetail Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AllowedPrescribersDetail Repository</returns>
        public IAllowedPrescribersDetailRepository AllowedPrescribersDetail()
        {
            return new AllowedPrescribersDetailRepository(_config, _db);
        }

        /// <summary>
        /// The PrescriberDrugOverrideDetail Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PrescriberDrugOverrideDetail Repository</returns>
        public IPrescriberDrugOverrideDetailRepository PrescriberDrugOverrideDetail()
        {
            return new PrescriberDrugOverrideDetailRepository(_config, _db);
        }

        /// <summary>
        /// The Prescriber Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Prescriber Repository</returns>
        public IPrescriberRepository Prescriber()
        {
            return new PrescriberRepository(_config, _db);
        }

        #endregion " Prescriber Repositories "

        #region " Service Area Repositories "

        /// <summary>
        /// The ServiceArea Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceArea Repository</returns>
        public IServiceAreaRepository ServiceArea()
        {
            return new ServiceAreaRepository(_config, _db);
        }

        /// <summary>
        /// The ServiceAreaCountry Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaCountry Repository</returns>
        public IServiceAreaCountryRepository ServiceAreaCountry()
        {
            return new ServiceAreaCountryRepository(_config, _db);
        }

        /// <summary>
        /// The ServiceAreaCounty Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaCounty Repository</returns>
        public IServiceAreaCountyRepository ServiceAreaCounty()
        {
            return new ServiceAreaCountyRepository(_config, _db);
        }

        /// <summary>
        /// The ServiceAreaPostalCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaPostalCode Repository</returns>
        public IServiceAreaPostalCodeRepository ServiceAreaPostalCode()
        {
            return new ServiceAreaPostalCodeRepository(_config, _db);
        }

        /// <summary>
        /// The ServiceAreaStateProvince Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaStateProvince Repository</returns>
        public IServiceAreaStateProvinceRepository ServiceAreaStateProvince()
        {
            return new ServiceAreaStateProvinceRepository(_config, _db);
        }

        #endregion " Service Area Repositories "

        #region " Tenant Repositories "

        /// <summary>
        /// The Address Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Address Repository</returns>
        public ITenantRepository Tenant()
        {
            return new TenantRepository(_config, _db);
        }

        /// <summary>
        /// The TenantAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantAddress Repository</returns>
        public ITenantAddressRepository TenantAddress()
        {
            return new TenantAddressRepository(_config, _db);
        }

        /// <summary>
        /// The TenantPayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantPayerId Repository</returns>
        public ITenantPayerIdRepository TenantPayerId()
        {
            return new TenantPayerIdRepository(_config, _db);
        }

        /// <summary>
        /// The TenantRXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantRXBIN Repository</returns>
        public ITenantRXBINRepository TenantRXBIN()
        {
            return new TenantRXBINRepository(_config, _db);
        }

        /// <summary>
        /// The TenantPCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantPCN Repository</returns>
        public ITenantPCNRepository TenantPCN()
        {
            return new TenantPCNRepository(_config, _db);
        }

        #endregion " Tenant Repositories "

        #region " Tenant Family Repositories "

        /// <summary>
        /// The Address Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Address Repository</returns>
        public ITenantFamilyRepository TenantFamily()
        {
            return new TenantFamilyRepository(_config, _db);
        }

        /// <summary>
        /// The TenantFamilyAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantFamilyAddress Repository</returns>
        public ITenantFamilyAddressRepository TenantFamilyAddress()
        {
            return new TenantFamilyAddressRepository(_config, _db);
        }

        #endregion " Tenant Family Repositories "

        #region Workflow Repositories

        /// <summary>
        /// The StatusNote Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StatusNote Repository</returns>
        public IStatusNoteRepository StatusNote()
        {
            return new StatusNoteRepository(_config, _db);
        }

        #endregion Workflow Repositories
    }
}