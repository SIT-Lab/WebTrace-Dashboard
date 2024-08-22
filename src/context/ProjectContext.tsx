import React, { createContext, useContext, useState } from 'react'

interface ProjectContextType {
    selectedProjectId: string | null
    selectedProjectName: string | null
    setSelectedProjectId: (id: string) => void
    setSelectedProjectName: (name: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null)

    return (
        <ProjectContext.Provider value={{ selectedProjectId, selectedProjectName, setSelectedProjectId, setSelectedProjectName }}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = () => {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider')
    }
    return context
}
