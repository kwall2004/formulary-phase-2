using Atlas.BenefitPlan.DAL.Repositories.Interfaces;

namespace Atlas.BenefitPlan.DAL
{
    /// <summary>
    /// The Benefit Plan Repository Factory
    /// </summary>
    /// <remarks>This Factory has the entries for each of the Repositories in Benefit Plan</remarks>
    public interface IBenefitPlanRepositoryFactory
    {
        /// <summary>
        /// The Stored Procedure Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CommunicationUsageType Repository</returns>
        IAtlasBenefitPlanStoredProcsRepository AtlasBenefitPlanStoredProcs();

        /// <summary>
        /// The CommunicationUsageType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CommunicationUsageType Repository</returns>
        ICommunicationUsageTypeRepository CommunicationUsageType();

        /// <summary>
        /// The CopayFunctionType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayFunctionType Repository</returns>
        ICopayFunctionTypeRepository CopayFunctionType();

        /// <summary>
        /// The HealthCareFinancialAccountType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the HealthCareFinancialAccountType Repository</returns>
        IHealthCareFinancialAccountTypeRepository HealthCareFinancialAccountType();

        /// <summary>
        /// The LineOfBusiness Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LineOfBusiness Repository</returns>
        ILineOfBusinessRepository LineOfBusiness();

        /// <summary>
        /// The MACList Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the MACList Repository</returns>
        IMACListRepository MACList();

        /// <summary>
        /// The Network Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Network Repository</returns>
        INetworkRepository Network();

        /// <summary>
        /// The NetworkTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkTier Repository</returns>
        INetworkTierRepository NetworkTier();

        /// <summary>
        /// The NetworkTierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkTierType Repository</returns>
        INetworkTierTypeRepository NetworkTierType();

        /// <summary>
        /// The PayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PayerId Repository</returns>
        IPayerIdRepository PayerId();

        /// <summary>
        /// The PCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PCN Repository</returns>
        IPCNRepository PCN();

        /// <summary>
        /// The RXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the RXBIN Repository</returns>
        IRXBINRepository RXBIN();

        /// <summary>
        /// The BenefitStatus Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BnftStat Repository</returns>
        IBenefitStatusRepository BnftStat();

        /// <summary>
        /// The CrtriaSetType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CrtriaSetType Repository</returns>
        ICriteriaSetTypeRepository CrtriaSetType();

        /// <summary>
        /// The BnftCrtriaSet Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BnftCrtriaSet Repository</returns>
        IBenefitCriteriaSetRepository BnftCrtriaSet();

        /// <summary>
        /// The FreqQulfrType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FreqQulfrType Repository</returns>
        IFrequencyQualifierTypeRepository FreqQulfrType();

        /// <summary>
        /// The CopayExclusion Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns></returns>
        ICopayOverrideRepository CopayExclusion();

        #region " Account Repositories "

        /// <summary>
        /// The Account Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Account Repository</returns>
        IAccountRepository Account();

        /// <summary>
        /// The AccountAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountAddress Repository</returns>
        IAccountAddressRepository AccountAddress();

        /// <summary>
        /// The AccountPCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountPCN Repository</returns>
        IAccountPCNRepository AccountPCN();

        /// <summary>
        /// The AccountRXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountRXBIN Repository</returns>
        IAccountRXBINRepository AccountRXBIN();

        /// <summary>
        /// The AccountPayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AccountPayerId Repository</returns>
        IAccountPayerIdRepository AccountPayerId();

        #endregion " Account Repositories "

        #region " Address Repositories "

        /// <summary>
        /// The Address Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Address Repository</returns>
        IAddressRepository Address();

        /// <summary>
		/// The CountyPostalCode Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the CountyPostalCode Repository</returns>
		ICountyPostalCodeRepository CountyPostalCode();

        /// <summary>
        /// The FIPSCountyCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FIPSCountyCode Repository</returns>
        IFIPSCountyCodeRepository FIPSCountyCode();

        /// <summary>
        /// The ISOCountryCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ISOCountryCode Repository</returns>
        IISOCountryCodeRepository ISOCountryCode();

        /// <summary>
        /// The PostalCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PostalCode Repository</returns>
        IPostalCodeRepository PostalCode();

        /// <summary>
        /// The StateProvinceCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StateProvinceCode Repository</returns>
        IStateProvinceCodeRepository StateProvinceCode();

        #endregion " Address Repositories "

        #region " Benefit Plans Repository"

        /// <summary>
        /// The BenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlan Repository</returns>
        IBenefitPlanRepository BenefitPlan();

        /// <summary>
        /// The Allowed Prescriber List Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AllowedPrescribersList Repository</returns>
        IAllowedPrescribersListRepository AllowedPrescribersList();

        /// <summary>
        /// The BenefitPlanConfigurationProperty Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanConfigurationProperty Repository</returns>
        IBenefitPlanConfigurationPropertyRepository BenefitPlanConfigurationProperty();

        /// <summary>
        /// The BenefitPlanPharmacyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanPharmacyType Repository</returns>
        IBenefitPlanPharmacyTypeRepository BenefitPlanPharmacyType();

        /// <summary>
        /// The BenefitPlanPharmacyTypeDaySupply Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanPharmacyTypeDaySupply Repository</returns>
        IBenefitPlanPharmacyTypeDaySupplyRepository BenefitPlanPharmacyTypeDaySupply();

        /// <summary>
        /// The BenefitPlanSizeClassificationType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanSizeClassificationType Repository</returns>
        IBenefitPlanSizeClassificationTypeRepository BenefitPlanSizeClassificationType();

        /// <summary>
        /// The BenefitPlanType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanType Repository</returns>
        IBenefitPlanTypeRepository BenefitPlanType();


        /// <summary>
        /// The BenefitPlanWaiverRider Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanWaiverRider Repository</returns>
        IBenefitPlanWaiverRiderRepository BenefitPlanWaiverRider();

        /// <summary>
        /// The CMSBenefitStructureType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CMSBenefitStructureType Repository</returns>
        ICMSBenefitStructureTypeRepository CMSBenefitStructureType();

        /// <summary>
        /// The ConfigurationPropertyOption Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ConfigurationPropertyOption Repository</returns>
        IConfigurationPropertyOptionRepository ConfigurationPropertyOption();

        /// <summary>
        /// The ConfigurationPropertyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ConfigurationPropertyType Repository</returns>
        IConfigurationPropertyTypeRepository ConfigurationPropertyType();

        /// <summary>
        /// The CopayCoinsuranceLogicType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayCoinsuranceLogicType Repository</returns>
        ICopayCoinsuranceLogicTypeRepository CopayCoinsuranceLogicType();

        /// <summary>
        /// The CopayDistribution Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CopayDistribution Repository</returns>
        ICopayDistributionRepository CopayDistribution();

        /// <summary>
		/// The CopayOverride Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the CopayOverride Repository</returns>
		ICopayOverrideRepository CopayOverride();

        /// <summary>
		/// The CopayOverrideQualifierType Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the CopayOverrideQualifierType Repository</returns>
		ICopayOverrideQualifierTypeRepository CopayOverrideQualifierType();

        /// <summary>
		/// The CopaySetup Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the CopaySetup Repository</returns>
		ICopaySetupRepository CopaySetup();

        /// <summary>
        /// The CostBasisType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CostBasisType Repository</returns>
        ICostBasisTypeRepository CostBasisType();

        /// <summary>
        /// The DaySupplyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DaySupplyType Repository</returns>
        IDaySupplyTypeRepository DaySupplyType();

        /// The DispenseAsWrittenCopay Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DispenseAsWrittenCopay Repository</returns>
        IDispenseAsWrittenCopayRepository DispenseAsWrittenCopay();

        /// <summary>
        /// The DispenseAsWrittenType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DispenseAsWrittenType Repository</returns>
        IDispenseAsWrittenTypeRepository DispenseAsWrittenType();

        /// <summary>
        /// The DrugBrandType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugBrandType Repository</returns>
        IDrugBrandTypeRepository DrugBrandType();

        /// <summary>
        /// The DrugClassType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugClassType Repository</returns>
        IDrugClassTypeRepository DrugClassType();

        /// <summary>
        /// The DrugReferenceDatabase Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DrugReferenceDatabase Repository</returns>
        IDrugReferenceDatabaseRepository DrugReferenceDatabase();

        /// <summary>
        /// The EarlyRefillExcption Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the EarlyRefillExcption Repository</returns>
        IEarlyRefillExcptionRepository EarlyRefillExcption();

        /// <summary>
        /// The EarlyRefillExcptionQulfierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the EarlyRefillExcptionQulfierType Repository</returns>
        IEarlyRefillExcptionQulfierTypeRepository EarlyRefillExcptionQulfierType();

        /// <summary>
        /// The FillException Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FillException Repository</returns>
        IFillExceptionRepository FillException();

        /// <summary>
        /// The FillExceptionChangeQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FillExceptionChangeQualifierType Repository</returns>
        IFillExceptionChangeQualifierTypeRepository FillExceptionChangeQualifierType();

        /// <summary>
        /// The Formulary Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Formulary Repository</returns>
        IFormularyRepository Formulary();

        /// <summary>
        /// The FormularyTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the FormularyTier Repository</returns>
        IFormularyTierRepository FormularyTier();

        /// <summary>
        /// The LowIncomeCostSharingSubsidySetup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LowIncomeCostSharingSubsidySetup Repository</returns>
        ILowIncomeCostSharingSubsidySetupRepository LowIncomeCostSharingSubsidySetup();

        /// <summary>
        /// The LowIncomeCostSharingSubsidyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the LowIncomeCostSharingSubsidyType Repository</returns>
        ILowIncomeCostSharingSubsidyTypeRepository LowIncomeCostSharingSubsidyType();


        /// <summary>
        /// The NetworkBenefitPlanType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkBenefitPlanType Repository</returns>
        INetworkBenefitPlanTypeRepository NetworkBenefitPlanType();


        /// <summary>
        /// The PharmacyType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PharmacyType Repository</returns>
        IPharmacyTypeRepository PharmacyType();

        /// <summary>
        /// The PlanClassificationType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanClassificationType Repository</returns>
        IPlanClassificationTypeRepository PlanClassificationType();

        /// <summary>
        /// The PlanCapLimit Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanCapLimit Repository</returns>
        IPlanCapLimitRepository PlanCapLimit();

        /// <summary>
        /// The PlanCapLimitQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanCapLimitQualifierType Repository</returns>
        IPlanCapLimitQualifierTypeRepository PlanCapLimitQualifierType();

        /// <summary>
        /// The PlanCapLimitPeriodQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanCapLimitPeriodQualifierType Repository</returns>
        IPlanCapLimitPeriodQualifierTypeRepository PlanCapLimitPeriodQualifierType();

        /// <summary>
        /// The PrescriberDrugOverrideList Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PrescriberDrugOverrideList Repository</returns>
        IPrescriberDrugOverrideListRepository PrescriberDrugOverrideList();

        /// <summary>
        /// The PlanPricing Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanPricing Repository</returns>
        IPlanPricingRepository PlanPricing();

        /// <summary>
        /// The ProductType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ProductType Repository</returns>
        IProductTypeRepository ProductType();

        /// <summary>
        /// The RxPricingType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the RxPricingType Repository</returns>
        IRxPricingTypeRepository RxPricingType();

        /// <summary>
        /// The ServiceType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceType Repository</returns>
        IServiceTypeRepository ServiceType();

        /// <summary>
        /// The WaiverRiderType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the WaiverRiderType Repository</returns>
        IWaiverRiderTypeRepository WaiverRiderType();

        /// <summary>
        /// The BenefitServiceType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitServiceType Repository</returns>
        IBenefitServiceTypeRepository BenefitServiceType();

        /// <summary>
        /// The Benefit Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Benefit Repository</returns>
        IBenefitRepository Benefit();

        /// <summary>
        /// The BenefitPlanBenefit Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanBenefit Repository</returns>
        IBenefitPlanBenefitRepository BenefitPlanBenefit();

        #endregion " Benefit Plans Repository"

        #region " Coverage Set Repositories "

        /// <summary>
        /// The BenefitPlanBenefit Coverage Set Network Tier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the BenefitPlanBenefitCoverageSetNetworkTier Repository</returns>
        IBenefitPlanBenefitCoverageSetNetworkTierRepository BenefitPlanBenefitCoverageSetNetworkTier();

        /// <summary>
        /// The ThresholdQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ThresholdQualifierType Repository</returns>
        IThresholdQualifierTypeRepository ThresholdQualifierType();

        /// <summary>
        /// The Coverage Set Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoverageSet Repository</returns>
        ICoverageSetRepository CoverageSet();

        /// <summary>
        /// The Coverage Set Criteria Set Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoverageSetCriteriaSet Repository</returns>
        ICoverageSetCriteriaSetRepository CoverageSetCriteriaSet();

        /// <summary>
        /// The Coverage Set Threshold Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CvrgSetThreshold Repository</returns>
        ICoverageSetThresholdRepository CvrgSetThreshold();

        /// <summary>
        /// The PymtPrflDtl Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PymtPrflDtl Repository</returns>
        IPaymentProfileDetailRepository PymtPrflDtl();

        /// <summary>
        /// The PymtPrfl Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PymtPrfl Repository</returns>
        IPaymentProfileRepository PymtPrfl();

        /// <summary>
        /// The Threshold Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Threshold Repository</returns>
        IThresholdRepository Threshold();

        /// <summary>
        /// The DeductibleEpisode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleEpisode Repository</returns>
        IDeductibleEpisodeRepository DeductibleEpisode();

        #endregion " Coverage Set Repositories "

        #region " Criteria Group Repositories "

        /// <summary>
        /// The Criteria Set Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Criteria Set Repository</returns>
        ICriteriaSetRepository CriteriaSet();

        /// <summary>
        /// The Criteria Detail Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Criteria Detail Repository</returns>
        ICriteriaDetailRepository CriteriaDetail();

        /// <summary>
        /// The Criteria Condition Type Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Criteria Condition Type Repository</returns>
        ICriteriaConditionTypeRepository CriteriaConditionType();

        /// <summary>
        /// The Criteria Operator Type Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Criteria Operator Type Repository</returns>
        ICriteriaOperatorTypeRepository CriteriaOperatorType();

        /// <summary>
        /// The Value Qualifier Type Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Value Qualifier Type Repository</returns>
        IValueQualifierTypeRepository ValueQualifierType();

        #endregion " Criteria Group Repositories "

        #region " Contact Repositories "

        /// <summary>
        /// The Contact Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Contact Repository</returns>
        IContactRepository Contact();

        /// <summary>
        /// The ContactAccount Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactAccount Repository</returns>
        IContactAccountRepository ContactAccount();

        /// <summary>
        /// The ContactElectronicAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactElectronicAddress Repository</returns>
        IContactElectronicAddressRepository ContactElectronicAddress();

        /// <summary>
        /// The ContactGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactGroup Repository</returns>
        IContactGroupRepository ContactGroup();

        /// <summary>
        /// The ContactPopulationGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactPopulationGroup Repository</returns>
        IContactPopulationGroupRepository ContactPopulationGroup();

        /// <summary>
        /// The ContactPostalAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactPostalAddress Repository</returns>
        IContactPostalAddressRepository ContactPostalAddress();

        /// <summary>
        /// The ContactResponsibilityType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactResponsibilityType Repository</returns>
        IContactResponsibilityTypeRepository ContactResponsibilityType();

        /// <summary>
        /// The ContactTelephoneNumber Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTelephoneNumber Repository</returns>
        IContactTelephoneNumberRepository ContactTelephoneNumber();

        /// <summary>
        /// The ContactTenant Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTenant Repository</returns>
        IContactTenantRepository ContactTenant();

        /// <summary>
        /// The ContactTenantFamily Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactTenantFamily Repository</returns>
        IContactTenantFamilyRepository ContactTenantFamily();

        /// <summary>
        /// The ContactType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ContactType Repository</returns>
        IContactTypeRepository ContactType();

        #endregion " Contact Repositories "

        #region " Coverage Phase Repositories"

        /// <summary>
        /// The CoveragePhase Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoveragePhase Repository</returns>
        ICoveragePhaseRepository CoveragePhase();

        /// <summary>
        /// The CoveragePhaseType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the CoveragePhaseType Repository</returns>
        ICoveragePhaseTypeRepository CoveragePhaseType();

        #endregion " Coverage Phase Repositories"

        #region " Deductible Repositories "

        /// <summary>
        /// The Deductible Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Deductible Repository</returns>
        IDeductibleRepository Deductible();

        /// <summary>
        /// The DeductibleExclusion Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleExclusion Repository</returns>
        IDeductibleExclusionRepository DeductibleExclusion();

        /// <summary>
        /// The DeductibleExclusionQualifierType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>DeductibleExclusionQualifierType Repository</returns>
        IDeductibleExclusionQualifierTypeRepository DeductibleExclusionQualifierType();

        /// <summary>
        /// The DeductibleScopeType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleScopeType Repository</returns>
        IDeductibleScopeTypeRepository DeductibleScopeType();

        /// <summary>
        /// The DeductibleType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the DeductibleType Repository</returns>
        IDeductibleTypeRepository DeductibleType();

        #endregion " Deductible Repositories "

        #region " Group Repositories "

        /// <summary>
        /// The Group Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Group Repository</returns>
        IGroupRepository Group();

        /// <summary>
        /// The GroupAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the GroupAddress Repository</returns>
        IGroupAddressRepository GroupAddress();

        #endregion " Group Repositories "

        #region " Plan Benefit Package "

        /// <summary>
        /// The PlanBenefitPackage Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackage Repository</returns>
        IPlanBenefitPackageRepository PlanBenefitPackage();

        /// <summary>
        /// The PlanBenefitPackageBenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackageBenefitPlan Repository</returns>
        IPlanBenefitPackageBenefitPlanRepository PlanBenefitPackageBenefitPlan();

        /// <summary>
        /// The PlanBenefitPackageBenefitPlanConfigurationProperty Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PlanBenefitPackageBenefitPlanConfigurationProperty Repository</returns>
        IPlanBenefitPackageBenefitPlanConfigurationPropertyRepository PlanBenefitPackageBenefitPlanConfigurationProperty();

        /// <summary>
		/// The PlanBenefitPackageConfigurationProperty Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PlanBenefitPackageConfigurationProperty Repository</returns>
		IPlanBenefitPackageConfigurationPropertyRepository PlanBenefitPackageConfigurationProperty();

        #endregion " Plan Benefit Package "

        #region " Population Group Repositories "

        /// <summary>
        /// The NetworkNetworkTier Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the NetworkNetworkTier Repository</returns>
        INetworkNetworkTierRepository NetworkNetworkTier();

        /// <summary>
        /// The PopulationGroup Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroup Repository</returns>
        IPopulationGroupRepository PopulationGroup();

        /// <summary>
        /// The PopulationGroupAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupAddress Repository</returns>
        IPopulationGroupAddressRepository PopulationGroupAddress();

        /// <summary>
        /// The PopulationGroupBenefitPlan Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupBenefitPlan Repository</returns>
        IPopulationGroupBenefitPlanRepository PopulationGroupBenefitPlan();

        /// <summary>
        /// The PopulationGroupPlanBenefitPackage Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupPlanBenefitPackage Repository</returns>
        IPopulationGroupPlanBenefitPackageRepository PopulationGroupPlanBenefitPackage();

        /// <summary>
        /// The PopGroupPlanBenefitPackageHealthCareFinancialAccount Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopGroupPlanBenefitPackageHealthCareFinancialAccount Repository</returns>
        IPopGroupPlanBenefitPackageHealthCareFinancialAccountRepository PopGroupPlanBenefitPackageHealthCareFinancialAccount();

        /// <summary>
        /// The PopulationGroupPlanBenefitPackageStatus Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the PopulationGroupPlanBenefitPackageStatus Repository</returns>
        IPopulationGroupPlanBenefitPackageStatusRepository PopulationGroupPlanBenefitPackageStatus();

        /// <summary>
		/// The PopulationGroupPlanBenefitPlanStatusCurrent Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PopulationGroupPlanBenefitPlanStatusCurrent Repository</returns>
		IPopulationGroupPlanBenefitPlanStatusCurrentRepository PopulationGroupPlanBenefitPlanStatusCurrent();

        /// <summary>
        /// The StatusType Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StatusType Repository</returns>
        IStatusTypeRepository StatusType();

        #endregion " Population Group Repositories "

        #region " Prescriber Repositories "

        /// <summary>
        /// The AllowedPrescribersDetail Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the AllowedPrescribersDetail Repository</returns>
        IAllowedPrescribersDetailRepository AllowedPrescribersDetail();

        /// <summary>
		/// The PrescriberDrugOverrideDetail Repository Entry in the Benefit Plan Factory
		/// </summary>
		/// <returns>the PrescriberDrugOverrideDetail Repository</returns>
		IPrescriberDrugOverrideDetailRepository PrescriberDrugOverrideDetail();

        /// <summary>
        /// The Prescriber Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Prescriber Repository</returns>
        IPrescriberRepository Prescriber();

        #endregion " Prescriber Repositories "

        #region " Service Area Repositories "

        /// <summary>
        /// The ServiceArea Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceArea Repository</returns>
        IServiceAreaRepository ServiceArea();

        /// <summary>
        /// The ServiceAreaCountry Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaCountry Repository</returns>
        IServiceAreaCountryRepository ServiceAreaCountry();

        /// <summary>
        /// The ServiceAreaCounty Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaCounty Repository</returns>
        IServiceAreaCountyRepository ServiceAreaCounty();

        /// <summary>
        /// The ServiceAreaPostalCode Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaPostalCode Repository</returns>
        IServiceAreaPostalCodeRepository ServiceAreaPostalCode();

        /// <summary>
        /// The ServiceAreaStateProvince Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the ServiceAreaStateProvince Repository</returns>
        IServiceAreaStateProvinceRepository ServiceAreaStateProvince();

        #endregion " Service Area Repositories "

        #region " Tenant Repositories "

        /// <summary>
        /// The Tenant Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Tenant Repository</returns>
        ITenantRepository Tenant();

        /// <summary>
        /// The TenantAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantAddress Repository</returns>
        ITenantAddressRepository TenantAddress();

        /// <summary>
        /// The TenantPayerId Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantPayerId Repository</returns>
        ITenantPayerIdRepository TenantPayerId();

        /// <summary>
        /// The TenantPCN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantPCN Repository</returns>
        ITenantPCNRepository TenantPCN();

        /// <summary>
        /// The TenantRXBIN Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantRXBIN Repository</returns>
        ITenantRXBINRepository TenantRXBIN();

        #endregion " Tenant Repositories "

        #region " Tenant Family Repositories "

        /// <summary>
        /// The Tenant Family Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the Tenant Family Repository</returns>
        ITenantFamilyRepository TenantFamily();

        /// <summary>
        /// The TenantFamilyAddress Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the TenantFamilyAddress Repository</returns>
        ITenantFamilyAddressRepository TenantFamilyAddress();

        #endregion " Tenant Family Repositories "

        #region Workflow Repositories

        /// <summary>
        /// The StatusNote Repository Entry in the Benefit Plan Factory
        /// </summary>
        /// <returns>the StatusNote Repository</returns>
        IStatusNoteRepository StatusNote();

        #endregion Workflow Repositories
    }
}