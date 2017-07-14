using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ModelBinding;

namespace BenefitPlanWebApi.Services
{
    /// <summary>
    /// Static JSON Utility Class
    /// </summary>
    public static class JSONFunctions
    {
        #region " Public Methods "
        /// <summary>
        /// Creates a new JSON message record
        /// </summary>
        /// <returns>a JSON Message</returns>
        public static Message SetMessage(string code, JSONMessageType type, string messageText, string fieldname)
        {
            return new Message() { Code = code, Type = type.ToString(), MessageText = messageText, Fieldname = fieldname };
        }

        /// <summary>
        /// Return a List of JSON Messages from the Model State Dictionary
        /// </summary>
        /// <param name="dictionary">the Model State Dictionary</param>
        /// <returns>List of JSON Messages</returns>
        public static List<Message> PopulationMessages(ModelStateDictionary dictionary)
        {
            List<Message> messageList = new List<Message>();

            var erroneousFields = dictionary
                .Where(ms => ms.Value.Errors.Any())
                .Select(x => new { x.Key, x.Value.Errors });

            foreach (var erroneousField in erroneousFields)
            {
                var fieldKey = erroneousField.Key;
                var fieldErrors = erroneousField.Errors
                    .Select(error => new Message() { Code = string.Empty, Type = JSONMessageType.Error.ToString(), MessageText = error.ErrorMessage, Fieldname = fieldKey });

                messageList.AddRange(fieldErrors);
            }

            return messageList;
        }

        /// <summary>
        /// Create a Success Add Update Response
        /// </summary>
        /// <param name="ids">List of ids to add to the Response</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse AddUpdateSuccessReponse(List<long> ids)
        {
            Object data = new Object();
            return AddUpdateSuccessReponse(ids, "Add Update was successful.", data);
        }

        /// <summary>
        /// Create a Success Add Update Response
        /// </summary>
        /// <param name="ids">List of ids to add to the Response</param>
        /// <param name="data">The object</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse AddUpdateSuccessReponse(List<long> ids, Object data)
        {
            return AddUpdateSuccessReponse(ids, "Add Update was successful.", data);
        }

        /// <summary>
        /// Create a Success Add Update Response
        /// </summary>
        /// <param name="ids">List of ids to add to the Response</param>
        /// <param name="data">The object</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse AddUpdateSuccessReponse(List<long> ids, string message, Object data)
        {
            AddUpdateResponse response = new AddUpdateResponse() { Success = true };
            response.Count = ids.Count();
            response.ID = ids;
            response.Messages = new List<Message>() { SetMessage(string.Empty, JSONMessageType.Info, message, string.Empty) };
            response.data = data;
            return response;
        }

        /// <summary>
        /// Create a Success Add Update Response
        /// </summary>
        /// <param name="ids">List of ids to add to the Response</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse CopySuccessReponse(List<long> ids)
        {
            Object data = new Object();
            return AddUpdateSuccessReponse(ids, "Copy was successful.", data);
        }

        /// <summary>
        /// Create a Failure Add Update Response
        /// </summary>
        /// <param name="ids">List of Messages to add to the Response</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse AddUpdateErrorReponse(List<Message> messages)
        {
            AddUpdateResponse response = new AddUpdateResponse() { Success = false };
            response.Count = 0;
            response.ID = new List<long>();
            response.Messages = messages;
            response.data = new Object();
            return response;
        }

        /// <summary>
        /// Create a Failure Add Update Response
        /// </summary>
        /// <param name="dictionary">List of Messages to add to the Response</param>
        /// <returns>Add Update Response Container</returns>
        public static AddUpdateResponse AddUpdateErrorReponse(ModelStateDictionary dictionary)
        {
            AddUpdateResponse response = new AddUpdateResponse() { Success = false };
            response.Count = 0;
            response.ID = new List<long>();
            response.Messages = PopulationMessages(dictionary);
            response.data = new Object();
            return response;
        }

        #endregion
    }
}