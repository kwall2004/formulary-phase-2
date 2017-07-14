using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.BLL.Utility;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Entity Address BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IEntityAddressBLL" />
    public class EntityAddressBLL : IEntityAddressBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Entity Address BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public EntityAddressBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get all Entity Address records for a Hierarchy Type
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityTypeId">The Entity Type ID</param>
        /// <returns>List of Entity Address View Models</returns>
        public IEnumerable<EntityAddressVM> GetAllEntityAddress(EntityAddressType entityType, long entityTypeId)
        {
            List<EntityAddressVM> results = new List<EntityAddressVM>();
            switch (entityType)
            {
                case EntityAddressType.TenantFamily:
                    results = GetAllTenantFamilyAddress(entityTypeId);
                    break;

                case EntityAddressType.Tenant:
                    results = GetAllTenantAddress(entityTypeId);
                    break;

                case EntityAddressType.Account:
                    results = GetAllAccountAddress(entityTypeId);
                    break;

                case EntityAddressType.Group:
                    results = GetAllGroupAddress(entityTypeId);
                    break;

                case EntityAddressType.PopulationGroup:
                    results = GetAllPopulationGroupAddress(entityTypeId);
                    break;

                case EntityAddressType.Contact:
                    results = GetAllContactAddress(entityTypeId);
                    break;

                default:
                    break;
            }

            return results;
        }

        /// <summary>
        /// Get the Copy Demographic From List for an Entity
        /// </summary>
        /// <param name="entityType">the Entity Type</param>
        /// <param name="entityId">the Entity SK</param>
        /// <returns>List of current address for each parent entity</returns>
        public List<DropDownList> GetCopyDemographicFromList(EntityAddressType entityType, long entityId)
        {
            List<DropDownList> copyDemographicFromList = new List<DropDownList>();
            HierarchyNodeDetail hierarchyIDs = new HierarchyNodeDetail();

            switch (entityType)
            {
                case EntityAddressType.TenantFamily:
                    break;

                case EntityAddressType.Tenant:
                    hierarchyIDs = _repoFactory.Tenant().FindAll(c => c.TenantSK == entityId)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.TenantFam.TenantFamAddr.Count() != 0 ? w.TenantFam.TenantFamSK : 0
                        }).FirstOrDefault();
                    break;

                case EntityAddressType.Account:
                    hierarchyIDs = _repoFactory.Account().FindAll(c => c.AcctSK == entityId)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Tenant.TenantFam.TenantFamAddr.Count() != 0 ? w.Tenant.TenantFam.TenantFamSK : 0,
                            TenantSK = w.Tenant.TenantAddr.Count != 0 ? w.Tenant.TenantSK : 0
                        }).FirstOrDefault();
                    break;

                case EntityAddressType.Group:
                    hierarchyIDs = _repoFactory.Group().FindAll(c => c.GrpSK == entityId)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Acct.Tenant.TenantFam.TenantFamAddr.Count() != 0 ? w.Acct.Tenant.TenantFam.TenantFamSK : 0,
                            TenantSK = w.Acct.Tenant.TenantAddr.Count() != 0 ? w.Acct.Tenant.TenantSK : 0,
                            AcctSK = w.Acct.AcctAddr.Count() != 0 ? w.Acct.AcctSK : 0
                        }).FirstOrDefault();
                    break;

                case EntityAddressType.PopulationGroup:
                    hierarchyIDs = _repoFactory.PopulationGroup().FindAll(c => c.PopGrpSK == entityId)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Grp.Acct.Tenant.TenantFam.TenantFamAddr.Count() != 0 ? w.Grp.Acct.Tenant.TenantFam.TenantFamSK : 0,
                            TenantSK = w.Grp.Acct.Tenant.TenantAddr.Count() != 0 ? w.Grp.Acct.Tenant.TenantSK : 0,
                            AcctSK = w.Grp.Acct.AcctAddr.Count() != 0 ? w.Grp.Acct.AcctSK : 0,
                            GrpSK = w.Grp.GrpAddr.Count() != 0 ? w.Grp.GrpSK : 0
                        }).FirstOrDefault();
                    break;

                case EntityAddressType.Contact:
                    break;

                default:
                    break;
            }

            copyDemographicFromList = GetDemographicList(hierarchyIDs);
            return copyDemographicFromList;
        }

        /// <summary>
        /// Get the Current Entity Address record for a Hierarchy Type By Entity Type ID
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <returns>Entity Address View Model Record</returns>
        public EntityAddressVM GetCurrentEntityAddress(EntityAddressType entityType, long entityId)
        {
            return GetAllEntityAddress(entityType, entityId).OrderByDescending(o => o.EfctvEndDt).FirstOrDefault();
        }

        /// <summary>
        /// Get a Specific Entity Address record for a Hierarchy Type By Entity Type ID
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <param name="entityTypeAddressId">the Entity Type Address ID</param>
        /// <returns>Entity Address View Model Record</returns>
        public EntityAddressVM GetEntityAddress(EntityAddressType entityType, long entityId, long entityTypeAddressId)
        {
            return GetAllEntityAddress(entityType, entityId).FirstOrDefault(w => w.EntityTypeAddressSK == entityTypeAddressId);
        }

        /// <summary>
        /// Set the Entity Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model to Update</param>
        /// <returns>EntityAddressVM.</returns>
        public EntityAddressVM SetEntityAddress(EntityAddressVM itemToAddOrUpdate)
        {
            switch (itemToAddOrUpdate.EntityType)
            {
                case EntityAddressType.TenantFamily:
                    itemToAddOrUpdate = SetTenantFamilyAddress(itemToAddOrUpdate);
                    break;

                case EntityAddressType.Tenant:
                    itemToAddOrUpdate = SetTenantAddress(itemToAddOrUpdate);
                    break;

                case EntityAddressType.Account:
                    itemToAddOrUpdate = SetAccountAddress(itemToAddOrUpdate);
                    break;

                case EntityAddressType.Group:
                    itemToAddOrUpdate = SetGroupAddress(itemToAddOrUpdate);
                    break;

                case EntityAddressType.PopulationGroup:
                    itemToAddOrUpdate = SetPopulationGroupAddress(itemToAddOrUpdate);
                    break;

                case EntityAddressType.Contact:
                    itemToAddOrUpdate = SetContactAddress(itemToAddOrUpdate);
                    break;

                default:
                    break;
            }
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Validate Entity Address
        /// </summary>
        /// <param name="itemToValidate">the Entity Address View Model to Update</param>
        /// <returns>List of Error Messages</returns>
        public List<Message> ValidateEntityAddress(EntityAddressVM itemToValidate)
        {
            List<Message> messages = new List<Message>();
            IEnumerable<EntityAddressVM> results = new List<EntityAddressVM>();
            switch (itemToValidate.EntityType)
            {
                case EntityAddressType.TenantFamily:
                    results = GetAllTenantFamilyAddress(itemToValidate.EntityTypeSK);
                    break;

                case EntityAddressType.Tenant:
                    results = GetAllTenantAddress(itemToValidate.EntityTypeSK);
                    break;

                case EntityAddressType.Account:
                    results = GetAllAccountAddress(itemToValidate.EntityTypeSK);
                    break;

                case EntityAddressType.Group:
                    results = GetAllGroupAddress(itemToValidate.EntityTypeSK);
                    break;

                case EntityAddressType.PopulationGroup:
                    results = GetAllPopulationGroupAddress(itemToValidate.EntityTypeSK);
                    break;

                case EntityAddressType.Contact:
                    results = GetAllContactAddress(itemToValidate.EntityTypeSK);
                    break;

                default:
                    return messages;
            }

            if (!ValidateEffectDateRange(results, itemToValidate))
            {
                messages.Add(new Message() { MessageText = string.Format("Effective date range overlaps with another address entry."), Fieldname = "entityAddress.EfctvStartDt" });
            }

            return messages;
        }

        #region " Get Private Methods "

        /// <summary>
        /// Create the DropDown List items for Copy Demo
        /// </summary>
        /// <param name="hierarchyIDs">the HierarchyIds for the Entity</param>
        /// <returns>a Drop down List for Copy Demographic From</returns>
        private List<DropDownList> GetDemographicList(HierarchyNodeDetail hierarchyIDs)
        {
            List<DropDownList> demographicList = new List<DropDownList>();
            if (hierarchyIDs.TenantFamSK != 0)
            {
                demographicList.Add(new DropDownList() { Value = hierarchyIDs.TenantFamSK, Text = "Tenant Family" });
            }
            if (hierarchyIDs.TenantSK != 0)
            {
                demographicList.Add(new DropDownList() { Value = hierarchyIDs.TenantSK, Text = "Tenant" });
            }
            if (hierarchyIDs.AcctSK != 0)
            {
                demographicList.Add(new DropDownList() { Value = hierarchyIDs.AcctSK, Text = "Account" });
            }
            if (hierarchyIDs.GrpSK != 0)
            {
                demographicList.Add(new DropDownList() { Value = hierarchyIDs.GrpSK, Text = "Group" });
            }

            return demographicList;
        }

        /// <summary>
        /// Get a List of All Tenant Family Address(s) by ID
        /// </summary>
        /// <param name="tenantFamSK">the Tenant Family ID</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllTenantFamilyAddress(long tenantFamSK)
        {
            return _repoFactory.TenantFamilyAddress().FindAll(c => c.TenantFamSK == tenantFamSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.TenantFamily,
                    EntityTypeAddressSK = s.TenantFamAddrSK,
                    EntityTypeSK = tenantFamSK,
                    EntityEfctvStartDt = s.TenantFam.EfctvStartDt,
                    EntityEfctvEndDt = s.TenantFam.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();
        }

        /// <summary>
        /// Get a List of All Tenant Address(s) by ID
        /// </summary>
        /// <param name="tenantSK">The tenant sk.</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllTenantAddress(long tenantSK)
        {
            List<EntityAddressVM> addressList = _repoFactory.TenantAddress().FindAll(c => c.TenantSK == tenantSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.Tenant,
                    EntityTypeAddressSK = s.TenantAddrSK,
                    EntityTypeSK = tenantSK,
                    EntityEfctvStartDt = s.Tenant.EfctvStartDt,
                    EntityEfctvEndDt = s.Tenant.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();

            return addressList;
        }

        /// <summary>
        /// Get a List of All Account Address(s) by ID
        /// </summary>
        /// <param name="acctSK">the Account  ID</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllAccountAddress(long acctSK)
        {
            List<EntityAddressVM> addressList = _repoFactory.AccountAddress().FindAll(c => c.AcctSK == acctSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.Account,
                    EntityTypeAddressSK = s.AcctAddrSK,
                    EntityTypeSK = acctSK,
                    EntityEfctvStartDt = s.Acct.EfctvStartDt,
                    EntityEfctvEndDt = s.Acct.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();

            return addressList;
        }

        /// <summary>
        /// Get a List of All Group Address(s) by ID
        /// </summary>
        /// <param name="grpSK">the Group  ID</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllGroupAddress(long grpSK)
        {
            List<EntityAddressVM> addressList = _repoFactory.GroupAddress().FindAll(c => c.GrpSK == grpSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.Group,
                    EntityTypeAddressSK = s.GrpAddrSK,
                    EntityTypeSK = grpSK,
                    EntityEfctvStartDt = s.Grp.EfctvStartDt,
                    EntityEfctvEndDt = s.Grp.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();

            return addressList;
        }

        /// <summary>
        /// Get a List of All Population Group Address(s) by ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group  ID</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllPopulationGroupAddress(long popGrpSK)
        {
            List<EntityAddressVM> addressList = _repoFactory.PopulationGroupAddress().FindAll(c => c.PopGrpSK == popGrpSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.PopulationGroup,
                    EntityTypeAddressSK = s.PopGrpAddrSK,
                    EntityTypeSK = popGrpSK,
                    EntityEfctvStartDt = s.PopGrp.EfctvStartDt,
                    EntityEfctvEndDt = s.PopGrp.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();

            return addressList;
        }

        /// <summary>
        /// Get a List of All Contact Address(s) by ID
        /// </summary>
        /// <param name="cntctSK">the Contact ID</param>
        /// <returns>List of Entity Address View Models</returns>
        private List<EntityAddressVM> GetAllContactAddress(long cntctSK)
        {
            return _repoFactory.ContactPostalAddress().FindAll(c => c.CntctSK == cntctSK)
                .Select(s => new EntityAddressVM()
                {
                    EntityType = EntityAddressType.Contact,
                    EntityTypeAddressSK = s.CntctPstlAddrSK,
                    EntityTypeSK = cntctSK,
                    EntityEfctvStartDt = s.Cntct.EfctvStartDt,
                    EntityEfctvEndDt = s.Cntct.EfctvEndDt,
                    AddrSK = s.AddrSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    AddrLine1 = s.Addr.AddrLine1,
                    AddrLine2 = s.Addr.AddrLine2,
                    City = s.Addr.City,
                    FIPSCntyCodeSK = s.Addr.FIPSCntyCodeSK,
                    StPrvncCodeSK = s.Addr.StPrvncCodeSK,
                    PostalCode = s.Addr.PstlCode.PstlCode1,
                    ISOCntryCodeSK = s.Addr.ISOCntryCodeSK
                }).ToList();
        }

        #endregion " Get Private Methods "

        #region " Set Private Methods "

        /// <summary>
        /// Set Postal Code for an Address
        /// </summary>
        /// <param name="repository">the Postal Code Repository</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>the Postal Code Record that is entered</returns>
        private PstlCode SetPostalCode(IPostalCodeRepository repository, EntityAddressVM itemToAddOrUpdate)
        {
            PstlCode postalCode = repository.FindOne(c => c.PstlCode1 == itemToAddOrUpdate.PostalCode && c.ISOCntryCodeSK == itemToAddOrUpdate.ISOCntryCodeSK);

            if (postalCode == null)
            {
                DateTime timestamp = UtilityFunctions.GetTimeStamp();

                postalCode = new PstlCode()
                {
                    ISOCntryCodeSK = itemToAddOrUpdate.ISOCntryCodeSK,
                    PstlCode1 = itemToAddOrUpdate.PostalCode,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    USZipPlus4Ind = itemToAddOrUpdate.PostalCode.Length > 6 ? true : false,
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timestamp,
                    LastModfdBy = itemToAddOrUpdate.CurrentUser,
                    LastModfdTs = timestamp
                };
                repository.AddOrUpdate(postalCode);
            }

            itemToAddOrUpdate.PstlCodeSK = postalCode.PstlCodeSK;
            return postalCode;
        }

        /// <summary>
        /// Set the Address for an Entity
        /// </summary>
        /// <param name="repository">the Address Repository</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>the Address Record that was entered</returns>
        private Addr SetAddress(IAddressRepository repository, EntityAddressVM itemToAddOrUpdate)
        {
            Addr address = repository.FindOne(a =>
                    a.ISOCntryCodeSK == itemToAddOrUpdate.ISOCntryCodeSK &&
                    a.StPrvncCodeSK == itemToAddOrUpdate.StPrvncCodeSK &&
                    a.AddrLine1 == itemToAddOrUpdate.AddrLine1 &&
                    a.AddrLine2 == itemToAddOrUpdate.AddrLine2 &&
                    a.City == itemToAddOrUpdate.City &&
                    a.PstlCodeSK == itemToAddOrUpdate.PstlCodeSK
                );

            if (address == null)
            {
                DateTime timestamp = UtilityFunctions.GetTimeStamp();

                address = new Addr()
                {
                    ISOCntryCodeSK = itemToAddOrUpdate.ISOCntryCodeSK,
                    StPrvncCodeSK = itemToAddOrUpdate.StPrvncCodeSK,
                    PstlCodeSK = itemToAddOrUpdate.PstlCodeSK,
                    AddrLine1 = itemToAddOrUpdate.AddrLine1,
                    AddrLine2 = itemToAddOrUpdate.AddrLine2,
                    City = itemToAddOrUpdate.City,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    FIPSCntyCodeSK = itemToAddOrUpdate.FIPSCntyCodeSK,
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timestamp,
                    LastModfdBy = itemToAddOrUpdate.CurrentUser,
                    LastModfdTs = timestamp
                };

                repository.AddOrUpdate(address);
            }

            itemToAddOrUpdate.AddrSK = address.AddrSK;
            return address;
        }

        /// <summary>
        /// Set a Tenant Family Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetTenantFamilyAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.TenantFamilyAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();
                TenantFamAddr tenantFamilyAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.TenantFamAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new TenantFamAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                tenantFamilyAddress.TenantFamSK = itemToAddOrUpdate.EntityTypeSK;
                tenantFamilyAddress.AddrSK = adddress.AddrSK;
                tenantFamilyAddress.Addr = adddress;
                tenantFamilyAddress.Addr.PstlCode = postalCode;
                tenantFamilyAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                tenantFamilyAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                tenantFamilyAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                tenantFamilyAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(tenantFamilyAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = tenantFamilyAddress.TenantFamAddrSK;
                itemToAddOrUpdate.AddrSK = tenantFamilyAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = tenantFamilyAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set a Tenant Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetTenantAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.TenantAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();
                TenantAddr tenantAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.TenantAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new TenantAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                tenantAddress.TenantSK = itemToAddOrUpdate.EntityTypeSK;
                tenantAddress.AddrSK = adddress.AddrSK;
                tenantAddress.Addr = adddress;
                tenantAddress.Addr.PstlCode = postalCode;
                tenantAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                tenantAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                tenantAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                tenantAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(tenantAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = tenantAddress.TenantAddrSK;
                itemToAddOrUpdate.AddrSK = tenantAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = tenantAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set a Account Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetAccountAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.AccountAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();
                AcctAddr accountAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.AcctAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new AcctAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                accountAddress.AcctSK = itemToAddOrUpdate.EntityTypeSK;
                accountAddress.AddrSK = adddress.AddrSK;
                accountAddress.Addr = adddress;
                accountAddress.Addr.PstlCode = postalCode;
                accountAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                accountAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                accountAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                accountAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(accountAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = accountAddress.AcctAddrSK;
                itemToAddOrUpdate.AddrSK = accountAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = accountAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set a Group Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetGroupAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.GroupAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();
                GrpAddr groupAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.GrpAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new GrpAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                groupAddress.GrpSK = itemToAddOrUpdate.EntityTypeSK;
                groupAddress.AddrSK = adddress.AddrSK;
                groupAddress.Addr = adddress;
                groupAddress.Addr.PstlCode = postalCode;
                groupAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                groupAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                groupAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                groupAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(groupAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = groupAddress.GrpAddrSK;
                itemToAddOrUpdate.AddrSK = groupAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = groupAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set a Population Group Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetPopulationGroupAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.PopulationGroupAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();
                PopGrpAddr populationGroupAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.PopGrpAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new PopGrpAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                populationGroupAddress.PopGrpSK = itemToAddOrUpdate.EntityTypeSK;
                populationGroupAddress.AddrSK = adddress.AddrSK;
                populationGroupAddress.Addr = adddress;
                populationGroupAddress.Addr.PstlCode = postalCode;
                populationGroupAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                populationGroupAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                populationGroupAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                populationGroupAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(populationGroupAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = populationGroupAddress.PopGrpSK;
                itemToAddOrUpdate.AddrSK = populationGroupAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = populationGroupAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Set a Contact Postal Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model</param>
        /// <returns>the Entity Address View Models</returns>
        private EntityAddressVM SetContactAddress(EntityAddressVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.ContactPostalAddress())
            using (var repoAddress = _repoFactory.Address())
            using (var repoPostalCode = _repoFactory.PostalCode())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                CntctPstlAddr contactPostalAddress = itemToAddOrUpdate.EntityTypeAddressSK != 0
                    ? repository.FindOne(c => c.CntctPstlAddrSK == itemToAddOrUpdate.EntityTypeAddressSK)
                    : new CntctPstlAddr() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                PstlCode postalCode = SetPostalCode(repoPostalCode, itemToAddOrUpdate);
                Addr adddress = SetAddress(repoAddress, itemToAddOrUpdate);

                contactPostalAddress.CmmctnUsageTypeSK = (long)ContactCommunicationType.Address;
                contactPostalAddress.CntctSK = itemToAddOrUpdate.EntityTypeSK;
                contactPostalAddress.AddrSK = adddress.AddrSK;
                contactPostalAddress.Addr = adddress;
                contactPostalAddress.Addr.PstlCode = postalCode;
                contactPostalAddress.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                contactPostalAddress.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                contactPostalAddress.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                contactPostalAddress.LastModfdTs = UtilityFunctions.GetTimeStamp();
                repository.AddOrUpdate(contactPostalAddress);

                repository.SaveChanges();

                itemToAddOrUpdate.EntityTypeAddressSK = contactPostalAddress.CntctPstlAddrSK;
                itemToAddOrUpdate.AddrSK = contactPostalAddress.AddrSK;
                itemToAddOrUpdate.PstlCodeSK = contactPostalAddress.Addr.PstlCodeSK;
            }

            return itemToAddOrUpdate;
        }

        #endregion " Set Private Methods "

        #region " Validation Private Methods "

        /// <summary>
        /// Validate that the Item to Validate Effect Date Range, do not overlap with any in the list
        /// </summary>
        /// <param name="entityAddressList">list of Current Address for an Entity</param>
        /// <param name="itemToValidate">item to Validate</param>
        /// <returns>true if it does not overlap</returns>
        private bool ValidateEffectDateRange(IEnumerable<EntityAddressVM> entityAddressList, EntityAddressVM itemToValidate)
        {
            DateTimeRange effectiveDateRange = new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt);

            foreach (EntityAddressVM item in entityAddressList.Where(l => l.EntityTypeAddressSK != itemToValidate.EntityTypeAddressSK))
            {
                // If the data ranges overlap, then return false
                if (effectiveDateRange.Intersects(new DateTimeRange(item.EfctvStartDt, item.EfctvEndDt)))
                {
                    return false;
                }
            }

            return true;
        }

        #endregion " Validation Private Methods "
    }
}