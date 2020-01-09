import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

type LoadingTypes = {
    isLoading: boolean;
};

const Loading = ({ isLoading }: LoadingTypes): JSX.Element => (
    <PropagateLoader color="blue" loading={isLoading} />
);

export default Loading;
