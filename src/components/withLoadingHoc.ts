import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

interface WrappedProps {
    setIsLoading: (isLoading: boolean) => void
}

interface Props extends WrappedProps {
}

const withLoading = <WrappedComponentProps extends WrappedProps>(WrappedComponent: React.FunctionComponent<WrappedComponentProps>) => {
    const HOC: any = (props:any) => {
        const [isLoading, setIsLoading] = useState(false);

        return (
            <View>
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                <WrappedComponent {...props} setIsLoading={setIsLoading} />
            </View>
        );
    }
    return HOC;
}

export default withLoading;
