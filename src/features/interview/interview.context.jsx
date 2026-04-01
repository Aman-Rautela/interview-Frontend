import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);

    return (
        <InterviewContext.Provider value={{ report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}