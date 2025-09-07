import { ModalC, type IModalProps } from "./Modal";

export interface ITemplateModalProps extends IModalProps {
  children: React.ReactNode | React.ReactNode[];
}

export const TemplateModal = ({ children }: ITemplateModalProps) => {
  return (
    <>
      <ModalC>{children}</ModalC>
    </>
  );
};
