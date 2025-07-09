/*
 * env 파일 타입 정의
 */

declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string;

        AES_SEQCRETKEY: string;

        JWT_TOKENNAME: string;
        LANG_CD: string;
        HTML_AES_SECRETKEY: string;
    }
}
