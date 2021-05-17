export const SMPP_STATUS = [
  {
    value: 0,
    label: '0x00000000 -   OK:    OK',
  },
  {
    value: 1,
    label: '0x00000001 -   INVMSGLEN: Message length invalid -- A2P When SP try to send message longer than max allowed message length',
  },
  {
    value: 2,
    label: '0x00000002 -   INVCMDLEN: Command length invalid',
  },
  {
    value: 3,
    label: '0x00000003 -   INVCMDID: Command ID invalid  -- When SP send invalid command, like DeliverSm to trigger A2P',
  },
  {
    value: 4,
    label:
      '0x00000004 -   INVBNDSTS: Incorrect bind status for given command  -- A2P when SP try to send message out in a Receiver binding or Binding using wrong type',
  },
  {
    value: 5,
    label: '0x00000005 -   ALYBND: ESME already in bound state                  -- Maximum allowed connection for client',
  },
  {
    value: 6,
    label: '0x00000006 -   INVPRTFLG: Priority flag invalid',
  },
  {
    value: 7,
    label: '0x00000007 -   INVREGDLVFLG: Registered delivery flag invalid',
  },
  {
    value: 8,
    label: '0x00000008 -   SYSERR: System error',
  },
  {
    value: 10,
    label:
      '0x0000000A -   INVSRCADR: Source address invalid  -- A2P destination not routeable, check Route Label and A2P Routing config, or when source address not whitelisted',
  },
  {
    value: 11,
    label: '0x0000000B -   INVDSTADR: Dest address invalid  -- A2P destination is blacklisted',
  },
  {
    value: 12,
    label: '0x0000000C -   INVMSGID: Message ID invalid',
  },
  {
    value: 13,
    label: '0x0000000D -   BINDFAIL: Bind failed                              -- IP Address is not in whitelist',
  },
  {
    value: 14,
    label: '0x0000000E -   INVPASWD: Password invalid   -- Wrong password for bind request',
  },
  {
    value: 15,
    label:
      '0x0000000F -   INVSYSID: System ID invalid  -- Wrong systemdID for bind request, or inbound SMPP Client expired or not activated',
  },
  {
    value: 17,
    label: '0x00000011 -   CANCELFAIL: Cancel SM failed',
  },
  {
    value: 19,
    label: '0x00000013 -   REPLACEFAIL: Replace SM failed',
  },
  {
    value: 20,
    label: '0x00000014 -   MSGQFUL: Message queue full  -- When SP try to send message in peak hours',
  },
  {
    value: 21,
    label: '0x00000015 -   INVSERTYP: Service type invalid',
  },
  {
    value: 51,
    label: '0x00000033 -   INVNUMDESTS: Number of destinations invalid',
  },
  {
    value: 52,
    label: '0x00000034 -   INVDLNAME: Distribution list name invalid',
  },
  {
    value: 64,
    label: '0x00000040 -   INVDESTFLAG: Destination flag is invalid',
  },
  {
    value: 66,
    label: '0x00000042 -   INVSUBREP: Submit with replace request invalid',
  },
  {
    value: 67,
    label: '0x00000043 -   INVESMCLASS: Field esm_class invalid',
  },
  {
    value: 68,
    label: '0x00000044 -   CNTSUBDL: Cannot submit to distribution list',
  },
  {
    value: 69,
    label: '0x00000045 -   SUBMITFAIL: Submit SM failed',
  },
  {
    value: 72,
    label: '0x00000048 -   INVSRCTON: Source address TON invalid',
  },
  {
    value: 73,
    label: '0x00000049 -   INVSRCNPI: Source address NPI invalid',
  },
  {
    value: 80,
    label: '0x00000050 -   INVDSTTON: Dest address TON invalid',
  },
  {
    value: 81,
    label: '0x00000051 -   INVDSTNPI: Dest address NPI invalid',
  },
  {
    value: 83,
    label: '0x00000053 -   INVSYSTYP: System type invalid',
  },
  {
    value: 84,
    label: '0x00000054 -   INVREPFLAG: Field replace_if_present invalid',
  },
  {
    value: 85,
    label: '0x00000055 -   INVNUMMSGS: Number of messages invalid',
  },
  {
    value: 88,
    label: '0x00000058 -   THROTTLED: Throttling error                        -- Maximum TPS reach',
  },
  {
    value: 97,
    label:
      '0x00000061 -   INVSCHED: Scheduled delivery time invalid -- Schedule delivery time is before 3 hours before than validity period expiration',
  },
  {
    value: 98,
    label: '0x00000062 -   INVEXPIRY: Message validity period invalid -- Check Validity Period field',
  },
  {
    value: 99,
    label: '0x00000063 -   INVDFTMSGID: Predefined message invalid or not found',
  },
  {
    value: 100,
    label: '0x00000064 -   X_T_APPN: ESME receiver temporary app error',
  },
  {
    value: 101,
    label: '0x00000065 -   X_P_APPN: ESME receiver permanent app error',
  },
  {
    value: 102,
    label: '0x00000066 -   X_R_APPN: ESME receiver reject app error',
  },
  {
    value: 103,
    label: '0x00000067 -   QUERYFAIL: Query SM failed',
  },
  {
    value: 192,
    label: '0x000000C0 -   INVOPTPARSTREAM: Error in the optional part of the PDU Body',
  },
  {
    value: 193,
    label: '0x000000C1 -   OPTPARNOTALLWD: Optional Parameter not allowed',
  },
  {
    value: 194,
    label: '0x000000C2 -   INVPARLEN: Parameter length invalid',
  },
  {
    value: 195,
    label: '0x000000C3 -   MISSINGOPTPARAM: Expected optional parameter missing',
  },
  {
    value: 196,
    label: '0x000000C4 -   INVOPTPARAMVAL: Optional parameter value invalid -- Cannot parse TLV for A2P',
  },
  {
    value: 254,
    label: '0x000000FE -   DELIVERYFAILURE: Deliver SM failed',
  },
  {
    value: 255,
    label: '0x000000FF -   UNKNOWNERR: Unknown error',
  },
  {
    value: 256,
    label: '0x00000100 -   SERTYPUNAUTH: Not authorised to use specified service_type',
  },
  {
    value: 257,
    label: '0x00000101 -   PROHIBITED: Prohibited from using specified operation',
  },
  {
    value: 258,
    label: '0x00000102 -   SERTYPUNAVAIL: Specified service_type is unavailable',
  },
  {
    value: 259,
    label: '0x00000103 -   SERTYPDENIED: Specified service_type is denied',
  },
  {
    value: 260,
    label: '0x00000104 -   INVDCS: Invalid Data Coding Scheme',
  },
  {
    value: 261,
    label: '0x00000105 -   INVSRCADDRSUBUNIT: Source Address Sub unit is Invalid',
  },
  {
    value: 262,
    label: '0x00000106 -   INVDSTADDRSUBUNIT: Destination Address Sub unit is Invalid',
  },
  {
    value: 263,
    label: '0x00000107 -   INVBCASTFREQINT: Broadcast Frequency Interval is invalid',
  },
  {
    value: 264,
    label: '0x00000108 -   INVBCASTALIAS_NAME: Broadcast Alias Name is invalid',
  },
  {
    value: 265,
    label: '0x00000109 -   INVBCASTAREAFMT: Broadcast Area Format is invalid',
  },
  {
    value: 266,
    label: '0x0000010A -   INVNUMBCAST_AREAS: Number of Broadcast Areas is invalid',
  },
  {
    value: 267,
    label: '0x0000010B -   INVBCASTCNTTYPE: Broadcast Content Type is invalid',
  },
  {
    value: 268,
    label: '0x0000010C -   INVBCASTMSGCLASS: Broadcast Message Class is invalid',
  },
];
export const SMPP_TON = [
  { value: -1, label: 'AUTO' },
  { value: 0, label: '0 - Unknown' },
  { value: 1, label: '1 - International' },
  { value: 2, label: '2 - National' },
  { value: 3, label: '3 - Network_Specific' },
  { value: 4, label: '4 - Subscriber_Number' },
  { value: 5, label: '5 - Alfanumeric' },
  { value: 6, label: '6 - Abbreviated' },
];
export const SMPP_NPI = [
  { value: -1, label: 'AUTO' },
  { value: 0, label: '0 - Unknown' },
  { value: 1, label: '1 - ISDN' },
  { value: 2, label: '2 - Data' },
  { value: 3, label: '3 - Telex' },
  { value: 4, label: '4 - Land_Mobile' },
  { value: 5, label: '5 - National' },
  { value: 6, label: '6 - Private' },
  { value: 7, label: '7 - ERMES' },
  { value: 8, label: '8 - Internet_IP' },
  { value: 9, label: '9 - WAP_Client_Id' },
];
export const SMPP_TLV = [
  { label: '0x0010 - TAG_SOURCE_TELEMATICS_ID', value: '0x0010' },
  { label: '0x0019 - TAG_PAYLOAD_TYPE', value: '0x0019' },
  { label: '0x0201 - TAG_PRIVACY_INDICATOR', value: '0x0201' },
  { label: '0x0204 - TAG_USER_MESSAGE_REFERENCE', value: '0x0204' },
  { label: '0x0205 - TAG_USER_RESPONSE_CODE', value: '0x0205' },
  { label: '0x020A - TAG_SOURCE_PORT', value: '0x020A' },
  { label: '0x020B - TAG_DESTINATION_PORT', value: '0x020B' },
  { label: '0x020C - TAG_SAR_MSG_REF_NUM', value: '0x020C' },
  { label: '0x020D - TAG_LANGUAGE_INDICATOR', value: '0x020D' },
  { label: '0x020E - TAG_SAR_TOTAL_SEGMENTS', value: '0x020E' },
  { label: '0x020F - TAG_SAR_SEGMENT_SEQNUM', value: '0x020F' },
  { label: '0x0202 - TAG_SOURCE_SUBADDRESS', value: '0x0202' },
  { label: '0x0203 - TAG_DEST_SUBADDRESS', value: '0x0203' },
  { label: '0x0381 - TAG_CALLBACK_NUM', value: '0x0381' },
  { label: '0x0424 - TAG_MESSAGE_PAYLOAD', value: '0x0424' },
  { label: '0x0210 - TAG_SC_INTERFACE_VERSION', value: '0x0210' },
  { label: '0x1201 - TAG_DISPLAY_TIME', value: '0x1201' },
  { label: '0x1204 - TAG_MS_VALIDITY', value: '0x1204' },
  { label: '0x0420 - TAG_DPF_RESULT', value: '0x0420' },
  { label: '0x0421 - TAG_SET_DPF', value: '0x0421' },
  { label: '0x0422 - TAG_MS_AVAIL_STATUS', value: '0x0422' },
  { label: '0x0423 - TAG_NETWORK_ERROR_CODE', value: '0x0423' },
  { label: '0x0425 - TAG_DELIVERY_FAILURE_REASON', value: '0x0425' },
  { label: '0x0426 - TAG_MORE_MSGS_TO_FOLLOW', value: '0x0426' },
  { label: '0x0427 - TAG_MSG_STATE', value: '0x0427' },
  { label: '0x0428 - TAG_CONGESTION_STATE', value: '0x0428' },
  { label: '0x0302 - TAG_CALLBACK_NUM_PRES_IND', value: '0x0302' },
  { label: '0x0303 - TAG_CALLBACK_NUM_ATAG', value: '0x0303' },
  { label: '0x0304 - TAG_NUM_MSGS', value: '0x0304' },
  { label: '0x1203 - TAG_SMS_SIGNAL', value: '0x1203' },
  { label: '0x130C - TAG_ALERT_ON_MSG_DELIVERY', value: '0x130C' },
  { label: '0x1380 - TAG_ITS_REPLY_TYPE', value: '0x1380' },
  { label: '0x1383 - TAG_ITS_SESSION_INFO', value: '0x1383' },
  { label: '0x0501 - TAG_USSD_SERVICE_OP', value: '0x0501' },
  { label: '0x0600 - TAG_BROADCAST_CHANNEL_INDICATOR', value: '0x0600' },
  { label: '0x0601 - TAG_BROADCAST_CONTENT_TYPE', value: '0x0601' },
  { label: '0x0602 - TAG_BROADCAST_CONTENT_TYPE_INFO', value: '0x0602' },
  { label: '0x0603 - TAG_BROADCAST_MESSAGE_CLASS', value: '0x0603' },
  { label: '0x0604 - TAG_BROADCAST_REP_NUM', value: '0x0604' },
  { label: '0x0605 - TAG_BROADCAST_FREQUENCY_INTERVAL', value: '0x0605' },
  { label: '0x0606 - TAG_BROADCAST_AREA_IDENTIFIER', value: '0x0606' },
  { label: '0x0607 - TAG_BROADCAST_ERROR_STATUS', value: '0x0607' },
  { label: '0x0608 - TAG_BROADCAST_AREA_SUCCESS', value: '0x0608' },
  { label: '0x0609 - TAG_BROADCAST_END_TIME', value: '0x0609' },
  { label: '0x060A - TAG_BROADCAST_SERVICE_GROUP', value: '0x060A' },
  { label: '0x060D - TAG_SOURCE_NETWORK_ID', value: '0x060D' },
  { label: '0x060E - TAG_DEST_NETWORK_ID', value: '0x060E' },
  { label: '0x060F - TAG_SOURCE_NODE_ID', value: '0x060F' },
  { label: '0x0610 - TAG_DEST_NODE_ID', value: '0x0610' },
  { label: '0x060B - TAG_BILLING_IDENTIFICATION', value: '0x060B' },
  { label: '0x8081 - TAG_ORIG_MSC_ADDR', value: '0x8081' },
  { label: '0x8082 - TAG_DEST_MSC_ADDR', value: '0x8082' },
  { label: '0x0005 - TAG_DEST_ADDR_SUBUNIT', value: '0x0005' },
  { label: '0x0006 - TAG_DEST_NETWORK_TYPE', value: '0x0006' },
  { label: '0x0007 - TAG_DEST_BEAR_TYPE', value: '0x0007' },
  { label: '0x0008 - TAG_DEST_TELE_ID', value: '0x0008' },
  { label: '0x000D - TAG_SOURCE_ADDR_SUBUNIT', value: '0x000D' },
  { label: '0x000E - TAG_SOURCE_NETWORK_TYPE', value: '0x000E' },
  { label: '0x000F - TAG_SOURCE_BEAR_TYPE', value: '0x000F' },
  { label: '0x0010 - TAG_SOURCE_TELE_ID', value: '0x0010' },
  { label: '0x0017 - TAG_QOS_TIME_TO_LIVE', value: '0x0017' },
  { label: '0x001D - TAG_ADD_STATUS_INFO', value: '0x001D' },
  { label: '0x001E - TAG_RECEIPTED_MSG_ID', value: '0x001E' },
  { label: '0x0030 - TAG_MS_MSG_WAIT_FACILITIES', value: '0x0030' },
];

export const SMPP_DLR = [
  { label: 'EnRoute', value: 1 },
  { label: 'Delivered', value: 2 },
  { label: 'Expired', value: 3 },
  { label: 'Deleted', value: 4 },
  { label: 'Undeliverable', value: 5 },
  { label: 'Accepted', value: 6 },
  { label: 'Unknown', value: 7 },
  { label: 'Rejected', value: 8 },
];
