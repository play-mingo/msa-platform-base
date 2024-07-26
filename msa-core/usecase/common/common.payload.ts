export type ISendVerifyNumPayload = {
  verifyPhone: string;
};

export type ICheckVerifyNumPayload = {
  verifyKey: string;
  verifyCode: string;
  verifyPhone: string;
};

export type ISendedVerifyNumPayload = {
  verifyPhone: string;
  verifyCode: string;
};

export type ICheckedVerifyNumPayload = {
  verifyKey: string;
  verifyCode: string;
  verifyPhone: string;
};
