// ***********************************************************************
// Assembly         : Atlas.Framework
// Author           : b1454
// Created          : 04-26-2016
//
// Last Modified By : b1454
// Last Modified On : 04-26-2016
// ***********************************************************************
// <copyright file="Message.cs" company="">
//     Copyright ©  2016
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// The Containers namespace.
/// </summary>
namespace Atlas.Formulary.DAL.Models.Containers
{
    /// <summary>
    /// Enum messageType
    /// </summary>
    public enum MessageType
    {
        /// <summary>
        /// The request
        /// </summary>
        Request,
        /// <summary>
        /// The response
        /// </summary>
        Response


    }
    /// <summary>
    /// Class Message.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Message<T> where T : ISerializable
    {
        /// <summary>
        /// Gets or sets the message identifier.
        /// </summary>
        /// <value>The message identifier.</value>
        public string MessageId { get; set; }
        /// <summary>
        /// Gets or sets the message module source.
        /// </summary>
        /// <value>The message module source.</value>
        public string MessageModuleSource { get; set; }
        /// <summary>
        /// Gets or sets the message send date time.
        /// </summary>
        /// <value>The message send date time.</value>
        public string MessageSendDateTime { get; set; }
        /// <summary>
        /// Gets or sets the message recieve date time.
        /// </summary>
        /// <value>The message recieve date time.</value>
        public string MessageRecieveDateTime { get; set; }
        /// <summary>
        /// Gets or sets the error list.
        /// </summary>
        /// <value>The error list.</value>
        public List<Exception> ErrorList { get; set; }
        /// <summary>
        /// Gets or sets the message payload.
        /// </summary>
        /// <value>The message payload.</value>
        public T MessagePayload {get;set;}
        
    }
}
