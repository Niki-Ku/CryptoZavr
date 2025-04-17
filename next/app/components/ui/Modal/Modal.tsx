import BurgerButton from "../BurgerButton/BurgerButton";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface IModal {
	onCloseClick: React.Dispatch<React.SetStateAction<boolean>>;
	isModalOpen: boolean;
	children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ onCloseClick, children, isModalOpen }) => {
	useEffect(() => {
		isModalOpen && document.body.classList.add("overflow-hidden");
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isModalOpen]);

	return createPortal(
		<div className="w-full h-full bg-black/30 left-0 top-0 z-50 absolute flex">
			<div className="m-auto w-[90%] md:w-[70%] min-h-[60%] max-h-[90%] bg-background-component rounded-md relative overflow-auto p-8 pt-20 overflow-x-hidden">
				<div className="absolute w-7 md:w-10 h-7 md:h-10 top-5 right-5 z-100">
					<BurgerButton isOpen onClick={() => onCloseClick(false)} />
				</div>
				<div className="overflow-hidden">{children}</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
