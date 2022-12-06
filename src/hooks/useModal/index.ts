import { useCallback, useState } from "react";

export interface UseModalHelper {
  show: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

function useModal(): UseModalHelper {
  const [show, setShowModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => setShowModal(false), []);
  return {
    show,
    toggleModal,
    closeModal,
  };
}

export default useModal;
