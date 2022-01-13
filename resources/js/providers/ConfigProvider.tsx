import React, { createContext, useContext, useState, FC, useEffect } from "react";

export interface IConfig {
    editPostID : number
}

type ConfigContextState = {
    config: IConfig
    setConfig: (newState: Partial<IConfig>) => void
}

const configDefaultValues: ConfigContextState = {
    config: {
        editPostID: 0,
    },
    setConfig: () => {}
}

export const ConfigContext = createContext<ConfigContextState>(configDefaultValues)
export const useConfig = () => useContext(ConfigContext)

const ConfigProvider: FC = ({children}) => {
    const [config, _setState] = useState<IConfig>(configDefaultValues.config)

    const setConfig = (newState: Partial<IConfig>) => _setState(state => {
        return {
            ...state,
            ...newState,
        }
    })

    return (
        <ConfigContext.Provider 
        value={{
            config,
            setConfig
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider