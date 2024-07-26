export interface OrderDates {
  orderTargetDate: Date | null;
  requestDate: Date | null;
  acceptDate: Date | null;
  rejectDate: Date | null;
  paymentLimitDate: Date | null;
  paymentConfirmRequestedDate: Date | null;
  rollbackCheckPaymentDate: Date | null;
  confirmDate: Date | null;
  pickupRequestDate: Date | null;
  startDeliveryDate: Date | null;
  completeDate: Date | null;
  cancelDate: Date | null;
  modifyDate: Date | null;
}

export const OrderDatesInitial = {
  orderTargetDate: null,
  requestDate: null,
  acceptDate: null,
  rejectDate: null,
  paymentLimitDate: null,
  paymentConfirmRequestedDate: null,
  rollbackCheckPaymentDate: null,
  confirmDate: null,
  pickupRequestDate: null,
  startDeliveryDate: null,
  completeDate: null,
  cancelDate: null,
  modifyDate: null,
};
