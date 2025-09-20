import * as $protobuf from 'protobufjs';
// import Long = require("long");
/** Namespace apex. */
export namespace apex {
  /** Properties of an Initial. */
  interface IInitial {
    /** Initial IS_ASR */
    IS_ASR?: string | null;

    /** Initial LANGUAGE_INITIALS */
    LANGUAGE_INITIALS: string;
  }

  /** Represents an Initial. */
  class Initial implements IInitial {
    /**
     * Constructs a new Initial.
     * @param [properties] Properties to set
     */
    constructor(properties?: apex.IInitial);

    /** Initial IS_ASR. */
    public IS_ASR: string;

    /** Initial LANGUAGE_INITIALS. */
    public LANGUAGE_INITIALS: string;

    /**
     * Creates a new Initial instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Initial instance
     */
    public static create(properties?: apex.IInitial): apex.Initial;

    /**
     * Encodes the specified Initial message. Does not implicitly {@link apex.Initial.verify|verify} messages.
     * @param message Initial message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: apex.IInitial,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Initial message, length delimited. Does not implicitly {@link apex.Initial.verify|verify} messages.
     * @param message Initial message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: apex.IInitial,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an Initial message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Initial
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): apex.Initial;

    /**
     * Decodes an Initial message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Initial
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): apex.Initial;

    /**
     * Verifies an Initial message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Initial message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Initial
     */
    public static fromObject(object: { [k: string]: any }): apex.Initial;

    /**
     * Creates a plain object from an Initial message. Also converts values to other types if specified.
     * @param message Initial
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: apex.Initial,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Initial to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Initial
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Final. */
  interface IFinal {
    /** Final VIDEO_ID */
    VIDEO_ID: string;

    /** Final LANGUAGE_INITIALS */
    LANGUAGE_INITIALS: string;
  }

  /** Represents a Final. */
  class Final implements IFinal {
    /**
     * Constructs a new Final.
     * @param [properties] Properties to set
     */
    constructor(properties?: apex.IFinal);

    /** Final VIDEO_ID. */
    public VIDEO_ID: string;

    /** Final LANGUAGE_INITIALS. */
    public LANGUAGE_INITIALS: string;

    /**
     * Creates a new Final instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Final instance
     */
    public static create(properties?: apex.IFinal): apex.Final;

    /**
     * Encodes the specified Final message. Does not implicitly {@link apex.Final.verify|verify} messages.
     * @param message Final message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: apex.IFinal,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Final message, length delimited. Does not implicitly {@link apex.Final.verify|verify} messages.
     * @param message Final message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: apex.IFinal,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Final message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Final
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): apex.Final;

    /**
     * Decodes a Final message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Final
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): apex.Final;

    /**
     * Verifies a Final message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Final message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Final
     */
    public static fromObject(object: { [k: string]: any }): apex.Final;

    /**
     * Creates a plain object from a Final message. Also converts values to other types if specified.
     * @param message Final
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: apex.Final,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Final to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Final
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}
