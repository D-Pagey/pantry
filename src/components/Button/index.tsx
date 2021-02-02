import { FC, ReactNode } from 'react';
import * as S from './styles';

export type ButtonProps = {
    children: ReactNode;
    destructive?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    loadingContent?: string;
    margin?: string;
    onClick?: () => void;
    secondary?: boolean;
    size?: 'sm' | 'm' | 'l';
    type?: string;
};

export const Button: FC<ButtonProps> = ({
    children,
    destructive,
    disabled,
    isLoading,
    loadingContent,
    secondary,
    ...props
}) => {
    if (disabled) {
        return (
            <S.DisabledButton disabled={disabled} {...props}>
                {children}
            </S.DisabledButton>
        );
    }

    if (secondary) {
        return <S.SecondaryButton {...props}>{children}</S.SecondaryButton>;
    }

    if (destructive) {
        return <S.DestructiveButton {...props}>{children}</S.DestructiveButton>;
    }

    if (isLoading) {
        return (
            <S.LoadingButton {...props} data-testid="loadingButton">
                {loadingContent || children}
            </S.LoadingButton>
        );
    }

    return <S.Button {...props}>{children}</S.Button>;
};
