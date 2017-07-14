using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;

namespace Atlas.Formulary.BLL.DrugSearch
{
    /// <summary>
    /// Business Logic for both smart and regular drug search functionality.
    /// </summary>
    public interface IDrugSearchBLL
    {
        /// <summary>
        /// Searches for drugs that match the given collection of criteria. 
        /// </summary>
        /// <param name="queries"></param>
        /// <param name="startIndex"></param>
        /// <param name="count"></param>
        /// <param name="formularyId"></param>
        /// <param name="orderBy"></param>
        /// <param name="userId"></param>
        /// <param name="criteriachange"></param>
        /// <param name="sessionId"></param>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        QueryResult<spDrugListSearchFDBv5_Result> Search(List<Criteria> queries,
                                                        int startIndex, 
                                                        int count, 
                                                        long? formularyId,
                                                        string orderBy = "",
                                                        string userId = "",
                                                        bool criteriachange = true,
                                                        Guid? sessionId = null,
                                                        long? drugListSK = null,
                                                        long? coveragePropertyProgramSK = null);
        QueryResult<spDrugListSearchMedispanV2_Result> SearchMedispan(
                                                       List<Criteria> queries,
                                                       int startIndex,
                                                       int count,
                                                       long? formularySK,
                                                       string orderBy = "",
                                                       string userId = "",
                                                       bool criteriaChange = true,
                                                       Guid? sessionId = null,
                                                       long? drugListSK = null,
                                                       long? coveragePropertyProgramSK = null);


        /// <summary>
        /// Full text search accross all filterable fields (fileds that can have criteria). 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        QueryResult<SmartSearchResult> SmartSearch(string query, long? smartDrugSearchColumnSK);

        /// <summary>
        /// Full text search accross all filterable fields (fileds that can have criteria). 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        QueryResult<SmartSearchResult> SmartSearchMedispan(string query, long? smartDrugSearchColumnSK);

        /// <summary>
        /// Full text search that is specialized to respect obsolete dates with respect to 
        /// the days after obsolete set in a formulary's header. 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="frmlrySK"></param>
        /// <returns></returns>
        QueryResult<SmartSearchResult> FormularyConfigSmartSearch(string query, long? frmlrySK, long? smartDrugSearchColumnSK);

        /// <summary>
        /// Full text search that is specialized to respect obsolete dates with respect to
        /// the days after obsolete set in a drug list's header.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        QueryResult<SmartSearchResult> DrugListSmartSearch(string query, long? drugListSK, long? smartDrugSearchColumnSK);


        /// <summary>
        /// Constructs and returns the ETC tree.
        /// </summary>
        /// <returns></returns>
        TreeChildren FormularyEtcTree(); // TODO: Move this to a better home.

        GpiTreeNode GetGpiTree();

        QueryResult<SmartSearchResult> FormularyConfigSmartSearchMedispan(string query, long? frmlrySK, long? smartDrugSearchColumnSK);
        QueryResult<SmartSearchResult> DrugListSmartSearchMedispan(string query, long? drugListSK, long? smartDrugSearchColumnSK);
    }
}
