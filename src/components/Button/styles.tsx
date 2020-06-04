import styled from 'styled-components';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    readonly margin?: string;
    readonly width?: string;
}

export const Button = styled.button.attrs({
    type: 'button'
})<ButtonProps>`
    background-color: #288efc;
    border: 0;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    height: 45px;
    line-height: 1.2;
    margin: ${({ margin }) => margin};
    width: ${({ width }) => width || '200px'};
`;

export const Selected = styled(Button)`
    background-color: linear-gradient(199.65deg, #288efc 0%, #2863fc 100%);
    border-radius: 6px;
    color: white;
    flex-grow: 1;
`;

export const UnSelected = styled(Button)`
    background-color: white;
    border-radius: 6px;
    color: black;
    flex-grow: 1;
`;

export const Submit = styled(Button).attrs({
    type: 'submit'
})``;
