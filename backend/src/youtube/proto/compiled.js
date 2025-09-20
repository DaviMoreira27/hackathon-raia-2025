/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.apex = (function() {

    /**
     * Namespace apex.
     * @exports apex
     * @namespace
     */
    var apex = {};

    apex.Initial = (function() {

        /**
         * Properties of an Initial.
         * @memberof apex
         * @interface IInitial
         * @property {string|null} [IS_ASR] Initial IS_ASR
         * @property {string} LANGUAGE_INITIALS Initial LANGUAGE_INITIALS
         */

        /**
         * Constructs a new Initial.
         * @memberof apex
         * @classdesc Represents an Initial.
         * @implements IInitial
         * @constructor
         * @param {apex.IInitial=} [properties] Properties to set
         */
        function Initial(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Initial IS_ASR.
         * @member {string} IS_ASR
         * @memberof apex.Initial
         * @instance
         */
        Initial.prototype.IS_ASR = "";

        /**
         * Initial LANGUAGE_INITIALS.
         * @member {string} LANGUAGE_INITIALS
         * @memberof apex.Initial
         * @instance
         */
        Initial.prototype.LANGUAGE_INITIALS = "";

        /**
         * Creates a new Initial instance using the specified properties.
         * @function create
         * @memberof apex.Initial
         * @static
         * @param {apex.IInitial=} [properties] Properties to set
         * @returns {apex.Initial} Initial instance
         */
        Initial.create = function create(properties) {
            return new Initial(properties);
        };

        /**
         * Encodes the specified Initial message. Does not implicitly {@link apex.Initial.verify|verify} messages.
         * @function encode
         * @memberof apex.Initial
         * @static
         * @param {apex.IInitial} message Initial message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Initial.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.IS_ASR != null && Object.hasOwnProperty.call(message, "IS_ASR"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.IS_ASR);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.LANGUAGE_INITIALS);
            return writer;
        };

        /**
         * Encodes the specified Initial message, length delimited. Does not implicitly {@link apex.Initial.verify|verify} messages.
         * @function encodeDelimited
         * @memberof apex.Initial
         * @static
         * @param {apex.IInitial} message Initial message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Initial.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Initial message from the specified reader or buffer.
         * @function decode
         * @memberof apex.Initial
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {apex.Initial} Initial
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Initial.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apex.Initial();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.IS_ASR = reader.string();
                        break;
                    }
                case 2: {
                        message.LANGUAGE_INITIALS = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("LANGUAGE_INITIALS"))
                throw $util.ProtocolError("missing required 'LANGUAGE_INITIALS'", { instance: message });
            return message;
        };

        /**
         * Decodes an Initial message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof apex.Initial
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {apex.Initial} Initial
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Initial.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Initial message.
         * @function verify
         * @memberof apex.Initial
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Initial.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.IS_ASR != null && message.hasOwnProperty("IS_ASR"))
                if (!$util.isString(message.IS_ASR))
                    return "IS_ASR: string expected";
            if (!$util.isString(message.LANGUAGE_INITIALS))
                return "LANGUAGE_INITIALS: string expected";
            return null;
        };

        /**
         * Creates an Initial message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof apex.Initial
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {apex.Initial} Initial
         */
        Initial.fromObject = function fromObject(object) {
            if (object instanceof $root.apex.Initial)
                return object;
            var message = new $root.apex.Initial();
            if (object.IS_ASR != null)
                message.IS_ASR = String(object.IS_ASR);
            if (object.LANGUAGE_INITIALS != null)
                message.LANGUAGE_INITIALS = String(object.LANGUAGE_INITIALS);
            return message;
        };

        /**
         * Creates a plain object from an Initial message. Also converts values to other types if specified.
         * @function toObject
         * @memberof apex.Initial
         * @static
         * @param {apex.Initial} message Initial
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Initial.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.IS_ASR = "";
                object.LANGUAGE_INITIALS = "";
            }
            if (message.IS_ASR != null && message.hasOwnProperty("IS_ASR"))
                object.IS_ASR = message.IS_ASR;
            if (message.LANGUAGE_INITIALS != null && message.hasOwnProperty("LANGUAGE_INITIALS"))
                object.LANGUAGE_INITIALS = message.LANGUAGE_INITIALS;
            return object;
        };

        /**
         * Converts this Initial to JSON.
         * @function toJSON
         * @memberof apex.Initial
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Initial.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Initial
         * @function getTypeUrl
         * @memberof apex.Initial
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Initial.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/apex.Initial";
        };

        return Initial;
    })();

    apex.Final = (function() {

        /**
         * Properties of a Final.
         * @memberof apex
         * @interface IFinal
         * @property {string} VIDEO_ID Final VIDEO_ID
         * @property {string} LANGUAGE_INITIALS Final LANGUAGE_INITIALS
         */

        /**
         * Constructs a new Final.
         * @memberof apex
         * @classdesc Represents a Final.
         * @implements IFinal
         * @constructor
         * @param {apex.IFinal=} [properties] Properties to set
         */
        function Final(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Final VIDEO_ID.
         * @member {string} VIDEO_ID
         * @memberof apex.Final
         * @instance
         */
        Final.prototype.VIDEO_ID = "";

        /**
         * Final LANGUAGE_INITIALS.
         * @member {string} LANGUAGE_INITIALS
         * @memberof apex.Final
         * @instance
         */
        Final.prototype.LANGUAGE_INITIALS = "";

        /**
         * Creates a new Final instance using the specified properties.
         * @function create
         * @memberof apex.Final
         * @static
         * @param {apex.IFinal=} [properties] Properties to set
         * @returns {apex.Final} Final instance
         */
        Final.create = function create(properties) {
            return new Final(properties);
        };

        /**
         * Encodes the specified Final message. Does not implicitly {@link apex.Final.verify|verify} messages.
         * @function encode
         * @memberof apex.Final
         * @static
         * @param {apex.IFinal} message Final message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Final.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.VIDEO_ID);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.LANGUAGE_INITIALS);
            return writer;
        };

        /**
         * Encodes the specified Final message, length delimited. Does not implicitly {@link apex.Final.verify|verify} messages.
         * @function encodeDelimited
         * @memberof apex.Final
         * @static
         * @param {apex.IFinal} message Final message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Final.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Final message from the specified reader or buffer.
         * @function decode
         * @memberof apex.Final
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {apex.Final} Final
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Final.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.apex.Final();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.VIDEO_ID = reader.string();
                        break;
                    }
                case 2: {
                        message.LANGUAGE_INITIALS = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("VIDEO_ID"))
                throw $util.ProtocolError("missing required 'VIDEO_ID'", { instance: message });
            if (!message.hasOwnProperty("LANGUAGE_INITIALS"))
                throw $util.ProtocolError("missing required 'LANGUAGE_INITIALS'", { instance: message });
            return message;
        };

        /**
         * Decodes a Final message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof apex.Final
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {apex.Final} Final
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Final.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Final message.
         * @function verify
         * @memberof apex.Final
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Final.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.VIDEO_ID))
                return "VIDEO_ID: string expected";
            if (!$util.isString(message.LANGUAGE_INITIALS))
                return "LANGUAGE_INITIALS: string expected";
            return null;
        };

        /**
         * Creates a Final message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof apex.Final
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {apex.Final} Final
         */
        Final.fromObject = function fromObject(object) {
            if (object instanceof $root.apex.Final)
                return object;
            var message = new $root.apex.Final();
            if (object.VIDEO_ID != null)
                message.VIDEO_ID = String(object.VIDEO_ID);
            if (object.LANGUAGE_INITIALS != null)
                message.LANGUAGE_INITIALS = String(object.LANGUAGE_INITIALS);
            return message;
        };

        /**
         * Creates a plain object from a Final message. Also converts values to other types if specified.
         * @function toObject
         * @memberof apex.Final
         * @static
         * @param {apex.Final} message Final
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Final.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.VIDEO_ID = "";
                object.LANGUAGE_INITIALS = "";
            }
            if (message.VIDEO_ID != null && message.hasOwnProperty("VIDEO_ID"))
                object.VIDEO_ID = message.VIDEO_ID;
            if (message.LANGUAGE_INITIALS != null && message.hasOwnProperty("LANGUAGE_INITIALS"))
                object.LANGUAGE_INITIALS = message.LANGUAGE_INITIALS;
            return object;
        };

        /**
         * Converts this Final to JSON.
         * @function toJSON
         * @memberof apex.Final
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Final.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Final
         * @function getTypeUrl
         * @memberof apex.Final
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Final.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/apex.Final";
        };

        return Final;
    })();

    return apex;
})();

module.exports = $root;
