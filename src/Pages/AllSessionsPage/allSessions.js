const findSessions = (keywords, allSessions, setSessions) => {
    console.log(keywords)
    const displayableSessions = allSessions?.filter(session =>
        session.sessionTitle.toLowerCase().includes(keywords.toLowerCase())
    )
    setSessions(displayableSessions)
}

export { findSessions }