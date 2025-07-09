/*
 * png확장자를 import 가능하도록 타입 정의
 */

declare module '*.png' {
    const content: string;
    export default content;
}
