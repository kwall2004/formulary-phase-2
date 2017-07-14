using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using BenefitPlanWebApi.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Cost Share Maximums Controller for Benefit Plan
    /// </summary>
    public class BenefitPlanCostShareMaximumsController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>the Benefit Plan bll</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>
        /// Put on hold until further notice
        /// </summary>
        /// <param name="benefitPlanBLL"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public BenefitPlanCostShareMaximumsController(IBenefitPlanRepositoryFactory repoFactory, IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Cost Shares for a benefit plan
        /// http://localhost:55229/BenefitPlanApi/Api/BenefitPlanCostShareMaximums?bnftPlanSK=2
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanCostShareMaximums(long bnftPlanSK)
        {
            try
            {
                List<Deducbl> deducbls = new List<Deducbl>();
                deducbls = _repoFactory.Deductible().FindAll(c => c.BnftPlanSK == bnftPlanSK && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null).ToList();
                BnftPlan bnftPlan = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == bnftPlanSK);

                bool embeddedDeductiblesInd;

                if (deducbls == null || deducbls.Count == 0)
                {
                    embeddedDeductiblesInd = true;
                }
                else
                {
                    embeddedDeductiblesInd = bnftPlan.EmbeddedDeductiblesInd;
                }

                //Create structure first (dynamically because of network tiers)
                DataTable costShareMaximumsDataTable = new DataTable("CostShareMaximums");

                ////Add Columns
                DataColumn benefitPlanSKColumn = new DataColumn("BnftPlanSK", System.Type.GetType("System.Int64"));
                costShareMaximumsDataTable.Columns.Add(benefitPlanSKColumn);

                DataColumn embeddedDeductiblesIndColumn = new DataColumn("EmbeddedInd", System.Type.GetType("System.Boolean"));
                costShareMaximumsDataTable.Columns.Add(embeddedDeductiblesIndColumn);

                DataColumn deducblScopeTypeSKColumn = new DataColumn("DeducblScopeTypeSK", System.Type.GetType("System.Int64"));
                costShareMaximumsDataTable.Columns.Add(deducblScopeTypeSKColumn);

                DataColumn deducblScopeTypeCodeColumn = new DataColumn("DeducblScopeTypeCode", System.Type.GetType("System.String"));
                costShareMaximumsDataTable.Columns.Add(deducblScopeTypeCodeColumn);


                //one column for each network tier(use the netwrktiers here instead of the numbers.
                foreach (NtwrkTier ntwrkTier in _repoFactory.NetworkTier().FindAll(s => s.BnftPlanSK == bnftPlanSK).OrderBy(o => o.NtwrkTierType.NtwrkTierName))
                {
                    NtwrkTierType ntwrkTierType = _repoFactory.NetworkTierType().FindOne(f => f.NtwrkTierTypeSK == ntwrkTier.NtwrkTierTypeSK);
                    DataColumn networkTierColumn = new DataColumn(ntwrkTierType.NtwrkTierName.Replace(' ', '_'), System.Type.GetType("System.String"));
                    networkTierColumn.ExtendedProperties.Add("NtwrkTierSK", ntwrkTier.NtwrkTierSK);
                    costShareMaximumsDataTable.Columns.Add(networkTierColumn);
                }

                DataColumn planLevel = new DataColumn("Plan_Level_Deductible", System.Type.GetType("System.String"));
                costShareMaximumsDataTable.Columns.Add(planLevel);

                DataColumn maxOOP = new DataColumn("Max_Out_Of_Pocket", System.Type.GetType("System.String"));
                costShareMaximumsDataTable.Columns.Add(maxOOP);

                DataColumn planYearMaxBenefit = new DataColumn("Plan_Year_Max_Benefit", System.Type.GetType("System.String"));
                costShareMaximumsDataTable.Columns.Add(planYearMaxBenefit);

                DataColumn maxLifetimeBenefit = new DataColumn("Max_Lifetime_Benefit", System.Type.GetType("System.String"));
                costShareMaximumsDataTable.Columns.Add(maxLifetimeBenefit);

                if (bnftPlan.BnftPlanTypeSK == (int)BenefitPlanType.Medical)
                {
                    DataColumn rxDeductible = new DataColumn("RX_Deductible", System.Type.GetType("System.String"));
                    costShareMaximumsDataTable.Columns.Add(rxDeductible);
                }

                //Now load data
                // get the unique Deductibe types here. and loop through them
                IEnumerable<long> deducblScopeTypes = _repoFactory.DeductibleScopeType().FindAll().Select(d => d.DeducblScopeTypeSK);
                foreach (long currentDeducblScopeTypeSK in deducblScopeTypes)
                {
                    DataRow currentDataRow = costShareMaximumsDataTable.NewRow();
                    currentDataRow["DeducblScopeTypeSK"] = currentDeducblScopeTypeSK;
                    currentDataRow["BnftPlanSK"] = bnftPlanSK;
                    currentDataRow["EmbeddedInd"] = embeddedDeductiblesInd;


                    DeducblScopeType deducblScopeType = _repoFactory.DeductibleScopeType().FindOne(f => f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                    if (deducblScopeType != null)
                    {
                        currentDataRow["DeducblScopeTypeCode"] = deducblScopeType.DeducblScopeTypeCode;
                    }

                    foreach (NtwrkTier ntwrkTier in _repoFactory.NetworkTier().FindAll(s => s.BnftPlanSK == bnftPlanSK))
                    {
                        //Tier deductible values
                        DataColumn networkTierDeductibleColumn = UtilityWebApi.findDataColumnByExtendedProperty(costShareMaximumsDataTable, "NtwrkTierSK", ntwrkTier.NtwrkTierSK.ToString());

                        Deducbl networkTierDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.NtwrkTierSK == ntwrkTier.NtwrkTierSK && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                        if (networkTierDeductible == null || networkTierDeductible.DeducblAmt == null)
                        {
                            currentDataRow[networkTierDeductibleColumn.Ordinal] = "";
                        }
                        else
                        {
                            currentDataRow[networkTierDeductibleColumn.Ordinal] = networkTierDeductible.DeducblAmt;
                        }
                        
                    }
                    //Max Lifetime Benefit Deductible
                    long planLevelDeductibleTypeSK = FindDeducblTypeSKByName("Plan Level Deductible");
                    Deducbl planLevelDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.DeducblTypeSK == planLevelDeductibleTypeSK && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                    if (planLevelDeductible == null || planLevelDeductible.DeducblAmt == null)
                    {
                        currentDataRow["Plan_Level_Deductible"] = "";
                    }
                    else
                    {
                        currentDataRow["Plan_Level_Deductible"] = planLevelDeductible.DeducblAmt;
                    }

                    //Max out of pocket
                    long maxOOPDeducblTypeSK = FindDeducblTypeSKByName("Max Out of Pocket");
                    Deducbl maxOOPDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.DeducblTypeSK == maxOOPDeducblTypeSK && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                    if(maxOOPDeductible == null || maxOOPDeductible.DeducblAmt == null)
                    {
                        currentDataRow["Max_Out_of_Pocket"] = "";
                    }
                    else
                    {
                        currentDataRow["Max_Out_of_Pocket"] = maxOOPDeductible.DeducblAmt;
                    }
                    

                    //Max Benefit Deductible Year 
                    long planYearMaxBenefitDeducblTypeSK = FindDeducblTypeSKByName("Plan Year Max Benefit");
                    Deducbl planYearMaxBenefitDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.DeducblTypeSK == planYearMaxBenefitDeducblTypeSK && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                    if (planYearMaxBenefitDeductible == null || planYearMaxBenefitDeductible.DeducblAmt == null)
                    {
                        currentDataRow["Plan_Year_Max_Benefit"] = "";
                    }
                    else
                    {
                        currentDataRow["Plan_Year_Max_Benefit"] = planYearMaxBenefitDeductible.DeducblAmt;
                    }

                    

                    //Max Lifetime Benefit Deductible
                    long maxLifetimeBenefitDeducblTypeSK = FindDeducblTypeSKByName("Max Lifetime Benefit");
                    Deducbl maxLifetimeBenefitDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.DeducblTypeSK == maxLifetimeBenefitDeducblTypeSK && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                    if (maxLifetimeBenefitDeductible == null || maxLifetimeBenefitDeductible.DeducblAmt == null)
                    {
                        currentDataRow["Max_Lifetime_Benefit"] = "";
                    }
                    else
                    {
                        currentDataRow["Max_Lifetime_Benefit"] = maxLifetimeBenefitDeductible.DeducblAmt;
                    }


                    if (bnftPlan.BnftPlanTypeSK == (int)BenefitPlanType.Medical)
                    {
                        //RX Deductible
                        Deducbl rxDeductible = deducbls.FirstOrDefault<Deducbl>(f => f.DeducblTypeSK == (int)DeductibleType.RXDeductible && f.DeducblScopeTypeSK == currentDeducblScopeTypeSK);
                        if (rxDeductible == null || rxDeductible.DeducblAmt == null)
                        {
                            currentDataRow["RX_Deductible"] = "";
                        }
                        else
                        {
                            currentDataRow["RX_Deductible"] = rxDeductible.DeducblAmt;
                        }
                    }


                    costShareMaximumsDataTable.Rows.Add(currentDataRow);
                }

                return Ok(costShareMaximumsDataTable);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult SetBenefitPlanCostShareMaximums(JObject benefitPlanCostShareMaximum)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    BenefitPlanCostShareMaximumsVM costShareMaximumsVM = new BenefitPlanCostShareMaximumsVM();

                    // change blanks to nulls
                                        

                    costShareMaximumsVM.BnftPlanSK = (long)benefitPlanCostShareMaximum["BnftPlanSK"];
                    costShareMaximumsVM.DeducblScopeTypeSK = (long)benefitPlanCostShareMaximum["DeducblScopeTypeSK"];
                    costShareMaximumsVM.EmbeddedDeductiblesInd = (bool)benefitPlanCostShareMaximum["EmbeddedInd"];

                    //value fields
                    if (benefitPlanCostShareMaximum["Plan_Level_Deductible"].ToString() == "")
                    {
                        costShareMaximumsVM.PlanLevelDeductible = null;
                    }
                    else
                    {
                        costShareMaximumsVM.PlanLevelDeductible = (decimal?)benefitPlanCostShareMaximum["Plan_Level_Deductible"];
                    }
                    
                    if(benefitPlanCostShareMaximum["Max_Out_Of_Pocket"].ToString()=="")
                    {
                        costShareMaximumsVM.MaxOutofPocket = null;
                    }
                    else
                    {
                        costShareMaximumsVM.MaxOutofPocket = (decimal?)benefitPlanCostShareMaximum["Max_Out_Of_Pocket"];
                    }
                    
                    if(benefitPlanCostShareMaximum["Plan_Year_Max_Benefit"].ToString()=="")
                    {
                        costShareMaximumsVM.PlanYearMaxBenefit = null;
                    }
                    else
                    {
                        costShareMaximumsVM.PlanYearMaxBenefit = (decimal?)benefitPlanCostShareMaximum["Plan_Year_Max_Benefit"];
                    }

                    if (benefitPlanCostShareMaximum["Max_Lifetime_Benefit"].ToString()=="")
                    {
                        costShareMaximumsVM.MaxLifetimeBenefit = null;
                    }
                    else
                    {
                        costShareMaximumsVM.MaxLifetimeBenefit = (decimal?)benefitPlanCostShareMaximum["Max_Lifetime_Benefit"];
                    }

                    BnftPlan bnftplan = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == costShareMaximumsVM.BnftPlanSK);

                    if (bnftplan != null)
                    {
                        long bnftPlanType = bnftplan.BnftPlanTypeSK;

                        if (bnftPlanType == (int)BenefitPlanType.Medical)
                        {
                            if (benefitPlanCostShareMaximum["RX_Deductible"].ToString() == "")
                            {
                                costShareMaximumsVM.RXDeductible = null;
                            }
                            else
                            {
                                costShareMaximumsVM.RXDeductible = (decimal?)benefitPlanCostShareMaximum["RX_Deductible"];
                            }
                        }
                    }


                    costShareMaximumsVM.Deleted = (bool)benefitPlanCostShareMaximum["Deleted"];
                    costShareMaximumsVM.CurrentUser = UtilityFunctions.GetCurrentUser((string)benefitPlanCostShareMaximum["CurrentUser"]);

                    foreach (NtwrkTier ntwrkTier in _repoFactory.NetworkTier().FindAll(s => s.BnftPlanSK == costShareMaximumsVM.BnftPlanSK))
                    {
                        CostShareMaximumsNetworkDetail networkDetail = new CostShareMaximumsNetworkDetail();
                        NtwrkTierType ntwrkTierType = _repoFactory.NetworkTierType().FindOne(f => f.NtwrkTierTypeSK == ntwrkTier.NtwrkTierTypeSK);
                        if(benefitPlanCostShareMaximum[ntwrkTierType.NtwrkTierName.Replace(' ', '_')].ToString()=="")
                        {
                            networkDetail.DeductibleAmt = null;
                        }
                        else
                        {
                            networkDetail.DeductibleAmt = (decimal?)benefitPlanCostShareMaximum[ntwrkTierType.NtwrkTierName.Replace(' ', '_')];
                        }
                        
                        networkDetail.NtwrkTierName = ntwrkTierType.NtwrkTierName.Replace(' ', '_');
                        networkDetail.NtwrkTierSK = ntwrkTier.NtwrkTierSK;
                        costShareMaximumsVM.NetworkTiers.Add(networkDetail);
                    }
                    bool result = _benefitPlanBLL.AddOrUpdateCostShareMaximum(costShareMaximumsVM);

                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { costShareMaximumsVM.BnftPlanSK }));

                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult GetAllBenefitPlanCostShareMaximumsx(BenefitPlanCostShareMaximumsVM benefitPlanCostShareMaximumsVM)
        {
            return Ok();
        }

        private long FindDeducblTypeSKByName(string deducblTypeCode)
        {
            long deducblTypeSK = 0;
            DeducblType deducblType = _repoFactory.DeductibleType().FindOne(c => c.DeducblTypeCode == deducblTypeCode);
            if (deducblType != null)
            {
                deducblTypeSK = deducblType.DeducblTypeSK;
            }
            return deducblTypeSK;
        }


    }
}
