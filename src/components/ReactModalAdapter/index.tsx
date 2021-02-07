import { FC } from 'react';
import ReactModal from 'react-modal';

type ReactModalAdapterTypes = {
    className: string;
    modalClassName: string;
    isOpen: boolean;
};

export const ReactModalAdapter: FC<ReactModalAdapterTypes> = ({ className, modalClassName, isOpen, ...props }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            className={modalClassName}
            portalClassName={className}
            bodyOpenClassName="portalOpen"
            {...props}
        />
    );
};
