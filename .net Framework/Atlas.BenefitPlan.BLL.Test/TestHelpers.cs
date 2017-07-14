using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using System.Linq.Expressions;



using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Configuration;
using Atlas.Core.BLL.Wrapper.Contract;

namespace Atlas.BenefitPlan.BLL.Test
{
    static class TestHelpers
    {
        #region " Mock Benefit Plan Repository factory "
        static public Mock<IBenefitPlanRepositoryFactory> CreateMockIBPRepositoryFactoryForEntity(long keyTF, int numberOfEntitiesPerLevel, int offsetLevelforkey)
        {
            Mock<IBenefitPlanRepositoryFactory> mockIBenefitPlanRepositoryFactory = new Mock<IBenefitPlanRepositoryFactory>();
            mockIBenefitPlanRepositoryFactory.Setup(m => m.TenantFamily()).Returns(CreateMockITenantFamilyRepository(keyTF));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.Tenant()).Returns(CreateMockITenantRepository(keyTF + offsetLevelforkey, numberOfEntitiesPerLevel));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.Account()).Returns(CreateMockIAccountRepository(keyTF + (2 * offsetLevelforkey), numberOfEntitiesPerLevel));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.Group()).Returns(CreateMockIGroupRepository(keyTF + (3 * offsetLevelforkey), numberOfEntitiesPerLevel));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.PopulationGroup()).Returns(CreateMockIPopulationGroupRepository(keyTF + (4 * offsetLevelforkey), numberOfEntitiesPerLevel));
            return mockIBenefitPlanRepositoryFactory;
        }

        static public Mock<IBenefitPlanRepositoryFactory> CreateMockIBPRepositoryFactoryForEntityAddress(long key, string addressLine1, string addressLine2, string city, long addrSK, DateTime efctvStartDt, long fIPSCntyCodeSK, long stPrvncCodeSK, string pstlCode1, long iSOCntryCodeSK)
        {
            Mock<IBenefitPlanRepositoryFactory> mockIBenefitPlanRepositoryFactory = new Mock<IBenefitPlanRepositoryFactory>();

            //address methods
            mockIBenefitPlanRepositoryFactory.Setup(m => m.TenantFamilyAddress()).Returns(CreateMockITenantFamilyAddressRepository(key, addressLine1, addressLine2, city, addrSK, efctvStartDt, fIPSCntyCodeSK, stPrvncCodeSK, pstlCode1, iSOCntryCodeSK));

            return mockIBenefitPlanRepositoryFactory;
        }

        static public Mock<IBenefitPlanRepositoryFactory> CreateMockIBPRepositoryFactoryForBenefitPlan(long benefitPlanSK)
        {
            Mock<IBenefitPlanRepositoryFactory> mockIBenefitPlanRepositoryFactory = new Mock<IBenefitPlanRepositoryFactory>();
            mockIBenefitPlanRepositoryFactory.Setup(m => m.BenefitPlan()).Returns(CreateMockIBenefitPlanRepository(benefitPlanSK));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.BenefitPlanWaiverRider()).Returns(CreateMockIBenefitPlanWaiverRiderRepository(benefitPlanSK));
            mockIBenefitPlanRepositoryFactory.Setup(m => m.CoveragePhase()).Returns(CreateMockICoveragePhaseRepository(benefitPlanSK));
            return mockIBenefitPlanRepositoryFactory;
        }
        #endregion

        #region " Mock Benefit Plan Configuration "
        static public Mock<IBenefitPlanConfig> CreateMockBenefitPlanConfiguration()
        {
            Mock<IBenefitPlanConfig> mockIBenefitPlanConfig = new Mock<IBenefitPlanConfig>();
            mockIBenefitPlanConfig.Setup(m => m.IntegrationMerlinExportPathString).Returns(GetMerlinExportPath());
            mockIBenefitPlanConfig.Setup(m => m.IntegrationMerlinSandboxExportPathString).Returns(GetMerlinExportPath("Sandbox\\"));
            mockIBenefitPlanConfig.Setup(m => m.IntegrationMCSExportPathStrings).Returns(GetMCSExportPath());
            mockIBenefitPlanConfig.Setup(m => m.IntegrationMCSSandboxExportPathStrings).Returns(GetMCSExportPath("Sandbox\\"));
            return mockIBenefitPlanConfig;
        }
        #endregion

        #region " Mock File Wrapper "
        static public Mock<IFile> CreateMockFileWrapper()
        {
            Mock<IFile> mockIFile = new Mock<IFile>();
            mockIFile.Setup(s => s.WriteAllText(It.IsAny<string>(), It.IsAny<string>()));
            return mockIFile;
        }
        #endregion

        #region Mock Repositories
        #region Mock Entity Repositories
        static public ITenantFamilyRepository CreateMockITenantFamilyRepository(long key)
        {
            Mock<ITenantFamilyRepository> mockITenantFamilyRepository = new Mock<ITenantFamilyRepository>();
            mockITenantFamilyRepository.Setup(m => m.FindOne(It.IsAny<Expression<Func<TenantFam, bool>>>())).Returns((Expression<Func<TenantFam, bool>> where) => { return GetMockTenantFam(key, where); });
            return mockITenantFamilyRepository.Object;
        }

        static public ITenantRepository CreateMockITenantRepository(long key, int numberOfEntities)
        {
            Mock<ITenantRepository> mockITenantyRepository = new Mock<ITenantRepository>();
            mockITenantyRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<Tenant, bool>>>(), It.IsAny<IQueryable<Tenant>>())).Returns((Expression<Func<Tenant, bool>> where, IQueryable<Tenant> setToFilter) => { return GetMockTenants(key, numberOfEntities); });
            return mockITenantyRepository.Object;
        }

        static public IAccountRepository CreateMockIAccountRepository(long key, int numberOfEntities)
        {
            Mock<IAccountRepository> mockIAcctRepository = new Mock<IAccountRepository>();
            mockIAcctRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<Acct, bool>>>(), It.IsAny<IQueryable<Acct>>())).Returns((Expression<Func<Acct, bool>> where, IQueryable<Acct> setToFilter) => { return GetMockAccts(key, numberOfEntities); });
            return mockIAcctRepository.Object;
        }

        static public IGroupRepository CreateMockIGroupRepository(long key, int numberOfEntities)
        {
            Mock<IGroupRepository> mockIGrpRepository = new Mock<IGroupRepository>();
            mockIGrpRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<Grp, bool>>>(), It.IsAny<IQueryable<Grp>>())).Returns((Expression<Func<Grp, bool>> where, IQueryable<Grp> setToFilter) => { return GetMockGrps(key, numberOfEntities); });
            return mockIGrpRepository.Object;
        }

        static public IPopulationGroupRepository CreateMockIPopulationGroupRepository(long key, int numberOfEntities)
        {
            Mock<IPopulationGroupRepository> mockIPopGrpyRepository = new Mock<IPopulationGroupRepository>();
            mockIPopGrpyRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<PopGrp, bool>>>(), It.IsAny<IQueryable<PopGrp>>())).Returns((Expression<Func<PopGrp, bool>> where, IQueryable<PopGrp> setToFilter) => { return GetMockPopGrps(key, numberOfEntities); });
            return mockIPopGrpyRepository.Object;
        }
        #endregion
        #region address repositories
        static public ITenantFamilyAddressRepository CreateMockITenantFamilyAddressRepository(long keyTF, string addressLine1, string addressLine2, string city, long addrSK, DateTime efctvStartDt, long fIPSCntyCodeSK, long stPrvncCodeSK, string pstlCode1, long iSOCntryCodeSK)
        {
            Mock<ITenantFamilyAddressRepository> mockITenantFamilyAddressRepository = new Mock<ITenantFamilyAddressRepository>();
            mockITenantFamilyAddressRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<TenantFamAddr, bool>>>(), It.IsAny<IQueryable<TenantFamAddr>>())).Returns((Expression<Func<TenantFamAddr, bool>> where, IQueryable<TenantFamAddr> setToFilter) => { return GetMockTenantFamilyAddress(keyTF, addressLine1, addressLine2, city, addrSK, efctvStartDt, fIPSCntyCodeSK, stPrvncCodeSK, pstlCode1, iSOCntryCodeSK); });
            return mockITenantFamilyAddressRepository.Object;
        }
        #endregion
        #region benefit Plan Repositories
        static public IBenefitPlanRepository CreateMockIBenefitPlanRepository(long benefitPlanSK)
        {
            Mock<IBenefitPlanRepository> mockITenantFamilyRepository = new Mock<IBenefitPlanRepository>();
            mockITenantFamilyRepository.Setup(m => m.FindOne(It.IsAny<Expression<Func<BnftPlan, bool>>>())).Returns((Expression<Func<BnftPlan, bool>> where) => { return GetMockBenefitPlan(benefitPlanSK, where); });
            mockITenantFamilyRepository.Setup(m => m.FindAll(It.IsAny<Expression<Func<BnftPlan, bool>>>(), It.IsAny<IQueryable<BnftPlan>>())).Returns((Expression<Func<BnftPlan, bool>> where) => { return GetMockBenefitPlans(benefitPlanSK, 4); });
            return mockITenantFamilyRepository.Object;
        }
        static public IBenefitPlanWaiverRiderRepository CreateMockIBenefitPlanWaiverRiderRepository(long benefitPlanSK)
        {
            Mock<IBenefitPlanWaiverRiderRepository> mockIBenefitPlanWaiverRiderRepository = new Mock<IBenefitPlanWaiverRiderRepository>();
            mockIBenefitPlanWaiverRiderRepository.Setup(m => m.FindOne(It.IsAny<Expression<Func<BnftPlanWvrRider, bool>>>())).Returns((Expression<Func<BnftPlanWvrRider, bool>> where) => { return GetMockBenefitPlanWaiverRider(benefitPlanSK, where); });
            mockIBenefitPlanWaiverRiderRepository
                .Setup(m => m.FindAll(It.IsAny<Expression<Func<BnftPlanWvrRider, bool>>>(), It.IsAny<IQueryable<BnftPlanWvrRider>>()))
                .Returns((Expression<Func<BnftPlanWvrRider, bool>> where, IQueryable<BnftPlanWvrRider> setToFilter) => { return GetMockBenefitPlanWaiverRiders(benefitPlanSK, 5, where); });
            return mockIBenefitPlanWaiverRiderRepository.Object;
        }
        static public ICoveragePhaseRepository CreateMockICoveragePhaseRepository(long benefitPlanSK)
        {
            Mock<ICoveragePhaseRepository> mockICoveragePhaseRepository = new Mock<ICoveragePhaseRepository>();
            mockICoveragePhaseRepository.Setup(m => m.FindOne(It.IsAny<Expression<Func<CvrgPhase, bool>>>())).Returns((Expression<Func<CvrgPhase, bool>> where) => { return GetMockCoveragePhase(benefitPlanSK, where); });
            mockICoveragePhaseRepository
                .Setup(m => m.FindAll(It.IsAny<Expression<Func<CvrgPhase, bool>>>(), It.IsAny<IQueryable<CvrgPhase>>()))
                .Returns((Expression<Func<CvrgPhase, bool>> where, IQueryable<CvrgPhase> setToFilter) => { return GetMockCoveragePhases(benefitPlanSK, 4); });
            return mockICoveragePhaseRepository.Object;
        }
        #endregion
        #endregion

        #region MockObjects
        #region Mock entity Objects
        static public TenantFam GetMockTenantFam(long tenantFamSK, Expression<Func<TenantFam, bool>> where)
        {
            TenantFam tenantFam = new TenantFam();
            tenantFam.TenantFamSK = tenantFamSK;
            tenantFam.TenantFamName = "MockTenantFamName" + tenantFam.TenantFamSK.ToString();
            return tenantFam;
        }

        static public IQueryable<Tenant> GetMockTenants(long tenantSK, int numberOfMockTenants)
        {
            List<Tenant> tenantList = new List<Tenant>();
            for (int i = 0; i < numberOfMockTenants; i++)
            {
                Tenant tenant = new Tenant();
                tenant.TenantSK = tenantSK - i;
                tenant.TenantName = "MockTenantName" + tenant.TenantSK.ToString();
                tenantList.Add(tenant);
            }
            return tenantList.AsQueryable<Tenant>();

        }

        static public IQueryable<Acct> GetMockAccts(long AcctSK, int numberOfMockAccts)
        {
            List<Acct> AcctList = new List<Acct>();
            for (int i = 0; i < numberOfMockAccts; i++)
            {
                Acct acct = new Acct();
                acct.AcctSK = AcctSK - i;
                acct.AcctName = "MockAcctName" + acct.AcctSK.ToString();
                AcctList.Add(acct);
            }
            return AcctList.AsQueryable<Acct>();

        }

        static public IQueryable<Grp> GetMockGrps(long GrpSK, int numberOfMockGrps)
        {
            List<Grp> GrpList = new List<Grp>();
            for (int i = 0; i < numberOfMockGrps; i++)
            {
                Grp grp = new Grp();
                grp.GrpSK = GrpSK - i;
                grp.GrpName = "MockGrpName" + grp.GrpSK.ToString();
                GrpList.Add(grp);
            }
            return GrpList.AsQueryable<Grp>();

        }

        static public IQueryable<PopGrp> GetMockPopGrps(long PopGrpSK, int numberOfMockPopGrps)
        {
            List<PopGrp> PopGrpList = new List<PopGrp>();
            for (int i = 0; i < numberOfMockPopGrps; i++)
            {
                PopGrp popGrp = new PopGrp();
                popGrp.PopGrpSK = PopGrpSK - i;
                popGrp.PopGrpName = "MockPopGrpName" + popGrp.PopGrpSK.ToString();
                PopGrpList.Add(popGrp);
            }
            return PopGrpList.AsQueryable<PopGrp>();

        }
        #endregion

        #region mock address objects
        static public IQueryable<TenantFamAddr> GetMockTenantFamilyAddress(long tenantFamSK, string addressLine1, string addressLine2, string city, long addrSK, DateTime efctvStartDt, long fIPSCntyCodeSK, long stPrvncCodeSK, string pstlCode1, long iSOCntryCodeSK)
        {
            //create tenantFamAddr record
            List<TenantFamAddr> listTenantFamAddr = new List<TenantFamAddr>();
            TenantFamAddr tenantFamAddr = new TenantFamAddr();
            tenantFamAddr.TenantFamAddrSK = tenantFamSK;
            tenantFamAddr.TenantFamSK = tenantFamSK;
            tenantFamAddr.AddrSK = addrSK;
            tenantFamAddr.TenantFam = new TenantFam();
            tenantFamAddr.TenantFam.EfctvStartDt = efctvStartDt;
            tenantFamAddr.TenantFam.EfctvEndDt = DateTime.MaxValue;
            tenantFamAddr.EfctvStartDt = efctvStartDt;
            tenantFamAddr.EfctvEndDt = DateTime.MaxValue;
            tenantFamAddr.Addr = CreateAddrObject(tenantFamSK, addressLine1, addressLine2, city, addrSK, efctvStartDt, fIPSCntyCodeSK, stPrvncCodeSK, pstlCode1, iSOCntryCodeSK);
            listTenantFamAddr.Add(tenantFamAddr);
            return listTenantFamAddr.AsQueryable<TenantFamAddr>();
        }

        static private Addr CreateAddrObject(long addrSk, string addressLine1, string addressLine2, string city, long addrSK, DateTime efctvStartDt, long fIPSCntyCodeSK, long stPrvncCodeSK, string pstlCode1, long iSOCntryCodeSK)
        {
            // create address from parameters
            Addr addr = new Addr();
            addr.AddrSK = addrSK;
            addr.AddrLine1 = addressLine1;
            addr.AddrLine2 = addressLine2;
            addr.City = city;
            addr.EfctvStartDt = efctvStartDt;
            addr.EfctvEndDt = DateTime.MaxValue;
            addr.FIPSCntyCodeSK = fIPSCntyCodeSK;
            addr.StPrvncCodeSK = stPrvncCodeSK;
            PstlCode pstlCode = new PstlCode();
            pstlCode.PstlCode1 = pstlCode1;
            addr.PstlCode = pstlCode;
            addr.ISOCntryCodeSK = iSOCntryCodeSK;
            return addr;
        }
        #endregion

        #region mock benefit plan objects
        static public BnftPlan GetMockBenefitPlan(long keySK, Expression<Func<BnftPlan, bool>> where)
        {
            BnftPlan bnftPlan = new BnftPlan();
            if (keySK == 0)
            {
                bnftPlan.BnftPlanSK = 0;
            }
            else
            {
                bnftPlan.BnftPlanSK = keySK;
                bnftPlan.BnftPlanName = "Mock BnftPlan" + bnftPlan.BnftPlanSK.ToString();
            }

            return bnftPlan;
        }

        static public BnftPlanWvrRider GetMockBenefitPlanWaiverRider(long keySK, Expression<Func<BnftPlanWvrRider, bool>> where)
        {
            return new BnftPlanWvrRider() { BnftPlanWvrRiderSK = 1, BnftPlanSK = keySK, WvrRiderTypeSK = 1 };
        }

        static public IQueryable<BnftPlanWvrRider> GetMockBenefitPlanWaiverRiders(long keySK, int numberOfItems, Expression<Func<BnftPlanWvrRider, bool>> where)
        {
            List<BnftPlanWvrRider> itemList = new List<BnftPlanWvrRider>();
            if (keySK != 0)
            {
                for (int i = 0; i < numberOfItems; i++)
                {
                    itemList.Add(new BnftPlanWvrRider() { BnftPlanWvrRiderSK = i + 1, BnftPlanSK = keySK, WvrRiderTypeSK = i + 1 });
                }
            }

            return itemList.AsQueryable<BnftPlanWvrRider>().Where(where);
        }

        static public IQueryable<BnftPlan> GetMockBenefitPlans(long keySK, int numberOfItems)
        {
            List<BnftPlan> itemList = new List<BnftPlan>();
            if (keySK != 0)
            {
                for (int i = 0; i < numberOfItems; i++)
                {
                    BnftPlan bnftPlan = new BnftPlan();
                    bnftPlan.BnftPlanSK = keySK;
                    bnftPlan.BnftPlanName = "Mock BnftPlan" + bnftPlan.BnftPlanSK.ToString();
                    itemList.Add(bnftPlan);
                }
            }
            return itemList.AsQueryable<BnftPlan>();

        }

        static public CvrgPhase GetMockCoveragePhase(long keySK, Expression<Func<CvrgPhase, bool>> where)
        {
            CvrgPhase cvrgPhase = new CvrgPhase();
            if (keySK == 0)
            {
                cvrgPhase.CvrgPhaseSK = 0;
            }
            else
            {
                cvrgPhase.CvrgPhaseSK = keySK;
                cvrgPhase.CvrgPhaseSeq = 1;
            }

            return cvrgPhase;
        }

        static public IQueryable<CvrgPhase> GetMockCoveragePhases(long keySK, int numberOfItems)
        {
            List<CvrgPhase> itemList = new List<CvrgPhase>();
            if (keySK != 0)
            {
                for (int i = 0; i < numberOfItems; i++)
                {
                    CvrgPhase cvrgPhase = new CvrgPhase();
                    cvrgPhase.CvrgPhaseSK = keySK;
                    cvrgPhase.CvrgPhaseSeq = (int)i;
                    itemList.Add(cvrgPhase);
                }
            }
            return itemList.AsQueryable<CvrgPhase>();

        }

        #endregion

        #region " Mock Export Paths "
        static string GetMerlinExportPath(string suffix = "")
        {
            return string.Format(@"C:\Merlin Export\{0}", suffix);
        }

        static IDictionary<string, string> GetMCSExportPath(string suffix = "")
        {
            return new Dictionary<string, string>() { { "MI", string.Format(@"C:\MCS Export\MI\{0}", suffix) }, { "IL", string.Format(@"C:\MCS Export\IL\{0}", suffix) } };
        }
        #endregion
        #endregion
    }
}
