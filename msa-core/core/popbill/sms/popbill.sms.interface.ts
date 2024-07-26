export interface PopbillSmsOptions {
  receiver: string; // 수신번호
  receiverName?: string; // 수신자명 (선택 사항)
  contents: string; // 메시지 내용 (한글, 한자, 특수문자 2byte / 영문, 숫자, 공백 1byte)
  reserveDT?: string; // 전송 예약일시 (형식: yyyyMMddHHmmss, 기본값: 즉시전송, 선택 사항)
  adsYN?: boolean; // 광고메시지 전송여부 (true: 광고, false: 일반, 기본값: false, 선택 사항)
  senderName?: string; // 발신자명 (선택 사항)
  requestNum?: string; // 요청번호 (파트너가 접수 단위를 식별하기 위해 할당하는 관리번호, 선택 사항)
}
