export interface ImixedFile {
    type: 'ADD' | 'SAVE'; // 신규 추가 or DB 저장
    key: number; // 파일 구분을 위한 key
    name: string; // 파일 이름
    encAttcFilNo?: string; // 암호화 파일 번호
    encAttcFilSeq?: string; // 암호화 파일 seq번호
    file?: File; // 신규 추가한 file data
}
