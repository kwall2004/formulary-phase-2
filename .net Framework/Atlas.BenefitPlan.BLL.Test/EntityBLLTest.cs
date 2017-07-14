using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Linq;
using System.Linq.Expressions;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.BLL.Interfaces;

namespace Atlas.BenefitPlan.BLL.Test.Entity
{
    [TestClass]
    public class EntityBLLTest
    {
        private Mock<IBenefitPlanRepositoryFactory> _mockIBenefitPlanRepositoryFactory;
        private EntityBLL _entityBll;
        private long keyTF = -100;
        private int offsetLevelforkey = -100;
        private int numberOfEntitiesPerLevel = 2;

        [TestInitialize]
        public void SetupTest()
        {            
            _mockIBenefitPlanRepositoryFactory = TestHelpers.CreateMockIBPRepositoryFactoryForEntity(keyTF, numberOfEntitiesPerLevel, offsetLevelforkey);
            _entityBll = new EntityBLL(_mockIBenefitPlanRepositoryFactory.Object);
        }
           
        [TestMethod]
        public void TestGetTenantHierarchyForTenantFamily()
        {
            // Arrange
            long tenantFamSK = keyTF;

            // Act
            HierarchyTreeNode result =   _entityBll.GetTenantHierarchyForTenantFamily(tenantFamSK);

            // Assert
            //Tenant family key = -100, tenant starts at -200, account starts at -300, group starts at -400, pop group starts at -500
            Assert.AreEqual(result.EntitySK, keyTF);

            //check tenants
            Assert.AreEqual(result.ChildrenNodes.Count, numberOfEntitiesPerLevel); //count the number of tenants
            Assert.AreEqual(result.ChildrenNodes[0].EntitySK, keyTF + offsetLevelforkey); //key for first tenant = -200
            Assert.AreEqual(result.ChildrenNodes[0].EntityDescription, "MockTenantName" + (keyTF + offsetLevelforkey).ToString()); 

            //check accounts
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes.Count, numberOfEntitiesPerLevel); //count number of accounts for one tenant
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].EntitySK, keyTF + (2 * offsetLevelforkey)); //key for first account = -300
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].EntityDescription, "MockAcctName" + (keyTF + (2 * offsetLevelforkey)).ToString()); //key for first account = -300

            //check groups
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes.Count, numberOfEntitiesPerLevel); //count number of groups for one account
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].EntitySK, keyTF + (3 * offsetLevelforkey)); //key for first group = -400
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].EntityDescription, "MockGrpName" + (keyTF + (3 * offsetLevelforkey)).ToString()); //key for first group = -400

            //check pop groups
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes.Count, numberOfEntitiesPerLevel); //count number of pop groups for one group
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].EntitySK, keyTF + (4 * offsetLevelforkey)); //key for first group = -500
            Assert.AreEqual(result.ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].ChildrenNodes[0].EntityDescription, "MockPopGrpName" + (keyTF + (4 * offsetLevelforkey)).ToString()); 
        }
    }
}
