using Atlas.BenefitPlan.DAL.Models.Enums;
using System;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class ContactCommunicationsVM
    {
        /// <summary>
        /// Id for the Contact Communication Numbers
        /// </summary>
        public long CommunicationSK { get; set; }

        /// <summary>
        /// Contact Communications Numbers
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Communication Usage Code for the Contact Communication Numbers
        /// </summary>
        public String CommunicationTypeRaw { get; set; }

        /// <summary>
        /// Time stamp to inactive the contact communication record //for future
        /// </summary>
        public DateTime? InctvTs { get; set; }

        //Timestamp to soft delete the contact communication record
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// Communication Usage Code for the Contact Communication Numbers
        /// </summary>
        public ContactCommunicationType CommunicationType { get { return (ContactCommunicationType)Enum.Parse(typeof(ContactCommunicationType), CommunicationTypeRaw, true); } }
    }
}