using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class Bnft_MCS : CompareEntity
    {
        public string ReasonCode { get; set; } 
		public string ReasonDesc { get; set; } 
		public string PolicyId { get; set; }

        public Bnft ConvertToBnft(string message)
        {
            Bnft bnft = new Bnft();
            bnft.BnftCode = ReasonCode;
            bnft.BnftName = ReasonDesc;

            int policyIdParsed;
            if(int.TryParse(PolicyId, out policyIdParsed))
            { 
                bnft.BnftOrder  = policyIdParsed;
            }
            else
            {
                bnft.BnftOrder = null;
                message += "Policy Id not an Int;";
            }

            return bnft;
        }
    }

    
}