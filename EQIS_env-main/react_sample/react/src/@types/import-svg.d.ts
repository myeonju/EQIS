/*
 * svg확장자를 import 가능하도록 타입 정의
 */

declare module '*.svg' {
    const content: string;
    export default content;
}
