using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// Class EntityContactBLL.
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IEntityContactBLL" />
    public class EntityContactBLL : IEntityContactBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// Entity Address BLL
        /// </summary>
        private IEntityAddressBLL _entityAddressBLL;

        /// <summary>
        /// The Constructor for the Entity Address BLL for Benefit Plan
        /// </summary>
        /// <param name="entityAddressBLL">The entity address BLL.</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public EntityContactBLL(IEntityAddressBLL entityAddressBLL, IBenefitPlanRepositoryFactory repoFactory)
        {
            _entityAddressBLL = entityAddressBLL;
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get all Entity Address records for a Hierarchy Type
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityTypeId">The Entity Type ID</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List of Entity Address View Models</returns>
        public IEnumerable<EntityContactsVM> GetAllEntityContacts(TenantFamilyHierarchy entityType, long entityTypeId, bool isActive)
        {
            List<EntityContactsVM> results = new List<EntityContactsVM>();
            switch (entityType)
            {
                case TenantFamilyHierarchy.TenantFamily:
                    return GetTenantFamilyContacts(entityTypeId, isActive);

                case TenantFamilyHierarchy.Tenant:
                    return GetTenantContacts(entityTypeId, isActive);

                case TenantFamilyHierarchy.Account:
                    return GetAccountContacts(entityTypeId, isActive);

                case TenantFamilyHierarchy.Group:
                    return GetGroupContacts(entityTypeId, isActive);

                case TenantFamilyHierarchy.PopulationGroup:
                    return GetPopGroupContacts(entityTypeId, isActive);
            }
            return results;
        }

        /// <summary>
        /// Adds or Update the Contact for the Tenant Family hierarchy
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        public EntityContactsVM AddOrUpdateEntityContact(EntityContactsVM itemToAddOrUpdate)
        {
            itemToAddOrUpdate.TimeStamp = UtilityFunctions.GetTimeStamp();
            switch (itemToAddOrUpdate.EntityType)
            {
                case TenantFamilyHierarchy.TenantFamily:
                    return AddorUpdateTenantFamilyContact(itemToAddOrUpdate);

                case TenantFamilyHierarchy.Tenant:
                    return AddorUpdateTenantContact(itemToAddOrUpdate);

                case TenantFamilyHierarchy.Account:
                    return AddorUpdateAccountContact(itemToAddOrUpdate);

                case TenantFamilyHierarchy.Group:
                    return AddorUpdateGroupContact(itemToAddOrUpdate);

                case TenantFamilyHierarchy.PopulationGroup:
                    return AddorUpdatePopulationGroupContact(itemToAddOrUpdate);
            }
            return itemToAddOrUpdate;
        }

        #region Private Get Methods

        /// <summary>
        /// Get Tenant Family Contacts
        /// </summary>
        /// <param name="tenantFamSK">The tenant fam sk.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List&lt;EntityContactsVM&gt;.</returns>
        private List<EntityContactsVM> GetTenantFamilyContacts(long tenantFamSK, bool isActive)
        {
            using (var repo = _repoFactory.ContactTenantFamily())
            {
                IQueryable<CntctTenantFam> contacts = repo.FindAll(c => c.TenantFamSK == tenantFamSK);
                contacts = isActive
                    ? repo.FindAll(c => DbFunctions.TruncateTime(DateTime.Today) >= DbFunctions.TruncateTime(c.EfctvStartDt)
                                     && DbFunctions.TruncateTime(DateTime.Today) <= DbFunctions.TruncateTime(c.EfctvEndDt)
                                  , contacts)
                    : contacts;

                List<EntityContactsVM> allContacts = contacts.
                   Select(m => new EntityContactsVM()
                   {
                       EntityType = TenantFamilyHierarchy.TenantFamily,
                       EntityTypeContactSK = m.CntctTenantFamSK,
                       EntityTypeSK = tenantFamSK,
                       CntctSK = m.Cntct.CntctSK,
                       FirstName = m.Cntct.CntctFirstName,
                       LastName = m.Cntct.CntctLastName,
                       Company = m.Cntct.CntctCmpnyName,
                       CntctRespCode = m.CntctRespType.CntctRespCode,
                       Priority = m.CntctPrity,
                       EfctvStartDt = m.EfctvStartDt,
                       EfctvEndDt = m.EfctvEndDt,
                       InctvTsDt = m.InctvTs,
                       PrintName = m.Cntct.CntctPrintName,
                       Title = m.Cntct.CntctTitle,
                       ContactCommunications = m.Cntct.CntctTelNbr.ToList().Where(b => b.DelTs == null && b.InctvTs == null)
                           .Select(t => new ContactCommunicationsVM()
                           {
                               CommunicationSK = t.CntctTelNbrSK,
                               Value = t.TelNbr,
                               CommunicationTypeRaw = t.CmmctnUsageType.CmmctnUsageCode
                           }).ToList()
                           .Union(m.Cntct.CntctElctrncAddr.ToList().Where(c => c.DelTs == null && c.InctvTs == null)
                           .Select(e => new ContactCommunicationsVM()
                           {
                               CommunicationSK = e.CntctElctrncAddrSK,
                               Value = e.ElctrncAddr,
                               CommunicationTypeRaw = e.CmmctnUsageType.CmmctnUsageCode
                           }).ToList())
                   }).ToList();
                if (allContacts.Any())
                {
                    foreach (EntityContactsVM contact in allContacts)
                    {
                        contact.ContactAddress = _entityAddressBLL.GetCurrentEntityAddress(EntityAddressType.Contact, contact.CntctSK);
                    }
                }
                return allContacts;
            }
        }

        /// <summary>
        /// Get Tenant Contacts
        /// </summary>
        /// <param name="tenantSK">The tenant sk.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List&lt;EntityContactsVM&gt;.</returns>
        private List<EntityContactsVM> GetTenantContacts(long tenantSK, bool isActive)
        {
            using (var repo = _repoFactory.ContactTenant())
            {
                IQueryable<CntctTenant> contacts = repo.FindAll(c => c.TenantSK == tenantSK);
                contacts = isActive
                    ? repo.FindAll(c => DbFunctions.TruncateTime(DateTime.Today) >= DbFunctions.TruncateTime(c.EfctvStartDt)
                                     && DbFunctions.TruncateTime(DateTime.Today) <= DbFunctions.TruncateTime(c.EfctvEndDt)
                                  //&& (c.InctvTs.HasValue ? (DbFunctions.TruncateTime(c.InctvTs) > DbFunctions.TruncateTime(DateTime.Today) ? true : false) : true)
                                  , contacts)
                    : contacts;

                List<EntityContactsVM> allContacts = contacts.
                    Select(m => new EntityContactsVM
                    {
                        EntityType = TenantFamilyHierarchy.Tenant,
                        EntityTypeContactSK = m.CntctTenantSK,
                        EntityTypeSK = tenantSK,
                        CntctSK = m.Cntct.CntctSK,
                        FirstName = m.Cntct.CntctFirstName,
                        LastName = m.Cntct.CntctLastName,
                        Company = m.Cntct.CntctCmpnyName,
                        CntctRespCode = m.CntctRespType.CntctRespCode,
                        Priority = m.CntctPrity,
                        EfctvStartDt = m.EfctvStartDt,
                        EfctvEndDt = m.EfctvEndDt,
                        InctvTsDt = m.InctvTs,
                        PrintName = m.Cntct.CntctPrintName,
                        Title = m.Cntct.CntctTitle,
                        ContactCommunications = m.Cntct.CntctTelNbr.ToList().Where(b => b.DelTs == null && b.InctvTs == null)
                            .Select(t => new ContactCommunicationsVM()
                            {
                                CommunicationSK = t.CntctTelNbrSK,
                                Value = t.TelNbr,
                                CommunicationTypeRaw = t.CmmctnUsageType.CmmctnUsageCode
                            }).ToList()
                            .Union(m.Cntct.CntctElctrncAddr.ToList().Where(c => c.DelTs == null && c.InctvTs == null)
                            .Select(e => new ContactCommunicationsVM()
                            {
                                CommunicationSK = e.CntctElctrncAddrSK,
                                Value = e.ElctrncAddr,
                                CommunicationTypeRaw = e.CmmctnUsageType.CmmctnUsageCode
                            }).ToList())
                    }).ToList();
                if (allContacts.Any())
                {
                    foreach (EntityContactsVM contact in allContacts)
                    {
                        contact.ContactAddress = _entityAddressBLL.GetCurrentEntityAddress(EntityAddressType.Contact, contact.CntctSK);
                    }
                }
                return allContacts;
            }
        }

        /// <summary>
        /// Get Account Contacts
        /// </summary>
        /// <param name="accountSK">The account sk.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List&lt;EntityContactsVM&gt;.</returns>
        private List<EntityContactsVM> GetAccountContacts(long accountSK, bool isActive)
        {
            using (var repo = _repoFactory.ContactAccount())
            {
                IQueryable<CntctAcct> contacts = repo.FindAll(c => c.AcctSK == accountSK);
                contacts = isActive
                    ? repo.FindAll(c => DbFunctions.TruncateTime(DateTime.Today) >= DbFunctions.TruncateTime(c.EfctvStartDt)
                                     && DbFunctions.TruncateTime(DateTime.Today) <= DbFunctions.TruncateTime(c.EfctvEndDt)
                                  //&& (c.InctvTs.HasValue ? (DbFunctions.TruncateTime(c.InctvTs) > DbFunctions.TruncateTime(DateTime.Today) ? true : false) : true)
                                  , contacts)
                    : contacts;

                List<EntityContactsVM> allContacts = contacts.
               Select(m => new EntityContactsVM
               {
                   EntityType = TenantFamilyHierarchy.Account,
                   EntityTypeContactSK = m.CntctAcctSK,
                   EntityTypeSK = accountSK,
                   CntctSK = m.Cntct.CntctSK,
                   FirstName = m.Cntct.CntctFirstName,
                   LastName = m.Cntct.CntctLastName,
                   Company = m.Cntct.CntctCmpnyName,
                   CntctRespCode = m.CntctRespType.CntctRespCode,
                   Priority = m.CntctPrity,
                   EfctvStartDt = m.EfctvStartDt,
                   EfctvEndDt = m.EfctvEndDt,
                   InctvTsDt = m.InctvTs,
                   PrintName = m.Cntct.CntctPrintName,
                   Title = m.Cntct.CntctTitle,
                   ContactCommunications = m.Cntct.CntctTelNbr.ToList().Where(b => b.DelTs == null && b.InctvTs == null)
                            .Select(t => new ContactCommunicationsVM()
                            {
                                CommunicationSK = t.CntctTelNbrSK,
                                Value = t.TelNbr,
                                CommunicationTypeRaw = t.CmmctnUsageType.CmmctnUsageCode
                            }).ToList()
                            .Union(m.Cntct.CntctElctrncAddr.ToList().Where(c => c.DelTs == null && c.InctvTs == null)
                            .Select(e => new ContactCommunicationsVM()
                            {
                                CommunicationSK = e.CntctElctrncAddrSK,
                                Value = e.ElctrncAddr,
                                CommunicationTypeRaw = e.CmmctnUsageType.CmmctnUsageCode
                            }).ToList())
               }).ToList();
                if (allContacts.Any())
                {
                    foreach (EntityContactsVM contact in allContacts)
                    {
                        contact.ContactAddress = _entityAddressBLL.GetCurrentEntityAddress(EntityAddressType.Contact, contact.CntctSK);
                    }
                }
                return allContacts;
            }
        }

        /// <summary>
        /// Get Group Contacts
        /// </summary>
        /// <param name="groupSK">The group sk.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List&lt;EntityContactsVM&gt;.</returns>
        private List<EntityContactsVM> GetGroupContacts(long groupSK, bool isActive)
        {
            using (var repo = _repoFactory.ContactGroup())
            {
                IQueryable<CntctGrp> contacts = repo.FindAll(c => c.GrpSK == groupSK);
                contacts = isActive
                    ? repo.FindAll(c => DbFunctions.TruncateTime(DateTime.Today) >= DbFunctions.TruncateTime(c.EfctvStartDt)
                                     && DbFunctions.TruncateTime(DateTime.Today) <= DbFunctions.TruncateTime(c.EfctvEndDt)
                                  // && (c.InctvTs.HasValue ? (DbFunctions.TruncateTime(c.InctvTs) > DbFunctions.TruncateTime(DateTime.Today) ? true : false) : true)
                                  , contacts)
                    : contacts;

                List<EntityContactsVM> allContacts = contacts.
             Select(m => new EntityContactsVM
             {
                 EntityType = TenantFamilyHierarchy.Group,
                 EntityTypeContactSK = m.CntctGrpSK,
                 EntityTypeSK = groupSK,
                 CntctSK = m.Cntct.CntctSK,
                 FirstName = m.Cntct.CntctFirstName,
                 LastName = m.Cntct.CntctLastName,
                 Company = m.Cntct.CntctCmpnyName,
                 CntctRespCode = m.CntctRespType.CntctRespCode,
                 Priority = m.CntctPrity,
                 EfctvStartDt = m.EfctvStartDt,
                 EfctvEndDt = m.EfctvEndDt,
                 InctvTsDt = m.InctvTs,
                 PrintName = m.Cntct.CntctPrintName,
                 Title = m.Cntct.CntctTitle,
                 ContactCommunications = m.Cntct.CntctTelNbr.ToList().Where(b => b.DelTs == null && b.InctvTs == null)
                            .Select(t => new ContactCommunicationsVM()
                            {
                                CommunicationSK = t.CntctTelNbrSK,
                                Value = t.TelNbr,
                                CommunicationTypeRaw = t.CmmctnUsageType.CmmctnUsageCode
                            }).ToList()
                            .Union(m.Cntct.CntctElctrncAddr.ToList().Where(c => c.DelTs == null && c.InctvTs == null)
                            .Select(e => new ContactCommunicationsVM()
                            {
                                CommunicationSK = e.CntctElctrncAddrSK,
                                Value = e.ElctrncAddr,
                                CommunicationTypeRaw = e.CmmctnUsageType.CmmctnUsageCode
                            }).ToList())
             }).ToList();
                if (allContacts.Any())
                {
                    foreach (EntityContactsVM contact in allContacts)
                    {
                        contact.ContactAddress = _entityAddressBLL.GetCurrentEntityAddress(EntityAddressType.Contact, contact.CntctSK);
                    }
                }
                return allContacts;
            }
        }

        /// <summary>
        /// Get all the PopulationGroup Contacts
        /// </summary>
        /// <param name="populationGroupSK">The population group sk.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>List&lt;EntityContactsVM&gt;.</returns>
        private List<EntityContactsVM> GetPopGroupContacts(long populationGroupSK, bool isActive)
        {
            using (var repo = _repoFactory.ContactPopulationGroup())
            {
                IQueryable<CntctPopGrp> contacts = repo.FindAll(c => c.PopGrpSK == populationGroupSK);
                contacts = isActive
                    ? repo.FindAll(c => DbFunctions.TruncateTime(DateTime.Today) >= DbFunctions.TruncateTime(c.EfctvStartDt)
                                     && DbFunctions.TruncateTime(DateTime.Today) <= DbFunctions.TruncateTime(c.EfctvEndDt)
                                  //&& (c.InctvTs.HasValue ? (DbFunctions.TruncateTime(c.InctvTs) > DbFunctions.TruncateTime(DateTime.Today) ? true : false) : true)
                                  , contacts)
                    : contacts;

                List<EntityContactsVM> allContacts = contacts.
                Select(m => new EntityContactsVM
                {
                    EntityType = TenantFamilyHierarchy.PopulationGroup,
                    EntityTypeContactSK = m.CntctPopGrpSK,
                    EntityTypeSK = populationGroupSK,
                    CntctSK = m.Cntct.CntctSK,
                    FirstName = m.Cntct.CntctFirstName,
                    LastName = m.Cntct.CntctLastName,
                    Company = m.Cntct.CntctCmpnyName,
                    CntctRespCode = m.CntctRespType.CntctRespCode,
                    Priority = m.CntctPrity,
                    EfctvStartDt = m.EfctvStartDt,
                    EfctvEndDt = m.EfctvEndDt,
                    InctvTsDt = m.InctvTs,
                    PrintName = m.Cntct.CntctPrintName,
                    Title = m.Cntct.CntctTitle,
                    ContactCommunications = m.Cntct.CntctTelNbr.ToList().Where(b => b.DelTs == null && b.InctvTs == null)
                            .Select(t => new ContactCommunicationsVM()
                            {
                                CommunicationSK = t.CntctTelNbrSK,
                                Value = t.TelNbr,
                                CommunicationTypeRaw = t.CmmctnUsageType.CmmctnUsageCode
                            }).ToList()
                            .Union(m.Cntct.CntctElctrncAddr.ToList().Where(c => c.DelTs == null && c.InctvTs == null)
                            .Select(e => new ContactCommunicationsVM()
                            {
                                CommunicationSK = e.CntctElctrncAddrSK,
                                Value = e.ElctrncAddr,
                                CommunicationTypeRaw = e.CmmctnUsageType.CmmctnUsageCode
                            }).ToList())
                }).ToList();
                if (allContacts.Any())
                {
                    foreach (EntityContactsVM contact in allContacts)
                    {
                        contact.ContactAddress = _entityAddressBLL.GetCurrentEntityAddress(EntityAddressType.Contact, contact.CntctSK);
                    }
                }
                return allContacts;
            }
        }

        #endregion Private Get Methods

        #region Private Set Methods

        /// <summary>
        /// Add/Update all entities for saving/adding Tenant Family contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM AddorUpdateTenantFamilyContact(EntityContactsVM itemToAddOrUpdate)
        {
            using (var repoCntctType = _repoFactory.ContactType())
            using (var repoCmmctnUsageType = _repoFactory.CommunicationUsageType())
            using (var repoCntct = _repoFactory.Contact())
            using (var repoCntctTenantFam = _repoFactory.ContactTenantFamily())
            using (var repoCntctRespType = _repoFactory.ContactResponsibilityType())
            using (var repoCntctElctrncAddr = _repoFactory.ContactElectronicAddress())
            using (var repoCntctTelNbr = _repoFactory.ContactTelephoneNumber())
            {
                string defaultStatus = UtilityFunctions.GetContactTypeCode();
                CntctType cntctType = repoCntctType.FindOne(s => s.CntctTypeCode == defaultStatus);
                CntctRespType cntctRespType = SetContactResponsibilityType(itemToAddOrUpdate, repoCntctRespType);
                Cntct cntct = SetContact(itemToAddOrUpdate, repoCntct);
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                CntctTenantFam cntctTenantFamily = SetContactTenantFamily(itemToAddOrUpdate, cntctRespType.CntctRespTypeSK, repoCntctTenantFam);
                itemToAddOrUpdate = SetContactCommunications(itemToAddOrUpdate, cntctType, repoCntctTelNbr, repoCntctElctrncAddr, repoCmmctnUsageType);
                repoCntctTenantFam.SaveChanges();
                itemToAddOrUpdate.EntityTypeContactSK = cntctTenantFamily.CntctTenantFamSK;
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                itemToAddOrUpdate.ContactAddress = SetContactAddress(itemToAddOrUpdate, cntct);
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Add/Update all entities for saving/adding Tenant Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM AddorUpdateTenantContact(EntityContactsVM itemToAddOrUpdate)
        {
            using (var repoCntctRespType = _repoFactory.ContactResponsibilityType())
            using (var repoCntct = _repoFactory.Contact())
            using (var repoCntctTenant = _repoFactory.ContactTenant())
            using (var repoCntctType = _repoFactory.ContactType())
            using (var repoCntctElctrncAddr = _repoFactory.ContactElectronicAddress())
            using (var repoCntctTelNbr = _repoFactory.ContactTelephoneNumber())
            using (var repoCmmctnUsageType = _repoFactory.CommunicationUsageType())
            {
                string defaultStatus = UtilityFunctions.GetContactTypeCode();
                CntctType cntctType = repoCntctType.FindOne(s => s.CntctTypeCode == defaultStatus);
                CntctRespType cntctRespType = SetContactResponsibilityType(itemToAddOrUpdate, repoCntctRespType);
                Cntct cntct = SetContact(itemToAddOrUpdate, repoCntct);
                CntctTenant cntctTenant = SetContactTenant(itemToAddOrUpdate, cntctRespType.CntctRespTypeSK, cntct.CntctSK, repoCntctTenant);
                itemToAddOrUpdate = SetContactCommunications(itemToAddOrUpdate, cntctType, repoCntctTelNbr, repoCntctElctrncAddr, repoCmmctnUsageType);
                repoCntctTenant.SaveChanges();
                itemToAddOrUpdate.EntityTypeContactSK = cntctTenant.CntctTenantSK;
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                itemToAddOrUpdate.ContactAddress = SetContactAddress(itemToAddOrUpdate, cntct);
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Add/Update the all entities for saving/Adding Account Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM AddorUpdateAccountContact(EntityContactsVM itemToAddOrUpdate)
        {
            using (var repoCntctRespType = _repoFactory.ContactResponsibilityType())
            using (var repoCntct = _repoFactory.Contact())
            using (var repoCntctAccount = _repoFactory.ContactAccount())
            using (var repoCntctType = _repoFactory.ContactType())
            using (var repoCntctElctrncAddr = _repoFactory.ContactElectronicAddress())
            using (var repoCntctTelNbr = _repoFactory.ContactTelephoneNumber())
            using (var repoCmmctnUsageType = _repoFactory.CommunicationUsageType())
            {
                string defaultStatus = UtilityFunctions.GetContactTypeCode();
                CntctType cntctType = repoCntctType.FindOne(s => s.CntctTypeCode == defaultStatus);
                CntctRespType cntctRespType = SetContactResponsibilityType(itemToAddOrUpdate, repoCntctRespType);
                Cntct cntct = SetContact(itemToAddOrUpdate, repoCntct);
                CntctAcct cntctAccount = SetContactAccount(itemToAddOrUpdate, cntctRespType.CntctRespTypeSK, cntct.CntctSK, repoCntctAccount);
                itemToAddOrUpdate = SetContactCommunications(itemToAddOrUpdate, cntctType, repoCntctTelNbr, repoCntctElctrncAddr, repoCmmctnUsageType);
                repoCntctAccount.SaveChanges();
                itemToAddOrUpdate.EntityTypeContactSK = cntctAccount.CntctAcctSK;
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                itemToAddOrUpdate.ContactAddress = SetContactAddress(itemToAddOrUpdate, cntct);
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Add/Update the all entities for saving/Adding Group Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM AddorUpdateGroupContact(EntityContactsVM itemToAddOrUpdate)
        {
            using (var repoCntctRespType = _repoFactory.ContactResponsibilityType())
            using (var repoCntct = _repoFactory.Contact())
            using (var repoCntctGrp = _repoFactory.ContactGroup())
            using (var repoCntctType = _repoFactory.ContactType())
            using (var repoCntctElctrncAddr = _repoFactory.ContactElectronicAddress())
            using (var repoCntctTelNbr = _repoFactory.ContactTelephoneNumber())
            using (var repoCmmctnUsageType = _repoFactory.CommunicationUsageType())
            {
                string defaultStatus = UtilityFunctions.GetContactTypeCode();
                CntctType cntctType = repoCntctType.FindOne(s => s.CntctTypeCode == defaultStatus);
                CntctRespType cntctRespType = SetContactResponsibilityType(itemToAddOrUpdate, repoCntctRespType);
                Cntct cntct = SetContact(itemToAddOrUpdate, repoCntct);
                CntctGrp cntctGrp = SetContactGroup(itemToAddOrUpdate, cntctRespType.CntctRespTypeSK, cntct.CntctSK, repoCntctGrp);
                itemToAddOrUpdate = SetContactCommunications(itemToAddOrUpdate, cntctType, repoCntctTelNbr, repoCntctElctrncAddr, repoCmmctnUsageType);
                repoCntctGrp.SaveChanges();
                itemToAddOrUpdate.EntityTypeContactSK = cntctGrp.CntctGrpSK;
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                itemToAddOrUpdate.ContactAddress = SetContactAddress(itemToAddOrUpdate, cntct);
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Add/Update the all entities for saving/Adding Population Group Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM AddorUpdatePopulationGroupContact(EntityContactsVM itemToAddOrUpdate)
        {
            using (var repoCntctRespType = _repoFactory.ContactResponsibilityType())
            using (var repoCntct = _repoFactory.Contact())
            using (var repoCntctPopGrp = _repoFactory.ContactPopulationGroup())
            using (var repoCntctType = _repoFactory.ContactType())
            using (var repoCntctElctrncAddr = _repoFactory.ContactElectronicAddress())
            using (var repoCntctTelNbr = _repoFactory.ContactTelephoneNumber())
            using (var repoCmmctnUsageType = _repoFactory.CommunicationUsageType())
            {
                string defaultStatus = UtilityFunctions.GetContactTypeCode();
                CntctType cntctType = repoCntctType.FindOne(s => s.CntctTypeCode == defaultStatus);
                CntctRespType cntctRespType = SetContactResponsibilityType(itemToAddOrUpdate, repoCntctRespType);
                Cntct cntct = SetContact(itemToAddOrUpdate, repoCntct);
                CntctPopGrp cntctPopGrp = SetContactPopulationGroup(itemToAddOrUpdate, cntctRespType.CntctRespTypeSK, cntct.CntctSK, repoCntctPopGrp);
                itemToAddOrUpdate = SetContactCommunications(itemToAddOrUpdate, cntctType, repoCntctTelNbr, repoCntctElctrncAddr, repoCmmctnUsageType);
                repoCntctPopGrp.SaveChanges();
                itemToAddOrUpdate.EntityTypeContactSK = cntctPopGrp.CntctPopGrpSK;
                itemToAddOrUpdate.CntctSK = cntct.CntctSK;
                itemToAddOrUpdate.ContactAddress = SetContactAddress(itemToAddOrUpdate, cntct);
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Adds or Updates the Contact Responsibility Type
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="repoCntctRespType">Type of the repo CNTCT resp.</param>
        /// <returns>CntctRespType.</returns>
        private CntctRespType SetContactResponsibilityType(EntityContactsVM itemToAddOrUpdate, IContactResponsibilityTypeRepository repoCntctRespType)
        {
            CntctRespType cntctRespType = repoCntctRespType.FindOne(r => r.CntctRespCode == itemToAddOrUpdate.CntctRespCode);
            if (cntctRespType == null)
            {
                cntctRespType = new CntctRespType()
                {
                    CntctRespCode = itemToAddOrUpdate.CntctRespCode.Trim(),
                    CntctRespDesc = itemToAddOrUpdate.CntctRespCode.Trim(),
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = itemToAddOrUpdate.TimeStamp,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    LastModfdBy = itemToAddOrUpdate.CurrentUser,
                    LastModfdTs = itemToAddOrUpdate.TimeStamp,
                };
                repoCntctRespType.AddOrUpdate(cntctRespType);
            }
            return cntctRespType;
        }

        /// <summary>
        /// Add or Get the Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="repoCntct">The repo CNTCT.</param>
        /// <returns>Cntct.</returns>
        private Cntct SetContact(EntityContactsVM itemToAddOrUpdate, IContactRepository repoCntct)
        {
            Cntct cntct = itemToAddOrUpdate.CntctSK == 0
                                      ? new Cntct()
                                      {
                                          CreatedBy = itemToAddOrUpdate.CurrentUser,
                                          CreatedTs = itemToAddOrUpdate.TimeStamp
                                      }
                                       : repoCntct.FindOne(k => k.CntctSK == itemToAddOrUpdate.CntctSK);
            cntct.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            cntct.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            cntct.CntctCmpnyName = itemToAddOrUpdate.Company;
            cntct.CntctTitle = itemToAddOrUpdate.Title;
            cntct.CntctFirstName = itemToAddOrUpdate.FirstName;
            cntct.CntctLastName = itemToAddOrUpdate.LastName;
            cntct.CntctPrintName = itemToAddOrUpdate.PrintName;
            cntct.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntct.LastModfdTs = itemToAddOrUpdate.TimeStamp;
            repoCntct.AddOrUpdate(cntct);
            return cntct;
        }

        /// <summary>
        /// Adds or Updates Contact Communications - Phone, Fax and/or Email
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctType">Type of the CNTCT.</param>
        /// <param name="repoCntctTelNbr">The repo CNTCT tel NBR.</param>
        /// <param name="repoCntctElctrncAddr">The repo CNTCT elctrnc addr.</param>
        /// <param name="repoCmmctnUsageType">Type of the repo CMMCTN usage.</param>
        /// <returns>EntityContactsVM.</returns>
        private EntityContactsVM SetContactCommunications(EntityContactsVM itemToAddOrUpdate, CntctType cntctType,
            IContactTelephoneNumberRepository repoCntctTelNbr, IContactElectronicAddressRepository repoCntctElctrncAddr, ICommunicationUsageTypeRepository repoCmmctnUsageType)
        {
            if (itemToAddOrUpdate.ContactCommunications.IsAny())
            {
                foreach (ContactCommunicationsVM communication in itemToAddOrUpdate.ContactCommunications)
                {
                    CmmctnUsageType cmmctnUsageType = repoCmmctnUsageType.FindOne(s => s.CmmctnUsageCode == communication.CommunicationTypeRaw);
                    if (communication.CommunicationType == ContactCommunicationType.Phone || communication.CommunicationType == ContactCommunicationType.Fax)
                    {
                        CntctTelNbr cntctTelNbr = communication.CommunicationSK != 0
                     ? repoCntctTelNbr.FindOne(c => c.CntctTelNbrSK == communication.CommunicationSK && c.CmmctnUsageTypeSK == cmmctnUsageType.CmmctnUsageTypeSK && c.CntctTypeSK == cntctType.CntctTypeSK && c.CntctSK == itemToAddOrUpdate.CntctSK)
                     : new CntctTelNbr()
                     {
                         CreatedBy = itemToAddOrUpdate.CurrentUser,
                         CreatedTs = itemToAddOrUpdate.TimeStamp,
                         CntctSK = itemToAddOrUpdate.CntctSK
                     };
                        //Check if record is deleted or has to be deleted
                        if (communication.IsDeleted)
                        {
                            cntctTelNbr.DelTs = UtilityFunctions.GetTimeStamp();
                        }
                        cntctTelNbr.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        cntctTelNbr.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        cntctTelNbr.CntctTypeSK = cntctType.CntctTypeSK;
                        cntctTelNbr.TelNbr = communication.Value;
                        cntctTelNbr.CmmctnUsageTypeSK = cmmctnUsageType.CmmctnUsageTypeSK;
                        cntctTelNbr.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                        cntctTelNbr.LastModfdTs = itemToAddOrUpdate.TimeStamp;
                        repoCntctTelNbr.AddOrUpdate(cntctTelNbr);
                    }
                    else if (communication.CommunicationType == ContactCommunicationType.EMail)
                    {
                        CntctElctrncAddr cntctElectrncAddr = communication.CommunicationSK != 0
                          ? repoCntctElctrncAddr.FindOne(s => s.CntctElctrncAddrSK == communication.CommunicationSK && s.CmmctnUsageTypeSK == cmmctnUsageType.CmmctnUsageTypeSK && s.CntctTypeSK == cntctType.CntctTypeSK && s.CntctSK == itemToAddOrUpdate.CntctSK)
                         : new CntctElctrncAddr()
                         {
                             CreatedBy = itemToAddOrUpdate.CurrentUser,
                             CreatedTs = itemToAddOrUpdate.TimeStamp,
                             CntctSK = itemToAddOrUpdate.CntctSK
                         };
                        if (communication.IsDeleted)
                        {
                            cntctElectrncAddr.DelTs = UtilityFunctions.GetTimeStamp();
                        }
                        cntctElectrncAddr.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        cntctElectrncAddr.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        cntctElectrncAddr.CntctTypeSK = cntctType.CntctTypeSK;
                        cntctElectrncAddr.ElctrncAddr = communication.Value;
                        cntctElectrncAddr.CmmctnUsageTypeSK = cmmctnUsageType.CmmctnUsageTypeSK;
                        cntctElectrncAddr.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                        cntctElectrncAddr.LastModfdTs = itemToAddOrUpdate.TimeStamp;
                        repoCntctElctrncAddr.AddOrUpdate(cntctElectrncAddr);
                        //  cntct.CntctElctrncAddr.Add(cntctElctncAddr);
                    }
                }
            }
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Adds or Update the Contact Tenant Family
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctRespTypeSK">The CNTCT resp type sk.</param>
        /// <param name="repoCntctTenantFam">The repo CNTCT tenant fam.</param>
        /// <returns>CntctTenantFam.</returns>
        private CntctTenantFam SetContactTenantFamily(EntityContactsVM itemToAddOrUpdate, long cntctRespTypeSK, IContactTenantFamilyRepository repoCntctTenantFam)
        {
            CntctTenantFam cntctTenantFamily = repoCntctTenantFam.FindOne(r => r.CntctTenantFamSK == itemToAddOrUpdate.EntityTypeContactSK) == null
                ?
              new CntctTenantFam()
              {
                  TenantFamSK = itemToAddOrUpdate.EntityTypeSK,
                  CreatedBy = itemToAddOrUpdate.CurrentUser,
                  CreatedTs = itemToAddOrUpdate.TimeStamp
              }
              : repoCntctTenantFam.FindOne(r => r.CntctTenantFamSK == itemToAddOrUpdate.EntityTypeContactSK);

            cntctTenantFamily.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            cntctTenantFamily.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            cntctTenantFamily.CntctSK = itemToAddOrUpdate.CntctSK;
            cntctTenantFamily.CntctRespTypeSK = cntctRespTypeSK;
            cntctTenantFamily.CntctPrity = itemToAddOrUpdate.Priority;
            cntctTenantFamily.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntctTenantFamily.LastModfdTs = itemToAddOrUpdate.TimeStamp;

            repoCntctTenantFam.AddOrUpdate(cntctTenantFamily);
            return cntctTenantFamily;
        }

        /// <summary>
        /// Adds or Update the Contact Tenant
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctRespTypeSK">The CNTCT resp type sk.</param>
        /// <param name="cntctSK">The CNTCT sk.</param>
        /// <param name="repoCntctTenant">The repo CNTCT tenant.</param>
        /// <returns>CntctTenant.</returns>
        private CntctTenant SetContactTenant(EntityContactsVM itemToAddOrUpdate, long cntctRespTypeSK, long cntctSK, IContactTenantRepository repoCntctTenant)
        {
            CntctTenant cntctTenant = repoCntctTenant.FindOne(r => r.CntctTenantSK == itemToAddOrUpdate.EntityTypeContactSK) == null
                ?
              new CntctTenant()
              {
                  TenantSK = itemToAddOrUpdate.EntityTypeSK,
                  CreatedBy = itemToAddOrUpdate.CurrentUser,
                  CreatedTs = itemToAddOrUpdate.TimeStamp
              }
              : repoCntctTenant.FindOne(r => r.CntctTenantSK == itemToAddOrUpdate.EntityTypeContactSK);


            cntctTenant.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            cntctTenant.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            cntctTenant.CntctSK = cntctSK;
            cntctTenant.CntctRespTypeSK = cntctRespTypeSK;
            cntctTenant.CntctPrity = itemToAddOrUpdate.Priority;
            cntctTenant.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntctTenant.LastModfdTs = itemToAddOrUpdate.TimeStamp;

            repoCntctTenant.AddOrUpdate(cntctTenant);
            return cntctTenant;
        }

        /// <summary>
        /// Adds or Update the Contact Account
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctRespTypeSK">The CNTCT resp type sk.</param>
        /// <param name="cntctSK">The CNTCT sk.</param>
        /// <param name="repoCntctAccount">The repo CNTCT account.</param>
        /// <returns>CntctAcct.</returns>
        private CntctAcct SetContactAccount(EntityContactsVM itemToAddOrUpdate, long cntctRespTypeSK, long cntctSK, IContactAccountRepository repoCntctAccount)
        {
            CntctAcct cntctAcct = repoCntctAccount.FindOne(r => r.CntctAcctSK == itemToAddOrUpdate.EntityTypeContactSK) == null
                ?
              new CntctAcct()
              {
                  AcctSK = itemToAddOrUpdate.EntityTypeSK,
                  CreatedBy = itemToAddOrUpdate.CurrentUser,
                  CreatedTs = itemToAddOrUpdate.TimeStamp
              }
              : repoCntctAccount.FindOne(r => r.CntctAcctSK == itemToAddOrUpdate.EntityTypeContactSK);

            cntctAcct.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            cntctAcct.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            cntctAcct.CntctSK = cntctSK;
            cntctAcct.CntctRespTypeSK = cntctRespTypeSK;
            cntctAcct.CntctPrity = itemToAddOrUpdate.Priority;
            cntctAcct.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntctAcct.LastModfdTs = itemToAddOrUpdate.TimeStamp;

            repoCntctAccount.AddOrUpdate(cntctAcct);
            return cntctAcct;
        }

        /// <summary>
        /// Adds or Update the Contact Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctRespTypeSK">The CNTCT resp type sk.</param>
        /// <param name="cntctSK">The CNTCT sk.</param>
        /// <param name="repoCntctGrp">The repo CNTCT GRP.</param>
        /// <returns>CntctGrp.</returns>
        private CntctGrp SetContactGroup(EntityContactsVM itemToAddOrUpdate, long cntctRespTypeSK, long cntctSK, IContactGroupRepository repoCntctGrp)
        {
            CntctGrp cntctGrp = repoCntctGrp.FindOne(r => r.CntctGrpSK == itemToAddOrUpdate.EntityTypeContactSK) == null
                ?
              new CntctGrp()
              {
                  GrpSK = itemToAddOrUpdate.EntityTypeSK,
                  CreatedBy = itemToAddOrUpdate.CurrentUser,
                  CreatedTs = itemToAddOrUpdate.TimeStamp
              }
              : repoCntctGrp.FindOne(r => r.CntctGrpSK == itemToAddOrUpdate.EntityTypeContactSK);

            cntctGrp.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            cntctGrp.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            cntctGrp.CntctSK = cntctSK;
            cntctGrp.CntctRespTypeSK = cntctRespTypeSK;
            cntctGrp.CntctPrity = itemToAddOrUpdate.Priority;
            cntctGrp.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntctGrp.LastModfdTs = itemToAddOrUpdate.TimeStamp;

            repoCntctGrp.AddOrUpdate(cntctGrp);
            return cntctGrp;
        }

        /// <summary>
        /// Adds or Update the Contact Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntctRespTypeSK">The CNTCT resp type sk.</param>
        /// <param name="cntctSK">The CNTCT sk.</param>
        /// <param name="repoCntctPopGrp">The repo CNTCT pop GRP.</param>
        /// <returns>CntctPopGrp.</returns>
        private CntctPopGrp SetContactPopulationGroup(EntityContactsVM itemToAddOrUpdate, long cntctRespTypeSK, long cntctSK, IContactPopulationGroupRepository repoCntctPopGrp)
        {
            CntctPopGrp cntctPopGrp = repoCntctPopGrp.FindOne(r => r.CntctPopGrpSK == itemToAddOrUpdate.EntityTypeContactSK) == null
                ?
              new CntctPopGrp()
              {
                  PopGrpSK = itemToAddOrUpdate.EntityTypeSK,
                  CreatedBy = itemToAddOrUpdate.CurrentUser,
                  CreatedTs = itemToAddOrUpdate.TimeStamp
              }
              : repoCntctPopGrp.FindOne(r => r.CntctPopGrpSK == itemToAddOrUpdate.EntityTypeContactSK);

            cntctPopGrp.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            cntctPopGrp.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            cntctPopGrp.CntctSK = cntctSK;
            cntctPopGrp.CntctRespTypeSK = cntctRespTypeSK;
            cntctPopGrp.CntctPrity = itemToAddOrUpdate.Priority;
            cntctPopGrp.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            cntctPopGrp.LastModfdTs = itemToAddOrUpdate.TimeStamp;

            repoCntctPopGrp.AddOrUpdate(cntctPopGrp);
            return cntctPopGrp;
        }

        /// <summary>
        /// Adds or Update the Contact Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="cntct">The CNTCT.</param>
        /// <returns>EntityAddressVM.</returns>
        private EntityAddressVM SetContactAddress(EntityContactsVM itemToAddOrUpdate, Cntct cntct)
        {
            EntityAddressVM entityAddress = new EntityAddressVM(EntityAddressType.Contact);
            entityAddress.CurrentUser = itemToAddOrUpdate.CurrentUser;
            entityAddress.EntityTypeSK = itemToAddOrUpdate.CntctSK;
            entityAddress.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            entityAddress.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            entityAddress.EntityEfctvStartDt = cntct.EfctvStartDt;
            entityAddress.EntityEfctvStartDt = cntct.EfctvEndDt;
            entityAddress.AddrLine1 = itemToAddOrUpdate.ContactAddress.AddrLine1;
            entityAddress.AddrLine2 = itemToAddOrUpdate.ContactAddress.AddrLine2;
            entityAddress.City = itemToAddOrUpdate.ContactAddress.City;
            entityAddress.StPrvncCodeSK = itemToAddOrUpdate.ContactAddress.StPrvncCodeSK;
            entityAddress.ISOCntryCodeSK = itemToAddOrUpdate.ContactAddress.ISOCntryCodeSK;
            entityAddress.PostalCode = itemToAddOrUpdate.ContactAddress.PostalCode;
            entityAddress.EntityTypeAddressSK = itemToAddOrUpdate.ContactAddress.EntityTypeAddressSK;
            return _entityAddressBLL.SetEntityAddress(entityAddress);
        }

        #endregion Private Set Methods
    }
}