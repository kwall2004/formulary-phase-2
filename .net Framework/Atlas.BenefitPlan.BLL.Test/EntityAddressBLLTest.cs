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
using Atlas.BenefitPlan.DAL.Models.Enums;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Test.Entity
{
    [TestClass]
    public class EntityAddressBllTest
    {
        private Mock<IBenefitPlanRepositoryFactory> _mockIBenefitPlanRepositoryFactory;
        private EntityAddressBLL _entityAddressBll;
        private long keyTF = -100;
        private string addressLine1 = "123 Main St";
        private string addressLine2 = "Suite 455";
        private string city = "Detroit";
        private long addrSK = -1;
        private DateTime  efctvStartDt = DateTime.Now;
        private long fIPSCntySK = -2;
        private long stPrvncCodeSK = -3;
        private string pstlCode1 = "48375";
        private long iSOCntryCodeSK = -4;

        [TestInitialize]
        public void SetupTest()
        {
            _mockIBenefitPlanRepositoryFactory = TestHelpers.CreateMockIBPRepositoryFactoryForEntityAddress(keyTF, addressLine1, addressLine2, city, addrSK, efctvStartDt, fIPSCntySK, stPrvncCodeSK, pstlCode1, iSOCntryCodeSK);
            _entityAddressBll = new EntityAddressBLL(_mockIBenefitPlanRepositoryFactory.Object);
        }

        [TestMethod]
        public void TestGetAllEntityAddress()
        {
            // Arrange
            EntityAddressType entityAddressType = EntityAddressType.TenantFamily;

            // Act
            List<EntityAddressVM> result = _entityAddressBll.GetAllEntityAddress(entityAddressType, keyTF).ToList<EntityAddressVM>();

            // Assert
            Assert.AreEqual(result[0].EntityType, EntityAddressType.TenantFamily);
            Assert.AreEqual(result[0].EntityTypeAddressSK, keyTF);
            Assert.AreEqual(result[0].EntityTypeSK, keyTF);
            Assert.AreEqual(result[0].AddrSK, addrSK);
            Assert.AreEqual(result[0].EfctvStartDt, efctvStartDt);
            Assert.AreEqual(result[0].EfctvEndDt, DateTime.MaxValue);
            Assert.AreEqual(result[0].AddrLine1, addressLine1);
            Assert.AreEqual(result[0].AddrLine2, addressLine2);
            Assert.AreEqual(result[0].FIPSCntyCodeSK, fIPSCntySK);
            Assert.AreEqual(result[0].StPrvncCodeSK, stPrvncCodeSK);
            Assert.AreEqual(result[0].PostalCode, pstlCode1);
            Assert.AreEqual(result[0].ISOCntryCodeSK, iSOCntryCodeSK);
        }
    }
}
