export interface IModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm?: (data?: any, callback?: any) => void;
}
