import { useEffect, useRef } from 'react';
import './styles.scss';

const ContactModal = ({ setShow, show, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const clickOutsideContent = e => {
      if (e.target === modalRef.current) {
        setShow(false);
      }
    };
    window.addEventListener('click', clickOutsideContent);
    return () => {
      window.removeEventListener('click', clickOutsideContent);
    };
  }, [{ setShow, show, children }]);

  return (
    <div ref={modalRef} className={`modal ${show ? 'active' : ''}`}>
      <div className="modal__content">
        <div className="modal__body"> {children} </div>
      </div>
    </div>
  );
};

export default ContactModal;

export const ModalHeader = ({ children }) => {
  return <div className="modal__header"> {children} </div>;
};

export const ModalFooter = ({ children }) => {
  return <div className="modal__footer"> {children} </div>;
};
