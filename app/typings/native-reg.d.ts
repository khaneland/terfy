/// <reference types="node" />
export declare enum TKEY {
    CLASSES_ROOT = 2147483648,
    CURRENT_USER = 2147483649,
    LOCAL_MACHINE = 2147483650,
    USERS = 2147483651,
    PERFORMANCE_DATA = 2147483652,
    PERFORMANCE_TEXT = 2147483728,
    PERFORMANCE_NLSTEXT = 2147483744,
    CURRENT_CONFIG = 2147483653,
    DYN_DATA = 2147483654,
    CURRENT_USER_LOCAL_SETTINGS = 2147483655
}
export declare enum CreateKeyOptions {
    NON_VOLATILE = 0,
    VOLATILE = 1,
    CREATE_LINK = 2,
    BACKUP_RESTORE = 4
}
export declare enum OpenKeyOptions {
    OPEN_LINK = 8
}
export declare enum Access {
    QUERY_VALUE = 1,
    SET_VALUE = 2,
    CREATE_SUB_KEY = 4,
    ENUMERATE_SUB_KEYS = 8,
    NOTIFY = 16,
    CREATE_LINK = 32,
    WOW64_64KEY = 256,
    WOW64_32KEY = 512,
    READ = 131097,
    WRITE = 131078,
    EXECUTE = 131097,
    ALL_ACCESS = 983103
}
export declare enum ValueType {
    NONE = 0,
    SZ = 1,
    EXPAND_SZ = 2,
    BINARY = 3,
    DWORD = 4,
    DWORD_LITTLE_ENDIAN = 4,
    DWORD_BIG_ENDIAN = 5,
    LINK = 6,
    MULTI_SZ = 7,
    RESOURCE_LIST = 8,
    FULL_RESOURCE_DESCRIPTOR = 9,
    RESOURCE_REQUIREMENTS_LIST = 10,
    QWORD = 11,
    QWORD_LITTLE_ENDIAN = 11
}
export declare enum GetValueFlags {
    RT_ANY = 65535,
    RT_REG_NONE = 1,
    RT_REG_SZ = 2,
    RT_REG_EXPAND_SZ = 4,
    RT_REG_BINARY = 8,
    RT_REG_DWORD = 16,
    RT_REG_MULTI_SZ = 32,
    RT_REG_QWORD = 64,
    RT_DWORD = 24,
    RT_QWORD = 72,
    NO_EXPAND = 268435456,
    SUBKEY_WOW6464KEY = 65536,
    SUBKEY_WOW6432KEY = 131072
}
export declare const HKCR = TKEY.CLASSES_ROOT;
export declare const HKCU = TKEY.CURRENT_USER;
export declare const HKLM = TKEY.LOCAL_MACHINE;
export declare const HKU = TKEY.USERS;
export declare type Value = Buffer & {
    type: ValueType;
};
export declare function isTKEY(tkey: any): tkey is TKEY;
export declare function createKey(tkey: TKEY, subKey: string, access: Access, options?: CreateKeyOptions): TKEY;
export declare function openKey(tkey: TKEY, subKey: string, access: Access, options?: OpenKeyOptions): TKEY | null;
export declare function openCurrentUser(access?: Access): TKEY;
export declare function loadAppKey(file: string, access: Access): TKEY | null;
export declare function enumKeyNames(tkey: TKEY): string[];
export declare function enumValueNames(tkey: TKEY): string[];
export declare function queryValueRaw(tkey: TKEY, valueName: string): Value | null;
export declare function getValueRaw(tkey: TKEY, subKey: string, valueName: string, flags?: GetValueFlags): Value | null;
export declare function setValueRaw(tkey: TKEY, valueName: string, valueType: ValueType, data: Buffer): void;
export declare function deleteKey(tkey: TKEY, subKey: string): boolean;
export declare function deleteTree(tkey: TKEY, subKey: string): boolean;
export declare function deleteKeyValue(tkey: TKEY, subKey: string, valueName: string): boolean;
export declare function deleteValue(tkey: TKEY, valueName: string): boolean;
export declare function closeKey(tkey: TKEY | null | undefined): void;
export declare type ParsedValue = number | string | string[] | Buffer;
export declare function parseValue(value: Value | null): ParsedValue | null;
export declare function parseString(value: Buffer): string;
export declare function parseMultiString(value: Buffer): string[];
export declare function formatString(value: string): Buffer;
export declare function formatMultiString(values: string[]): Buffer;
export declare function formatDWORD(value: number): Buffer;
export declare function formatQWORD(value: number): Buffer;
export declare function setValueSZ(tkey: TKEY, valueName: string, value: string): void;
export declare function setValueEXPAND_SZ(tkey: TKEY, valueName: string, value: string): void;
export declare function setValueMULTI_SZ(tkey: TKEY, valueName: string, value: string[]): void;
export declare function setValueDWORD(tkey: TKEY, valueName: string, value: number): void;
export declare function setValueQWORD(tkey: TKEY, valueName: string, value: number): void;
export declare function getValue(tkey: TKEY, subKey: string, valueName: string, flags?: GetValueFlags): ParsedValue | null;
export declare function queryValue(tkey: TKEY, valueName: string): ParsedValue | null;
//# sourceMappingURL=index.d.ts.map
