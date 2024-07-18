type ModalAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export const ModalAlert: React.FC<ModalAlertProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <span className="modal__close" onClick={onClose}>&times;</span>
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
