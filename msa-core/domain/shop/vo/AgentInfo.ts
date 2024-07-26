export interface AgentInfoType {
  device: string;
  osType: string;
  fcmToken: string;
  expDate: Date;
}

export class AgentInfo implements AgentInfoType {
  constructor(public device: string, public osType: string, public fcmToken: string, public expDate: Date) {}
}
